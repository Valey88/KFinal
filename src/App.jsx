import { useState } from "react";
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
import { jwtDecode } from "jwt-decode";
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
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Booking",
        element: <Booking />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);
const authRouterAdmin = createBrowserRouter([
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
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Booking",
        element: <Booking />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/CreateRooms",
        element: <CreateRooms />,
      },
      {
        path: "/DeleteImage",
        element: <DeleteImage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);
function App() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookie = parts.pop().split(";").shift();
      const decodedCookie = decodeURIComponent(cookie);
      return decodedCookie;
    }
    return null;
  };

  // Получаем accessToken из cookie
  const accessToken = getCookie("accesstoken");

  let decodedToken = null;
  let userId = null;

  if (accessToken) {
    const tokenParts = accessToken.split(" ");
    if (tokenParts[0] === "Bearer" && tokenParts[1]) {
      const token = tokenParts[1];

      // Декодируем токен
      decodedToken = jwtDecode(token);

      // Получаем userId из декодированного токена
      userId = decodedToken ? decodedToken.id : null;
    } else {
      console.log("Некорректный формат токена");
    }
  } else {
    console.log("Токен не найден");
  }
  return decodedToken ? (
    userId === "3d060c38-53e7-467d-96bf-6cac69cc6ba7" ? (
      <RouterProvider router={authRouterAdmin} />
    ) : null
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
