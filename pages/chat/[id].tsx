import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import ChatRoom from '@components/chat/room/ChatRoom';
import ProfileLoading from '@components/profile/ProfileLoading';

interface ChatRoomPageProps {
    roomId: string;
}

const ChatRoomPage = ({ roomId }: ChatRoomPageProps) => (
    <QuerySuspenseErrorBoundary suspenseFallback={<ProfileLoading />}>
        <ChatRoom roomId={roomId} />
    </QuerySuspenseErrorBoundary>
);

ChatRoomPage.getLayout = (page: ReactNode) => {
    return <>{page}</>;
};

export default ChatRoomPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id: roomId } = params as { id: string };

    return {
        props: { roomId },
    };
};
