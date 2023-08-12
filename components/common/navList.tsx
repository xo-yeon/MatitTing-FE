import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Toast from "./toast";

interface IProps {
  title: string;
  icon: string;
  selected?: boolean;
  href: string;
  onClick?: () => void;
}

const NavList = (props: IProps) => {
  const Container = styled.div`
    display: flex;
    width: 64px;
    height: 64px;
    flex-direction: column;
    border-radius: 8px;
    gap: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s;
    p {
      font-size: 12px;
    }
    &:hover {
      background-color: #dddddd;
    }
    .material-symbols-rounded {
      font-variation-settings: "FILL" ${props.selected ? "1" : "0"}, "wght" 400,
        "GRAD" 200, "opsz" 48;
    }
  `;

  const router = useRouter();

  return (
    <Container
      onClick={() => {
        router.push(props.href);
        props.onClick;
        Toast({ content: "test", type: "info" });
      }}
    >
      <span className="material-symbols-rounded">{props.icon}</span>
      <p>{props.title}</p>
    </Container>
  );
};

export default NavList;
