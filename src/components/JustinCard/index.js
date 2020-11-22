import React from "react";
import "./style.css";

function JustinCard(props) {
  return (
      <div className="img-container">
        <img alt={props.name} src={props.image} onClick={() => props.checkJustin(props.id)}/>
    </div>
  );
}

export default JustinCard;
