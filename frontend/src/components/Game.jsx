import { useRef } from "react";

function Game() {
  const targetBox = useRef(null);

  return (
    <main>
      <div className="map-container">
        <dialog
          ref={targetBox}
          className="target-box"
          onClick={handleDialogClick}
        >
          <div className="target-content">
            <p>hello</p>
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
    let maxX = containerWidth - dialogWidth;
    let maxY = containerHeight - dialogHeight;
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
    console.log(json);
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
    return { x: x, y: y };
  }
}

export default Game;
