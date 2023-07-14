import { toast } from "react-toastify";

function showToast(type, message) {
  toast[type](message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}
export default showToast;
