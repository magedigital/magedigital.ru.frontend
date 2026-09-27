import I from '../types.ts';

const keysCallback: I['keysCallback'] = async function (this: I, { name }) {
    const { isMenuShow } = this.state;

    if (name === 'Escape' && !isMenuShow) {
        this.close();
    }
};

export default keysCallback;
