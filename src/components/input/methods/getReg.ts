import I from '../types.ts';

const getReg: I['getReg'] = function () {
    const { regName } = this.props;
    const reg = { ...this.regs[regName!] };

    if (regName === 'any') {
        reg.template = this.props.reg!;
    }

    return reg;
};

export default getReg;
