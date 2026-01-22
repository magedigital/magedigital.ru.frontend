import I from '../types.ts';

const checkChange: I['checkChange'] = function (force) {
    const { renderKey, updateKey, forceRenderKey, disabled, isWindowLoad } = this.props;

    if (disabled) {
        return;
    }

    if (
        renderKey !== this.renderKey ||
        updateKey !== this.updateKey ||
        forceRenderKey !== this.forceRenderKey ||
        (isWindowLoad && this.isWindowLoad !== isWindowLoad) ||
        force
    ) {
        this.updateItems({
            isRender:
                renderKey !== this.renderKey ||
                forceRenderKey !== this.forceRenderKey ||
                this.isWindowLoad !== isWindowLoad,
            isUpdate:
                updateKey !== this.updateKey ||
                forceRenderKey !== this.forceRenderKey ||
                this.isWindowLoad !== isWindowLoad,
        });

        this.renderKey = renderKey;
        this.updateKey = updateKey;
        this.forceRenderKey = forceRenderKey;
        this.isWindowLoad = isWindowLoad;
    }
};

export default checkChange;
