import TextInput from '@components/common/TextInput';
import styled from '@emotion/styled';
import router from 'next/router';
import Image from 'next/image';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import getChatRooms, { API_GET_CHAT_ROOMS_KEY } from 'src/api/getChatRooms';

const Wrapper = styled.div`
    padding: 2rem;
`;

const SearchBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;

const SearchButton = styled.button`
    min-width: 50px;
`;

const RoomList = styled.ul`
    padding: 0;
    margin: 0 auto;
    list-style: none;
`;

const Room = styled.li`
    display: flex;
    margin: 1rem 0;
    padding: 1rem 0;
`;

const ImageBox = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
`;

const RightBox = styled.div`
    width: calc(100% - 60px);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
`;

const Message = styled.p`
    margin: 0;
`;

const Recentime = styled.p``;

const ChatListPage: NextPage = () => {
    const { data } = useQuery({
        queryKey: [API_GET_CHAT_ROOMS_KEY],
        queryFn: () => getChatRooms({}),
    });

    const handleOnChangeSearch = () => {};
    const handleOnClickSearch = () => {};

    const handleClickRouteRoom = (roomId: string) => router.push(`/chat/${roomId}`);

    return (
        <Wrapper>
            <SearchBox>
                <TextInput placeholder="파티 제목 검색" onChange={handleOnChangeSearch} />
                <SearchButton onClick={handleOnClickSearch}>검색</SearchButton>
            </SearchBox>
            <RoomList>
                {data?.responseChatRoomDtoList.map((item) => {
                    const { roomId, title, lastMessageTime, lastMessage, thumbnail } = item;

                    return (
                        <Room key={roomId} onClick={() => handleClickRouteRoom(roomId)}>
                            <ImageBox style={{}}>
                                <Image
                                    fill
                                    src={thumbnail}
                                    alt="profile"
                                    style={{ objectFit: 'cover' }}
                                />
                            </ImageBox>
                            <RightBox>
                                <TextBox>
                                    <Title>{title}</Title>
                                    <Message>{lastMessage}</Message>
                                </TextBox>
                                <Recentime>
                                    {lastMessageTime ? displayTime(lastMessageTime) : ''}
                                </Recentime>
                            </RightBox>
                        </Room>
                    );
                })}
            </RoomList>
        </Wrapper>
    );
};

export default ChatListPage;

export const displayTime = (time: string) => {
    const lastMessageTime = dayjs(time).format('YYYY.MM.MM');
    const currentTime = dayjs(Date.now()).format('YYYY.MM.MM');

    if (lastMessageTime === currentTime) {
        return dayjs(time).format('HH:mm');
    }

    return dayjs(time).format('YYYY.MM.MM');
};
