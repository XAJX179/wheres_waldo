import { useEffect, useState } from "react";
import { Link } from "react-router";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    fetch("http://xajx.alwaysdata.net/wheres_waldo/leaderboards", {
      headers: {
        accept: "application/json",
        "upgrade-insecure-requests": "1",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((res) => {
      res.json().then((result) => {
        setLeaderboard(result);
      });
    });
  }, []);
  if (leaderboard !== null && leaderboard.length !== 0) {
    let list = leaderboard.map((record) => {
      return (
        <li key={record.id}>
          <p>{record.name}</p>
          <p>{record.time}</p>
        </li>
      );
    });
    return (
      <main>
        <Link to="/">New Game</Link>
        <h2>Leaderboard TOP 20</h2>
        <ul>{list}</ul>
      </main>
    );
  } else {
    return (
      <div>
        <Link to="/">New Game</Link>
        <p>Empty Leaderboard</p>
      </div>
    );
  }
}

export default Leaderboard;
