import { ReactNode } from "react";
import { GetServerSideProps } from "next";
import QuerySuspenseErrorBoundary from "@components/hoc/QuerySuspenseErrorBoundary";
import ChatRoom from "@components/chat/room/ChatRoom";

interface ChatRoomPageProps {
  roomId: string;
}

const ChatRoomPage = ({ roomId }: ChatRoomPageProps) => (
  <QuerySuspenseErrorBoundary>
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
