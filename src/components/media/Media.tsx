import React from 'react';

import { StoreT, WithStore } from '@store/store.tsx';

import MediaI from './types.ts';

class Media extends React.Component<MediaI['props'], MediaI['state']> implements MediaI {
    parent: MediaI['parent'];

    constructor(props: MediaI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { device, media, children } = this.props;

        if (
            (device === 'desktop' && media === 'mobile') ||
            (device === 'mobile' && media === 'desktop')
        ) {
            return;
        }

        return <>{children}</>;
    }
}

const mapStore = (store: StoreT) => ({
    device: store.device,
});

export default WithStore(Media, mapStore);
