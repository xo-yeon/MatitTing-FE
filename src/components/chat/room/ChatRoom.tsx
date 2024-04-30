import BottomInputGroup from '@components/chat/room/BottomInputGroup';
import HeaderBtnGroup from '@components/chat/room/HeaderBtnGroup';
import MessageList from '@components/chat/room/MessageList';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useState, useEffect, useRef, useLayoutEffect } from 'react';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import * as StompJs from '@stomp/stompjs';
import getChatUserList, { API_GET_CHAT_USER_LIST_KEY } from 'src/api/getChatUserList';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import dayjs from 'dayjs';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const Contents = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

interface ChattingRoomProps {
    roomId: string;
}

export type ChatMessagesType = {
    // userId: string;
    // userImage: string;
    // userNickname: string;
    // userMessage: string;

    chatId?: number;
    senderId?: number;
    nickname?: string;
    message: string;
    createAt?: string;
};

let count = 0;

const ChatRoom = ({ roomId }: ChattingRoomProps) => {
    const queryClient = useQueryClient();
    const client = useRef<any>({});
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

    const { data: userList } = useQuery({
        queryKey: [
            API_GET_CHAT_USER_LIST_KEY,
            {
                roomId,
            },
        ],
        queryFn: () =>
            getChatUserList({
                roomId,
            }),
    });

    const { data: messages } = useQuery({
        queryKey: [
            API_GET_CHAT_MESSAGE_KEY,
            {
                roomId,
                size: '5',
                lastChatId: '0',
            },
        ],
        queryFn: () =>
            getChatMessage({
                roomId,
                size: '5',
                lastChatId: '0',
            }),
    });

    const [chatMessages, setChatMessages] = useState<any[]>([
        { message: '채팅을 시작할 수 있습니다.' },
    ]);

    // const handleCloseUserList = (e: MouseEvent<HTMLDivElement>) => {
    //   e.stopPropagation();
    //   setIsOpenUserList(false);
    // };

    const handleOpenUserList = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpenUserList(!isOpenUserList);
    };

    useEffect(() => {
        if (!roomId) return;

        const connect = () => {
            client.current = new StompJs.Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    Authorization:
                        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsInJvbGUiOiJST0xFX1VTRVIiLCJzb2NpYWxJZCI6IjEyMzA5ODEyMzA5MTI4MzAxIiwiZXhwIjoxNzE1NDc3ODAzfQ.o3WxWeaLzUEtoDjJgay_KR3uAvdEjjrX00jmjmIXoantYlUsWgWCCj1gbkdOdElqiKuYIdfuTA23tRAy4B_zfA',
                },
                reconnectDelay: 0, // 자동 재연결
                heartbeatIncoming: 10000,
                heartbeatOutgoing: 10000,
                onConnect: (frame) => {
                    client.current.subscribe(
                        `/sub/chat/room/${roomId}`,
                        (message: { body: string }) => {
                            //구독하는 채널
                            const newMessage = JSON.parse(message.body);

                            setChatMessages((prev) => {
                                if (prev) return [...prev, newMessage];

                                return [newMessage];
                            });
                        },
                    );
                },
            });

            client.current.activate();
        };

        connect();

        return () => client.current.deactivate();
    }, [roomId]);

    const handleClickSubmit = async () => {
        count += 1;

        client.current.publish({
            destination: `/sub/chat/room/${roomId}`,
            body: JSON.stringify({
                roomId: Number(roomId),
                userImage: '',
                nickname: 'test',
                chatUserId: 11,
                message: `채팅 메시지 테스트 ${count}`,
                createAt: Date.now(),
            }),
        });

        // await queryClient.invalidateQueries({
        //   queryKey: [
        //     API_GET_CHAT_MESSAGE_KEY,
        //     { roomId: "11", size: "5", lastChatId: "0" },
        //   ],
        // });
    };

    useEffect(() => {
        console.log(chatMessages);
    }, [chatMessages]);

    return (
        <Wrapper>
            {userList && roomInfo ? (
                <HeaderBtnGroup
                    isOpenUserList={isOpenUserList}
                    handleOpenUserList={handleOpenUserList}
                    roomInfo={roomInfo}
                    userList={userList}
                />
            ) : null}
            <Contents>
                <button onClick={handleClickSubmit}>메시지 전송</button>
                <MessageList messages={chatMessages} />
                <BottomInputGroup />
            </Contents>
        </Wrapper>
    );
};

export default ChatRoom;
