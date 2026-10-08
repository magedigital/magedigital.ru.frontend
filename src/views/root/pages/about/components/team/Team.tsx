import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Lazy from '@/src/components/lazy/Lazy.tsx';

import init from './methods/init.ts';

import TeamI from './types.ts';
import { getStrapiUrl } from '@/src/index.tsx';

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
        const { content } = this.props;

        return (
            <div ref={this.parent} className="aboutTeam _SECTION" data-theme>
                <div className="aboutTeam__head _FULL_W _COL">
                    <AnimateText className="aboutTeam__title" tag="h3" delay={100}>
                        {content['sections.team']?.title}
                    </AnimateText>
                    <AnimateText className="aboutTeam__text" delay={20}>
                        {content['sections.team']?.subtitle}
                    </AnimateText>
                </div>
                <div className="aboutTeam__cards _FULL_W">
                    {content['sections.team']?.members?.map((p, i, ar) => (
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
                            onClick={() =>
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
                            <h4 className="aboutTeam__cardTitle">{p.name}</h4>
                            <p className="aboutTeam__cardRole">{p.position}</p>
                            <div className="aboutTeam__cardDescription">
                                <div className="aboutTeam__cardDescriptionInner">
                                    {p.mission}&nbsp;{p.mission}&nbsp;
                                </div>
                            </div>
                            <Lazy
                                getScrollNode={() =>
                                    this.parent.current?.closest<HTMLElement>('.page__scroll')
                                }
                                className="aboutTeam__cardPreview _FULL"
                                render={() => (
                                    <video
                                        className="_FULL"
                                        src={getStrapiUrl(p.video?.url)}
                                        loop
                                        muted
                                        autoPlay
                                        playsInline
                                    />
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Team;
