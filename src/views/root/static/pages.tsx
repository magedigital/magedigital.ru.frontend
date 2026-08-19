import React from 'react';

import RootI from '../types.ts';

import About from '../pages/about/About.tsx';
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
    about: {
        render(this: RootI) {
            return (
                <>
                    <About />
                </>
            );
        },
    },
} as const;

export default pages;
