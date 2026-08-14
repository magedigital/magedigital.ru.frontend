import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import getMode from './methods/getMode.ts';

import FileFieldI, { FileFieldModeT } from './types.ts';

import DashedBorder from '../dashedBorder/DashedBorder.tsx';
import Icon from '../icon/Icon.tsx';
import List from '../list/List.tsx';

class FileField extends Default<FileFieldI['props'], FileFieldI['state']> implements FileFieldI {
    parent: FileFieldI['parent'];

    constructor(props: FileFieldI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    getMode = getMode;

    render() {
        const { value, support, onChange } = this.props;
        const mode = this.getMode();
        const renderKey = [mode, value].filter((t) => t).join('');

        return (
            <label className={this.getClass('fileField _CLICK', this.setClass(mode))}>
                <input
                    type="file"
                    onChange={(e) => {
                        onChange({ file: e.target.files![0] });
                    }}
                />
                <List
                    renderKey={renderKey}
                    items={[{ _id: renderKey, mode, value }]}
                    parentClass="fileField__states"
                    itemClass="fileField__statesItem _FULL_W"
                    itemStyleProps={[]}
                    parentStyleProps={['width']}
                    parentRealStyleProps={['width']}
                    resizeWidth={true}
                    render={({ item }: { item: { mode: FileFieldModeT; value?: string } }) => ({
                        item: (
                            <div
                                className={this.getClass(
                                    'fileField__state _FULL',
                                    this.setClass(item.mode),
                                )}
                            >
                                {item.mode === 'empty' && (
                                    <>
                                        <DashedBorder className="fileField__stateDashed" />
                                        <span dangerouslySetInnerHTML={{ __html: support }}></span>
                                        <Icon name="file" className="fileField__stateIcon _file" />
                                    </>
                                )}
                                {item.mode === 'drag' && <>Отпустите кнопку мыши</>}
                                {item.mode === 'loading' && <></>}
                                {item.mode === 'uploaded' && (
                                    <>
                                        {item.value}
                                        <Icon
                                            name="popup-close"
                                            className="fileField__stateIcon _close"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onChange({ file: undefined });
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        ),
                    })}
                />
            </label>
        );
    }
}

export default FileField;
