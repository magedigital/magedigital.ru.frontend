import React from 'react';

import Default from '@components/default/Default.tsx';
import Icon from '@components/icon/Icon.tsx';

import ServicesPopupI from './types.ts';

class ServicesPopup
    extends Default<ServicesPopupI['props'], ServicesPopupI['state']>
    implements ServicesPopupI
{
    parent: ServicesPopupI['parent'];

    constructor(props: ServicesPopupI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { setState } = this.props;

        return (
            <div ref={this.parent} className="popup">
                <div className="popup__inner _INNER">
                    <h2 className="popup__title">Услуги</h2>
                    <Icon
                        name="popup-close"
                        className="popup__close _CLICK"
                        onClick={() => {
                            setState(false);
                        }}
                    />
                    <div className="popup__content">
                        <div className="popup__block">
                            <h3>Продукты, услуги и работы</h3>
                            <ul>
                                <li>
                                    Промо-сайты и спецпроекты — проектирование и разработка сайтов и
                                    интерактивных кампаний под ключ, включая высоконагруженные
                                    проекты.
                                </li>
                                <li>
                                    Механики участия и чековые акции — разработка программного
                                    обеспечения для стимулирования потребительской активности:
                                    регистрация&nbsp;чеков, начисление баллов, розыгрыши,
                                    верификация и модерация заявок.
                                </li>
                                <li>
                                    Личные кабинеты и CRM-логика — пользовательские кабинеты,
                                    административные панели, системы модерации контента и заявок,
                                    бизнес-логика работы с данными участников.
                                </li>
                                <li>
                                    Мини-игры и геймификация — разработка браузерных игр и
                                    интерактивных механик, включая графику, анимацию и игровую
                                    логику.
                                </li>
                                <li>
                                    Интеграции (API, AI) — интеграция с внешними сервисами,
                                    платёжными и учётными системами, подключение AI-инструментов
                                    (распознавание, генерация, обработка данных).
                                </li>
                                <li>
                                    PWA, боты и нестандартные решения — прогрессивные
                                    веб-приложения, чат-боты, индивидуальная разработка под задачу.
                                </li>
                                <li>
                                    Техническая поддержка и сопровождение — эксплуатация,
                                    мониторинг, доработка и развитие реализованных проектов.
                                </li>
                            </ul>
                        </div>
                        <div className="popup__block">
                            <h3>Стек технологий</h3>
                            <ul>
                                <li>
                                    Языки: <br />
                                    JavaScript, TypeScript, PHP, Python
                                </li>
                                <li>
                                    Frontend: <br />
                                    React, Vue, HTML5, CSS3
                                </li>
                                <li>
                                    Интерактивная графика и GameDev: <br />
                                    WebGL, Three.js, PixiJS, Phaser
                                </li>
                                <li>
                                    Backend: <br />
                                    PHP, Symfony, 1C-Битрикс / Bitrix Framework, Node.js
                                </li>
                                <li>
                                    Базы данных: <br />
                                    MySQL, PostgreSQL, Redis
                                </li>
                                <li>
                                    Инфраструктура и инструменты: <br />
                                    Docker, Git, Bitrix VM
                                </li>
                            </ul>
                            <h3>Стоимость</h3>
                            <p>
                                Стоимость работ рассчитывается индивидуально под задачу и зависит от
                                объёма, сроков и сложности проекта. Для расчёта под вашу задачу{' '}
                                <a
                                    href="mailto:hello@magedigital.ru"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    свяжитесь с&nbsp;нами
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicesPopup;
