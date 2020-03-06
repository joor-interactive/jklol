import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar.component'

const ProgressBarContainer = () => {
    const [progressAmount, setProgressAmount] = useState(0)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgressAmount(Number(Math.random().toFixed(1)))
        }, 2000);

        return () => clearTimeout(timeout)
    }, [])
    return (
        <ProgressBar progressAmount={progressAmount} />
    );
};

export default ProgressBarContainer;