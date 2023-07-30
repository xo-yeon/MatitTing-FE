import { css } from "@emotion/react";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  selected?: boolean;
  href: string;
  onClick?: () => void;
}

export default function NavList(props: IProps) {
  const router = useRouter();

  const navListCSS = css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: ${props.selected && "red"};
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      background-color: #dddddd;
    }
  `;

  return (
    <div
      css={navListCSS}
      onClick={() => {
        router.push(props.href);
        props.onClick;
      }}
    >
      <p>{props.title}</p>
    </div>
  );
}
