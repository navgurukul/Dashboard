// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import LoginPage from "./pages/login/LoginPage";
import PartnersPage from "./pages/partners/PartnersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
