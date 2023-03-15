import React from "react";

export default function Die({
  value,
  held,
  handleClickDie
}) {
  const styles = {
    backgroundColor: held ? "#59E391" : "white"
  };
  return (
    <div
      className="die-face"
      onClick={handleClickDie}
      style={styles}
    >
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
