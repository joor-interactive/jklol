import React, { useState, useEffect, useContext } from 'react';
import { scan } from 'rxjs/operators'
import { AppContext } from '../App'
import ProgressBar from './ProgressBar.component'

const ProgressBarContainer = () => {
    const { keyPressObservable } = useContext(AppContext)
    const [progressAmount, setProgressAmount] = useState(0)
    useEffect(() => {
        keyPressObservable.pipe(scan((acc, e) => (acc + 0.03) % 1, 0))
        .subscribe((value) => {
            setProgressAmount(value)
        })
    }, [])
    return (
        <ProgressBar progressAmount={progressAmount} />
    );
};

export default ProgressBarContainer;