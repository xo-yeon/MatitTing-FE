import { useRef, useState } from "react";
import { ToastOption } from "types/toast";

const useToast = () => {
  const [message, setMessage] = useState<string>("");
  const [option, setOption] = useState<ToastOption>({});
  const [isOpenToast, setIsOpenToast] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = (
    message: string,
    option?: ToastOption // Make options parameter optional
  ) => {
    const { type = "info", time = 3 } = option || {}; // Set default values if options is not provided
    setIsOpenToast(true);
    setMessage(message);
    setOption({ type, time });

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setMessage("");
      setOption({});
    }, time * 1000);
    toastTimer.current = timer;
  };

  return { isOpenToast, message, option, showToast };
};

export default useToast;
