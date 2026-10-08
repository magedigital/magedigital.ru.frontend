import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import { AppRouter } from '@/src/index.tsx';
import { StoreT, WithStore, appStore } from '@/src/store/store.tsx';

import init from './methods/init.ts';

import FooterI from './types.ts';

import { navPages } from './static/pages.ts';

class Footer extends Default<FooterI['props'], FooterI['state']> implements FooterI {
    parent: FooterI['parent'];

    constructor(props: FooterI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { contents } = this.props;

        return (
            <div ref={this.parent} className="footer">
                <div className="footer__banner" data-theme>
                    <div className="footer__bannerContent _COL">
                        <AnimateText className="footer__bannerTitle" tag="h3" delay={50}>
                            {contents.global?.learnMore?.title}
                        </AnimateText>
                        <AnimateText className="footer__bannerText" delay={15}>
                            {contents.global?.learnMore?.subtitle}
                        </AnimateText>
                        <div className="footer__button">
                            <Button
                                className="_dark"
                                icon="smile"
                                onClick={() => {
                                    appStore.getState().setPopup({ name: 'contactsFormPopup' });
                                }}
                            >
                                {contents.global?.learnMore?.button?.label}
                            </Button>
                        </div>
                    </div>
                    <img
                        className="footer__bannerBubble"
                        src={require('@/src/media/footer-bubble.png')}
                    />
                </div>
                <div className="footer__content _SECTION">
                    <div className="footer__decor">
                        <div className="footer__flash" />
                        <div className="footer__ring" />
                    </div>

                    <div className="footer__glass" />
                    <div className="footer__inner _INNER">
                        <Icon name="logo" className="footer__logo" />
                        <div className="footer__blocks">
                            <div className="footer__block">
                                <nav className="footer__nav _COL">
                                    {navPages.map((p) => (
                                        <li
                                            className="footer__navLink _CLICK"
                                            key={p}
                                            onClick={() => {
                                                if (p === 'contacts') {
                                                    appStore
                                                        .getState()
                                                        .setPopup({ name: 'contactsFormPopup' });
                                                } else {
                                                    AppRouter.changePage({ pageName: p });
                                                }
                                            }}
                                        >
                                            {AppRouter.pages[p].content}
                                        </li>
                                    ))}
                                </nav>
                            </div>
                            <div className="footer__block _links">
                                <div className="footer__links _COL">
                                    <a
                                        href={`mailto:${contents.global?.siteSettings?.email}`}
                                        className="footer__link"
                                    >
                                        {contents.global?.siteSettings?.email}
                                    </a>
                                    <a
                                        href={`tel:${contents.global?.siteSettings?.phone}`}
                                        className="footer__link"
                                    >
                                        {contents.global?.siteSettings?.phone}
                                    </a>
                                    <a href="#" className="footer__link">
                                        {contents.global?.siteSettings?.address}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="footer__blocks _docs">
                            <div className="footer__block">
                                <span
                                    className="footer__doc _CLICK"
                                    onClick={() => {
                                        appStore.getState().setPopup({ name: 'contactsPopup' });
                                    }}
                                >
                                    Аккредитованная ИТ-компания
                                </span>
                            </div>
                            <div className="footer__block">
                                <a
                                    href={contents.global?.siteSettings?.privacyPolicyUrl}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="footer__doc"
                                >
                                    Политика конфиденциальности
                                </a>
                            </div>
                        </div>
                        <div className="footer__blocks _docs">
                            <div className="footer__block">
                                <p className="footer__doc _copy">
                                    © Mage Digital 2009-{new Date().getFullYear()}
                                </p>
                            </div>
                            <div className="footer__block">
                                <a
                                    href="https://t.me/magedigital_official"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="footer__doc _channel"
                                >
                                    Канал Mage Club
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStore = (s: StoreT) => ({
    contents: s.contents,
});

export default WithStore(Footer, mapStore);
