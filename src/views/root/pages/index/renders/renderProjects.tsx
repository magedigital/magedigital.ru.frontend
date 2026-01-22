import React from 'react';

import I from '../types.ts';

const renderProjects: I['renderProjects'] = function () {
    const { projectCurrentIndex } = this.state;

    return (
        <div className="index__projects _FULL">
            {this.projects.map((p, i) => (
                <div
                    className={this.getClass(
                        'index__project _FULL_ABS',
                        projectCurrentIndex === i ? '_active' : '',
                    )}
                    key={i}
                >
                    <img
                        src={require(`@media/index/${p}`)}
                        alt=""
                        className="index__projectThumb _FULL_ABS"
                    />
                </div>
            ))}
        </div>
    );
};

export default renderProjects;
