import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./routes/Home";
import Account from "./routes/Account";
import Admin from "./routes/Admin";
import Ads from "./routes/Ads";
import Logout from "./routes/Logout";
import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "ads",
        element: <Ads />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(

  <RouterProvider router={router} />

);