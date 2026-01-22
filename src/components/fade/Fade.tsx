import React from 'react';

import Default from '@components/default/Default.tsx';

import checkChange from './methods/checkChange.ts';

import FadeI from './types.ts';

class Fade extends Default<FadeI['props'], FadeI['state']> implements FadeI {
    parent: FadeI['parent'];

    constructor(props: FadeI['props']) {
        super(props);
        this.state = {
            isShow: false,
        };

        this.parent = React.createRef();
    }

    checkChange = checkChange;

    componentDidMount(): void {
        this.checkChange(true);
    }

    componentDidUpdate() {
        this.checkChange();
    }

    render() {
        const { isShow } = this.state;
        const { children, className = '', onClick, style } = this.props;

        if (!isShow) {
            return <></>;
        }

        return (
            <div ref={this.parent} className={`fade ${className}`} onClick={onClick} style={style}>
                {children}
            </div>
        );
    }
}

export default Fade;
