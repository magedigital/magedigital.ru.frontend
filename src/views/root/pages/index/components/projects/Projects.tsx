import React from 'react';

import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import ProjectsI from './types.ts';

import { projects } from './static/projects.ts';

class Projects extends Default<ProjectsI['props'], ProjectsI['state']> implements ProjectsI {
    parent: ProjectsI['parent'];

    constructor(props: ProjectsI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        return (
            <div ref={this.parent} className="indexProjects _SECTION">
                <div className="indexProjects__inner _INNER">
                    <h3 className="indexProjects__title">Проекты</h3>
                    <div className="indexProjects__cards">
                        {projects.map((p, i) => (
                            <div className="indexProjects__card" key={i}>
                                <div className="indexProjects__project _FULL_W">
                                    <div className="indexProjects__projectHead _FULL_W">
                                        <img
                                            src={require(`@/src/media/index/${p.thumb}`)}
                                            alt=""
                                            className="indexProjects__projectThumb _FULL"
                                        />
                                    </div>

                                    <h4 className="indexProjects__projectTitle">{p.title}</h4>
                                    <p className="indexProjects__projectText">{p.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="indexProjects__button">
                        <Button className="_dark">Больше проектов</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
