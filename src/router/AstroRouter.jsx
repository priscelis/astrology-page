
import { createBrowserRouter} from 'react-router-dom'
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Options from "../pages/Options";
import AllCards from '../pages/AllCards.jsx';
import SeeOneCard from "../pages/SeeOneCard.jsx"
import SeeThreeCards from "../pages/SeeThreeCards.jsx";

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
        path: "/options/:nombre",
        element: <Options />,
      },
      {
        path: "/allcards",
        element: <AllCards/>
      },
      {
        path:`/cardmeaning/:id`,
        element: <SeeOneCard/> 
      },
      {
        path: "/past-present-future",
        element: <SeeThreeCards/>
      },
    ],
  },
]);
export default AstroRouter;
