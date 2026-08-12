import I from '../types.ts';

const changePropsCb: I['changePropsCb'] = async function (this: I, prop) {
    const { value } = this.props;

    if (prop === 'regKey' && this.props.regKey) {
        this.savedValue = value;
    }

    if (value !== this.savedValue) {
        this.savedValue = value;
    }

    if (prop === 'updatedKey') {
        this.setAreaSize();
    }

    if (this.changedValue !== value && this.changeValueResolve) {
        this.changedValue = value;
        this.changeValueResolve();
        delete this.changeValueResolve;
    }
};

export default changePropsCb;
