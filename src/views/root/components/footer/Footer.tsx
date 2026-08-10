import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import { AppRouter } from '@/src/index.tsx';

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
        return (
            <div ref={this.parent} className="footer">
                <div className="footer__glass" />
                <div className="footer__banner">
                    <div className="footer__bannerContent _COL">
                        <AnimateText className="footer__bannerTitle" tag="h3" delay={50}>
                            Узнать больше
                        </AnimateText>
                        <AnimateText className="footer__bannerText" delay={15}>
                            Есть бриф, тендер или пока только идея? Подключимся на раннем этапе:
                            поможем оценить механику, риски, сроки и стоимость digital-части вашего
                            проекта.
                        </AnimateText>
                        <div className="footer__button">
                            <Button className="_dark">Написать нам</Button>
                        </div>
                    </div>
                    <img
                        className="footer__bannerBubble"
                        src={require('@/src/media/footer-bubble.png')}
                    />
                </div>
                <div className="footer__content _SECTION">
                    <div className="footer__inner _INNER">
                        <div className="footer__blocks">
                            <div className="footer__block">
                                <nav className="footer__nav _COL">
                                    {navPages.map((p) => (
                                        <li className="footer__navLink _CLICK" key={p}>
                                            {AppRouter.pages[p].content}
                                        </li>
                                    ))}
                                </nav>
                            </div>
                            <div className="footer__block">
                                <Icon name="logo" className="footer__logo" />
                                <div className="footer__links _COL">
                                    <a href="#" className="footer__link">
                                        hello@magedigital.ru
                                    </a>
                                    <a href="#" className="footer__link">
                                        +7 499 638-24-69
                                    </a>
                                    <a href="#" className="footer__link">
                                        Москва, Трубная, 32с4
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="footer__blocks">
                            <div className="footer__block">
                                <a href="#" className="footer__doc">
                                    Аккредитованная ИТ-компания
                                </a>
                            </div>
                            <div className="footer__block">
                                <a href="#" className="footer__doc">
                                    Политика конфиденциальности
                                </a>
                            </div>
                        </div>
                        <p className="footer__copyright">
                            © Mage Digital 2009-{new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
