import Bottombar from "@components/common/bottombar";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div<{ isVisibleBottom: boolean }>`
  width: 768px;
  position: relative;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  header {
    height: calc(
      ${(props) => (props.isVisibleBottom ? "100vh - 45px" : "100vh")}
    );
    padding: 45px 0 0 0;
    overflow-y: scroll;
  }
`;
const BottomSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isVisibleBottom = useMemo(() => {
    return router.pathname === ("/" || "/search" || "/profile" || "/create");
  }, [router.pathname]);

  return (
    <Container isVisibleBottom={isVisibleBottom}>
      <header>{children}</header>
      {isVisibleBottom ? (
        <BottomSection>
          <Bottombar />
        </BottomSection>
      ) : null}
    </Container>
  );
}

export default Layout;