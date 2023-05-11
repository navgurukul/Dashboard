// rrd imports
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function RootLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default RootLayout;
