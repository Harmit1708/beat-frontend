import React, { useContext } from "react";
import { beatWithMusicContext } from "../App";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
function Player(props) {
  let context = useContext(beatWithMusicContext);

  let [index, setIndex] = React.useState(0);

  var options;
  var musicTracks = [];
  if (context?.dt?.length) {
    for (let i = 0; i < context?.dt?.length; i++) {
      musicTracks.push({
        name: context?.dt[i]?.name,
        singer: context?.dt[i]?.artists,
        cover: context?.dt[i]?.img,
        musicSrc: context?.dt[i]?.audio,
      });
    }
  } else {
    musicTracks = [
     {
       name: context?.allSong[index]?.name,
       singer: context?.allSong[index]?.artists,
       cover: context?.allSong[index]?.img,
       musicSrc: context?.allSong[index]?.audio,
     },
   ];
 }



  options = {
    audioLists:musicTracks,
    theme: "light",
    bounds: "body",
    mode: "full",
    remove: true,
    toggleMode: false,
    showProgressLoadBar: true,
    showThemeSwitch: false,
    defaultVolume: 1,
    autoPlay: false,
    drag: true,
    seeked: true,
    quietUpdate: false,
    clearPriorAudioLists: true,
    autoPlayInitLoadPlayList: true,
    preload: false,
    remember: false,
    defaultPlayMode: "order",
    once: false,
    showMiniModeCover: true,
    showMiniProcessBar: false,
    showPlay: true,
    showReload: true,
    showDownload: false,
    showPlayMode: true,
    showLyric: false,
    showDestroy: false,
    extendsContent: null,
    playModeShowTime: 600,
    loadAudioErrorPlayNext: true,
    autoHiddenCover: false,
    spaceBar: true,
    responsive: true,
    changePlayIndex: 1,
    mobileMediaQuery: "(max-width: 200px)",
    volumeFade: {
      fadeIn: 1000,
      fadeOut: 1000,
    },
    restartCurrentOnPrev: false,
    sortableOptions: {},
  };

  return (
    <>
      <ReactJkMusicPlayer playIndex={0} {...options} />
    </>
  );
}

export default Player;
