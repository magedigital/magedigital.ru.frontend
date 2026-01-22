import React from 'react';

import Default from '@components/default/Default.tsx';
import List from '@components/list/List.tsx';

import getPages from './methods/getPages.ts';
import init from './methods/init.ts';

import PagesI from './types.ts';

import { PageNamesT } from '../../services/router/static/pages.ts';
import { StoreT, WithStore } from '../../store/store.tsx';

class Pages extends Default<PagesI['props'], PagesI['state']> implements PagesI {
    constructor(props: PagesI['props']) {
        super(props);
        this.state = {
            pages: [],
        };
    }

    init = init;
    getPages = getPages;

    componentDidMount(): void {
        this.init();
    }

    render() {
        const {
            context,
            parentClass,
            itemClass,
            parentName,
            storePages,
            parentStyleProps = [],
            parentRealStyleProps = [],
        } = this.props;
        const pages = this.getPages();
        const renderKey = pages.map((page) => page._id).join('');

        return (
            <List
                renderKey={`${renderKey}${this.props.renderKey}`}
                items={pages}
                parentClass={parentClass || 'body__pages'}
                itemClass={itemClass || 'body__page'}
                itemStyleProps={[]}
                parentStyleProps={parentStyleProps}
                parentRealStyleProps={parentRealStyleProps}
                render={({ item }: { item: { _id: PageNamesT; isPopup?: boolean } }) => ({
                    item: this.props.pages[item._id]?.render.call(context),
                    className: item.isPopup ? '_popup' : '',
                })}
                disabled={parentName ? !storePages[parentName].isShow : undefined}
                allItems={this.getPages(true).map((page) => page._id)}
                currentItem={pages[0]?._id}
            />
        );
    }
}

const mapStore = (store: StoreT) => ({ storePages: store.pages });

export default WithStore(Pages, mapStore);
