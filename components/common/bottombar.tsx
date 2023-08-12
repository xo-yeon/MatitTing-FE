import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import NavList from "./navList";

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

const Bottombar = () => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState<number | null>(null);

  const findIndex = useCallback(() => {
    const index = navList.findIndex((e) => e.regex.test(router.pathname));
    if (index === -1) {
      if (pageIndex === null) {
        return 0;
      } else {
        return pageIndex;
      }
    } else {
      return index;
    }
  }, [pageIndex, router]);

  useEffect(() => {
    setPageIndex(findIndex());
  }, [findIndex]);

  return (
    <Container>
      <NavContainer>
        {navList.map((e, i) => {
          return (
            <NavList
              title={e.title}
              icon={e.icon}
              href={e.href}
              key={i}
              selected={pageIndex === i || findIndex() === i}
              onClick={() => setPageIndex(i)}
            />
          );
        })}
      </NavContainer>
    </Container>
  );
};

export default Bottombar;

const navList = [
  {
    title: "홈",
    icon: "home",
    href: "/",
    regex: /^\/$/,
  },
  {
    title: "파티 생성",
    icon: "add_box",
    href: "/create",
    regex: /^\/create/,
  },
  {
    title: "검색",
    icon: "search",
    href: "/search",
    regex: /^\/search/,
  },
  {
    title: "프로필",
    icon: "person",
    href: "/profile",
    regex: /^\/profile/,
  },
];
