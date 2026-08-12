import React from 'react';

import Fade from '@/src/components/fade/Fade.tsx';

import ContactForm from '../components/contactForm/ContactForm.tsx';

import I from '../types.ts';

const renderContactForm: I['renderContactForm'] = function () {
    const { isContactFormShow } = this.props;

    return (
        <Fade className="body__contactForm _FULL" isShow={!!isContactFormShow} duration={700}>
            <ContactForm />
        </Fade>
    );
};

export default renderContactForm;
