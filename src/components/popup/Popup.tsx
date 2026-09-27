import React from 'react';

import Editor from '@/src/components/editor/Editor.tsx';

import close from './methods/close.ts';
import keysCallback from './methods/keysCallback.ts';
import setMenuState from './methods/setMenuState.ts';

import PopupI from './types.ts';

import renderClose from './renders/renderClose.tsx';
import renderPopup from './renders/renderPopup.tsx';

class Popup<P = {}, S = {}>
    extends Editor<PopupI<P, S>['props'], PopupI<P, S>['state']>
    implements PopupI<P, S>
{
    parent: PopupI['parent'];

    constructor(props: PopupI<P, S>['props']) {
        super(props);
        this.state = {} as PopupI<P, S>['state'];

        this.intervals.resizeH = setInterval(() => {
            if (this.state.isInit) {
                clearInterval(this.intervals.resizeH);
            }
        }, 100);

        this.parent = React.createRef();
    }

    name = '' as any;
    keys = ['Escape' as const];

    close = close;

    keysCallback = keysCallback;

    setMenuState = setMenuState;

    renderClose = renderClose;
    renderPopup = renderPopup;
    renderContent = '' as any;
}

export default Popup;
