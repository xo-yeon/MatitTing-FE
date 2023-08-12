import { css } from "@emotion/react";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  selected?: boolean;
  id: string;
  onClick?: () => void;
}

const PartyList = (props: IProps) => {
  const router = useRouter();

  const partyListCSS = css`
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      background-color: #dddddd;
    }
  `;

  return (
    <div
      css={partyListCSS}
      onClick={() => {
        router.push(`partydetail/${props.id}`);
      }}
    >
      <p>{props.title}</p>
    </div>
  );
};

export default PartyList;
