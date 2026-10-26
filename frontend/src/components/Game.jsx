import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

function Game() {
  const targetBox = useRef(null);
  const image = useRef(null);
  const [characters, setCharacters] = useState(null);
  const [coords, setCoords] = useState(null);
  const [csrf, setCsrf] = useState(null);

  let navigate = useNavigate();
  let x, y;

  if (coords) {
    x = JSON.parse(coords).x;
    y = JSON.parse(coords).y;
  }

  useEffect(() => {
    fetch("https://xajx.alwaysdata.net/wheres_waldo/characters", {
      headers: {
        accept: "application/json",
        "upgrade-insecure-requests": "1",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((res) => {
      res.json().then((result) => {
        setCharacters(result);
        setCsrf(res.headers.get("x-csrf-token"));
      });

      fetch("https://xajx.alwaysdata.net/wheres_waldo/game_sessions", {
        headers: {
          accept: "application/json",
          "upgrade-insecure-requests": "1",
          "x-csrf-token": res.headers.get("x-csrf-token"),
        },
        method: "POST",
        mode: "cors",
        credentials: "include",
      }).then((res) => {
        setCsrf(res.headers.get("x-csrf-token"));
      });
    });
  }, []);

  if (characters && characters.length == 0) {
    return (
      <main>
        <p>Game Finished!</p>
        <form onSubmit={handleLeaderboardForm}>
          <div>
            <label htmlFor="name">Submit name for leaderboard: </label>
            <input type="text" name="name" id="name" required />
          </div>
          <input type="submit" />
        </form>
        <Link to="/">New Game</Link>
      </main>
    );
  }
  let characterList;
  if (characters) {
    characterList = characters.map((e) => (
      <li key={e.serial_no}>
        <button onClick={() => handleCharacterClick(e.serial_no)}>
          {e.name}
        </button>
      </li>
    ));
  }
  return (
    <main>
      <div className="map-container">
        <dialog
          ref={targetBox}
          className="target-box"
          onClick={handleDialogClick}
        >
          <div className="target-content">
            <ul>{characterList}</ul>
          </div>
        </dialog>
        <div className="img-preview">
          <img
            ref={image}
            onClick={handleImageClick}
            src="/wheres_waldo/wheres_waldo_department-store.webp"
            alt="where's waldo game map"
          />
          {/* <p className="mark" style={{ top: "100px", left: "100px" }}> */}
          {/*   📍 */}
          {/* </p> */}
          {/* <p className="mark" style={{ top: "100px" }}> */}
          {/*   📍 */}
          {/* </p> */}
        </div>
      </div>
    </main>
  );

  function handleImageClick(e) {
    let mapContainer = e.target.parentElement.parentElement;
    let containerHeight = mapContainer.clientHeight;
    let containerWidth = mapContainer.clientWidth;
    targetBox.current.showModal(); // need this call before getting the height and width
    let dialogHeight = targetBox.current.clientHeight;
    let dialogWidth = targetBox.current.clientWidth;
    let maxX = containerWidth + mapContainer.offsetLeft - dialogWidth;
    let maxY = containerHeight + mapContainer.offsetTop - dialogHeight;
    if (e.clientX > maxX) {
      targetBox.current.style.left = `${maxX}px`;
    } else {
      targetBox.current.style.left = `${e.clientX}px`;
    }
    if (e.clientY > maxY) {
      targetBox.current.style.top = `${maxY}px`;
    } else {
      targetBox.current.style.top = `${e.clientY}px`;
    }
    let coords = getCoordinates(e);
    let json = JSON.stringify(coords);
    setCoords(json);
  }

  function handleDialogClick(e) {
    // Clicks on the target-content wrapper or its children will have e.target as the wrapper/child, not the dialog. Thus, the dialog won’t close.
    // Clicks on the backdrop (the area outside target-content) will have e.target as the dialog, triggering close().
    if (e.target === targetBox.current) {
      targetBox.current.close();
    }
  }

  function getCoordinates(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.pageX - rect.x;
    let y = e.pageY - rect.y;
    return { x: x.toFixed(2), y: y.toFixed(2) };
  }

  function handleCharacterClick(serial_no) {
    //  TODO: ask the server if this serial_no character is located where the current coords is clicked
    fetch("https://xajx.alwaysdata.net/wheres_waldo/characters/" + serial_no, {
      headers: {
        accept: "application/json",
        "upgrade-insecure-requests": "1",
        "x-csrf-token": csrf,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ x: x, y: y }),
    }).then((res) => {
      console.log(res);
      if (res.status === 204) {
        // error message
        //    display message that selected character was not found at this coord.
      } else if (res.status === 205) {
        // game end
        setCharacters([]);
      } else if (res.status === 200) {
        res.json().then((result) => {
          console.log(result);
          //    mark it as found
          let mark = document.createElement("p");
          mark.classList.add("mark");
          mark.style.top = y + "px";
          mark.textContent = "📍";
          mark.style.left = x - 10 + "px";
          image.current.after(mark);
          targetBox.current.close();
          //    no longer show in list
          let remaining_characters = characters.filter(
            (e) => e.serial_no !== result.serial_no,
          );
          setCharacters(remaining_characters);
          setCsrf(res.headers.get("x-csrf-token"));
        });
      }
    });
    console.log(serial_no);
  }

  function handleLeaderboardForm(e) {
    e.preventDefault();

    fetch("https://xajx.alwaysdata.net/wheres_waldo/leaderboards", {
      headers: {
        accept: "application/json",
        "upgrade-insecure-requests": "1",
        "x-csrf-token": csrf,
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ name: e.target.name.value }),
    }).then((res) => {
      setCsrf(res.headers.get("x-csrf-token"));
      navigate("/leaderboard");
    });
  }
}

export default Game;
