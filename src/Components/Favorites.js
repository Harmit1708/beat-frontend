import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Player from "./Player";
import { beatWithMusicContext } from "../App";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Header from "./Header";
import Sidebar from "./Sidebar";
function Favriotes() {
  let context = React.useContext(beatWithMusicContext);

  let [data, setData] = React.useState([]);

  let getData = async () => {
    let fav = await axios.get("https://bwm0.herokuapp.com/users/all-favorites");
    setData(fav.data.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

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
            Favorite Songs
          </span>
        </div>
        <div
          className="mt-4 d-flex flex-row"
          style={{ gap: "50px", flexWrap: "wrap" }}
        >
          {data?.map((e, i) => {
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
                          debugger
                          let val = e._id;
                          let del = await axios.delete(
                            "https://bwm0.herokuapp.com/users/delete-favorites/" +
                              val
                          );
                          if (del.status === 200) {
                            getData();
                          }
                        }}
                        className="btn shadow-none"
                      >
                        <DeleteOutlineIcon />
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

export default Favriotes;
