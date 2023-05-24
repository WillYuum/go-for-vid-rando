import { ChangeEvent } from "react";
import "./App.css";
import "./vidCard.css";
import CustomButton from "./components/CusomButton";
import MainVideoComponent from "./components/MainVideoPlayer";
import React from "react";

interface AppState {
  selectedVideo: File | null;
}

const renderVidCardList = () => {
  const renderVidCard = (videoToDisplay: File | null) => {
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
        />
      </div>
    );
  };

  const listOfCards: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    listOfCards.push(renderVidCard(null));
  }

  return listOfCards;
};

class App extends React.Component<any, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedVideo: null,
    };
  }

  handleVideoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    // get video data from event
    const videoData = e.currentTarget.files;
    if (videoData) {
      // set video to state
      console.log("Set video to state");
      const vidData = videoData[0];
      this.setState({ selectedVideo: vidData });
    }
  };

  render() {
    console.log("rendering app...");
    const { selectedVideo } = this.state;

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

        <div className="cardsContainer">{renderVidCardList()}</div>
      </div>
    );
  }
}

export default App;
