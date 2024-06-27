import BottomInputGroup from '@components/chat/room/BottomInputGroup';
import HeaderBtnGroup from '@components/chat/room/HeaderBtnGroup';
import MessageList from '@components/chat/room/MessageList';
import styled from '@emotion/styled';
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState, useEffect, useRef } from 'react';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import { IMessage, Client } from '@stomp/stompjs';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import { getCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ChatMessagesType } from 'types/chat/chat';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
`;

const Contents = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

interface ChattingRoomProps {
    roomId: string;
}

const ChatRoom = ({ roomId }: ChattingRoomProps) => {
    const refreshToken = getCookie('refreshToken');
    const queryClient = useQueryClient();
    const client = useRef<any>({});
    const { register, getValues, setValue } = useForm();
    const [isOpenUserList, setIsOpenUserList] = useState(false);

    const { data: roomInfo } = useQuery({
        queryKey: [
            API_GET_CHAT_ROOM_INFO_KEY,
            {
                chatRoomId: roomId,
            },
        ],
        queryFn: () =>
            getChatRoomInfo({
                chatRoomId: roomId,
            }),
    });

    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
        queryFn: ({ pageParam = 0 }) => getChatMessage({ roomId, page: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.pageInfo?.hasNext) {
                return lastPage.pageInfo.page + 1;
            }
        },
    });

    // const handleCloseUserList = (e: MouseEvent<HTMLDivElement>) => {
    //   e.stopPropagation();
    //   setIsOpenUserList(false);
    // };

    const handleOpenUserList = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpenUserList(!isOpenUserList);
    };

    useEffect(() => {
        if (!roomId && !refreshToken) return;

        const connect = () => {
            client.current = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    // Authorization: String(refreshToken),
                    Authorization:
                        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIiwic29jaWFsSWQiOiIxMjMwOTgxMjMwOTEyODMwMSIsImV4cCI6MTc0NTQyMjUzMX0.fFVxWepJEz4RmDKw4-impGvzC9U7gMf8AC4g57Z9eBQ-xCNWXBsFNgMoCMrcwtdU1FOMVQ_di1dZAZZgw6Gzyw',
                },
                reconnectDelay: 0, // 자동 재연결
                heartbeatIncoming: 10000,
                heartbeatOutgoing: 10000,
                onConnect: () => {
                    client.current.subscribe(
                        `/sub/chat/room/${Number(roomId)}`,
                        async (res: IMessage) => {
                            const LIST_QUERY_KEY = [API_GET_CHAT_MESSAGE_KEY, { roomId }];
                            type LIST_QUERY_TYPE = InfiniteData<
                                InfinitePaginationDataType<
                                    'responseChatDtoList',
                                    ChatMessagesType | string
                                >,
                                unknown
                            >;

                            await queryClient.cancelQueries({ queryKey: LIST_QUERY_KEY });

                            const regex = /chatUserId/g;

                            if (regex.test(res.body)) {
                                const message = JSON.parse(res.body);

                                await queryClient.setQueryData(
                                    LIST_QUERY_KEY,
                                    (prev: LIST_QUERY_TYPE) => {
                                        let newList = prev;

                                        // last pages unshift
                                        newList.pages[0].responseChatDtoList.unshift({
                                            chatId: message.createAt,
                                            createAt: message.createAt,
                                            imgUrl: message.userImage,
                                            message: message.message,
                                            nickname: message.nickname,
                                            senderId: message.chatUserId,
                                        });

                                        return newList;
                                    },
                                );
                            } else {
                                await queryClient.setQueryData(
                                    LIST_QUERY_KEY,
                                    (prev: LIST_QUERY_TYPE) => {
                                        let newList = prev;

                                        // last pages unshift
                                        newList.pages[0].responseChatDtoList.unshift(res.body);

                                        return newList;
                                    },
                                );
                            }

                            await queryClient.invalidateQueries({
                                queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
                            });
                        },
                    );
                },
            });

            client.current.activate();
        };

        connect();

        return () => client.current.deactivate();
    }, [queryClient, refreshToken, roomId]);

    const handleClickSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!roomInfo?.responseChatUserList) return;

        const currentTime = Date.now();
        const message = getValues('message');

        await client.current.publish({
            destination: `/pub/message`,
            body: JSON.stringify({
                type: 'TALK',
                roomId: Number(roomId),
                userImage: roomInfo?.responseChatUserList.myInfo?.userProfileImg,
                nickname: roomInfo?.responseChatUserList.myInfo.nickname,
                chatUserId: Number(roomInfo?.responseChatUserList.myInfo.chatUserId),
                message: message,
                createAt: currentTime,
            }),
        });

        setValue('message', '');
    };

    const onObserve = () => hasNextPage && fetchNextPage();
    const messages = data.pages.map((page) => page.responseChatDtoList).flat();

    return (
        <Wrapper>
            {roomInfo ? (
                <HeaderBtnGroup
                    isOpenUserList={isOpenUserList}
                    handleOpenUserList={handleOpenUserList}
                    roomInfo={roomInfo}
                />
            ) : null}
            <Contents>
                {roomInfo ? (
                    <MessageList
                        myInfo={roomInfo?.responseChatUserList.myInfo}
                        messages={messages}
                        onObserve={onObserve}
                        observerMinHeight="10px"
                    />
                ) : null}
                <BottomInputGroup register={register} handleClickSubmit={handleClickSubmit} />
            </Contents>
        </Wrapper>
    );
};

export default ChatRoom;
