import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { shouldNotForwardProp } from '@utils/common';
import { ChatMessagesType } from './ChatRoom';
import { displayTime } from '../list/ChatRoomList';

const List = styled.ul({
    padding: '0 2rem',
    margin: '0 auto',
    listStyle: 'none',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
});

const ListItem = styled(
    'li',
    shouldNotForwardProp('userCheck'),
)<{ userCheck?: string }>(({ userCheck }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: userCheck === 'me' ? 'row-reverse' : 'row',
    margin: '1rem 0',
}));

const ImageBox = styled.div({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
});

const MessageBox = styled(
    'div',
    shouldNotForwardProp('userCheck'),
)<{ userCheck?: string }>(({ userCheck }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: userCheck === 'me' ? '#efebec' : '#efebec',
    borderRadius: '10px',
}));

const TextBox = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const NickName = styled(
    'p',
    shouldNotForwardProp('userCheck'),
)<{ userCheck?: string }>(({ userCheck }) => ({
    marginTop: 0,
    marginBottom: userCheck === 'me' ? 0 : '10px',
    fontSize: '18px',
    fontWeight: 'bold',
}));

const Message = styled(
    'p',
    shouldNotForwardProp('userCheck'),
)<{ userCheck?: string }>(({ userCheck }) => ({
    margin: 0,
    color: userCheck === 'me' ? '#fff' : '#000',
}));

const ReadMark = styled(
    'div',
    shouldNotForwardProp('userCheck'),
)<{ userCheck?: string }>(({ userCheck }) => ({
    marginLeft: userCheck === 'me' ? '15px' : '0px',
    marginRight: userCheck === 'me' ? '0px' : '15px',
    alignSelf: 'flex-end',
    color: 'rosybrown',
}));

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
                        <ReadMark>{createAt ? displayTime(createAt) : ''}</ReadMark>
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
