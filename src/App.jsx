// rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import PartnerLayout from "./layouts/PartnerLayout";

// pages
import PartnersListPage from "./pages/partners/PartnersList/PartnersListPage";
import LoginPage from "./pages/login/LoginPage";
import PartnerPage from "./pages/partners/Partner/PartnerPage";
import GroupPage from "./pages/partners/Group/GroupPage";

//components
import theme from "./theme/theme";
import CreateGroup from "./components/Partner/Group/CreateGroup";
import CreateSpace from "./components/Partner/Space/CreateSpace";
import BatchPage from "./pages/partners/Batch/BatchPage";
import StudentList from "./components/StudentList/StudentList";
import AttandanceList from "./components/AttandanceList/AttandanceList";
import StudentInfo from "./components/StudentInfo/StudentInfo";

// library
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
          { path: "space/:spaceId", element: <CreateGroup />},
          { path: "space/:spaceId/group/:groupId", element: <GroupPage />, },
          {
            path: "space/:spaceId/group/:groupId/batch",
            element: <BatchPage />,
            children: [
              { index: true, element: <StudentList /> },
              { path: "attandancelist", element: <AttandanceList /> },
            ],
          },
          { path: "space/:spaceId/group/:groupId/batch/studentinfo", element: <StudentInfo/> },
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
