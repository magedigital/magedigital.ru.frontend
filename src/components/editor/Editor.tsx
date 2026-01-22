import React from 'react';

import Default from '@components/default/Default.tsx';

import addArrayItems from './methods/addArrayItems.ts';
import addListItems from './methods/addListItems.ts';
import checkEdited from './methods/checkEdited.ts';
import deleteArrayItems from './methods/deleteArrayItems.ts';
import deleteItems from './methods/deleteItems.ts';
import deleteListItems from './methods/deleteListItems.ts';
import filterHandler from './methods/filterHandler.ts';
import getChangedTarget from './methods/getChangedTarget.ts';
import getDeepValue from './methods/getDeepValue.ts';
import getFilterItems from './methods/getFilterItems.ts';
import getListItemsMore from './methods/getListItemsMore.ts';
import getListQuery from './methods/getListQuery.ts';
import getListQueryStr from './methods/getListQueryStr.ts';
import getSavedTargetName from './methods/getSavedTargetName.ts';
import getValue from './methods/getValue.ts';
import initScrollList from './methods/initScrollList.ts';
import initTarget from './methods/initTarget.ts';
import listScrollHandler from './methods/listScrollHandler.ts';
import refreshList from './methods/refreshList.ts';
import resetListItems from './methods/resetListItems.ts';
import searchListItems from './methods/searchListItems.ts';
import setError from './methods/setError.ts';
import setListItems from './methods/setListItems.ts';
import setListItemsKeys from './methods/setListItemsKeys.ts';
import setRenderKey from './methods/setRenderKey.ts';
import setValue from './methods/setValue.ts';
import updateListItems from './methods/updateListItems.ts';

import EditorI from './types.ts';

class Editor<P = ObjT, S = ObjT>
    extends Default<EditorI<P, S>['props'], EditorI<P, S>['state']>
    implements EditorI<P, S>
{
    parent: EditorI['parent'];
    listFilterName: EditorI['listFilterName'];
    listRefreshName: EditorI['listRefreshName'];
    keysCallback: EditorI['keysCallback'];

    constructor(props: EditorI<P, S>['props']) {
        super(props);
        this.state = {} as EditorI<P, S>['state'];

        this.listScrollHandler = this.listScrollHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.parent = React.createRef();
    }

    changes = {};
    deletes = {};

    listCurrentStep = 0;
    listStep = 50;
    listDir = 'vertical' as const;
    listRenderKeys = [] as string[];
    listUpdateKeys = [] as string[];

    getValue = getValue;
    setValue = setValue;
    getSavedTargetName = getSavedTargetName;
    getChangedTarget = getChangedTarget;
    addArrayItems = addArrayItems;
    deleteArrayItems = deleteArrayItems;
    initTarget = initTarget;

    initScrollList = initScrollList;
    listScrollHandler = listScrollHandler;
    getListItemsMore = getListItemsMore;
    setListItems = setListItems;
    resetListItems = resetListItems;
    getListQuery = getListQuery;
    getListQueryStr = getListQueryStr;
    setError = setError;
    getDeepValue = getDeepValue;

    deleteItems = deleteItems;
    checkEdited = checkEdited;

    setListItemsKeys = setListItemsKeys;
    addListItems = addListItems;
    deleteListItems = deleteListItems;
    updateListItems = updateListItems;
    searchListItems = searchListItems;
    setRenderKey = setRenderKey;

    filterHandler = filterHandler;
    getFilterItems = getFilterItems;

    refreshList = refreshList;

    componentDidMount(): void {
        super.componentDidMount();

        if (this.listFilterName) {
            (document.addEventListener as CustomListenerT)('filter', this.filterHandler);

            this.unmountHandlers.visibility = () =>
                (document.removeEventListener as CustomListenerT)('filter', this.filterHandler!);
        }

        if (this.listRefreshName) {
            (document.addEventListener as CustomListenerT)('refreshList', this.refreshList);

            this.unmountHandlers.visibility = () =>
                (document.removeEventListener as CustomListenerT)('refreshList', this.refreshList!);
        }
    }
}

export default Editor;
