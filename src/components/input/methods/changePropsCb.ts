import I from '../types.ts';

const changePropsCb: I['changePropsCb'] = async function (this: I, prop) {
    const { onChange } = this.props;

    if (prop === 'reg' && this.props.reg) {
        await onChange({ value: '' });
    }
};

export default changePropsCb;
