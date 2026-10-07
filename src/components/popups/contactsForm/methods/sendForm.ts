import { appStore } from '@/src/store/store.tsx';
import request from '@/src/utils/request.ts';

import I from '../types.ts';

const sendForm: I['sendForm'] = async function () {
    const { form } = this.state;

    if (!form) {
        return;
    }

    if (!form.agreement) {
        appStore.getState().setNotification({ type: 'error', text: 'Необходимо согласие' });
        return;
    }

    await this.asyncSetState({ loadingKey: 'send' });

    if (form.name) {
        this.formData.set('name', form.name);
    }
    if (form.contact) {
        this.formData.set('email', form.contact);
    }
    if (form.about) {
        this.formData.set('message', form.about);
    }
    if (form.types?.length) {
        this.formData.set('tags', form.types.join(','));
    }

    try {
        await request({
            method: 'POST',
            url: '/feedbacks/submit',
            data: this.formData,
        });
        await this.initTarget({ data: { types: [] }, targetName: 'form' });
        appStore.getState().setNotification({
            type: 'success',
            text: 'Спасибо, ваще сообщение успешно отправлено',
        });
        appStore.getState().closePopup({ name: 'contactsFormPopup' });
    } catch (e) {
        const error = e as ResponseErrorT;

        appStore.getState().setNotification({
            type: 'error',
            text: [
                error.error.message,
                Object.keys(error.error.details ?? {})
                    .map((k) => error.error.details?.[k])
                    .filter((t) => t)
                    .join(', '),
            ].join(': '),
        });
    }

    await this.asyncSetState({ loadingKey: undefined });
};

export default sendForm;
