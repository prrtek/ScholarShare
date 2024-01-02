import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Hero,
  Signup,
  Login,
  Project,
  Error,
  Log,
  Create,
  ProjectDetail,
} from "./components";
import App from "./App.jsx";

import "./index.css";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/create-project",
        element: <Create />,
      },
      {
        path: "/project/:projectId",
        element: <ProjectDetail />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
