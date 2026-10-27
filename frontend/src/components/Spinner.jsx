import { Link } from "react-router";

function Spinner() {
  return (
    <div>
      <div className="loader"></div>
      <p>
        <i>
          If loading takes long try clicking again in a minute or{" "}
          <Link to="/">Start again</Link>
        </i>
      </p>
    </div>
  );
}
export default Spinner;
