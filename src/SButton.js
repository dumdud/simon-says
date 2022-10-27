import SineWavePlayer from "./SineWavePlayer";
import React from "react";
import "./App.css";

const TextStyle = (color, hover) => ({
  width: 100,
  height: 100,
  backgroundColor: color,
  boxShadow: hover ? "0 0 40px 1px " + color : "0 0",
});

export default class SButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      player: new SineWavePlayer({
        sampleRate: this.props.sampleRate,
        hz: this.props.hz,
        loop: true,
      }),
    };

    this.buttonUp = this.buttonUp.bind(this);
    this.buttonDown = this.buttonDown.bind(this);
  }

  buttonUp() {
    this.state.player.stop();
    this.setState({
      hover: false,
      player: new SineWavePlayer({
        sampleRate: this.props.sampleRate,
        hz: this.props.hz,
        loop: true,
      }),
    });
  }

  buttonDown() {
    this.state.player.play();
    this.setState({ hover: true });
  }

  render() {
    return (
      <div
        style={TextStyle(this.props.color, this.state.hover)}
        className={"Simon-button " + this.props.color}
        onPointerDown={this.buttonDown}
        onMouseUp={() => {
          this.buttonUp();
          this.props.onClick();
        }}
        id={this.props.color}
      ></div>
    );
  }
}
