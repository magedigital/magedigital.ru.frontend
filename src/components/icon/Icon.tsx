import React from 'react';

import Default from '@components/default/Default.tsx';

import loadIcon from './methods/loadIcon.ts';

import IconI from './types.ts';

import { s } from '../../utils/seo.ts';
import icons from './static/icons.ts';

class Icon extends Default<IconI['props'], IconI['state']> implements IconI {
    constructor(props: IconI['props']) {
        super(props);
        this.state = {};
    }

    icons = icons;

    loadIcon = loadIcon;

    componentDidMount() {
        this.loadIcon();
    }

    render() {
        const { Component } = this.state;
        const { className, onClick } = this.props;

        if (s()) {
            return null;
        }

        return (
            <i
                className={this.getClass('icon', '_COL', Component ? '_show' : '', className)}
                onClick={onClick}
            >
                <>{Component || null}</>
            </i>
        );
    }
}

export default Icon;
