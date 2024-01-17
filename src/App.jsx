import { useState, useEffect } from "react";
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
import Profile from "./components/Header/Profile";
import HomePage from "./pages/home/HomePage";
import RouteProtector from "./components/RouteProtector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteProtector Component={HomePage} />,
  },
  {
    path: "profile",
    element: <RouteProtector Component={Profile} />,
  },
  {
    path: "/partner",
    element: <RouteProtector Component={RootLayout} />,
    // element: <RootLayout />,
    children: [
      { path: "login", element: <RouteProtector Component={LoginPage} /> },
      { index: true, element: <PartnersListPage /> },
      {
        path: ":partnerId",
        element: <RouteProtector Component={PartnerPage} />,
        children: [
          { index: true, element: <RouteProtector Component={CreateSpace} /> },
          {
            path: "space/:spaceId",
            element: <RouteProtector Component={CreateGroup} />,
          },
          {
            path: "space/:spaceId/group/:groupId",
            element: <RouteProtector Component={GroupPage} />,
          },
          {
            path: "space/:spaceId/group/:groupId/batch/:batchId",
            element: <RouteProtector Component={BatchPage} />,
            children: [
              {
                index: true,
                element: <RouteProtector Component={StudentFilter} />,
              },
              {
                path: "attendancelist",
                element: <RouteProtector Component={AttendanceFilter} />,
              },
            ],
          },
          {
            path: "space/:spaceId/group/:groupId/batch/:batchId/studentinfo/:studentId",
            element: <RouteProtector Component={StudentInfo} />,
          },
        ],
      },
    ],
  },
]);

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleIncomingMessage = (event) => {
      if (event.origin !== "https://accounts.navgurukul.org") {
        return;
      }

      const message = event.data;
      if (message.type === "USER_LOGIN") {
        const data = message.payload;
        console.log("Received data:", data);
      }
      setMessage(message.payload);
      localStorage.setItem("token", JSON.stringify(message.payload?.token));
      localStorage.setItem(
        "userData",
        JSON.stringify(message.payload?.userDetails)
      );

      var response = "Message received at meraki";
      event.source.postMessage(response, event.origin);
    };

    window.addEventListener("message", handleIncomingMessage);

    return () => {
      window.removeEventListener("message", handleIncomingMessage);
    };
  }, [message]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
