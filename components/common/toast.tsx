import { toast } from "react-toastify";

interface IProps {
  content: string;
  type: string;
}

const Toast = (props: IProps) => {
  switch (props.type) {
    case "info":
      return toast.info(props.content, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    case "warn":
      return toast.warn(props.content, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
};

export default Toast;

// 공식문서
// https://fkhadra.github.io/react-toastify/introduction/
