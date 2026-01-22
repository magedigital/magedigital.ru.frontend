import I from '../types.ts';

import { AppRouter } from '../../../index.tsx';

const init: I['init'] = async function () {
    const { filter } = this.props;
    const resultPages = (Object.keys(AppRouter.pages) as (keyof typeof AppRouter.pages)[]).filter(
        (page) => filter(page),
    );

    await this.asyncSetState.call(this, {
        pages: resultPages,
    });
};

export default init;
