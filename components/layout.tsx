import { css } from "@emotion/react";
import Bottombar from "./bottombar";

// children ts 오류 원인?

export default function Layout({ children }) {
  return (
    <div css={windowCSS} className="123">
      <div css={appCSS}>
        {children}
        <Bottombar />
      </div>
    </div>
  );
}

const windowCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const appCSS = css`
  width: 768px;
  display: flex;
  flex-direction: column;
`;
