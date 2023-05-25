// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import PartnerLayout from "./layouts/PartnerLayout";

// pages
import LoginPage from "./pages/login/LoginPage";
import PartnersListPage from "./pages/partners/PartnersList/PartnersListPage";
import PartnerPage from "./pages/partners/Partner/PartnerPage";
import theme from "./theme/theme";
// import BatchPage from "./pages/partners/Batch/BatchPage";
import CreateSpace from "./components/Partner/CreateSpace";

import CreateBatch from "./components/Partner/CreateBatch";
import BatchPage from "./pages/partners/Batch/BatchPage";
import StudentList from "./components/StudentList/StudentList";
import AttandanceList from "./components/AttandanceList/AttandanceList";
import { ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { index: true, element: <PartnersListPage /> },
      {
        path: "partner/:partnerId",
        element: <PartnerPage />,
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
