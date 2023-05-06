// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import SpaceLayout from "./layouts/SpaceLayout";

// pages
import LoginPage from "./pages/login/LoginPage";
import PartnersListPage from "./pages/partners/PartnersList/PartnersListPage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import BatchPage from "./pages/partners/Batch/BatchPage";
import PartnerSpacePage from "./pages/partners/PartnerSpace/PartnerSpacePage";
import PartnerSpaceDefault from "./components/PartnerSpace/SpaceDefault";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersListPage /> },
      {
        path: "partnerspace/:partnerId",
        element: <PartnerSpacePage />,
        children: [
          { index: true, element: <PartnerSpaceDefault /> },
          { path: "batch", element: <BatchPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
