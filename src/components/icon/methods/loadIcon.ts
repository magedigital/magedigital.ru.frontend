import I from '../types.ts';

import setAsyncTimer from '../../../utils/setAsyncTimer.ts';

const loadIcon: I['loadIcon'] = async function () {
    const { name } = this.props;

    try {
        if (0) {
            await setAsyncTimer(1000);
        }

        const Component = (await import(`../static/icons/${name}.tsx`)).default;

        this.setState({ Component });
    } catch (error) {}
};

export default loadIcon;
