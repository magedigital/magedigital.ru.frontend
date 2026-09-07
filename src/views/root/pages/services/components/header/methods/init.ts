import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    this.timers.animate = setTimeout(async () => {
        await this.asyncSetState({ titleIsAnimated: true });
        this.timers.animate = setTimeout(async () => {
            await this.asyncSetState({ textIsAnimated: true });
            this.timers.animate = setTimeout(async () => {
                await this.asyncSetState({ decorIsAnimated: true });
            }, 50);
        }, 50);
    }, 300);
};

export default init;
