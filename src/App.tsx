import React, {createContext, useContext, useEffect} from "react";
import {fromEvent} from "rxjs";
import styled from "styled-components";
import "./App.css";
import "prismjs/themes/prism-dark.css";
import ProgressBar from "./ProgressBar";
import CodeWindow from "./CodeWindow/CodeWindow";
import GameEvents from "./Simuation/sim";

export const AppContext = createContext({
  focusHiddenInput: () => {},
  gameEvents: new GameEvents(),
});

const HiddenInput = styled.input`
  position: absolute;
  left: -1000px;
`;

const KeyboardListener = () => {
  const {gameEvents} = useContext(AppContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {

    fromEvent<KeyboardEvent>(
          document,
          "keypress"
      ).subscribe(e => gameEvents.OnKeyPress.next(e))
    }
  });

};

function App() {

  return (
    <AppContext.Provider
      value={{
        gameEvents: new GameEvents()
      }}
    >
      <div className="App">
        <KeyboardListener/>
        <ProgressBar />
        <CodeWindow />
        <HiddenInput type="text"/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
