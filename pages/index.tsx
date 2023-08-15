import { useContext } from "react";
import { ToastContext } from "../src/contexts/ToastProvider";

function SimpleComponent() {
  const { showToast } = useContext(ToastContext);

  const handleClick = () => {
    showToast("토스트가 3초간 띄워집니다.");
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast!</button>
    </div>
  );
}

export default SimpleComponent;
