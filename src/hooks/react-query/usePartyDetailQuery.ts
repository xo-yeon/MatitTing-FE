import axios from "axios";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

interface PartyDetailData {
  id: number;
  // 스키마 확정후 추가
}
interface QueryKeyType {
  queryKey: string[];
}

const fetchGetPartyDetailWithId = async ({ queryKey }: QueryKeyType) => {
  const id = queryKey[1];
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/api/party/${id}`
  );
  return data;
};

export const usePartyDetailQuery = (partyId: string) => {
  return useQuery<PartyDetailData, AxiosError, PartyDetailData, string[]>(
    ["party-detail", partyId],
    fetchGetPartyDetailWithId
  );
};
