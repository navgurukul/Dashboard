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
import StudentInfo from "./components/StudentInfo/StudentInfo";

// library
import { ThemeProvider } from "@mui/material";
import StudentFilter from "./components/StudentList/StudentFilter";
import AttendanceFilter from "./components/AttendanceList/AttendanceFilter";

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
          { path: "space/:spaceId", element: <CreateGroup /> },
          { path: "space/:spaceId/group/:groupId", element: <GroupPage /> },
          {
            path: "space/:spaceId/group/:groupId/batch/:batchId",
            element: <BatchPage />,
            children: [
              { index: true, element: <StudentFilter/> },
              { path: "attendancelist", element: <AttendanceFilter /> },
            ],
          },
          {
            path: "space/:spaceId/group/:groupId/batch/:batchId/studentinfo/:studentId",
            element: <StudentInfo />,
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
