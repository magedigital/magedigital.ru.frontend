import LinkI from '../types.ts';

const checkChange: LinkI['checkChange'] = function (start) {
    const { renderKey } = this.props;

    if (start || (renderKey && renderKey !== this.renderKey)) {
        this.renderKey = renderKey;

        this.setHref();
    }
};

export default checkChange;
