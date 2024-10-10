import { useState, useEffect } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./page/Home/Home";
import Admin from "./page/Admin/Admin";
import Booking from "./page/Booking/Booking";
import CreateRooms from "./page/Admin/createRooms/CreateRooms";
import DeleteImage from "./page/Admin/deleteRoomsImage/DeleteImage";
import Auth from "./page/Admin/Auth/Auth";
import adminStore from "./store/adminStore";
import EditRoom from "./page/Admin/editRoom/editRoom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const checkUserAuth = () => {
  const accessToken = getCookie("accesstoken");
  if (accessToken) {
    localStorage.setItem("userRole", "Admin");
    return true;
  }
  localStorage.removeItem("userRole");
  return false;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const checkUserRole = adminStore((state) => state.checkUserRole);

  useEffect(() => {
    checkUserRole();
  }, [checkUserRole]);

  const youAdmin = adminStore((state) => state.userRole) === "Admin";

  useEffect(() => {
    const authStatus = checkUserAuth();
    setIsAdmin(authStatus);
  }, []);

  const commonRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "/auth",
      element: isAdmin ? <Navigate to="/" /> : <Auth />,
    },
  ];

  const adminRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "/auth",
      element: isAdmin ? <Navigate to="/" /> : <Auth />,
    },
    {
      path: "/admin",
      element: isAdmin ? <Admin /> : <Navigate to="/admin" />,
    },
    {
      path: "/createRooms",
      element: isAdmin ? <CreateRooms /> : <Navigate to="/createRooms" />,
    },
    {
      path: "/deleteImage",
      element: isAdmin ? <DeleteImage /> : <Navigate to="/deleteImage" />,
    },
    {
      path: "/editRoom/:id",
      element: isAdmin ? (
        <EditRoom />
      ) : (
        <div>У вас нет доступа к данной странице</div>
      ),
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        ...commonRoutes,
        ...adminRoutes,
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
