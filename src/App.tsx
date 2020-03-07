import React, { useRef, createContext, useEffect, useState } from "react";
import { fromEvent, Observable, empty, Subject, merge } from "rxjs";
import styled from "styled-components";
import "./App.css";
import "prismjs/themes/prism-dark.css";
import Contractors from "./Contractors";
import { dave, slim } from "./Contractors/ListOfContractors";
import { PullRequest } from "./PullRequests/PullRequest";
import ProgressBar from "./ProgressBar";
import CodeWindow from "./CodeWindow/CodeWindow";

export const AppContext = createContext({
  keyPressObservable: empty() as Observable<KeyboardEvent>,
  focusHiddenInput: () => {},
  prCreatedSubject: new Subject<PullRequest>()
});

const HiddenInput = styled.input`
  position: absolute;
  left: -1000px;
`;

function App() {
  const [keyPressObservable, setKeyPressObservable] = useState<
    Observable<KeyboardEvent>
  >(empty() as Observable<KeyboardEvent>);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (inputRef.current) {
      const hiddenInputKeypressObservable = fromEvent<KeyboardEvent>(
        inputRef.current,
        "keypress"
      );
      const documentKeyPressObservable = fromEvent<KeyboardEvent>(
        document,
        "keypress"
      );

      setKeyPressObservable(
        merge(hiddenInputKeypressObservable, documentKeyPressObservable)
      );
    }
  }, [inputRef]);

  const contractors = [dave, slim];
  return (
    <AppContext.Provider
      value={{
        keyPressObservable,
        focusHiddenInput: () => inputRef.current?.focus(),
        prCreatedSubject: new Subject<PullRequest>()
      }}
    >
      <div className="App">
        <ProgressBar />
        <CodeWindow />
        <HiddenInput type="text" ref={inputRef} />
        <Contractors contractors={contractors} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
