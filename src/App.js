import "./App.css";
import React, { useRef } from "react";
import SimonButton from "./SButton";
import Simon from "./Simon";

function App() {
  const red = useRef();
  const green = useRef();
  const yellow = useRef();
  const blue = useRef();

  const buttonRefs = { red: red, green: green, yellow: yellow, blue: blue };

  var simon = new Simon(buttonRefs);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Grid-container" id="buttons">
          <SimonButton
            color="Red"
            ref={red}
            sampleRate={41000}
            hz={320}
            onClick={() => simon.compareSequences("red")}
          ></SimonButton>
          <SimonButton
            color="Green"
            ref={green}
            sampleRate={41000}
            hz={340}
            onClick={() => simon.compareSequences("green")}
          ></SimonButton>
          <SimonButton
            color="Yellow"
            ref={yellow}
            sampleRate={41000}
            hz={360}
            onClick={() => simon.compareSequences("yellow")}
          ></SimonButton>
          <SimonButton
            color="Blue"
            ref={blue}
            sampleRate={41000}
            hz={380}
            onClick={() => simon.compareSequences("blue")}
          ></SimonButton>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            simon.startNewGame();
          }}
        >
          Start
        </button>
      </header>
    </div>
  );
}

export default App;
