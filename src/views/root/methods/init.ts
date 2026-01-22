import I from '../types.ts';

const init: I['init'] = async function () {
    this.resizeHandler(true);

    document.body.style.setProperty('--mediaM', `${window.mediaM}px`);

    window.addEventListener('resize', () => {
        this.resizeHandler();
    });
};

export default init;
