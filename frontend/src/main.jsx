import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import Home from "./components/Home.jsx";
import Resource from "./components/Resource.jsx";
import Students from "./components/Students.jsx";
import Gallery from "./components/Gallery.jsx";
import Profile from "./components/Profile.jsx";
import Loading from "./Shared Component/Loading.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/materials",
        element: <Resource />,
      },
      {
        path: "/students",
        hydrateFallbackElement: <Loading />,
        element: <Students />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/resource",
        element: <Resource />,
      },
      {
        path: "/students/:id",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />,
    </QueryClientProvider>
  </StrictMode>
);
