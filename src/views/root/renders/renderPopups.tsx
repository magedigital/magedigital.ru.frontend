import React from 'react';

import PopupWrapper from '@/src/components/popupWrapper/PopupWrapper.tsx';
import { PopupDataT, popups } from '@/src/store/popups.ts';

import I from '../types.ts';

const renderPopups: I['renderPopups'] = function () {
    return (
        <>
            {(Object.keys(popups) as (keyof typeof popups)[]).map((name) => {
                const popup = this.props[name];
                const popupData = popups[name] as PopupDataT;
                return (
                    <PopupWrapper
                        key={name}
                        name={name}
                        isShow={popup.isShow}
                        duration={popupData.duration}
                    />
                );
            })}
        </>
    );
};

export default renderPopups;
