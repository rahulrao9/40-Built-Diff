import logo from "./logo.svg";
import "./App.css";
import LeftPane from "./component/LeftPane";
import MiddlePane from "./component/MiddlePane";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RightPane from "./component/RightPane";
import Side from "./component/Side";
import { useEffect, useState } from "react";
import { useKeyDown } from "./component/useKeyDown";
import MainApp from "./component/MainApp";
import Auth from "./component/Auth";

function App() {
  const [isImagePost, setIsImagePost] = useState(false);
  const [genText, setGenText] = useState("Image Caption"); //5
  const [postData, setPostData] = useState([]);
  const [currPost, setCurrPost] = useState();
  const [isSidePaneActive, setIsSidePaneActive] = useState(true);
  const [isMiddlePaneActive, setIsMiddlePaneActive] = useState(false);
  const [isAddPostActive, setIsAddPostActive] = useState(false);
  const [currSidePaneOption, setCurrSidePaneOption] = useState(0);
  const [currAddPostOption, setCurrAddPostOption] = useState(0);
  const [currPostIndex, setCurrPostIndex] = useState(0);
  const [currImgURL, setCurrImgURL] = useState(
    "https://imgv3.fotor.com/images/slider-image/a-man-holding-a-camera-with-image-filter.jpg"
  );
  const playback = (audio, ctx) => {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  };
  const fetchSpeech = (text) => {
    const ctx = new AudioContext();
    let audio;
    fetch("http://localhost:5000/text-to-speech", {
      method: "POST",
      body: JSON.stringify({
        text: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        audio = decodedAudio;
        playback(audio, ctx);
      });
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchCaption = (url) => {
    fetch("http://localhost:5000/img-to-caption", {
      method: "POST",
      body: JSON.stringify({
        imgurl: url,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setGenText(json["img_caption"]);
      })
      .then(() => {
        fetchSpeech(genText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchPostData = (postedby, time, description, alttext, imgcaption) => {
    const ctx = new AudioContext();
    let audio;
    const res_txt = `Posted By ${postedby} , ${time} , Description ${description} , Alt Text ${alttext} `;
    fetch("http://localhost:5000/text-to-speech", {
      method: "POST",
      body: JSON.stringify({
        text: res_txt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        audio = decodedAudio;
        //console.log(audio.duration);
        playback(audio, ctx);
      })
      .then(() => {
        sleep(audio.duration * 1000).then(() => {
          fetchCaption(imgcaption);
        });
      });
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e);
    });
  }, []);
  useEffect(() => {
    if (isMiddlePaneActive) {
      //fetchSpeech("Posted By Nagraj");
      //fetchSpeech("10 minutes ago");
      //fetchSpeech("Flexing my camera on a sunny weekday");
      //fetchCaption(currImgURL);
      fetchPostData(
        "Nagraj",
        "10 minutes ago",
        "Flexing my camera on a sunny weekday",
        "This is an image of me clicking a photo of myself",
        currImgURL
      );
    }
  }, [isMiddlePaneActive]);
  useEffect(() => {
    const sidepaneMap = {
      0: "Home",
      1: "Explore",
      2: "Notifications",
      3: "Profile",
      4: "Tweet",
    };
    if (isSidePaneActive) {
      fetchSpeech(sidepaneMap[currSidePaneOption]);
    }
  }, [currSidePaneOption]);
  useEffect(() => {
    const postaddmap = {
      0: "Profile",
      1: "Tweet Text",
      2: "Post Tweet",
      3: "Add Image",
      4: "Add GIF",
      5: "Add Reaction",
    };
    if (isAddPostActive) {
      fetchSpeech(postaddmap[currAddPostOption]);
    }
  }, [currAddPostOption]);
  useKeyDown(() => {
    if (isSidePaneActive && currSidePaneOption < 4) {
      //console.log("down", parseInt(currSidePaneOption) < 4);
      setCurrSidePaneOption((prevState) => {
        return prevState + 1;
      });
    }
    if (isAddPostActive && currAddPostOption == 5) {
      setIsAddPostActive(!isAddPostActive);
      setIsMiddlePaneActive(!isMiddlePaneActive);
    }
  }, ["ArrowDown"]);
  useKeyDown(() => {
    if (isSidePaneActive && currSidePaneOption > 0) {
      //console.log("up", currSidePaneOption);
      setCurrSidePaneOption((prevState) => {
        return prevState - 1;
      });
    }
    if (isMiddlePaneActive) {
      setIsMiddlePaneActive(!isMiddlePaneActive);
      setIsAddPostActive(!isAddPostActive);
    }
  }, ["ArrowUp"]);
  useKeyDown(() => {
    if (isSidePaneActive && currSidePaneOption == 4) {
      setIsSidePaneActive(!isSidePaneActive);
      setIsAddPostActive(!isAddPostActive);
    } else if (isAddPostActive && currAddPostOption < 5) {
      setCurrAddPostOption((prevState) => {
        return prevState + 1;
      });
    }
  }, ["ArrowRight"]);
  useKeyDown(() => {
    if (!isSidePaneActive && currAddPostOption == 0) {
      setIsSidePaneActive(!isSidePaneActive);
      setIsAddPostActive(!isAddPostActive);
    } else if (isAddPostActive && currAddPostOption > 0) {
      setCurrAddPostOption((prevState) => {
        return prevState - 1;
      });
    }
  }, ["ArrowLeft"]);
  //isSidePaneActive,
  // currSidePaneOption,
  // isMiddlePaneActive,
  // isImagePost,
  // currPost,
  // isAddPostActive,
  // currAddPostOption,
  // currImgURL,
  // genText,

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route
          exact
          path="/page"
          element={
            <MainApp
              isSidePaneActive={isSidePaneActive}
              currSidePaneOption={currSidePaneOption}
              isMiddlePaneActive={isMiddlePaneActive}
              isImagePost={isImagePost}
              currPost={currPost}
              isAddPostActive={isAddPostActive}
              currAddPostOption={currAddPostOption}
              currImgURL={currImgURL}
              genText={genText}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
