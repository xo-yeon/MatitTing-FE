import { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import NavList from "./navList";

export default function Bottombar() {
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
    <div css={navCSS}>
      {navList.map((e, i) => {
        return (
          <NavList
            title={e.title}
            href={e.href}
            key={i}
            selected={pageIndex === i || findIndex() === i}
            onClick={() => setPageIndex(i)}
          />
        );
      })}
    </div>
  );
}

const navList = [
  {
    title: "홈",
    href: "/",
    regex: /^\/$/,
  },
  {
    title: "파티 생성",
    href: "/create",
    regex: /^\/create/,
  },
  {
    title: "검색",
    href: "/search",
    regex: /^\/search/,
  },
  {
    title: "프로필",
    href: "/profile",
    regex: /^\/profile/,
  },
];

const navCSS = css`
  border-top: 1px solid #bbbbbb;
  width: 768px;
  height: 100px;
  display: flex;
  position: absolute;
  bottom: 0;
`;
