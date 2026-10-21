import I from '../types.ts';

const setType: I['setType'] = async function ({ type, card }) {
    // if (type === this.state.currentType) {
    //     return;
    // }

    await this.asyncSetState({ currentType: type, hoverCard: card });

    if (this.animateId) {
        cancelAnimationFrame(this.animateId);
    }

    const { content } = this.props;
    const typesCount = content['sections.collab']?.collabs?.length ?? 0;
    let time = new Date().getTime();

    const animate = async () => {
        const { currentType } = this.state;
        const buttonNode = this.parent.current!.querySelector<HTMLElement>(
            `.servicesAdvantages__button[data-id="${currentType}"]`,
        );

        if (buttonNode) {
            const progressCircleNode = buttonNode.querySelector('circle');
            const diff = new Date().getTime() - time;
            let progressPercent = diff / 5_000;

            if (progressPercent >= 1) {
                progressPercent = 1;
                time = new Date().getTime();

                let nextType = currentType + 1;

                if (nextType >= typesCount) {
                    nextType = 0;
                }

                await this.setType({ type: nextType });
            } else if (progressCircleNode) {
                const progressWidth = progressCircleNode.getBoundingClientRect().width / 2;
                const progressLen = 2 * Math.PI * progressWidth;

                progressCircleNode.style.strokeDasharray = `${progressLen} ${progressLen}`;
                progressCircleNode.style.strokeDashoffset = `${progressLen * (1 - progressPercent)}`;
            }
        }

        this.animateId = requestAnimationFrame(animate);
    };

    this.animateId = requestAnimationFrame(animate);
};

export default setType;
