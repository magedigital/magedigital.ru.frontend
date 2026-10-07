import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import LoaderI from './types.ts';

import Fade from '../fade/Fade.tsx';

class Loader extends Default<LoaderI['props'], LoaderI['state']> implements LoaderI {
    parent: LoaderI['parent'];

    constructor(props: LoaderI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { isShow, className } = this.props;

        return (
            <Fade
                className={this.getClass('loader _FULL _COL _COL_CENTER', className)}
                isShow={isShow}
            >
                <div className="loader__spinner">
                    <div className="loader__spinnerItem"></div>
                </div>
            </Fade>
        );
    }
}

export default Loader;
