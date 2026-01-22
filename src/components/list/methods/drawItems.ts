import I, { ItemT } from '../types.ts';

import getRealParams, { RealParamsItemT } from '../../../utils/getRealParams.ts';
import removeTransition from '../../../utils/removeTransition.ts';
import setAsyncTimer from '../../../utils/setAsyncTimer.ts';

const drawItems: I['drawItems'] = async function ({ addesIds, deletesIds, wasEmpty }) {
    const {
        itemStyleProps,
        parentStyleProps,
        parentRealStyleProps,
        testMode,
        relative,
        startShowSmooth,
        changeAnimate,
        callback,
        parentClass,
        allItems,
        currentItem,
        itemClass,
        itemWidthOffset,
    } = this.props;
    const parent = this.parent.current!;

    if (!parent) {
        return;
    }

    const needItems: ItemT[] = [];
    const removeTransAddesItems: string[] = [];

    this.state.items.forEach((item) => {
        const itemNode = parent.querySelector(`.list__item[data-id="${item._id}"]`) as HTMLElement;

        if (relative) {
            const itemBoxNode = itemNode.childNodes[0] as HTMLElement;
            const itemHeight = itemBoxNode.offsetHeight;
            const itemFloatHeight = itemBoxNode.getBoundingClientRect().height;

            this.heights[item._id] =
                Math.round(itemFloatHeight) === itemHeight ? itemFloatHeight : itemHeight;
        }

        if (this.states[item._id] === 1) {
            itemNode.setAttribute('data-show', '');
            itemNode.removeAttribute('data-hide');

            if (relative && addesIds.includes(item._id)) {
                itemNode.style.height = `${this.heights[item._id]}px`;
            }
        }

        if (this.states[item._id] === 0) {
            itemNode.removeAttribute('data-show');

            if (this.state.items.length > 1) {
                itemNode.setAttribute('data-hide', '');
            }

            if (relative) {
                itemNode.style.height = `${this.heights[item._id]}px`;

                setTimeout(() => {
                    itemNode.style.height = '0px';
                }, 10);
            }
        } else {
            needItems.push(item);
        }

        if (
            (!relative || !this.isCbInit) &&
            !startShowSmooth &&
            addesIds.includes(item._id) &&
            (!changeAnimate || this.state.items.length <= 1) &&
            (!allItems || wasEmpty)
        ) {
            removeTransAddesItems.push(`.list__item[data-id="${item._id}"]`);
        }

        if (!relative) {
            itemNode.style.order = `${this.indexes[item._id]}`;
        }
    });

    if (removeTransAddesItems.length) {
        removeTransition({ item: removeTransAddesItems.join(', '), isCurrent: true });
    }

    const cbData: ObjT = {};

    if (!relative && (itemStyleProps.length || parentStyleProps.length)) {
        const elems: { className: string; id: string }[] = needItems.map((item) => ({
            className: `.list__item[data-id="${item._id}"]`,
            id: item._id,
        }));

        const params = getRealParams({
            parent,
            elems,
            classNames: ['_static'],
            isClearStyleParent: true,
            clearStyleElems: [],
            isNotRemove: testMode,
            ...(parentRealStyleProps.includes('width') ? { width: parent.offsetWidth } : {}),
            ...(parentRealStyleProps.includes('height') ? { height: parent.offsetHeight } : {}),
        });

        needItems.forEach((item) => {
            const itemParams = params[item._id] as RealParamsItemT;

            if (itemParams) {
                const itemNode = parent.querySelector(
                    `.list__item[data-id="${item._id}"]`,
                ) as HTMLElement;

                if (itemStyleProps.includes('height')) {
                    itemNode.style.height = `${itemParams.height}px`;
                }

                if (itemStyleProps.includes('width')) {
                    itemNode.style.width = `${itemParams.width + (itemWidthOffset || 0)}px`;
                }

                if (
                    itemStyleProps.includes('left') ||
                    itemStyleProps.includes('right') ||
                    itemStyleProps.includes('top') ||
                    itemStyleProps.includes('bottom')
                ) {
                    let left = itemStyleProps.includes('left') ? itemParams.offsetLeft : 0;
                    let top = itemStyleProps.includes('top') ? itemParams.offsetTop : 0;

                    if (itemStyleProps.includes('right')) {
                        left = -itemParams.offsetRight;
                    }

                    if (itemStyleProps.includes('bottom')) {
                        top = -itemParams.offsetBottom;
                    }

                    itemNode.style.transform = `translate(${left}px,${top}px)`;
                }
            }
        });

        if (parentStyleProps.includes('width')) {
            parent.style.height = `${params.parent.height}px`;
            cbData.parentHeight = params.parent.height;
        }

        if (parentStyleProps.includes('height')) {
            parent.style.width = `${params.parent.width}px`;
            cbData.parentWidth = params.parent.width;
        }
    }

    if (!this.isCbInit) {
        this.isCbInit = true;

        cbData.isInit = true;

        removeTransition({ item: `.${parentClass}.${this.id}`, isCurrent: true });
        removeTransition({ item: `.${itemClass}.${this.id}`, isCurrent: true });
    }

    if (callback) {
        callback(cbData);
    }

    this.currentIndex = allItems ? allItems.indexOf(currentItem!) : undefined;

    await setAsyncTimer(300);

    if (relative) {
        addesIds.forEach((id) => {
            const itemNode = parent.querySelector(`.list__item[data-id="${id}"]`) as HTMLElement;

            itemNode.style.height = '';
        });
    }

    if (deletesIds.length) {
        const resultItems = [...this.state.items.map((item) => JSON.parse(JSON.stringify(item)))];

        deletesIds.forEach((id) => {
            if (this.states[id] === 0) {
                const index = resultItems.findIndex((item) => item._id === id);

                if (index !== -1) {
                    resultItems.splice(index, 1);

                    delete this.heights[id];
                }
            }
        });

        await this.asyncSetState.call(this, { items: resultItems });
    }
};

export default drawItems;
