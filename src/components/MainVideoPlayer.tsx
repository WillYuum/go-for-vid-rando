import React from "react";

interface IMainVideoComponentProps {
  selectedVideo: File | null;
}

interface IMainVideoComponentState {}

class MainVideoComponent extends React.Component<
  IMainVideoComponentProps,
  IMainVideoComponentState
> {
  constructor(props: IMainVideoComponentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectedVideo } = this.props;
    const videoSrc =
      selectedVideo != null ? URL.createObjectURL(selectedVideo) : "";

    return (
      <div className="container">
        <video width="320" height="240" controls={true} src={videoSrc} />
      </div>
    );
  }
}

export default MainVideoComponent;
