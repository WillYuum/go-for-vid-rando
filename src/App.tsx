import { ChangeEvent } from "react";
import "./App.css";
import "./vidCard.css";
import CustomButton from "./components/CusomButton";
import MainVideoComponent from "./components/MainVideoPlayer";
import React from "react";

interface AppState {
  selectedVideo: File | null;
  videoShorts: File[];
}

const getVideoDuration = (file: File): Promise<number> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        console.log("We have a result");
        const video = document.createElement("video");
        video.preload = "metadata";

        video.src = reader.result as string;

        video.addEventListener("loadedmetadata", function () {
          const durationInSeconds = video.duration;
          resolve(durationInSeconds);
        });
      }
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => {
      console.log("Error: ", error);
      reject(error);
    };
  });

class App extends React.Component<any, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedVideo: null,
      videoShorts: [],
    };
  }

  setBufferedVideos = (videoData: File | null) => {
    const shortsCount = 5;
    if (videoData != null) {
      const shortsData: ArrayBuffer[] = [];
      getVideoDuration(videoData).then((duration) => {
        console.log("duration: ", duration);
        for (let i = 0; i < shortsCount; i++) {
          const start = Math.floor(Math.random() * duration);
          const end = start + 1000;
          videoData.arrayBuffer().then((buffer) => {
            const shortData = buffer.slice(start, end);
            shortsData.push(shortData);
          });
        }
      });

      setTimeout(() => {
        const videoShorts = shortsData.map((short) => {
          return new File([short], "short.mp4");
        });
        console.log("videoShorts: ", videoShorts);
        this.setState({ selectedVideo: videoData, videoShorts: videoShorts });
      }, 2500);
    } else {
      console.log("videoData is null");
    }
  };

  handleVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const videoData = e.currentTarget.files;

    if (videoData) {
      // set video to state
      console.log("Set video to state");
      const vidData = videoData.item(0);
      this.setBufferedVideos(vidData);
    }
  };

  render() {
    console.log("rendering app...");
    const { selectedVideo, videoShorts } = this.state;

    const renderVidCard = (videoToDisplay: File | null) => {
      console.log("rendering vid card...: ", videoToDisplay?.name);
      return (
        <div className="vidCard-container">
          <h1>Video Card</h1>
          <video
            width="185"
            height="200"
            controls={true}
            src={
              videoToDisplay != null ? URL.createObjectURL(videoToDisplay) : ""
            }
            typeof="video/mp4"
          />
        </div>
      );
    };

    return (
      <div className="container">
        <h1>Welcome to Vid Rando</h1>

        <div>
          <CustomButton
            text="Click me!"
            onClick={() => console.log("Hello!")}
          />
        </div>

        <div style={{ margin: "auto" }}>
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={this.handleVideoSelect}
          />
          <MainVideoComponent selectedVideo={selectedVideo} />
        </div>

        <div className="cardsContainer">
          {videoShorts.map((short) => {
            return renderVidCard(short);
          })}
          ;
        </div>
      </div>
    );
  }
}

export default App;
