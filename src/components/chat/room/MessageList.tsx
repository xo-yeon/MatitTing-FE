import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { displayTime } from '../list/ChatRoomList';
import { ChatMessagesType } from 'types/chat/chat';

const List = styled.ul`
    padding: 0 2rem;
    margin: 0 auto;
    list-style: none;
    width: 100%;
    height: calc(100vh - 119px);
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
`;

const ListItem = styled.li<{ userCheck?: string }>`
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.userCheck === 'me' ? 'row-reverse' : 'row')};
    margin: 1rem 0;
`;

const ImageBox = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const MessageBox = styled.div<{ userCheck?: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${(props) => (props.userCheck === 'me' ? '#efebec' : '#efebec')};
    border-radius: 10px;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NickName = styled.p<{ userCheck?: string }>`
    margin-top: 0;
    margin-bottom: ${(props) => (props.userCheck === 'me' ? 0 : '10px')};
    font-size: 18px;
    font-weight: bold;
`;

const Message = styled.p<{ userCheck?: string }>`
    margin: 0;
    color: ${(props) => (props.userCheck === 'me' ? '#fff' : '#000')};
`;

const ReadMark = styled.div<{ userCheck?: string }>`
    margin-left: ${(props) => (props.userCheck === 'me' ? '15px' : '0px')};
    margin-right: ${(props) => (props.userCheck === 'me' ? ' 0px' : '15px')};
    align-self: flex-end;
    color: rosybrown;
`;

const NotMessage = styled.div`
    margin: 2rem auto;
`;

interface MessageListProps {
    messages: ChatMessagesType[];
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <List>
            {messages.map(({ message, nickname, createAt }, index) => {
                return nickname ? (
                    <ListItem key={nickname} userCheck={String(index)}>
                        {/* {img && <ImageBox></ImageBox>} */}
                        <MessageBox userCheck={String(index)}>
                            <TextBox>
                                <NickName userCheck={String(index)}>{nickname}</NickName>
                                <Message>{message}</Message>
                            </TextBox>
                        </MessageBox>
                        <ReadMark>{createAt ? displayTime(String(createAt)) : ''}</ReadMark>
                    </ListItem>
                ) : (
                    <NotMessage>{message}</NotMessage>
                );
            })}
        </List>
    );
};

MessageList.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default MessageList;
