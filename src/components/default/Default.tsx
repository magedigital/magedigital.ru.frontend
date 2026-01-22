import { v4 } from 'uuid';

import React, { KeyboardEvent, WheelEvent } from 'react';

import { appStore } from '@store/store.tsx';

import asyncSetState from './methods/asyncSetState.ts';
import checkCalcSize from './methods/checkCalcSize.ts';
import checkChangeProps from './methods/checkChangeProps.ts';
import getClass from './methods/getClass.ts';
import keysHandler from './methods/keysHandler.ts';
import onlineHandler from './methods/onlineHandler.ts';
import setClass from './methods/setClass.ts';
import visibilityHandler from './methods/visibilityHandler.ts';
import wheelScrollHandler from './methods/wheelScrollHandler.ts';

import DefaultI from './types.ts';

class Default<P = ObjT, S = ObjT>
    extends React.Component<DefaultI<P, S>['props'], DefaultI<P, S>['state']>
    implements DefaultI<P, S>
{
    parent: DefaultI['parent'];
    id: DefaultI['id'];
    savedPrevPageUrl: DefaultI['savedPrevPageUrl'];
    isDocFocus: DefaultI['isDocFocus'];
    visibilityCb: DefaultI['visibilityCb'];
    init: DefaultI['init'];
    checkAuthCb: DefaultI['checkAuthCb'];
    onlineCb: DefaultI['onlineCb'];
    isOnline: DefaultI['isOnline'];
    visibillityChangeHandler: DefaultI['visibillityChangeHandler'];
    keysCallback: DefaultI['keysCallback'];
    wheelScrollNodeClass: DefaultI['wheelScrollNodeClass'];

    constructor(props: DefaultI<P, S>['props']) {
        super(props);
        this.state = {} as DefaultI<P, S>['state'];

        this.id = 'id' + v4();
        this.savedPrevPageUrl = appStore.getState().prevPageUrl;
        this.isOnline = true;

        this.visibilityHandler = this.visibilityHandler.bind(this);
        this.onlineHandler = this.onlineHandler.bind(this);
        this.keysHandler = this.keysHandler.bind(this);

        if (this.visibillityChangeHandler) {
            this.visibillityChangeHandler = this.visibillityChangeHandler.bind(this);
        }

        this.wheelScrollHandler = this.wheelScrollHandler.bind(this);

        this.parent = React.createRef();
    }

    unmountHandlers: DefaultI['unmountHandlers'] = {};
    timers: DefaultI['timers'] = {};
    intervals: DefaultI['intervals'] = {};
    changedProps: DefaultI['changedProps'] = {};

    asyncSetState = asyncSetState;
    getClass = getClass;
    setClass = setClass;
    checkChangeProps = checkChangeProps;
    checkCalcSize = checkCalcSize;
    keysHandler = keysHandler;

    visibilityHandler = visibilityHandler;
    onlineHandler = onlineHandler;

    wheelScrollHandler = wheelScrollHandler;

    componentDidMount() {
        this.checkCalcSize();
        this.checkChangeProps();

        if (!this.checkAuthCb) {
            if (this.props.authUser) {
                (this as DefaultI).asyncSetState({ authUser: this.props.authUser }).then(() => {
                    if (this.init) {
                        this.init();
                    }
                });
            } else if (this.init) {
                this.init();
            }
        }

        if (this.visibilityCb) {
            this.intervals.visibility = setInterval(() => {
                if (document.hasFocus() && !this.isDocFocus) {
                    this.isDocFocus = true;
                    this.visibilityCb!(true);
                }

                if (!document.hasFocus() && this.isDocFocus) {
                    this.isDocFocus = false;
                    this.visibilityCb!(false);
                }
            }, 500);

            document.addEventListener('visibilitychange', this.visibilityHandler, false);

            this.unmountHandlers.visibility = () => {
                document.removeEventListener('visibilitychange', this.visibilityHandler);
            };
        }

        if (this.onlineCb) {
            window.addEventListener('online', this.onlineHandler);
            window.addEventListener('offline', this.onlineHandler);

            this.unmountHandlers.online = () => {
                window.removeEventListener('online', this.onlineHandler);
                window.removeEventListener('offline', this.onlineHandler);
            };
        }

        if (this.visibillityChangeHandler) {
            document.addEventListener('visibilitychange', this.visibillityChangeHandler);

            this.unmountHandlers.visibility = () =>
                document.removeEventListener('visibilitychange', this.visibillityChangeHandler!);
        }

        if (this.keysCallback) {
            (document.addEventListener as ListenerT<KeyboardEvent>)('keydown', this.keysHandler);

            this.unmountHandlers.keys = () =>
                (document.removeEventListener as ListenerT<KeyboardEvent>)(
                    'keydown',
                    this.keysHandler,
                );
        }

        if (this.wheelScrollNodeClass) {
            const wheelNode = this.parent.current!.querySelector(
                this.wheelScrollNodeClass,
            ) as HTMLElement;

            if (wheelNode) {
                (wheelNode.addEventListener as ListenerT<WheelEvent>)(
                    'wheel',
                    this.wheelScrollHandler,
                    { passive: false },
                );

                this.unmountHandlers.wheel = () =>
                    (wheelNode.removeEventListener as ListenerT<WheelEvent>)(
                        'wheel',
                        this.wheelScrollHandler,
                        { passive: false },
                    );
            }
        }
    }

    componentDidUpdate() {
        this.checkCalcSize();
        this.checkChangeProps();
    }

    componentWillUnmount(): void {
        Object.keys(this.unmountHandlers).forEach((key) => {
            this.unmountHandlers[key]();
        });

        Object.keys(this.timers).forEach((key) => {
            clearTimeout(this.timers[key]);
        });

        Object.keys(this.intervals).forEach((key) => {
            clearInterval(this.intervals[key]);
        });
    }
}

export default Default;
