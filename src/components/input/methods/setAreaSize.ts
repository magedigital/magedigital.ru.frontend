import getRealParams from '@/src/utils/getRealParams.ts';

import InputI from '../types.ts';

const setAreaSize: InputI['setAreaSize'] = function () {
    const { area } = this.props;

    if (!area) {
        return;
    }

    const { minHeight, maxHeight, calcCb } = area;

    const areaNode = this.parent.current as HTMLElement;

    let { scrollHeight: areaHeight } = getRealParams({
        parent: areaNode,
        elem: '.input__field',
        width: areaNode.offsetWidth,
        isClearStyles: true,
        // isNotRemove: true,
    });

    const resultMinHeight = typeof minHeight === 'function' ? minHeight() : 32;
    const resultMaxHeight = typeof maxHeight === 'function' ? maxHeight() : undefined;

    if (!area.isCalc) {
        areaHeight = 0;
    }

    if ((areaHeight as number) < resultMinHeight) {
        areaHeight = resultMinHeight;
    }

    if (resultMaxHeight && (areaHeight as number) > resultMaxHeight) {
        areaHeight = resultMaxHeight;
    }

    if (typeof areaHeight === 'number') {
        areaHeight += 1;
    }

    areaNode.style.height = `${areaHeight}px`;

    const field = areaNode.querySelector('.input__field') as HTMLElement;

    if (field) {
        field.scrollTop = areaHeight as number;
    }

    if (typeof calcCb === 'function') {
        calcCb();
    }
};

export default setAreaSize;
