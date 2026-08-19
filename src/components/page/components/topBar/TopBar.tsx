import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import { AppRouter } from '@/src/index.tsx';
import { appStore } from '@/src/store/store.tsx';
import { navPages } from '@/src/views/root/components/footer/static/pages.ts';

import init from './methods/init.ts';
import onContactsHover from './methods/onContactsHover.ts';
import setActive from './methods/setActive.ts';
import updatedStateCallback from './methods/updatedStateCallback.ts';

import TopBarI from './types.ts';

class TopBar extends Default<TopBarI['props'], TopBarI['state']> implements TopBarI {
    parent: TopBarI['parent'];

    constructor(props: TopBarI['props']) {
        super(props);
        this.state = {
            isMenuReadyLinks: this.props.mode === 'default',
        };

        this.parent = React.createRef();
    }

    init = init;

    updatedStateCallback = updatedStateCallback;

    setActive = setActive;

    onContactsHover = onContactsHover;

    render() {
        const { activeLink, isMenuActive, isMenuReadyLinks } = this.state;
        const { mode, device, onMobMenu, isMobMenuShow } = this.props;

        return (
            <div ref={this.parent} className={this.getClass('topBar _SECTION')}>
                <div className="topBar__inner _INNER">
                    <Icon
                        name="logo"
                        className="topBar__logo _CLICK"
                        onClick={() => {
                            AppRouter.changePage({ pageName: 'index' });
                        }}
                    />
                    {device === 'desktop' && (
                        <>
                            {mode === 'fix' && (
                                <div
                                    className={this.getClass(
                                        'topBar__menu _CLICK',
                                        isMenuActive && '_hide',
                                    )}
                                    onMouseEnter={() => {
                                        this.addStack(async () => {
                                            await this.asyncSetState({ isMenuActive: true });

                                            this.timers.isMenuReadyLinks = setTimeout(async () => {
                                                await this.asyncSetState({
                                                    isMenuReadyLinks: true,
                                                });
                                            }, 500);
                                        });
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
                                        async () =>
                                            await this.asyncSetState({
                                                isMenuActive: false,
                                                isMenuReadyLinks: this.props.mode === 'default',
                                            }),
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
                                        onClick={() => {
                                            AppRouter.changePage({ pageName: p });
                                        }}
                                    >
                                        <div className="topBar__navLinkInner">
                                            <span>{AppRouter.pages[p].content}</span>
                                        </div>
                                        <div
                                            className="topBar__navLinkInner"
                                            onMouseMove={() => {
                                                if (isMenuReadyLinks && activeLink !== p) {
                                                    this.addStack(
                                                        async () => await this.setActive(p),
                                                    );
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                this.addStack(
                                                    async () => await this.setActive(undefined),
                                                );
                                            }}
                                        >
                                            <span>{AppRouter.pages[p].content}</span>
                                        </div>
                                    </li>
                                ))}
                            </nav>
                            <div
                                className="topBar__contacts _CLICK"
                                onMouseEnter={() => {
                                    this.addStack(this.onContactsHover.bind(this, 'enter'));
                                }}
                                onMouseLeave={() => {
                                    this.addStack(this.onContactsHover.bind(this, 'leave'));
                                }}
                                onClick={() => {
                                    appStore.getState().showContactForm(true);
                                }}
                            >
                                <Icon name="smile" className="topBar__contactsIcon _start" />
                                <div className="topBar__contactsButton _FULL _ROW _ROW_CENTER">
                                    Пообщаемся
                                </div>
                                <Icon name="smile" className="topBar__contactsIcon _end" />
                            </div>
                        </>
                    )}
                    {device === 'mobile' && (
                        <>
                            <div className="topBar__mob _ROW">
                                <div
                                    className={this.getClass(
                                        'topBar__contacts _CLICK',
                                        isMobMenuShow && '_active',
                                    )}
                                    onClick={() => {
                                        appStore.getState().showContactForm(true);
                                    }}
                                >
                                    <Icon name="smile" className="topBar__contactsIcon _end" />
                                </div>
                                <div
                                    className={this.getClass(
                                        'topBar__menuBtn',
                                        isMobMenuShow && '_active',
                                    )}
                                    onClick={() => onMobMenu?.()}
                                >
                                    <div className="topBar__menuBtnPoint" />
                                    <div className="topBar__menuBtnPoint" />
                                    <div className="topBar__menuBtnPoint" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default TopBar;
