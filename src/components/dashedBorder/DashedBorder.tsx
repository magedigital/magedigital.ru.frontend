import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import DashedBorderI from './types.ts';

class DashedBorder
    extends Default<DashedBorderI['props'], DashedBorderI['state']>
    implements DashedBorderI
{
    parent: DashedBorderI['parent'];

    constructor(props: DashedBorderI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { isInit } = this.state;
        const { className } = this.props;

        return (
            <div ref={this.parent} className={this.getClass('dashedBorder', className)}>
                <svg width="100%" height="100%" className="dashedBorder__svg">
                    <rect
                        className="dashedBorder__rect"
                        fill="none"
                        style={isInit ? { display: 'block' } : {}}
                    />
                </svg>
            </div>
        );
    }
}

export default DashedBorder;
