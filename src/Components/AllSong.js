import React, { useContext } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { beatWithMusicContext } from "../App";
import Player from "./Player";
import axios from "axios";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { OverlayTrigger, Tooltip, Button, Image } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
function AllSong() {
  let context = useContext(beatWithMusicContext);

  return (
    <>
    <Header />
      <Sidebar></Sidebar>
      <div className="scroll-manage" style={{ marginLeft: "290px" }}>
        <div style={{ marginTop: "35px" }}>
          <span
            className="ml-2  fw-bold"
            style={{ fontSize: "25px", letterSpacing: "1px" }}
          >
            All Songs
          </span>
          <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2">Play All</Tooltip>}
              >
                {({ ref, ...triggerHandler }) => (
                  <Button
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      if (
                        context &&
                        context?.allSong &&
                        context?.allSong?.length
                      ) {
                        context.dt = context?.allSong;
                        context.setDt(context?.dt);
                      }
                    }}
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center"
                  >
                    <Image ref={ref} roundedCircle src="" />
                    <span className="ms-1">
                      <PlaylistPlayIcon
                        style={{
                          color: "black",
                          height: "30px",
                          width: "30px",
                        }}
                      ></PlaylistPlayIcon>
                    </span>
                  </Button>
                )}
              </OverlayTrigger>
        </div>
        <div
          className="mt-4 d-flex flex-row"
          style={{ gap: "50px", flexWrap: "wrap" }}
        >
          {context?.allSong?.map((e, i) => {
            return (
              <div key={i}>
                <div>
                  <figure className="hvr">
                    <img
                      onClick={() => {
                        context.dt = [e];
                        context.setDt(context.dt);
                      }}
                      src={e.img}
                      alt={e.name}
                      style={{
                        borderRadius: "15px",
                        height: "250px",
                        width: "250px",
                      }}
                    ></img>
                    <i>
                      <PlayCircleIcon style={{ fontSize: "70px" }} />
                    </i>
                  </figure>
                  <div className="d-flex">
                    <p
                      className="ml-2 fw-bold"
                      style={{
                        fontSize: "16px",
                        letterSpacing: "1px",
                        width: "200px",
                      }}
                    >
                      {e.name}
                    </p>
                    <span>
                      <button
                        onClick={async () => {
                          let val = e;
                          let res = await axios.post(
                            "https://bwm0.herokuapp.com/users/favorites",
                            val
                          );
                        }}
                        className="btn shadow-none fav"
                      >
                        <FavoriteBorderIcon />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Player></Player>
      </div>
    </>
  );
}

export default AllSong;
