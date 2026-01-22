import I from '../types.ts';

const startProjectsAnimate: I['startProjectsAnimate'] = async function () {
    this.intervals.projects = setInterval(async () => {
        let { projectCurrentIndex } = this.state;

        projectCurrentIndex += 1;

        if (projectCurrentIndex === this.projects.length) {
            projectCurrentIndex = 0;
        }

        await this.asyncSetState({ projectCurrentIndex });
    }, 500);
};

export default startProjectsAnimate;
