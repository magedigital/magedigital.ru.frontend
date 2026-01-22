import React from 'react';

import LoaderI from './types.ts';

import { s } from '../../utils/seo.ts';
import items from './static/items.ts';

class Loader extends React.Component<LoaderI['props']> implements LoaderI {
    constructor(props: LoaderI['props']) {
        super(props);
        this.state = {};
    }

    items = items;

    render() {
        const { className } = this.props;

        if (s()) {
            return null;
        }

        return (
            <div className={`loader ${className || ''}`}>
                {this.items.map((key) => (
                    <div className={`loader__item _COL _${key}`} key={key}>
                        <div className="loader__itemInner"></div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Loader;
