import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import LazyI from './types.ts';

class Lazy extends Default<LazyI['props'], LazyI['state']> implements LazyI {
    parent: LazyI['parent'];

    constructor(props: LazyI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { isVisible } = this.state;
        const { className, render } = this.props;

        return (
            <div ref={this.parent} className={this.getClass(className)}>
                {isVisible && render()}
            </div>
        );
    }
}

export default Lazy;
