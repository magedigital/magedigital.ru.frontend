import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const scrollNode = this.parent.current!.querySelector('.page__scroll') as HTMLElement;
    const fixTopBarWrapper = this.parent.current!.querySelector(
        '.page__topBar._fix',
    ) as HTMLElement;
    const fixTopBar = fixTopBarWrapper.querySelector('.topBar') as HTMLElement;
    let velocity = 0;
    let current = 0;
    const edgeDistance = window.heightValue / 2;
    const localScrollName = ['scroll', this.name].join('_');
    const startScroll = localStorage.getItem(localScrollName);

    if (startScroll && !Number.isNaN(+startScroll)) {
        scrollNode.scrollTop = +startScroll;
        current = +startScroll;
    }

    const checkAnimate = () => {
        const animatesTexts = scrollNode.querySelectorAll(
            '._TEXT_ANIM_WRAPPER:not([data-animate])',
        );

        animatesTexts.forEach((t) => {
            const y = t.getBoundingClientRect().y;

            if (y < window.heightValue * (3 / 4)) {
                t.setAttribute('data-animate', 't');
                t.querySelectorAll('._TEXT_ANIM').forEach((tt) => {
                    tt.setAttribute('data-animate', 't');
                });
            }
        });
    };

    const checkTopBar = () => {
        const topBarTop = 200 * window.sizeK;

        if (scrollNode.scrollTop >= topBarTop && !this.fixTopBarIsShow) {
            fixTopBarWrapper.style.transition = '.2s ease-out';
            fixTopBarWrapper.classList.add('_show');
            this.fixTopBarIsShow = true;
        }
        if (scrollNode.scrollTop < topBarTop && this.fixTopBarIsShow) {
            fixTopBarWrapper.style.transition = '.2s ease-in';
            fixTopBarWrapper.classList.remove('_show');
            this.fixTopBarIsShow = false;
        }
    };

    const themeBlocks = document.querySelectorAll<HTMLElement>(
        '.indexHeader__boxFrame,.indexServices,.indexAdvantages,.footer__banner',
    );

    const checkTheme = () => {
        const { isMobMenuShow } = this.state;
        let isLight = false;
        const topBarBound = fixTopBar.getBoundingClientRect();

        themeBlocks.forEach((b) => {
            const thisBound = b.getBoundingClientRect();

            if (
                topBarBound.y + topBarBound.height / 2 >= thisBound.y &&
                topBarBound.y + topBarBound.height / 2 <= thisBound.y + thisBound.height
            ) {
                isLight = true;
            }
        });

        if (isLight && !isMobMenuShow) {
            fixTopBar.setAttribute('data-light', 't');
        } else {
            fixTopBar.removeAttribute('data-light');
        }
    };

    scrollNode.addEventListener('wheel', (e) => {
        if (appStore.getState().device === 'mobile') {
            return;
        }
        e.preventDefault();
        velocity += e.deltaY * 0.04;
    });

    const scroll = () => {
        if (appStore.getState().device === 'mobile') {
            localStorage.setItem(localScrollName, current.toString());

            checkAnimate();
            checkTopBar();
            checkTheme();

            this.animateId = requestAnimationFrame(scroll);
            return;
        }

        const maxScroll = scrollNode.scrollHeight - scrollNode.clientHeight;
        const shouldStopAtTop = current < edgeDistance && velocity < -2;
        const shouldStopAtBottom = current > maxScroll - edgeDistance && velocity > 2;

        if (shouldStopAtTop) {
            const distance = Math.abs(0 - current);

            if (velocity < -30) {
                velocity = -30;
            }

            const v = Math.abs(velocity);
            const softness = 0.3;
            const decel = (v * v) / (2 * distance * softness);

            velocity += decel;

            if (velocity > 0) {
                velocity = 0;
            }
        } else if (shouldStopAtBottom) {
            const distance = Math.abs(maxScroll - current);

            if (velocity > 30) {
                velocity = 30;
            }

            const v = Math.abs(velocity);
            const softness = 0.3;
            const decel = (v * v) / (2 * distance * softness);

            velocity -= decel;

            if (velocity < 0) {
                velocity = 0;
            }
        } else {
            velocity *= 0.96;
        }

        current += velocity;

        if (current < 0) {
            current = 0;
            velocity = 0;
        }
        if (current > maxScroll) {
            current = maxScroll;
            velocity = 0;
        }

        scrollNode.scrollTop = current;
        localStorage.setItem(localScrollName, current.toString());

        checkAnimate();
        checkTopBar();
        checkTheme();

        this.animateId = requestAnimationFrame(scroll);
    };
    this.animateId = requestAnimationFrame(scroll);
};

export default init;
