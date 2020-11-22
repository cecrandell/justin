import React from "react";
import "./style.css";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="nav-item">A Collection of Justins</div>
            <div className="nav-item">{props.message}</div>
            <div className="nav-item">Score: {props.score}</div>
            <div className="nav-item">Top Score: {props.topscore}</div>
        </nav>
    );

}

export default Navbar;
