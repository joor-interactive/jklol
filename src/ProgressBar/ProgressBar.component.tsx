import React from 'react';

const totalWidth = 500

type ProgressBarProps = {
    progressAmount: number
}
const ProgressBar: React.FC<ProgressBarProps> = ({ progressAmount }) => {
    return (
        <div style={{ position: 'relative', width: `${totalWidth}px`, height: '40px', background: 'black'}}>
            <div style={{ position: 'absolute', width: `${progressAmount * totalWidth}px`, height: '40px', background: 'red'}}></div>
        </div>
    );
};

export default ProgressBar;