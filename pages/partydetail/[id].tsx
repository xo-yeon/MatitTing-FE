import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import axios from "axios";
import Layout_Detail from "../../components/layout_detail";
import { NextPageWithLayout } from "../../types/layout";

const partyWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PartyDetail: NextPageWithLayout = () => {
  PartyDetail.getLayout = (page) => {
    return <Layout_Detail>{page}</Layout_Detail>;
  };

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
};

export default PartyDetail;
