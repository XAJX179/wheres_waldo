import App from "./App";
import Game from "./components/Game";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
