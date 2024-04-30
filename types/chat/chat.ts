export interface ChatMessageResponse {
    responseChatDtoList: {
        chatId: number;
        senderId: number;
        nickname: string;
        message: string;
        createAt: string;

        userNickname: string;
    }[];
    pageInfo: {
        lastPartyId: number;
        hasNext: boolean;
    };
}
