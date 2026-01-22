import React from 'react';

import loadComponent from './methods/loadComponent.ts';
import loadPage from './methods/loadPage.ts';

import LazyPageI from './types.ts';

import renderPage from './renders/renderPage.tsx';

export default class LazyPage
    extends React.Component<LazyPageI['props'], LazyPageI['state']>
    implements LazyPageI
{
    context: LazyPageI['context'];

    constructor(props: LazyPage['props']) {
        super(props);

        this.context = props.context;
    }

    loadComponent = loadComponent;
    loadPage = loadPage;

    renderPage = renderPage;
}
