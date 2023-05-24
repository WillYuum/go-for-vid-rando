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
    return (
      <div className="container">
        <video
          width="320"
          height="240"
          controls={true}
          src={selectedVideo != null ? URL.createObjectURL(selectedVideo) : ""}
        />
      </div>
    );
  }
}

export default MainVideoComponent;
