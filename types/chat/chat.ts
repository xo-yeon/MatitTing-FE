export interface ChatMessageResponse {
    responseChatDtoList: ChatMessagesType[];
    pageInfo: {
        page: number;
        hasNext: boolean;
    };
}

export type ChatMessagesType = {
    chatId: string;
    createAt: string;
    imgUrl: string;
    message: string;
    nickname: string;
    senderId: number;
};
