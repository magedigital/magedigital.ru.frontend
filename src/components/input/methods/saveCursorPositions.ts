import I from '../types.ts';

const saveCursorPositions: I['saveCursorPositions'] = function () {
    if (!this.input.current) {
        return;
    }

    this.startPos = this.input.current.selectionStart ?? 0;
    this.endPos = this.input.current.selectionEnd ?? 0;
};

export default saveCursorPositions;
