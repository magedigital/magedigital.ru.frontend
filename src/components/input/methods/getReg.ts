import I from '../types.ts';

const getReg: I['getReg'] = function () {
    const { regName } = this.props;
    let reg = { ...this.regs[regName!] };

    if (regName === 'any' && this.props.reg) {
        reg = this.props.reg;
    }

    return reg;
};

export default getReg;
