import React from 'react';

import Button from '@/src/components/button/Button.tsx';
import Checkbox from '@/src/components/checkbox/Checkbox.tsx';
import Editor from '@/src/components/editor/Editor.tsx';
import FileField from '@/src/components/fileField/FileField.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import Input from '@/src/components/input/Input.tsx';
import Media from '@/src/components/media/Media.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';
import { StoreT, WithStore, appStore } from '@/src/store/store.tsx';
import { converFileSize } from '@/src/utils/convertFileSize.ts';

import init from './methods/init.ts';
import sendForm from './methods/sendForm.ts';

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

    formData = new FormData();

    init = init;

    sendForm = sendForm;

    renderLinks() {
        const { contents } = this.props;

        return (
            <div className="contactsForm__links _COL">
                <a
                    href={`mailto:${contents.global?.siteSettings?.email}`}
                    className="contactsForm__link"
                >
                    <Icon name="mail" />
                    {contents.global?.siteSettings?.email}
                </a>
                <a
                    href={`tel:${contents.global?.siteSettings?.phone}`}
                    className="contactsForm__link"
                >
                    <Icon name="phone" />
                    {contents.global?.siteSettings?.phone}
                </a>
            </div>
        );
    }

    render() {
        const { form, loadingKey } = this.state;
        const { contents } = this.props;
        const globalContent = contents.global?.contacts;

        return (
            <div
                ref={this.parent}
                className={this.getClass('contactsForm _FULL', globalContent && '_init')}
            >
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
                                <h2 className="contactsForm__title">{globalContent?.title}</h2>
                                <p
                                    className="contactsForm__text"
                                    dangerouslySetInnerHTML={{
                                        __html: new Strings().setSpaces(globalContent?.subtitle),
                                    }}
                                ></p>
                                <Media check={(d) => d === 'desktop'}>{this.renderLinks()}</Media>
                            </div>
                            <div className="contactsForm__block _form">
                                <div className="contactsForm__form _COL">
                                    <div className="contactsForm__formBlock">
                                        <p className="contactsForm__formBlockTitle">
                                            {globalContent?.tagsTitle}
                                        </p>
                                        <div className="contactsForm__formBlockContent">
                                            <div className="contactsForm__formTypes">
                                                {globalContent?.tags?.map((t) => (
                                                    <label
                                                        className="contactsForm__formType _CLICK"
                                                        key={t.id}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={form?.types?.includes(t.code!)}
                                                            onChange={async () => {
                                                                await this.setValue({
                                                                    data: { types: t.code },
                                                                    targetName: 'form',
                                                                });
                                                            }}
                                                        />
                                                        <div className="contactsForm__formTypeView">
                                                            {t.label}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contactsForm__formBlock">
                                        <p className="contactsForm__formBlockTitle">
                                            {globalContent?.contactsTitle}
                                        </p>
                                        <div className="contactsForm__formBlockContent">
                                            <div className="contactsForm__formFields">
                                                <div className="contactsForm__formField _name _short">
                                                    <Input
                                                        support={globalContent?.namePlaceholder}
                                                        value={form?.name ?? ''}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { name: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                        disabled={!!loadingKey}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _name _short">
                                                    <Input
                                                        support={globalContent?.contactPlaceholder}
                                                        value={form?.contact ?? ''}
                                                        onChange={async (d) => {
                                                            await this.setValue({
                                                                data: { contact: d.value },
                                                                targetName: 'form',
                                                            });
                                                        }}
                                                        disabled={!!loadingKey}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _about _area">
                                                    <Input
                                                        support={globalContent?.messagePlaceholder}
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
                                                        disabled={!!loadingKey}
                                                    />
                                                </div>
                                                <div className="contactsForm__formField _auto">
                                                    <FileField
                                                        support="Приложить брифчик <br class='_MOBILE' />(файл, не более 20 мб)"
                                                        value={form?.filename}
                                                        onChange={async (d) => {
                                                            if (d.file) {
                                                                this.formData.set('files', d.file);
                                                            } else {
                                                                this.formData.delete('files');
                                                            }

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
                                                        disabled={!!loadingKey}
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
                                                        disabled={!!loadingKey}
                                                    >
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    globalContent?.agreementLabel ??
                                                                    '',
                                                            }}
                                                        ></div>
                                                    </Checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contactsForm__formButton">
                                        <Button
                                            className="_dark"
                                            onClick={this.sendForm.bind(this)}
                                            disabled={loadingKey === 'send'}
                                            loading={loadingKey === 'send'}
                                        >
                                            Отправить
                                        </Button>
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

const mapStore = (s: StoreT) => ({
    contents: s.contents,
});

export default WithStore(ContactsForm, mapStore);
