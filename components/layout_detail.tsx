import styled from "@emotion/styled";

const Window = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const App = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
`;

// 단순 bottombar 제거

const Layout_Detail = ({ children }) => {
  return (
    <Window>
      <App>{children}</App>
    </Window>
  );
};

export default Layout_Detail;
