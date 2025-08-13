import React from 'react'
import { createBrowserRouter} from 'react-router-dom'
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Options from "../pages/Options";

const AstroRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/options",
        element: <Options />,
      },

    ],
  },
]);
export default AstroRouter;
