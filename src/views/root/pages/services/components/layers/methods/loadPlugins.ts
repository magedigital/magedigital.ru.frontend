import I from '../types.ts';

import { layersData } from '../static/data.ts';

const loadPlugins: I['loadPlugins'] = async function () {
    await import('@/src/plugins/gsap.js');
    await import('@/src/plugins/morphSvg.js');

    const { gsap } = window;

    if (!gsap) {
        return;
    }

    const cards = this.parent.current!.querySelectorAll<HTMLElement>(
        '.servicesLayers__contentCard',
    );

    cards.forEach((card, i) => {
        const back = card.querySelector<HTMLElement>('.servicesLayers__cardDecorShapePath');
        const sw = card.querySelector<HTMLElement>('.servicesLayers__cardDecorInner');
        const ic = card.querySelector<HTMLElement>('.servicesLayers__cardDecorFigurePart._1');
        const ic2 = card.querySelector<HTMLElement>('.servicesLayers__cardDecorFigurePart._2');

        back!.setAttribute('d', layersData.shapes[0]);
        back!.setAttribute('fill', layersData.colors[0]);
        ic!.setAttribute('d', layersData.icons[0]);
        ic2!.setAttribute('d', layersData.icons[0]);
        gsap.set(ic2, { opacity: 0, transformOrigin: '50% 50%' });
        gsap.set(ic, { transformOrigin: '50% 50%' });

        this.cardAnimates[i] = {
            current: 0,
            animate: (d) => {
                if (this.cardAnimates[i]!.current === d.index) {
                    return;
                }

                this.cardAnimates[i]!.current = d.index;

                const colorIndex = d.index % layersData.colors.length;
                const shapeIndex = d.index % layersData.shapes.length;

                gsap.to(back, {
                    morphSVG: layersData.shapes[shapeIndex],
                    duration: 1.1,
                    ease: 'elastic.out(1,0.45)',
                    overwrite: true,
                });
                gsap.to(back, {
                    fill: layersData.colors[colorIndex],
                    duration: 0.35,
                    ease: 'power2.out',
                });
                gsap.fromTo(
                    sw,
                    { scale: 0.84 },
                    { scale: 1, duration: 1, ease: 'elastic.out(1,0.35)', overwrite: 'auto' },
                );
                gsap.killTweensOf(ic);
                ic!.setAttribute('d', layersData.icons[d.index]);
                gsap.fromTo(
                    ic,
                    { scale: 0.3, rotation: -25 },
                    { scale: 1, rotation: 0, duration: 0.9, ease: 'elastic.out(1.1,0.4)' },
                );
            },
        };
    });
};

export default loadPlugins;
