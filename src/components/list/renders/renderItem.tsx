import React from 'react';

import I from '../types.ts';

const renderItem: I['renderItem'] = function ({ item }) {
    const id = item._id;
    const { items, itemClass = '', allItems, currentItem, render } = this.props;

    const index = this.indexes[id];
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const isShow = this.states[id] === 1;
    const isHide = this.states[id] === 0;

    const prevItem = index > 0 ? items[index - 1] : undefined;
    const nextItem = index < items.length - 1 ? items[index + 1] : undefined;
    const renderProps = {
        item,
        prevItem,
        nextItem,
        isHide,
        isShow,
        isFirst,
        isLast,
        index,
        items,
    };
    const renderInfo = render({ ...renderProps });
    const style = renderInfo.style;
    const propsClass = renderInfo.className;
    const classes = [
        itemClass,
        this.id,
        ...(isFirst ? ['_first'] : []),
        ...(isLast ? ['_last'] : []),
        ...(isShow ? ['_show'] : []),
        ...(propsClass ? [propsClass] : []),
    ];

    const itemIndex = allItems ? allItems.indexOf(id) : undefined;

    if (allItems) {
        if (itemIndex === this.currentIndex) {
            const currentIndex = allItems.indexOf(currentItem!);
            
            classes.push(itemIndex! < currentIndex! ? '_prev' : '_next');
        } else {
            classes.push(itemIndex! < this.currentIndex! ? '_prev' : '_next');
        }
    }

    return (
        <div className={`list__item ${classes.join(' ')}`} data-id={id} key={id} style={style}>
            {renderInfo.item}
        </div>
    );
};

export default renderItem;
