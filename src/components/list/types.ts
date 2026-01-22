import DefaultI from '@components/default/types';

import { StoreT } from '../../store/store';

type RenderPropsT<ItemT = any> = {
    item: ItemT;
    items: ItemT[];
    prevItem?: any;
    nextItem?: any;
    isHide?: boolean;
    isShow?: boolean;
    isLast?: boolean;
    isFirst?: boolean;
    index: number;
};

type ListRenderReturnT = {
    item: React.ReactNode;
    className?: string;
    style?: ObjT;
};

type PropsT = {
    renderKey: string | undefined;
    forceRenderKey?: string;
    updateKey?: string;
    items: ItemT[];
    parentClass: string;
    itemClass?: string;
    itemStyleProps: ('left' | 'right' | 'top' | 'bottom' | 'width' | 'height')[];
    itemWidthOffset?: number;
    parentStyleProps: ('width' | 'height')[];
    parentRealStyleProps: ('width' | 'height')[];
    render: (data: RenderPropsT) => ListRenderReturnT;
    renderWrapper?: (node: React.ReactNode) => React.ReactNode;
    callback?: (data: { parentWidth?: number; parentHeight?: number; isInit?: boolean }) => void;
    testMode?: boolean;
    relative?: boolean;
    reverse?: boolean;
    startShowSmooth?: boolean;
    changeAnimate?: boolean;
    disabled?: boolean;
    isWindowLoad: StoreT['isWindowLoad'];
    resizeWidth?: boolean;
    resizeHeight?: boolean;
    allItems?: readonly string[];
    currentItem?: string;
};

type StateT = {
    items: ItemT[];
    isEmpty?: boolean;
};

type ItemT = { _id: string } & Record<any, unknown>;

interface ListI extends DefaultI<PropsT, StateT> {
    id: string;

    resizeThrottle?: () => void;
    isInit?: boolean;
    isCbInit?: boolean;
    isWindowLoad?: boolean;
    states: Record<string, 0 | 1>;
    indexes: Record<string, number>;
    heights: Record<string, number>;
    renderKey?: PropsT['renderKey'];
    updateKey?: PropsT['updateKey'];
    forceRenderKey?: PropsT['forceRenderKey'];
    initEmptySize?: boolean;
    currentIndex?: number;

    timers: Record<string, ReturnType<typeof setTimeout>>;

    checkChange(this: ListI, force?: boolean): void;
    checkSizes(this: ListI): Promise<void>;
    updateItems(this: ListI, data: { isRender: boolean; isUpdate: boolean }): Promise<void>;
    drawItems(
        this: ListI,
        data: { deletesIds: string[]; addesIds: string[]; wasEmpty: boolean },
    ): Promise<void>;

    renderItem(this: ListI, data: { item: ItemT }): React.ReactElement;
}

export default ListI;

export type { ItemT, ListRenderReturnT, RenderPropsT as ListRenderPropsT };
