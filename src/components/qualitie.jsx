import React from "react";

const Qualitie = ({ name, color }) => {
  return <span className={"badge m-2 bg-" + color}>{name}</span>;
};

export default Qualitie;
