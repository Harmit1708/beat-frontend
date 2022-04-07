import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import AllSong from "./Components/AllSong";
import TrandingSongs from "./Components/TrandingSongs";
import NewSongs from "./Components/NewSongs";
import OldSongs from "./Components/OldSongs";
import Album from "./Components/Album";
import Favorites from "./Components/Favorites";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

export const beatWithMusicContext = React.createContext();
function App() {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  let [allSong, SetAllSong] = React.useState([]);
  let [trendingSong, SetTrendingSong] = React.useState([]);
  let [allNewSong, SetAllNewSong] = React.useState([]);
  let [allOldSong, SetAllOldSong] = React.useState([]);
  let [allalbumSong, SetAllAlbumSong] = React.useState([]);

  let [favorite, setFavorite] = React.useState([]);

  let [loader, setLoader] = React.useState(false);

  let [dt, setDt] = React.useState([]);


  // let api = "http://localhost:8000/users";
  let api = "https://beatwithmusic.herokuapp.com/users";

  let getData = async () => {
    setLoader(true);
    let allSong = await axios.get(`${api}/all-songs`);
    SetAllSong(allSong.data.data);
    let trendingSong = await axios.get(
      `${api}/all-trending-songs`
    );
    SetTrendingSong(trendingSong.data.data);
    let allNewSong = await axios.get(
      `${api}/all-new-songs`
    );
    SetAllNewSong(allNewSong.data.data);
    let allOldSong = await axios.get(
      `${api}/all-old-songs`
    );
    SetAllOldSong(allOldSong.data.data);
    let albumSong = await axios.get(
      `${api}/all-album-songs`
    );
    SetAllAlbumSong(albumSong.data.data);
    setLoader(false);
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loader ? (
        <>
          <div>
            <div className="triangleLoading">
              <div className="loading-opacity"> loading</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="App">
            <BrowserRouter>
              <beatWithMusicContext.Provider
                value={{
                  allSong,
                  trendingSong,
                  allNewSong,
                  allOldSong,
                  allalbumSong,
                  dt,
                  setDt,
                  favorite,
                  setFavorite,
                }}
              >
                <Routes>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/home"  element={<Home />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/all-song" element={<AllSong />}></Route>

                  <Route
                    path="/trending-songs"
                    element={<TrandingSongs />}
                  ></Route>
                  <Route path="/new-songs" element={<NewSongs />}></Route>
                  <Route path="/old-songs" element={<OldSongs />}></Route>
                  <Route path="/album-songs" element={<Album />}></Route>
                  <Route path="/favriotes" element={<Favorites />}></Route>
                </Routes>
              </beatWithMusicContext.Provider>
            </BrowserRouter>
          </div>
        </>
      )}
    </>
  );
}

export default App;
