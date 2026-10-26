function CharacterCards({ characters }) {
  return (
    <ul className="cards">
      {characters.map((e) => {
        return (
          <li key={e.serial_no}>
            <img src={"/wheres_waldo/" + e.name + ".webp"} alt="" />
            <p>{e.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
export default CharacterCards;
