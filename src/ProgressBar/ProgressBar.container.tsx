import React, {useState, useEffect, useContext} from "react";
import {map, scan} from "rxjs/operators";
import {AppContext} from "../App";
import ProgressBar from "./ProgressBar.component";
import {PR_BATCH} from "../Simuation/Settings";

const ProgressBarContainer = () => {
   const {gameEvents} = useContext(AppContext);
   const [progress, setProgress] = useState(0);
   useEffect(() => {
      const obs = gameEvents.$OnProgress
         .subscribe(e => setProgress(e.percentToPr));
      return () => obs.unsubscribe();
   }, []);
   return <ProgressBar progressAmount={progress}/>;
};

export default ProgressBarContainer;
