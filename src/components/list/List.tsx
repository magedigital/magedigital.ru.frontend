import { throttle } from 'throttle-debounce';

import React from 'react';

import Default from '@components/default/Default.tsx';

import checkChange from './methods/checkChange.ts';
import checkSizes from './methods/checkSizes.ts';
import drawItems from './methods/drawItems.ts';
import updateItems from './methods/updateItems.ts';

import ListI from './types.ts';

import { StoreT, WithStore } from '../../store/store.tsx';
import renderItem from './renders/renderItem.tsx';

class List extends Default<ListI['props'], ListI['state']> implements ListI {
    parent: ListI['parent'];
    resizeThrottle: ListI['resizeThrottle'];
    id: ListI['id'];

    constructor(props: ListI['props']) {
        super(props);
        this.state = {
            items: [],
            isEmpty: true,
        };

        this.checkSizes = this.checkSizes.bind(this);

        this.id = `${+(Math.random() * 1_000_000).toFixed(0)}-${new Date().getTime()}`;

        this.parent = React.createRef();
    }

    states = {};
    indexes = {};
    timers = {};
    heights = {};

    renderItem = renderItem;

    updateItems = updateItems;
    drawItems = drawItems;
    checkSizes = checkSizes;

    checkChange = checkChange;

    componentDidMount(): void {
        this.checkChange(true);

        this.resizeThrottle = throttle(300, this.checkSizes.bind(this));

        if (this.props.resizeWidth) {
            document.addEventListener('changeWidthWindow', this.resizeThrottle!);

            this.unmountHandlers.resizeWidth = () =>
                document.removeEventListener('changeWidthWindow', this.resizeThrottle!);
        }

        if (this.props.resizeHeight) {
            document.addEventListener('changeHeightWindow', this.resizeThrottle!);

            this.unmountHandlers.resizeHeight = () =>
                document.removeEventListener('changeHeightWindow', this.resizeThrottle!);
        }
    }

    componentDidUpdate(): void {
        this.checkChange();
    }

    render() {
        const { items, isEmpty } = this.state;
        const { parentClass, relative, changeAnimate, renderWrapper = (node) => node } = this.props;

        return (
            <div
                ref={this.parent}
                className={`list ${isEmpty ? '_empty' : ''} ${relative ? '_relative' : ''} ${parentClass} ${changeAnimate ? '_animate' : ''} ${this.id}`}
            >
                {renderWrapper(items.map((item) => this.renderItem({ item })))}
            </div>
        );
    }
}

const mapStore = (store: StoreT) => ({
    isWindowLoad: store.isWindowLoad,
});

export default WithStore(List, mapStore);
