import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import axios from "axios";

export default function PartyDetail() {
  const detailfetcher = async () => {
    try {
      const response = await axios.get("url", {
        //params
      });
      return response.data;
    } catch (error) {}
  };

  const { status, data, error } = useQuery("key", detailfetcher);

  const router = useRouter();
  const { id } = router.query;

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return <div css={partyWrap}>{id}</div>;
}

const partyWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
