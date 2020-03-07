import React, { useContext, useRef, createContext } from "react";
import { fromEvent, Observable, empty, Subject } from "rxjs";
import "./App.css";
import "prismjs/themes/prism-dark.css";
import Contractors from "./Contractors";
import { dave, slim } from "./Contractors/ListOfContractors";
import { PullRequest } from "./PullRequests/PullRequest";
import ProgressBar from "./ProgressBar";
import CodeWindow from "./CodeWindow/CodeWindow";

export const AppContext = createContext({
  keyPressObservable: empty() as Observable<KeyboardEvent>,
  prCreatedSubject: new Subject<PullRequest>()
});

function App() {
  const keyPressObservable = useRef<Observable<KeyboardEvent>>(
    fromEvent<KeyboardEvent>(document, "keypress")
  );
  const contractors = [dave, slim];
  return (
    <AppContext.Provider
      value={{
        keyPressObservable: keyPressObservable.current,
        prCreatedSubject: new Subject<PullRequest>()
      }}
    >
      <div className="App">
        <ProgressBar />
        <CodeWindow />
        <br />
        <Contractors contractors={contractors} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
