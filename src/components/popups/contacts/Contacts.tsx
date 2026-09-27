import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import Media from '@/src/components/media/Media.tsx';
import { appStore } from '@/src/store/store.tsx';

import ContactsPopupI from './types.ts';

class ContactsPopup
    extends Default<ContactsPopupI['props'], ContactsPopupI['state']>
    implements ContactsPopupI
{
    parent: ContactsPopupI['parent'];

    constructor(props: ContactsPopupI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    renderPhone() {
        return (
            <a
                className="contactsPopup__button _ROW _CLICK"
                href="tel:+74996382469"
                target="_blank"
                rel="noreferrer"
            >
                <div className="contactsPopup__buttonIcon">
                    <Icon name="contacts-phone" />
                </div>
                <div className="contactsPopup__buttonContent">+7 499 638 24 69</div>
            </a>
        );
    }

    renderMail() {
        return (
            <a
                className="contactsPopup__button _ROW _CLICK"
                href="mailto:hello@magedigital.ru"
                target="_blank"
                rel="noreferrer"
            >
                <div className="contactsPopup__buttonIcon">
                    <Icon name="contacts-mail" />
                </div>
                <div className="contactsPopup__buttonContent">hello@magedigital.ru</div>
            </a>
        );
    }

    render() {
        return (
            <div ref={this.parent} className="contactsPopup _NOSCROLL">
                <div className="contactsPopup__inner _INNER">
                    <h2 className="contactsPopup__title">Аккредитованная <br className='_MOBILE' />IT-компания</h2>
                    <Icon
                        name="popup-close-thin"
                        className="contactsPopup__close _CLICK"
                        onClick={() => {
                            appStore.getState().closePopup({ name: 'contactsPopup' });
                        }}
                    />
                    <div className="contactsPopup__content">
                        <div className="contactsPopup__block">
                            <h3>Реквизиты и контакты</h3>
                            <ul>
                                <li>
                                    Полное наименование: <br />
                                    ООО {'"'}МЭЙДЖ ДИДЖИТАЛ{'"'}
                                </li>
                                <li>ИНН: 7705925488</li>
                                <li>ОГРН: 1107746644180</li>
                                <li>
                                    Основной вид деятельности: Разработка компьютерного программного
                                    обеспечения (62.01)
                                </li>
                                <li>
                                    Юридический адрес: 111673, г. Москва, ул. Суздальская, д. 22, к.
                                    1, кв. 88
                                </li>
                                <li>Фактический адрес: 127051, г. Москва, ул. Трубная, 32 стр.4</li>
                                <li>Телефон: +7 499 638-24-69</li>
                                <li>
                                    Электронная почта:{' '}
                                    <a href="mailto:hello@magedigital.ru">hello@magedigital.ru</a>
                                </li>
                            </ul>
                            <Media check={(d) => d === 'desktop'}>
                                <div className="contactsPopup__buttonWrapper">
                                    {this.renderPhone()}
                                </div>
                            </Media>
                        </div>
                        <div className="contactsPopup__block">
                            <h3>Виды деятельности в области информационных технологий</h3>
                            <p>
                                В соответствии с перечнем, утверждённым приказом Минцифры России от
                                11.05.2023 № 449, компания осуществляет следующие виды деятельности:
                            </p>
                            <p>
                                1.01. Проектирование, и (или) обследование, и (или) разработка, и
                                (или) адаптация, и (или) модификация (в том числе локализация,
                                кастомизация, доработка), и (или) обратное проектирование
                                (реверсивный инжиниринг), и (или) модернизация, и (или) обновление,
                                и (или) установка, и (или) интеграция, и (или) настройка, и (или)
                                конфигурирование, и (или) внедрение, и (или) сопровождение, и (или)
                                тестирование, и (или) испытания, и (или) техническая поддержка, и
                                (или) эксплуатация, включая администрирование, а также оказание
                                услуг (в том числе консультационных, услуг по обучению, экспертных
                                услуг и иных) в указанных видах деятельности (далее - проектирование
                                и (или) иная деятельность, а также оказание услуг), в отношении
                                программ для электронных вычислительных машин (далее - программы для
                                ЭВМ), и (или) баз данных (в том числе их обновлений и исправлений),
                                и (или) визуальных пользовательских интерфейсов.
                            </p>
                            <Media check={(d) => d === 'desktop'}>
                                <div className="contactsPopup__buttonWrapper">
                                    {this.renderMail()}
                                </div>
                            </Media>
                        </div>
                    </div>
                    <Media check={(d) => d === 'mobile'}>
                        <div className="contactsPopup__buttonWrapper">
                            {this.renderPhone()}
                            {this.renderMail()}
                        </div>
                    </Media>
                </div>
            </div>
        );
    }
}

export default ContactsPopup;
