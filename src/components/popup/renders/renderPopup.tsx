import React from 'react';

import List from '@/src/components/list/List.tsx';
import LoaderBlock from '@/src/components/loaderBlock/LoaderBlock.tsx';
import Media from '@/src/components/media/Media.tsx';

import I, { PopupRenderContentT } from '../types.ts';

const renderPopupContent = function (
    this: I,
    data: { render: PopupRenderContentT; id?: string; canClose?: boolean; withTopBar?: boolean },
) {
    const isInit = this.props.isInit ?? this.state.isInit;
    const { withTopBar = true } = data;

    return (
        <div className="popup__wrapperBox">
            {typeof isInit === 'boolean' && (
                <LoaderBlock
                    isShow={isInit !== true}
                    className="popup__loader"
                    loaderClassName="_back"
                />
            )}
            <div className="popup__inner _COL">
                <Media check={(d) => d === 'desktop' || withTopBar === false}>
                    {(data.canClose ?? true) && this.renderClose()}
                </Media>
                {data.render({ id: data.id })}
            </div>
        </div>
    );
};

const renderPopup: I['renderPopup'] = function ({ render, ...props }) {
    const { isHeightMin } = this.state;
    const id = props.id;
    const isInit = this.props.isInit ?? this.state.isInit;
    const withIds = Object.keys(props).includes('id');

    return (
        <div
            ref={this.parent}
            className={this.getClass(
                'popup _FULL',
                `_${this.name}`,
                isInit === false ? '_loading' : '',
                withIds ? '_withIds' : '',
                isHeightMin && '_minHeight',
                props.className,
            )}
        >
            {!withIds ? (
                <div className="popup__wrapper _FULL">
                    {renderPopupContent.call(this, { render, ...props })}
                </div>
            ) : (
                <List
                    renderKey={id}
                    items={id ? [{ _id: id }] : []}
                    parentClass="popup__box _FULL"
                    itemClass="popup__wrapper _FULL"
                    itemStyleProps={[]}
                    parentStyleProps={[]}
                    parentRealStyleProps={[]}
                    render={({ item }) => ({
                        item: renderPopupContent.call(this, { render, id: item._id }),
                    })}
                />
            )}
        </div>
    );
};

export default renderPopup;
