import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import { AppRouter } from '@/src/index.tsx';
import { navPages } from '@/src/views/root/components/footer/static/pages.ts';

import MobMenuI from './types.ts';

class MobMenu extends Default<MobMenuI['props'], MobMenuI['state']> implements MobMenuI {
    parent: MobMenuI['parent'];

    constructor(props: MobMenuI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { onShowState } = this.props;

        return (
            <div ref={this.parent} className="mobMenu _FULL _NOSCROLL">
                <div className="mobMenu__inner _INNER">
                    <nav className={this.getClass('mobMenu__nav _COL')}>
                        {navPages.map((p) => (
                            <li
                                className={this.getClass('mobMenu__navLink _CLICK')}
                                key={p}
                                data-key={p}
                                onClick={() => {
                                    AppRouter.changePage({ pageName: p });
                                    onShowState(false);
                                }}
                            >
                                {AppRouter.pages[p].content}
                            </li>
                        ))}
                    </nav>
                    <div className="mobMenu__links _COL">
                        <a href="#" className="mobMenu__link">
                            hello@magedigital.ru
                        </a>
                        <a href="#" className="mobMenu__link">
                            +7 499 638-24-69
                        </a>
                        <a href="#" className="mobMenu__link _doc">
                            Аккредитованная ИТ-компания
                        </a>
                        <p className="mobMenu__link _copy">
                            © Mage Digital 2009-{new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobMenu;
