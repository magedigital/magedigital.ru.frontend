import React from 'react';

import Editor from '@components/editor/Editor.tsx';

import init from './methods/init.ts';
import setPopupState from './methods/setPopupState.ts';
import startProjectsAnimate from './methods/startProjectsAnimate.ts';

import IndexI from './types.ts';

import renderBackVideo from './renders/renderBackVideo.tsx';
import renderContent from './renders/renderContent.tsx';
import renderFoot from './renders/renderFoot.tsx';
import renderHead from './renders/renderHead.tsx';
import renderPopups from './renders/renderPopups.tsx';
import renderProjects from './renders/renderProjects.tsx';

class Index extends Editor<IndexI['props'], IndexI['state']> implements IndexI {
    parent: IndexI['parent'];

    constructor(props: IndexI['props']) {
        super(props);
        this.state = {
            projectCurrentIndex: 0,
        };

        this.parent = React.createRef();
    }

    email = 'hello@magedigital.ru';
    projects = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        'image6.jpg',
        'image7.jpg',
    ];

    init = init;

    startProjectsAnimate = startProjectsAnimate;
    setPopupState = setPopupState;

    renderBackVideo = renderBackVideo;
    renderHead = renderHead;
    renderContent = renderContent;
    renderFoot = renderFoot;
    renderProjects = renderProjects;
    renderPopups = renderPopups;

    render() {
        const { popup } = this.state;

        return (
            <div ref={this.parent} className={this.getClass('index', popup && '_showPopup')}>
                {this.renderPopups()}
                <div className="index__wrapper _FULL_W _COL _COL_H_CENTER">
                    {this.renderBackVideo()}

                    <div className="index__inner _INNER _COL">
                        {this.renderHead()}
                        {this.renderContent()}
                    </div>
                    {this.renderFoot()}
                </div>
            </div>
        );
    }
}

export default Index;
