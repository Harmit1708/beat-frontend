import React, { useContext, useEffect } from "react";
import Carousel from "react-grid-carousel";
import { beatWithMusicContext } from "../App";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Player from "./Player";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { OverlayTrigger, Tooltip, Button, Image } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";


function Home() {
  let context = useContext(beatWithMusicContext);

  let navigate = useNavigate();


  let checkAuth = async () => {
    let token = sessionStorage.getItem("token");

    if (token) {
      navigate("/home");
      let config = {
        headers: {
          token: token,
        },
      };
      // Post data to url
      let res = await axios.post(
        "https://bwm0.herokuapp.com/users/auth",
        {
          Purpose: "Approve",
        },
        config
      );
      if (res.data.statusCode !== 200) {
        alert("Session Ended");
        sessionStorage.clear();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header />
      <Sidebar></Sidebar>
      <div>
        <React.StrictMode>
          <div
            style={{ marginLeft: "290px", marginTop: "30px", color: "black" }}
          >
            <div className="list">
              <a href="#all-songs" className="links">
                All
              </a>
              <a href="#trending-songs" className="links">
                Trending Songs
              </a>
              <a href="#new-release" className="links">
                New Songs
              </a>
              <a href="#old-songs" className="links">
                Old Songs
              </a>
              <a href="#album-songs" className="links">
                Album
              </a>
            </div>
          </div>

          <div className="home">
            {/* All Songs */}
            <div id="all-songs" style={{ marginLeft: "290px" }}>
              <div style={{ marginTop: "35px" }}>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    marginLeft: "60px",
                  }}
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
                <span
                  onClick={() => {
                    navigate("/all-song")
                  }}
                  style={{
                    cursor: "pointer" ,
                    float: "right",
                    marginRight: "80px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  See all
                </span>
              </div>
              <div className="mt-4 song-grid">
                <Carousel
                className="res"
                  cols={5}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 1677,
                      gap: 5,
                      cols: 4,
                    },
                    {
                      breakpoint: 1413,
                      gap: 5,
                      cols: 3,
                    },
                    {
                      breakpoint: 1126,
                      gap: 5,
                      cols: 2,
                    },
                    {
                      breakpoint: 868,
                      gap: 5,
                      rows:2,
                      cols: 2,
                    },
                  ]}
                  loop
                  style={{ height: "300px" }}
                >
                  {context?.allSong?.map((e, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <div>
                          <figure className="hvr">
                            <img
                              src={e.img}
                              onClick={() => {
                                context.dt = [e];
                                context.setDt(context.dt);
                              }}
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
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* Trending Songs */}
            <div id="trending-songs" style={{ marginLeft: "290px" }}>
              <div style={{ marginTop: "35px" }}>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    marginLeft: "60px",
                  }}
                >
                  Trending Songs
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Play All</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        if (
                          context &&
                          context?.trendingSong &&
                          context?.trendingSong?.length
                        ) {
                          context.dt = context?.trendingSong;
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

                <span
                  onClick={() => {
                    navigate("/trending-songs")
                  }}
                  style={{
                    cursor: "pointer",
                    float: "right",
                    marginRight: "80px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  See all
                </span>
              </div>
              <div className="mt-4 song-grid">
                <Carousel
                  cols={5}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 1677,
                      gap: 5,
                      cols: 4,
                    },
                    {
                      breakpoint: 1413,
                      gap: 5,
                      cols: 3,
                    },
                    {
                      breakpoint: 1126,
                      gap: 5,
                      cols: 2,
                    },
                    {
                      breakpoint: 868,
                      gap: 5,
                      rows:2,
                      cols: 2,
                    }
                  ]}
                  loop
                  style={{ height: "300px" }}
                >
                  {context?.trendingSong?.map((e, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <div>
                          <figure className="hvr">
                            <img
                              src={e.img}
                              onClick={() => {
                                context.dt = [e];
                                context.setDt(context.dt);
                              }}
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
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* New Songs */}
            <div id="new-release" style={{ marginLeft: "290px" }}>
              <div style={{ marginTop: "35px" }}>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    marginLeft: "60px",
                  }}
                >
                  New Songs
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Play All</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        if (
                          context &&
                          context?.allNewSong &&
                          context?.allNewSong?.length
                        ) {
                          context.dt = context?.allNewSong;
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

                <span
                  onClick={() => {
                    navigate("/new-songs")
                  }}
                  style={{
                    cursor: "pointer" ,
                    float: "right",
                    marginRight: "80px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  See all
                </span>
              </div>
              <div className="mt-4 song-grid">
                <Carousel
                  cols={5}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 1677,
                      gap: 5,
                      cols: 4,
                    },
                    {
                      breakpoint: 1413,
                      gap: 5,
                      cols: 3,
                    },
                    {
                      breakpoint: 1126,
                      gap: 5,
                      cols: 2,
                    },
                    {
                      breakpoint: 868,
                      gap: 5,
                      rows:2,
                      cols: 2,
                    }
                  ]}
                  loop
                  style={{ height: "300px" }}
                >
                  {context?.allNewSong?.map((e, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <div>
                          <figure className="hvr">
                            <img
                              src={e.img}
                              onClick={() => {
                                context.dt = [e];
                                context.setDt(context.dt);
                              }}
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
                                className="btn shadow-none"
                              >
                                <FavoriteBorderIcon />
                              </button>
                            </span>
                          </div>
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* Old Songs */}
            <div id="old-songs" style={{ marginLeft: "290px" }}>
              <div style={{ marginTop: "35px" }}>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    marginLeft: "60px",
                  }}
                >
                  Old Songs
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Play All</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        if (
                          context &&
                          context?.allOldSong &&
                          context?.allOldSong?.length
                        ) {
                          context.dt = context?.allOldSong;
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

                <span
                onClick={() => {
                    navigate("/old-songs")
                  }}
                  style={{
                    cursor: "pointer" ,
                    float: "right",
                    marginRight: "80px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  See all
                </span>
              </div>
              <div className="mt-4 song-grid">
                <Carousel
                  cols={5}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 1677,
                      gap: 5,
                      cols: 4,
                    },
                    {
                      breakpoint: 1413,
                      gap: 5,
                      cols: 3,
                    },
                    {
                      breakpoint: 1126,
                      gap: 5,
                      cols: 2,
                    },
                    {
                      breakpoint: 868,
                      gap: 5,
                      rows:2,
                      cols: 2,
                    }
                  ]}
                  loop
                  style={{ height: "300px" }}
                >
                  {context?.allOldSong?.map((e, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <div>
                          <figure className="hvr">
                            <img
                              src={e.img}
                              onClick={() => {
                                context.dt = [e];
                                context.setDt(context.dt);
                              }}
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
                                className="btn shadow-none"
                              >
                                <FavoriteBorderIcon />
                              </button>
                            </span>
                          </div>
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* Album */}
            <div id="album-songs" style={{ marginLeft: "290px" }}>
              <div style={{ marginTop: "35px" }}>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    marginLeft: "60px",
                  }}
                >
                  Album
                </span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Play All</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        if (
                          context &&
                          context?.allalbumSong &&
                          context?.allalbumSong?.length
                        ) {
                          context.dt = context?.allalbumSong;
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
                <span
                onClick={() => {
                    navigate("/album-songs")
                  }}
                  style={{
                    cursor: "pointer" ,
                    float: "right",
                    marginRight: "80px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  See all
                </span>
              </div>
              <div className="mt-4 song-grid">
                <Carousel
                  cols={5}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 1677,
                      gap: 5,
                      cols: 5,
                    },
                    {
                      breakpoint: 1413,
                      gap: 5,
                      cols: 4,
                    },
                    {
                      breakpoint: 1126,
                      gap: 5,
                      cols: 3,
                    },
                    {
                      breakpoint: 868,
                      gap: 5,
                      rows:2,
                      cols: 2,
                    }
                  ]}
                  loop
                  style={{ height: "300px" }}
                >
                  {context?.allalbumSong?.map((e, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <div>
                          <figure className="hvr">
                            <img
                              src={e.img}
                              onClick={() => {
                                context.dt = [e];
                                context.setDt(context.dt);
                              }}
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
                                className="btn shadow-none"
                              >
                                <FavoriteBorderIcon />
                              </button>
                            </span>
                          </div>
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
          <Player></Player>
        </React.StrictMode>
      </div>
    </>
  );
}

export default Home;
