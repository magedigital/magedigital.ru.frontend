// const Profile =
//     process.env.REACT_APP_SEO === 'true' && require('../../pages/profile/Profile.tsx').default;
import React from 'react';

import RootI from '../types.ts';

import Index from '../pages/index/Index.tsx';

const pages = {
    index: {
        render(this: RootI) {
            return (
                <>
                    <Index />
                </>
            );
        },
    },
} as const;

export default pages;
