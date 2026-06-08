import React from 'react';

import Fade from '@components/fade/Fade.tsx';

import ContactsPopup from '../components/contactsPopup/ContactsPopup.tsx';
import ServicesPopup from '../components/servicesPopup/ServicesPopup.tsx';

import I from '../types.ts';

const renderPopups: I['renderPopups'] = function () {
    const { popup } = this.state;

    return (
        <div className="index__popups _NOSCROLL">
            <Fade className="index__popup _INNER" isShow={popup === 'services'}>
                <ServicesPopup
                    setState={async (s) => {
                        await this.setPopupState({ name: 'services', isShow: s });
                    }}
                />
            </Fade>
            <Fade className="index__popup _INNER" isShow={popup === 'contacts'}>
                <ContactsPopup
                    setState={async (s) => {
                        await this.setPopupState({ name: 'contacts', isShow: s });
                    }}
                />
            </Fade>
        </div>
    );
};

export default renderPopups;
