import I from '../types.ts';

const focusHandler: I['focusHandler'] = async function (isFocus) {
    const { onChange, regName, value } = this.props;

    await this.asyncSetState({ isFocus });

    if (regName) {
        const reg = this.getReg();
        const { template, emptyChar } = reg;

        if (isFocus && !value) {
            const startPos = template.indexOf(emptyChar);

            await onChange({ value: template });

            this.savedValue = template;

            if (startPos !== -1) {
                setTimeout(() => {
                    this.setCursorPositions(startPos, startPos);
                }, 0);
            }
        }

        if (!isFocus && value === template) {
            await onChange({ value: '' });

            this.savedValue = '';
        }
    }
};

export default focusHandler;
