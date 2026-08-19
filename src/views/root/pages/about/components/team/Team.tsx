import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import TeamI from './types.ts';

import { teamPersons } from './static/persons.ts';

class Team extends Default<TeamI['props'], TeamI['state']> implements TeamI {
    parent: TeamI['parent'];

    constructor(props: TeamI['props']) {
        super(props);
        this.state = {
            activePerson: 0,
        };

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { activePerson } = this.state;

        return (
            <div ref={this.parent} className="aboutTeam _SECTION" data-theme>
                <div className="aboutTeam__head _FULL_W _COL">
                    <AnimateText className="aboutTeam__title" tag="h3" delay={100}>
                        Команда
                    </AnimateText>
                    <AnimateText className="aboutTeam__text" delay={20}>
                        Компактный продакшн сениор уровня с большой экспертизой в диджитал
                        активациях. Ядро команды — четыре человека, каждый со своей зоной и не
                        первой сотней проектов за спиной. Вокруг — команда и сеть проверенных
                        подрядчиков: вёрстка, разработка, гейм-дев, поддержка.
                    </AnimateText>
                </div>
                <div className="aboutTeam__cards _FULL_W">
                    {teamPersons.map((p, i, ar) => (
                        <div
                            className={this.getClass(
                                'aboutTeam__card _FULL_W _COL',
                                activePerson === i && '_active',
                            )}
                            key={i}
                            style={{ zIndex: activePerson === i ? 10 : ar.length - i }}
                            onMouseEnter={() =>
                                this.addStack(
                                    async () => await this.asyncSetState({ activePerson: i }),
                                )
                            }
                        >
                            <div
                                className="aboutTeam__cardBack"
                                data-index={i}
                                data-startColor="36C0F7"
                                data-endColor="B5E7FF"
                            />
                            <div
                                className="aboutTeam__cardBack _active"
                                data-index={i}
                                data-startColor="000000"
                                data-endColor="1D0092"
                            />
                            <h4 className="aboutTeam__cardTitle">{p.title}</h4>
                            <p className="aboutTeam__cardRole">{p.role}</p>
                            <div className="aboutTeam__cardDescription">
                                <div className="aboutTeam__cardDescriptionInner">
                                    {p.description}&nbsp;{p.description}&nbsp;
                                </div>
                            </div>
                            <div className="aboutTeam__cardPreview">
                                <img
                                    className="_FULL"
                                    src={require(`@/src/media/about/${p.thumb}`)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Team;
