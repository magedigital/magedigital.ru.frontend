import React from 'react';

import Media from '@components/media/Media.tsx';

import I from '../types.ts';

const renderBackVideo: I['renderBackVideo'] = function () {
    return (
        <>
            <Media media="desktop">
                <video
                    src={require(`@media/index/back-monsta.mp4`)}
                    className="index__backVideo _FULL_ABS"
                    autoPlay
                    playsInline
                    muted
                    loop
                />
            </Media>
            <Media media="mobile">
                <video
                    src={require(`@media/index/back-monsta-mob.mp4`)}
                    className="index__backVideo _FULL_ABS"
                    autoPlay
                    playsInline
                    muted
                    loop
                />
            </Media>
        </>
    );
};

export default renderBackVideo;
