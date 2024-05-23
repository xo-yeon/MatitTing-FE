import defaultRequest from 'src/lib/axios/defaultRequest';
import { ChatMessageResponse, ChatMessagesType } from 'types/chat/chat';

type InfinitePaginationDataType<K extends string, T> = {
    [key in K]: T[];
} & {
    pageInfo: {
        page: number;
        hasNext: boolean;
    };
};

interface ChatMessageParams {
    roomId: string;
    page: number;
}

export const API_GET_CHAT_MESSAGE_KEY = '/api/chat/{{roomId}}?page={{page}}';

const getChatMessage = async ({ roomId, page }: ChatMessageParams) => {
    const { data } = await defaultRequest.get<
        InfinitePaginationDataType<'responseChatDtoList', ChatMessagesType>
    >(`/api/chat/${roomId}`, { params: { page, size: 5 } });

    return data;
};

export default getChatMessage;
