import { useRef, useState } from "react";
import { ToastProps } from "types/toast";

const useToast = () => {
  const [option, setOption] = useState<any>(null);
  const [isOpenToast, setIsOpenToast] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout>();

  const showToast = ({ message, type = "info", time = 3 }: ToastProps) => {
    setIsOpenToast(true);
    setOption({ message, type, time });

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    const timer = setTimeout(() => {
      setIsOpenToast(false);
      setOption(null);
    }, time * 1000);
    toastTimer.current = timer;
  };

  return { isOpenToast, option, showToast };
};

export default useToast;
