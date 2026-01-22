import DefaultI from '@components/default/types';

type PropsT = {
    setCount?: (c: number) => Promise<void>;
    withListSave?: boolean;
};

type StateT = {
    isEdited?: boolean;
    listItems?: ItemT[];
    listLimit?: boolean;
    listCount?: number;
    listRenderKey?: string;
    listUpdateKey?: string;
    listInit?: boolean;
    isListLoading?: boolean;
    isListSearchLoading?: boolean;
    error?: ResponseErrorT['error'];
    renderKey?: string;
    filterQuery?: FilterQueryT[];
};

type ItemT = { _id: string } & ObjT;

type ListResponseT<T = ItemT> = {
    isLimit: boolean;
    count: number;
    models: T[];
};

interface EditorI<P = ObjT, S = ObjT> extends DefaultI<PropsT & P, StateT & S> {
    notChangesProps?: string[];
    changes: Record<string, unknown>;
    deletes: Record<string, Set<string>>;
    listName?: string;
    listStep: number;
    listCurrentStep: number;
    listDir: 'vertical' | 'horizontal';
    listProcess?: boolean;
    listReverse?: boolean;
    listScrollTargetNode?: HTMLElement;
    listRenderKeys: string[];
    listUpdateKeys: string[];
    listSearchTimerId?: ReturnType<typeof setTimeout>;
    listSearchPreTimerId?: ReturnType<typeof setTimeout>;
    listFilterName?: string;
    listSearchItemClass?: string;
    listRefreshName?: string;
    listForceUpdateKey?: string;

    setValue(data: {
        data: ObjT;
        targetName: string;
        arrById?: boolean;
        setData?: (d: ObjT) => void;
        item?: any;
    }): Promise<void>;
    getValue(data: { key: string; targetName: string; target?: ObjT; arrById?: boolean }): {
        target?: ObjT;
        key?: string;
        value?: unknown;
    };
    getSavedTargetName(this: EditorI, name: string): string;
    getChangedTarget(this: EditorI, data: { targetName: string }): ObjT | undefined;
    addArrayItems(data: {
        key: string;
        targetName: string;
        target?: ObjT;
        items: ObjT[];
    }): Promise<void>;
    deleteArrayItems(data: {
        key: string;
        targetName: string;
        target?: ObjT;
        items: string[];
    }): Promise<void>;
    initTarget(
        this: EditorI,
        data: { data: ObjT; targetName: string; otherState?: ObjT },
    ): Promise<void>;

    initScrollList(this: EditorI, target: HTMLElement | string | undefined): Promise<void>;
    listScrollHandler(this: EditorI, e: Event): Promise<void>;
    getListQuery(this: EditorI): FilterQueryT[];
    getListQueryStr(this: EditorI, q: FilterQueryT[]): string;
    getListItemsMore(this: EditorI): Promise<void>;
    getListItems?(
        this: EditorI,
        data: { query: FilterQueryT[] },
    ): Promise<{ items: ItemT[]; count: number; isLimit?: boolean }>;
    setListItems(
        this: EditorI,
        data: { items: ItemT[]; count: number; isLimit?: boolean; concat?: boolean },
    ): Promise<void>;
    resetListItems(this: EditorI, data: { isScroll?: boolean; isAll?: boolean }): Promise<void>;
    sortListItems?: (items: ItemT[]) => ItemT[];
    afterSetListItems?(this: EditorI): Promise<void>;

    setListItemsKeys(this: EditorI, items?: ItemT[]): Promise<void>;
    modifySetListItems?(this: EditorI, items: ItemT[]): ItemT[];
    addListItems(this: EditorI, data: { items: ItemT[] }): Promise<void>;
    deleteListItems(this: EditorI, data: { items: string[]; prop?: string }): Promise<void>;
    updateListItems(
        this: EditorI,
        data: { items: ObjT[]; isFull?: boolean; isAdd?: boolean; prop?: string },
    ): Promise<void>;
    searchListItems(this: EditorI, data: { query?: FilterQueryT[] }): Promise<void>;
    setRenderKey(this: EditorI): Promise<void>;
    setError(this: EditorI, error?: ErrorT, focus?: boolean): Promise<void>;
    getDeepValue(this: EditorI, o: any, prop: string): unknown;
    checkEdited(this: EditorI, targetName: string): boolean;

    deleteItems(this: EditorI, data: { items: string[]; name: string }): Promise<void>;

    filterHandler(
        this: EditorI,
        e: CustomEvent<{ name: string; query: FilterQueryT[] }>,
    ): Promise<void>;
    getFilterItems<T extends ItemT>(data: {
        items: T[];
        filter: (i: T, f: Partial<Record<string, string[]>>) => boolean;
    }): T[];

    refreshList(this: EditorI, e: CustomEvent<{ name: string; ids?: string[] }>): Promise<void>;
}

export default EditorI;
export type { ListResponseT };
