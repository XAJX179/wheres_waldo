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
          src="../../public/wheres_waldo_department-store.webp"
          alt="where's waldo game map"
        />
      </div>
    </main>
  );

  function handleImageClick(e) {
    let coords = getCoordinates(e);
    console.log(coords);
    let json = JSON.stringify(coords);
    console.log(json);
    targetBox.current.showModal();
    targetBox.current.style.left = `${e.clientX}px`;
    targetBox.current.style.top = `${e.clientY}px`;
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
