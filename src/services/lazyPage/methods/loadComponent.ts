import LazyPageI from '../types.ts';

const loadComponent: LazyPageI['loadComponent'] = async function (name) {
    if (name === 'index') {
        return (await import('@views/root/pages/index/Index.tsx')).default;
    }

    return undefined;
};

export default loadComponent;
