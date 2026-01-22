import LinkI from '../types.ts';

import { AppRouter } from '../../../index.tsx';

const setHref: LinkI['setHref'] = function () {
    const { pageName, storePages, ids } = this.props;
    const href = AppRouter.getPageLink({ name: pageName!, storePages, ids });

    this.setState({ href });
};

export default setHref;
