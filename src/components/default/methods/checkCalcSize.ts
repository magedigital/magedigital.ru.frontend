import I from '../types.ts';

const checkCalcSize: I['checkCalcSize'] = function () {
    if (!this.getCalcSizeParams) {
        return;
    }

    const calcSizeParams = this.getCalcSizeParams();
    const calcParentNode = calcSizeParams.getParentNode();
    const calcNode = calcSizeParams.getNode();

    if (calcParentNode && calcNode) {
        if (!this.isSetStartCalcSize) {
            this.isSetStartCalcSize = true;

            calcParentNode.style.height = `${calcSizeParams.minSize}px`;
        }

        if (!this.isSetEndCalcSize && this.state.isInit) {
            this.isSetEndCalcSize = true;

            const nodeHeight = calcNode.offsetHeight;

            calcParentNode.style.height = `${nodeHeight}px`;

            this.timers.callNode = setTimeout(() => {
                calcParentNode.style.height = '';
            }, 300);
        }
    }
};

export default checkCalcSize;
