import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import PageI from './types.ts';

import renderPage from './renders/renderPage.tsx';

class Page<P = {}, S = {}>
    extends Default<PageI<P, S>['props'], PageI<P, S>['state']>
    implements PageI<P, S>
{
    parent: PageI['parent'];

    constructor(props: PageI<P, S>['props']) {
        super(props);
        this.state = {} as PageI<P, S>['state'];

        this.parent = React.createRef();
    }

    name = '';

    init = init;

    renderPage = renderPage;
}

export default Page;
