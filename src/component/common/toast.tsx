import styled from "@emotion/styled";
import { ToastProps } from "types/toast";
import Info from "../../assets/icons/toast/info.svg";
import Warn from "../../assets/icons/toast/warn.svg";

interface ToastIconProps {
  type?: string;
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 90px;
  margin-left: -160px;

  display: flex;
  width: 320px;
  height: 64px;
  padding: 20px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: var(--neutral-white, #fff);
  box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.2);
`;

const icons = {
  info: Info,
  warn: Warn,
};

const ToastIcon = ({ type }: ToastIconProps) => {
  const IconComponent = icons[type];
  return <IconComponent />;
};

const Toast = (option: ToastProps) => {
  const { message, type, time } = option;
  return (
    <Container>
      <ToastIcon type={type} />
      {message}
    </Container>
  );
};

export default Toast;
