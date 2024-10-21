import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./components/App.tsx";
import { Home } from "./components/Home.tsx";
import { Playground } from "./components/Playground.tsx";
import { Expression } from "./components/Expression.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "playground", element: <Playground /> },
        { path: "e/:slug", element: <Expression /> },
      ],
    },
  ],
  {
    basename: process.env.GITHUB_ACTIONS_BASE ?? "/",
  },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
