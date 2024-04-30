export interface ChatRoomsResponse {
    responseChatRoomDtoList: {
        roomId: string;
        title: string;
        lastUpdate: string;
        lastMessage: string;
        lastMessageTime: string;
        thumbnail: string;
    }[];
    pageInfo: {
        lastPartyId: number;
        hasNext: boolean;
    }[];
}

export interface ChatRoomInfoResponse {
    chatRoomId: number;
    title: string;
    masterId: number;
    partyId: number;
}
export interface ChatUserListResponse {
    chatUserId: number;
    leader: boolean;
    role: string;
    nickname: string;
    userProfileImg: string;
}
