import React, { createContext, PropsWithChildren } from "react";
import Toast from "../component/common/Toast";
import useToast from "src/hooks/useToast";
import { ToastOption } from "types/toast";

export const ToastContext = createContext({
  showToast(message: string, option?: ToastOption) {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const { isOpenToast, message, option, showToast } = useToast();
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isOpenToast && <Toast message={message} option={option} />}
    </ToastContext.Provider>
  );
};
