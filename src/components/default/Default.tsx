import { v4 } from 'uuid';

import React from 'react';

import addStack from './methods/addStack.ts';
import addThrottle from './methods/addThrottle.ts';
import asyncSetState from './methods/asyncSetState.ts';
import checkCalcSize from './methods/checkCalcSize.ts';
import checkChangeProps from './methods/checkChangeProps.ts';
import doStack from './methods/doStack.ts';
import getClass from './methods/getClass.ts';
import keysHandler from './methods/keysHandler.ts';
import onlineHandler from './methods/onlineHandler.ts';
import setClass from './methods/setClass.ts';
import throttleHandler from './methods/throttleHandler.ts';
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
    defaultInit: DefaultI['defaultInit'];
    onlineCb: DefaultI['onlineCb'];
    isOnline: DefaultI['isOnline'];
    visibillityChangeHandler: DefaultI['visibillityChangeHandler'];
    keysCallback: DefaultI['keysCallback'];
    wheelScrollNodeClass: DefaultI['wheelScrollNodeClass'];
    updatedStateCallback: DefaultI['updatedStateCallback'];

    constructor(props: DefaultI<P, S>['props']) {
        super(props);
        this.state = {} as DefaultI<P, S>['state'];

        this.id = 'id' + v4();
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
    stack = [];

    asyncSetState = asyncSetState;
    getClass = getClass;
    setClass = setClass;
    checkChangeProps = checkChangeProps;
    checkCalcSize = checkCalcSize;
    keysHandler = keysHandler;

    visibilityHandler = visibilityHandler;
    onlineHandler = onlineHandler;

    wheelScrollHandler = wheelScrollHandler;

    addStack = addStack;
    doStack = doStack;

    throttles = {} as DefaultI['throttles'];
    throttlesData = {};
    throttleHandler = throttleHandler;
    addThrottle = addThrottle;

    componentDidMount() {
        this.checkCalcSize();
        this.checkChangeProps();

        if (this.defaultInit) {
            this.defaultInit();
        }

        const init = this.init?.bind(this);

        if (init) {
            init();
        }

        const reconnectInit = async () => {
            this.componentWillUnmount();
            await init!();
        };

        if (init) {
            document.addEventListener('reconnect', reconnectInit);
            this.unmountHandlers.reconnect = () => {
                document.removeEventListener('reconnect', reconnectInit);
            };
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
            document.addEventListener('keydown', this.keysHandler);

            this.unmountHandlers.keys = () =>
                document.removeEventListener('keydown', this.keysHandler);
        }

        if (this.wheelScrollNodeClass) {
            const wheelNode = this.parent.current!.querySelector(
                this.wheelScrollNodeClass,
            ) as HTMLElement;

            if (wheelNode) {
                wheelNode.addEventListener('wheel', this.wheelScrollHandler, { passive: false });

                this.unmountHandlers.wheel = () =>
                    wheelNode.removeEventListener('wheel', this.wheelScrollHandler);
            }
        }

        if (this.updatedStateCallback) {
            this.updatedStateCallback();
        }
    }

    componentDidUpdate() {
        this.checkCalcSize();
        this.checkChangeProps();

        if (this.updatedStateCallback) {
            this.updatedStateCallback();
        }
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

        Object.keys(this.throttles).forEach((k) => {
            const timerId = this.throttles[k].getTimerId();
            if (timerId) {
                clearTimeout(timerId);
            }
        });
    }
}

export default Default;
