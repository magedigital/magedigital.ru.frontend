import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import AnimateTextI from './types.ts';

class AnimateText
    extends Default<AnimateTextI['props'], AnimateTextI['state']>
    implements AnimateTextI
{
    parent: AnimateTextI['parent'];

    constructor(props: AnimateTextI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { children, delay, className, disabled } = this.props;

        if (typeof children !== 'string') {
            return;
        }

        const Tag = (this.props.tag ?? 'p') as React.ElementType;
        const lines = children.split('<br/>');
        let cur = 0;

        return (
            <Tag className={this.getClass(className, !disabled && '_TEXT_ANIM_WRAPPER')}>
                {lines.map((line, li) => (
                    <>
                        {new Strings()
                            .setSpaces(line, true)
                            .split(' ')
                            .map((w, ii, ar) => (
                                <>
                                    <div key={ii} className="_TEXT_ANIM">
                                        <span style={{ transitionDelay: `${cur++ * delay}ms` }}>
                                            {w}
                                        </span>
                                    </div>
                                    {ii < ar.length - 1 && <span key={[ii, 'em'].join('')}> </span>}
                                </>
                            ))}
                        {li < lines.length - 1 && <br />}
                    </>
                ))}
            </Tag>
        );
    }
}

export default AnimateText;
