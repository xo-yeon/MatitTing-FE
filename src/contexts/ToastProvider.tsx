import React, { createContext, PropsWithChildren } from "react";
import Toast from "../component/common/Toast";
import useToast from "src/hooks/useToast";
import { ToastProps } from "types/toast";

export const ToastContext = createContext({
  showToast(props: ToastProps) {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const { isOpenToast, option, showToast } = useToast();
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isOpenToast && <Toast {...option} />}
    </ToastContext.Provider>
  );
};
