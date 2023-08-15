import styled from "@emotion/styled";

interface ToastProps {
  message: string;
}
const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 90px;
  margin-left: -160px;

  display: flex;
  width: 320px;
  padding: 12px 8px 12px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--neutral-white, #fff);
  box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.2);
`;

const Toast = ({ message }: ToastProps) => {
  return <Container>{message}</Container>;
};

export default Toast;
