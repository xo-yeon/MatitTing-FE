import { useQuery } from "react-query";
import { css } from "@emotion/react";
import axios from "axios";

export default function Profile(props) {
  const profilefetcher = async () => {
    try {
      const response = await axios.get("url", {
        //params
      });
      return response.data;
    } catch (error) {}
  };

  const { status, data, error } = useQuery("key", profilefetcher);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return <div css={profileWrap}></div>;
}

const profileWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
