import React from 'react';

import Button from '@/src/components/button/Button.tsx';
import Checkbox from '@/src/components/checkbox/Checkbox.tsx';
import Editor from '@/src/components/editor/Editor.tsx';
import FileField from '@/src/components/fileField/FileField.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import Input from '@/src/components/input/Input.tsx';
import Media from '@/src/components/media/Media.tsx';
import { appStore } from '@/src/store/store.tsx';
import { converFileSize } from '@/src/utils/convertFileSize.ts';

import init from './methods/init.ts';

import { contactFormTypes } from './static/types.ts';
import ContactsFormI from './types.ts';

class ContactsForm
    extends Editor<ContactsFormI['props'], ContactsFormI['state']>
    implements ContactsFormI
{
    parent: ContactsFormI['parent'];

    constructor(props: ContactsFormI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    renderLinks() {
        return (
            <div className="contactsForm__links _COL">
                <a href="#" className="contactsForm__link">
                    <Icon name="mail" />
                    hello@magedigital.ru
                </a>
                <a href="#" className="contactsForm__link">
                    <Icon name="phone" />
                    +7 499 638-24-69
                </a>
            </div>
        );
    }

    render() {
        const { form } = this.state;

        return (
            <div ref={this.parent} className="contactsForm _FULL">
                <div className="contactsForm__inner _INNER _FULL_H">
                    <Icon
                        name="popup-close"
                        className="contactsForm__close _CLICK"
                        onClick={() => {
                            appStore.getState().closePopup({ name: 'contactsFormPopup' });
                        }}
                    />
                    <div className="contactsForm__content _FULL _NOSCROLL">
                        <div className="contactsForm__contentInner">
                            <div className="contactsForm__block _preview">
                                <h2 className="contactsForm__title">
                                    Давайте
                                    <br />
                                    общаться
                                </h2>
                                <p className="contactsForm__text">
                                    Расскажите немного о предстоящем проекте и оставьте свои
                                    координаты в&nbsp;удобной для вас форме - мы скоро свяжемся с
                                    вами
                                </p>
                                <Media check={(d) => d === 'desktop'}>{this.renderLinks()}</Media>
                            </div>
                            <div className="contactsForm__block _form">
                                <div className="contactsForm__form _COL">
                                    <div className="contactsForm__formBlock">
                                        <p className="contactsForm__formBlockTitle">
                                            Тип диджитал активации:
                                        </p>
                                        <div className="contactsForm__formBlockContent">
                                            <div className="contactsForm__formTypes">
                                                {contactFormTypes.map((t) => (
                                                    <label
                                                        className="contactsForm__formType _CLICK"
                                                        key={t.id}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={form?.types?.includes(t.id)}
                                                            onChange={async () => {
                                                                await this.setValue({
                                                                    data: { types: t.id },
                                                                    targetName: 'form',
                                                                });
                                                            }}
                                                        />
                                                        <div className="contactsForm__formTypeView">
                                                            {t.title}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contactsForm__formBlock">
                                        <p className="contactsForm__formBlockTitle">
                                            Ваши контакты:
                                        </p>
                                        <div className="contactsForm__formBlockContent">
                                            <div className="contactsForm__formFields">
                                                <div className="contactsForm__formField _name _short">
                                                    <Input
                                                        support="Имя"
                                                        value={form?.name ?? ''}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { name: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _name _short">
                                                    <Input
                                                        support="Телефон или Email"
                                                        value={form?.contact ?? ''}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { contact: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _about _area">
                                                    <Input
                                                        support="Расскажите немного о проекте или вашем поводе пообщаться, например, запросить закрытую презентацию..."
                                                        value={form?.about ?? ''}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { about: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                        area={{
                                                            minHeight: () => 92 * window.sizeK,
                                                            isCalc: false,
                                                        }}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _auto">
                                                    <FileField
                                                        support="Приложить брифчик <br class='_MOBILE' />(файл, не более 20 мб)"
                                                        value={form?.filename}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: {
                                                                    filename: d.file
                                                                        ? [
                                                                              d.file.name,
                                                                              `(${converFileSize(d.file.size)})`,
                                                                          ].join(' ')
                                                                        : undefined,
                                                                },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _auto">
                                                    <Checkbox
                                                        value={!!form?.agreement}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { agreement: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                    >
                                                        Согласен с{' '}
                                                        <a href="#">политикой конфиденциальности</a>
                                                        , обработкой{' '}
                                                        <a href="#">персональных данных</a>
                                                    </Checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contactsForm__formButton">
                                        <Button className="_dark">Отправить</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactsForm;
