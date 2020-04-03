import {useContext, useEffect} from "react";
import {fromEvent} from "rxjs";
import {AppContext} from "./App";

export const KeyboardListener = () => {
   const {gameEvents} = useContext(AppContext);
   /* eslint-disable react-hooks/exhaustive-deps */
   useEffect(() => {
      const obs = fromEvent<KeyboardEvent>(
         document,
         "keypress"
      ).subscribe(e => gameEvents.OnKeyPress.next(e));
      return () => obs.unsubscribe();
   });
   return null;
};