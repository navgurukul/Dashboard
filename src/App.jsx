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
import BatchPage from "./pages/partners/Batch/BatchPage";
import MainContent from "./pages/partners/PartnerSpace/MainContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersPage /> },
      { 
        path: "partnerspace/:id",
        element: <PartnersCreationOfSpace />,
        children:[
          { index:true, element: <MainContent/> },
          { path: "batch", element: <BatchPage/> }
        ] 
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
