import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customToast = (options) => (message) => {
  toast(message, options);
};

export default customToast;
