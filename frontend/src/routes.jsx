import App from "./App";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
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
  {
    path: "leaderboard",
    element: <Leaderboard />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
