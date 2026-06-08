import React from 'react';

import I from '../types.ts';

const renderBackVideo: I['renderBackVideo'] = function () {
    return (
        <>
            <video
                src={require(`@media/index/mage-back-glass-logo.mp4`)}
                className="index__backVideo _FULL_ABS"
                autoPlay
                playsInline
                muted
                loop
            />
        </>
    );
};

export default renderBackVideo;
