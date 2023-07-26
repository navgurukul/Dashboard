import { toast } from "react-toastify";

function showToast(type, message, time = 2000) {
  toast[type](message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: time,
  });
}
export default showToast;
