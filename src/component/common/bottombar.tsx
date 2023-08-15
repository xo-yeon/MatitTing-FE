import styled from "@emotion/styled";
import NavList from "./Navlist";

const Container = styled.div`
  width: 768px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #dddddd;
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
  },
  {
    title: "파티 생성",
    href: "/create",
  },
  {
    title: "검색",
    href: "/search",
  },
  {
    title: "프로필",
    href: "/profile",
  },
];

const Bottombar = () => (
  <Container>
    <NavContainer>
      {navList.map(({ title, href }, index) => (
        <NavList key={index} title={title} href={href} />
      ))}
    </NavContainer>
  </Container>
);

export default Bottombar;
