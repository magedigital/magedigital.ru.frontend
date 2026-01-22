import I from '../types.ts';

const setCursorPositions: I['setCursorPositions'] = function (start, end) {
    this.input.current!.selectionStart = start;
    this.input.current!.selectionEnd = end;

    this.saveCursorPositions();

    this.input.current!.focus();
};

export default setCursorPositions;
