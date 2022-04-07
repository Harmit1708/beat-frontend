import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  let navigate = useNavigate();

  
  return (
    <div className="sidebar" style={{ marginTop: "53px" }}>
      <span
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </span>
      <span
        onClick={() => {
          navigate("/favriotes");
        }}
      >
        Favorites
      </span>
      <hr></hr>
      <p>Qucik Access</p>
      <span
        onClick={() => {
          navigate("/trending-songs");
        }}
      >
        Trending Songs
      </span>
      <span
        onClick={() => {
          navigate("/new-songs");
        }}
      >
        New Songs
      </span>
      <span
        onClick={() => {
          navigate("/old-songs");
        }}
      >
        Old Songs
      </span>
      <span
        onClick={() => {
          navigate("/album-songs");
        }}
      >
        Album
      </span>

      
    </div>
  );
}

export default Sidebar;
