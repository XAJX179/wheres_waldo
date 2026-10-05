import { useEffect, useRef, useState } from "react";

function Game() {
  const targetBox = useRef(null);
  const [characters, setCharacters] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/characters/index", {
      headers: {
        accept: "application/json",
        "upgrade-insecure-requests": "1",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((res) => {
      res.json().then((result) => {
        console.log(result);
        setCharacters(result);
      });
    });
  }, []);

  let x, y;
  if (coords) {
    x = JSON.parse(coords).x;
    y = JSON.parse(coords).y;
  }

  let characterList;
  if (characters) {
    characterList = characters.map((e) => (
      <li key={e.serial_no}> {e.name} </li>
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
            {x} {y} {characterList}
          </div>
        </dialog>
        <img
          onClick={handleImageClick}
          src="/wheres_waldo_department-store.webp"
          alt="where's waldo game map"
        />
      </div>
    </main>
  );

  function handleImageClick(e) {
    let mapContainer = e.target.parentElement;
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
}

export default Game;
