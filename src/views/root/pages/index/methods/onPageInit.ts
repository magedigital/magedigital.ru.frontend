import { strapiClient } from '@/src';
import { appStore } from '@/src/store/store.tsx';
import { setStrapiContent } from '@/src/utils/strapi.ts';

import I from '../types.ts';

const onPageInit: I['onPageInit'] = async function (this: I) {
    if (!this.props.contents.home) {
        const homepage = strapiClient.single('home-page');
        const data = await homepage.find({
            populate: {
                sections: {
                    on: {
                        'sections.hero': {
                            populate: {
                                image: true,
                                button: true,
                            },
                        },
                        'sections.video': {
                            populate: {
                                video: true,
                                button: true,
                            },
                        },
                        'sections.clients': {
                            populate: {
                                button: true,
                                clients: true,
                            },
                        },
                        'sections.stats': {
                            populate: {
                                button: true,
                                stats: true,
                            },
                        },
                        'sections.solutions': {
                            populate: {
                                button: true,
                                solutions: {
                                    populate: {
                                        button: true,
                                        video: true,
                                    },
                                },
                            },
                        },
                        'sections.advantages': {
                            populate: {
                                button: true,
                                advantages: true,
                            },
                        },
                        'sections.text': {
                            populate: {
                                button: true,
                            },
                        },
                    },
                },
            },
        });

        const content = setStrapiContent({ sections: data.data.sections });
        appStore.getState().setContent('home', content);
    }
};

export default onPageInit;
