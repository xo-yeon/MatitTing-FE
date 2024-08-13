import ChatHeader from '@components/chat/room/ChatHeader';
import MessageList from '@components/chat/room/MessageList';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { MouseEvent, useState } from 'react';
import getChatMessage, { API_GET_CHAT_MESSAGE_KEY } from 'src/api/getChatMessage';
import getChatRoomInfo, { API_GET_CHAT_ROOM_INFO_KEY } from 'src/api/getChatRoomInfo';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import useChat from '@hooks/useChat';
import TextInput from '@components/common/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 1rem 2rem;
    background-color: #ddd;
`;

const SubmitButton = styled.button`
    width: 50px;
    border: none;
    border-radius: 10px;
    background-color: #efebec;
`;

interface ChattingRoomProps {
    roomId: number;
}

const ChatRoom = ({ roomId }: ChattingRoomProps) => {
    const { publish } = useChat(roomId);
    const methods = useForm<{ message: string }>({
        resolver: yupResolver(
            yup.object({
                message: yup.string().required(),
            }),
        ),
        mode: 'onSubmit',
    });
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

    const handleOpenUserList = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpenUserList(!isOpenUserList);
    };

    const onSubmit: SubmitHandler<{ message: string }> = async ({
        message,
    }: {
        message: string;
    }) => {
        if (!roomInfo?.responseChatUserList.myInfo) return;

        publish(roomInfo?.responseChatUserList.myInfo, message);
        methods.reset();
    };

    const onObserve = () => hasNextPage && fetchNextPage();
    const messages = data.pages.map((page) => page.responseChatDtoList).flat();

    return (
        <Wrapper>
            {roomInfo ? (
                <ChatHeader
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
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextInput maxLength={20} {...methods.register('message')} />
                        <SubmitButton type="submit">전송</SubmitButton>
                    </Form>
                </FormProvider>
            </Contents>
        </Wrapper>
    );
};

export default ChatRoom;
