// rrd imports
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
  return (
    <main style={{
      // border: "5px solid green",
      height: "100vh", 
       
      // overflowY: "scroll",
      }} >
      <ToastContainer limit={1} />
      <Header />
      <Outlet />
    </main>
  );
}

export default RootLayout;
