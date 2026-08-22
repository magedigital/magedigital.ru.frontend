import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

import { teamPersons } from '../static/persons.ts';

const hexToRgb = (c: string): [number, number, number] => {
    const r = c.slice(0, 2);
    const g = c.slice(2, 4);
    const b = c.slice(4, 6);

    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
};

const init: I['init'] = async function (this: I) {
    const cardsNode = this.parent.current!.querySelector<HTMLElement>('.aboutTeam__cards');
    const descriptionsNodes = this.parent.current!.querySelectorAll<HTMLElement>(
        '.aboutTeam__cardDescription',
    );
    const backsNodes = this.parent.current!.querySelectorAll<HTMLElement>('.aboutTeam__cardBack');

    const descriptionsMoves: Record<number, number> = {};

    descriptionsNodes.forEach((n, i) => {
        descriptionsMoves[i] = 0;
    });

    let time = performance.now();
    let backProgress = 0;

    const animate = () => {
        const cardHeight = appStore.getState().device === 'desktop' ? 130 : 110;
        const cardFullHeight = appStore.getState().device === 'desktop' ? 274 : 510;
        cardsNode!.style.height = `${(teamPersons.length - 1) * cardHeight + cardFullHeight}rem`;

        descriptionsNodes.forEach((n, i) => {
            const width = n.getBoundingClientRect().width / 2;

            descriptionsMoves[i] += (performance.now() - time) / 4;

            if (descriptionsMoves[i] > width) {
                descriptionsMoves[i] = width - descriptionsMoves[i];
            }

            if (descriptionsMoves[i] < 0) {
                descriptionsMoves[i] = 0;
            }

            n.style.transform = `translate(${-descriptionsMoves[i]}px,0px)`;
        });

        backProgress +=
            (performance.now() - time) / (appStore.getState().device === 'desktop' ? 16 : 12);

        backsNodes.forEach((n) => {
            const index = +n.getAttribute('data-index')!;
            const startColor = n.getAttribute('data-startColor')!;
            const endColor = n.getAttribute('data-endColor')!;

            const startColorRgb = hexToRgb(startColor);
            const endColorRgb = hexToRgb(endColor);
            let thisProgress = (backProgress + (100 / teamPersons.length) * index * 1.5) % 200;

            if (thisProgress > 100) {
                thisProgress = 200 - thisProgress;
            }

            const leftProgress = 50 - thisProgress * 0.43;
            const rightProgress = thisProgress * 0.43 + 50;
            let changedColorProgress = leftProgress <= 40 ? 0 : (leftProgress - 40) * 15;

            if (changedColorProgress > 100) {
                changedColorProgress = 100;
            }

            const resultColorRgb: [number, number, number] = [0, 0, 0];

            startColorRgb.forEach((c, i) => {
                const thisEndColor = endColorRgb[i];
                resultColorRgb[i] = +(
                    c +
                    (thisEndColor - c) * (changedColorProgress / 100)
                ).toFixed(0);
            });

            const resultColorHex = `#${resultColorRgb
                .map((c) => c.toString(16))
                .map((c) => (c.length === 1 ? `0${c}` : c))
                .join('')}`;

            const max = appStore.getState().device === 'desktop' ? 10 : 24;
            const min = appStore.getState().device === 'desktop' ? 1 : 1.5;

            const speed = max + (50 - leftProgress) / 5;
            const progresses = [
                `#${startColor} 0%`,
                `#${startColor} ${leftProgress - speed}%`,
                `#${endColor} ${leftProgress - min}%`,
                `#${endColor} ${leftProgress + min}%`,
                `${resultColorHex} ${leftProgress + speed <= 50 ? leftProgress + speed : 50}%`,
                `${resultColorHex} 50%`,
                `${resultColorHex} ${rightProgress - speed >= 50 ? rightProgress - speed : 50}%`,
                `#${endColor} ${rightProgress - min}%`,
                `#${endColor} ${rightProgress + min}%`,
                `#${startColor} ${rightProgress + speed}%`,
                `#${startColor} 100%`,
            ].join(', ');

            n.style.background = `linear-gradient(to right, ${progresses})`;
        });

        time = performance.now();
        this.animateId = requestAnimationFrame(animate);
    };

    this.animateId = requestAnimationFrame(animate);

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
