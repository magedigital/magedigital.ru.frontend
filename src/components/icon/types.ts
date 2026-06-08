import DefaultI from '@components/default/types.ts';

import icons from './static/icons.ts';

type PropsT = {
    name: (typeof icons)[number];
    onClick?: () => void;
};

type StateT = {
    Component?: React.ReactNode;
};

interface IconI extends DefaultI<PropsT, StateT> {
    icons: typeof icons;

    loadIcon(this: IconI): Promise<void>;
}

export default IconI;

type IconT = (typeof icons)[number];

export type { IconT };
