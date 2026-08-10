import I from '../types.ts';

const checkChangeProps: I['checkChangeProps'] = async function (this: I) {
    if (!this.changingProps) {
        return;
    }

    this.changingProps.forEach((prop) => {
        if (this.changedProps[prop] !== this.props[prop] && this.changePropsCb) {
            this.changePropsCb(prop);

            this.changedProps[prop] = this.props[prop];
        }
    });
};

export default checkChangeProps;
