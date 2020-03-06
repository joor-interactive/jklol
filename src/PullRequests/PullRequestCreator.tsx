// import { CodeEditedEvent } from "../Events";
import { PullRequest } from "./PullRequest";
import { useState, useContext, useEffect } from "react";
import {AppContext} from '../App'


const PullRequestCreator = () => {
    const { keyPressObservable } = useContext(AppContext)
    const [threshold, setThreshold] = useState<number>(100);
    const [code, setCode] = useState<string>("");
    useEffect(() => {
        keyPressObservable.subscribe(console.log)
    }, [])
    
    
    
    const onAddCode = (event: any) => {
        if(event.code.length < threshold){
            return;
        }

        // TODO: emit an event to decrement code
        // TODO: emit an event to create a PR
        var codeForPr = event.code.substring(0, threshold);
        const pr = new PullRequest("Hello world", codeForPr);
    }

}