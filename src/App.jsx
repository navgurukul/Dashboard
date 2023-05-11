// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import LoginPage from "./pages/login/LoginPage";
import PartnersPage from "./pages/partners/PartnersList/PartnersList";
import PartnersCreationOfSpace from "./pages/partners/PartnerSpace/PartnersCreationOfSpace";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersPage /> },
      { path: "partnerspace/:id", element: <PartnersCreationOfSpace /> },
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
