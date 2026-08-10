import I from '../types.ts';

import { stats } from '../static/stats.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const progressNode =
        this.parent.current!.querySelector<SVGCircleElement>('.indexStats__progress');
    const progressCircleNode = progressNode?.querySelector<SVGCircleElement>('circle');

    let time = new Date().getTime();
    let curChar = 0;
    let charModeTime = 0;
    let charMode: 'start' | 'end' | undefined;
    let progressDir = -1;

    const animate = () => {
        const diff = new Date().getTime() - time;
        const statNode = this.parent.current!.querySelector<HTMLElement>(
            `.indexStats__stat[data-key="${this.currentStat}"]`,
        );
        const stat = stats[this.currentStat];

        if (!statNode) {
            return;
        }

        const textNode = statNode.querySelector<HTMLElement>('.indexStats__statText');

        let progressPercent = diff / (2_300 + stat.title.split('').length * 2 * 50);

        if (progressPercent > 1) {
            progressPercent = 1;
        }

        if (progressDir === 1) {
            progressPercent = 1 - progressPercent;
        }

        if (progressCircleNode) {
            const progressWidth = progressCircleNode.getBoundingClientRect().width / 2;
            const progressLen = 2 * Math.PI * progressWidth;

            progressCircleNode.style.strokeDasharray = `${progressLen} ${progressLen}`;
            progressCircleNode.style.strokeDashoffset = `${progressLen * (1 - progressPercent)}`;
        }

        if (diff >= 300) {
            if (!charMode) {
                charMode = 'start';

                const nextChars = this.parent.current!.querySelectorAll<HTMLElement>(
                    '.indexStats__statTitleChar._next',
                );
                const nextTextNodes = this.parent.current!.querySelectorAll<HTMLElement>(
                    '.indexStats__statText._next',
                );

                [...nextChars, ...nextTextNodes].forEach((c) => {
                    c.classList.remove('_next');
                    c.classList.add('_prev');
                });
            }

            if (charMode === 'start') {
                if (textNode) {
                    textNode.style.transition = `.3s ease-out`;
                    textNode.classList.remove('_prev');
                }

                if (curChar < stat.title.split('').length) {
                    const charNode = statNode.querySelector<HTMLElement>(
                        `.indexStats__statTitleChar[data-key="${curChar}"]`,
                    );
                    if (charNode) {
                        charNode.style.transition = `.3s ease-out`;
                        charNode.classList.remove('_prev');
                    }

                    if (diff >= 300 + (curChar + 1) * 50) {
                        curChar += 1;
                    }
                } else {
                    curChar = 0;
                    charMode = 'end';
                    charModeTime = new Date().getTime();
                }
            }

            const charModeDiff = new Date().getTime() - charModeTime;

            if (charMode === 'end' && charModeDiff > 2_000) {
                if (textNode) {
                    textNode.style.transition = `.3s ease-in`;
                    textNode.classList.add('_next');
                }

                if (curChar < stat.title.split('').length) {
                    const charNode = statNode.querySelector<HTMLElement>(
                        `.indexStats__statTitleChar[data-key="${curChar}"]`,
                    );
                    if (charNode) {
                        charNode.style.transition = `.3s ease-in`;
                        charNode.classList.add('_next');
                    }

                    if (charModeDiff >= 2_000 + (curChar + 1) * 50) {
                        curChar += 1;
                    }
                } else {
                    curChar = 0;
                    charModeTime = 0;
                    charMode = undefined;
                    time = new Date().getTime();
                    this.currentStat += 1;

                    progressDir = progressDir === 1 ? -1 : 1;

                    if (progressNode) {
                        if (progressDir === 1) {
                            progressNode.setAttribute('data-reverse', 't');
                        } else {
                            progressNode.removeAttribute('data-reverse');
                        }
                    }

                    if (this.currentStat === stats.length) {
                        this.currentStat = 0;
                    }
                }
            }
        }

        this.animateId = requestAnimationFrame(animate);
    };

    const onScroll = () => {
        const top = this.parent.current!.getBoundingClientRect().y;

        if (top < window.heightValue / 2) {
            time = new Date().getTime();
            this.animateId = requestAnimationFrame(animate);
            pageNode.removeEventListener('scroll', onScroll);
            this.asyncSetState({ isInit: true });
        }
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
