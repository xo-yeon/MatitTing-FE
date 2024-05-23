import BottomInputGroup from '@components/chat/room/BottomInputGroup';
import HeaderBtnGroup from '@components/chat/room/HeaderBtnGroup';
import MessageList from '@components/chat/room/MessageList';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState, useEffect, useRef } from 'react';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import * as StompJs from '@stomp/stompjs';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import { getCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';

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
    const { register, handleSubmit, getValues } = useForm();
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
            if (lastPage.pageInfo.hasNext) {
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
            client.current = new StompJs.Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    Authorization: String(refreshToken),
                },
                reconnectDelay: 0, // 자동 재연결
                heartbeatIncoming: 10000,
                heartbeatOutgoing: 10000,
                onConnect: (frame) => {
                    client.current.subscribe(`/sub/chat/room/${Number(roomId)}`);

                    queryClient.invalidateQueries({
                        queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
                    });
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

        client.current.publish({
            destination: `/pub/message`,
            body: JSON.stringify({
                type: 'TALK',
                roomId: Number(roomId),
                userImage: roomInfo?.responseChatUserList.myInfo?.userProfileImg,
                nickname: roomInfo?.responseChatUserList.myInfo.nickname,
                chatUserId: Number(roomInfo?.responseChatUserList.myInfo.chatUserId),
                message: getValues('message'),
                createAt: Date.now(),
            }),
        });

        await queryClient.invalidateQueries({
            queryKey: [API_GET_CHAT_MESSAGE_KEY, { roomId }],
        });
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
                <ObserverTrigger onObserve={onObserve} observerMinHeight={'30px'}>
                    <MessageList messages={messages} />
                </ObserverTrigger>
                <BottomInputGroup register={register} handleClickSubmit={handleClickSubmit} />
            </Contents>
        </Wrapper>
    );
};

export default ChatRoom;
