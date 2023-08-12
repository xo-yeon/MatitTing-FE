import Bottombar from "./common/bottombar";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Layout = ({ children }) => {
  return (
    <Window>
      <App>
        {children}
        <Bottombar />
      </App>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ bottom: "80px" }}
      />
    </Window>
  );
};

export default Layout;
