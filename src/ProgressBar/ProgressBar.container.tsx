import React, { useState, useEffect, useContext } from "react";
import { scan } from "rxjs/operators";
import { AppContext } from "../App";
import ProgressBar from "./ProgressBar.component";

const ProgressBarContainer = () => {
  const { keyPressObservable } = useContext(AppContext);
  const [progressAmount, setProgressAmount] = useState(0);
  useEffect(() => {
    keyPressObservable
      .pipe(
        scan(acc => {
          const number = Number((acc + 0.02).toFixed(2));
          return number === 1 ? 1 : number % 1;
        }, 0)
      )
      .subscribe(value => {
        setProgressAmount(value);
      });
  }, [keyPressObservable]);
  return <ProgressBar progressAmount={progressAmount} />;
};

export default ProgressBarContainer;
