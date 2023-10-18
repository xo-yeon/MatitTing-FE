import CreateIcon from "@components/icons/bottombar/Create.icon";
import HomeIcon from "@components/icons/bottombar/Home.icon";
import ProfileIcon from "@components/icons/bottombar/Profile.icon";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import ChatIcon from "@components/icons/bottombar/Chat.icon";
import styled from "@emotion/styled";
import NavList from "./NavList";

const Container = styled.div`
  width: 768px;
  display: flex;
  justify-content: center;
  position: absolute;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  z-index: 999;
  background-color: white;
`;

const NavContainer = styled.div`
  width: 390px;
  height: 75px;
  display: flex;
  padding: 0px 30px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const navList = [
  {
    title: "홈",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "검색",
    href: "/search",
    icon: SearchIcon,
  },
  {
    title: "파티 생성",
    href: "/create",
    icon: CreateIcon,
  },
  {
    title: "파티 채팅",
    href: "/chat",
    icon: ChatIcon,
  },
  {
    title: "프로필",
    href: "/profile",
    icon: ProfileIcon,
  },
];

const BottomBar = () => (
  <Container>
    <NavContainer>
      {navList.map((item) => (
        <NavList key={item.href} item={item} />
      ))}
    </NavContainer>
  </Container>
);

export default BottomBar;