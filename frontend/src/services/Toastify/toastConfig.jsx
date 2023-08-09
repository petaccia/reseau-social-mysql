import { toast } from "react-toastify";

const toastSuccess = (message) => {
  toast.dismiss();
  toast.success(message, {
    style: {
      top: "150px",
      right: "100px",
      boxShadow: "5px 5px 10px green",
      backgroundColor: "#10131e",
      color: "green",
    },
  });
};

const toastError = (message) => {
  toast.dismiss();
  toast.error(message, {
    style: {
      top: "150px",
      right: "100px",
      boxShadow: "5px 5px 10px red",
      backgroundColor: "#10131e",
      color: "red",
    },
  });
};

const toastWarning = (message) => {
  toast.dismiss();
  toast.warning(message, {
    style: {
      top: "150px",
      right: "100px",
      boxShadow: "5px 5px 10px yellow",
      backgroundColor: "#10131e",
      color: "yellow",
    },
  });
};

const toastInfo = (message) => {
  toast.dismiss();
  toast.info(message, {
    style: {
      top: "150px",
      right: "100px",
      boxShadow: "5px 5px 10px #2f84eb",
      backgroundColor: "#10131e",
      color: "#2f84eb",
    },
  });
};

const toastNonLu = (message) => {
  toast.dismiss();
  toast.error(message, {
    style: {
      top: "150px",
      right: "100px",
      boxShadow: "5px 5px 10px #E25c5c",
      backgroundColor: "#10131e",
      color: "#E25c5c",
    },
  });
};

export { toastSuccess, toastError, toastWarning, toastInfo, toastNonLu };
