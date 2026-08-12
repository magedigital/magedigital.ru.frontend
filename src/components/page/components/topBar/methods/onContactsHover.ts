import I from '../types.ts';

const onContactsHover: I['onContactsHover'] = async function (action) {
    const contactsNode = this.parent.current!.querySelector<HTMLElement>('.topBar__contacts');
    const startIconNode = this.parent.current!.querySelector<HTMLElement>(
        '.topBar__contactsIcon._start',
    );
    const buttonNode = this.parent.current!.querySelector<HTMLElement>('.topBar__contactsButton');
    const endIconNode = this.parent.current!.querySelector<HTMLElement>(
        '.topBar__contactsIcon._end',
    );

    if (!contactsNode || !startIconNode || !buttonNode || !endIconNode) {
        return;
    }

    if (this.timers.animate) {
        clearTimeout(this.timers.animate);
        delete this.timers.animate;
    }

    if (action === 'enter') {
        buttonNode.style.transition = '0.3s cubic-bezier(0.152, 0.888, 0.046, 1.2)';
        startIconNode.style.transition = '0.3s cubic-bezier(0.152, 0.888, 0.046, 1.6)';
        endIconNode.style.transition = '0.3s cubic-bezier(.75,-0.21,.96,.56)';

        contactsNode.classList.add('_active');
        endIconNode.classList.add('_hide');

        this.timers.animate = setTimeout(() => {
            buttonNode.classList.add('_active');

            this.timers.animate = setTimeout(() => {
                startIconNode.classList.add('_active');
            }, 50);
        }, 150);
    }

    if (action === 'leave') {
        buttonNode.style.transition = '0.3s cubic-bezier(.75,-0.21,.96,.56)';
        startIconNode.style.transition = '0.3s cubic-bezier(.75,-0.21,.96,.56)';
        endIconNode.style.transition = '0.3s cubic-bezier(0.152, 0.888, 0.046, 1.6)';

        startIconNode.classList.remove('_active');

        this.timers.animate = setTimeout(() => {
            buttonNode.classList.remove('_active');

            this.timers.animate = setTimeout(() => {
                contactsNode.classList.remove('_active');
                this.timers.animate = setTimeout(() => {
                    endIconNode.classList.remove('_hide');
                }, 100);
            }, 50);
        }, 50);
    }
};

export default onContactsHover;
