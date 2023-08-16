import { useContext } from "react";
import { ToastContext } from "src/contexts/ToastProvider";

function SimpleComponent() {
  const { showToast } = useContext(ToastContext);

  const handleClick = () => {
    showToast({ message: "test", type: "info", time: 2 });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast!</button>
    </div>
  );
}

export default SimpleComponent;
