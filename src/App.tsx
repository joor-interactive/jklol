import React, {createContext} from "react";
import styled from "styled-components";
import "./App.css";
import "prismjs/themes/prism-dark.css";
import ProgressBar from "./ProgressBar";
import CodeWindow from "./CodeWindow/CodeWindow";
import GameEvents from "./Simuation/GameEvents";
import {KeyboardListener} from "./KeyboardListener";

export const AppContext = createContext({
   gameEvents: new GameEvents()
});

const HiddenInput = styled.input`
  position: absolute;
  left: -1000px;
`;

function App() {
   const gameEvents = new GameEvents();
   return (
      <AppContext.Provider value={{gameEvents}}>
         <div className="App">
            <KeyboardListener/>
            <ProgressBar/>
            <CodeWindow/>
            <HiddenInput type="text"/>
         </div>
      </AppContext.Provider>
   );
}

export default App;
