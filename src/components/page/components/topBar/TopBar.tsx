import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import { AppRouter } from '@/src/index.tsx';
import { navPages } from '@/src/views/root/components/footer/static/pages.ts';

import init from './methods/init.ts';
import setActive from './methods/setActive.ts';

import TopBarI from './types.ts';

class TopBar extends Default<TopBarI['props'], TopBarI['state']> implements TopBarI {
    parent: TopBarI['parent'];

    constructor(props: TopBarI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    setActive = setActive;

    render() {
        const { activeLink, isMenuActive } = this.state;
        const { mode } = this.props;

        return (
            <div ref={this.parent} className={this.getClass('topBar _SECTION')}>
                <div className="topBar__inner _INNER">
                    <Icon name="logo" className="topBar__logo" />
                    {mode === 'fix' && (
                        <div
                            className={this.getClass(
                                'topBar__menu _CLICK',
                                isMenuActive && '_hide',
                            )}
                            onMouseEnter={() => {
                                this.addStack(
                                    async () => await this.asyncSetState({ isMenuActive: true }),
                                );
                            }}
                        >
                            Меню
                        </div>
                    )}
                    <nav
                        className={this.getClass(
                            'topBar__nav _ROW',
                            mode === 'fix' && !isMenuActive && '_hide',
                        )}
                        onMouseLeave={() => {
                            this.addStack(
                                async () => await this.asyncSetState({ isMenuActive: false }),
                            );
                        }}
                    >
                        <div className="topBar__navBack" />
                        {navPages.map((p) => (
                            <li
                                className={this.getClass(
                                    'topBar__navLink _CLICK',
                                    activeLink === p && '_active',
                                )}
                                key={p}
                                data-key={p}
                                onMouseEnter={() => {
                                    this.addStack(async () => await this.setActive(p));
                                }}
                                onMouseLeave={() => {
                                    this.addStack(async () => await this.setActive(undefined));
                                }}
                            >
                                <div className="topBar__navLinkInner">
                                    <span>{AppRouter.pages[p].content}</span>
                                </div>
                                <div className="topBar__navLinkInner">
                                    <span>{AppRouter.pages[p].content}</span>
                                </div>
                            </li>
                        ))}
                    </nav>
                    <div className="topBar__contacts">
                        <div className="topBar__contactsButton _CLICK">
                            <Icon name="smile" className="topBar__contactsIcon" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopBar;
