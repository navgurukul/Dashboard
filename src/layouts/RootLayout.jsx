// rrd imports
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main>
      {/* MAIN HEADER WILL GO HERE  */}
      <Outlet />
    </main>
  );
}

export default RootLayout;
