import variableAssignMent from '@utils/variableAssignment';
import defaultRequest from 'src/lib/axios/defaultRequest';

interface ChatUserParams {
    roomId: string;
    targetChatUserId: number;
}

export const API_DELETE_CHAT_USER_KEY =
    '/api/chat/{{roomId}}?targetChatUserId={{targetChatUserId}}';

const deletePartyUser = async ({ roomId, targetChatUserId }: ChatUserParams) => {
    await defaultRequest.delete(
        variableAssignMent(API_DELETE_CHAT_USER_KEY, {
            roomId,
            targetChatUserId: String(targetChatUserId),
        }),
    );
};

export default deletePartyUser;
