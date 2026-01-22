import I from '../types.ts';

const asyncSetState: I['asyncSetState'] = function ({ ...data }) {
    return new Promise((resolve) => {
        this.setState({ ...data }, resolve);
    });
};

export default asyncSetState;
