// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import SpaceLayout from "./layouts/SpaceLayout";

// pages
import LoginPage from "./pages/login/LoginPage";
import PartnersList from "./pages/partners/PartnersList";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
// import BatchPage from "./pages/partners/Batch/BatchPage";
import PartnerSpace from "./pages/partners/PartnerSpace";
import CreateSpace from "./components/PartnerSpace/CreateSpace";
import CreateBatch from "./components/PartnerSpace/CreateBatch";
import BatchPage from "./pages/partners/Batch/BatchPage";
import StudentList from "./components/StudentList/StudentList";
import AttandanceList from "./components/AttandanceList/AttandanceList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersList /> },
      {
        path: "partnerspace/:partnerId",
        element: <PartnerSpace />,
        children: [
          { index: true, element: <CreateSpace /> },
          { path: "space/:spaceId", element: <CreateBatch /> },
          {
            path: "batch",
            element: <BatchPage />,
            children: [
              { index: true, element: <StudentList /> },
              { path: "attandance", element: <AttandanceList /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
