import { strapiClient } from '@/src';
import { appStore } from '@/src/store/store.tsx';
import { setStrapiContent } from '@/src/utils/strapi.ts';

import I from '../types.ts';

const onPageInit: I['onPageInit'] = async function (this: I) {
    if (!this.props.contents.services) {
        const page = strapiClient.single('services-page');
        const data = await page.find({
            populate: {
                sections: {
                    on: {
                        'sections.hero': {
                            populate: {
                                image: true,
                                button: true,
                            },
                        },
                        'sections.services': {
                            populate: {
                                button: true,
                                services: {
                                    populate: {
                                        items: true,
                                        video: true,
                                    },
                                },
                            },
                        },
                        'sections.collab': {
                            populate: {
                                button: true,
                                collabs: {
                                    populate: {
                                        cards: {
                                            populate: {
                                                logo: {
                                                    populate: {
                                                        svgFile: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        'sections.process': {
                            populate: {
                                button: true,
                                steps: true,
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
        appStore.getState().setContent('services', content);
    }
};

export default onPageInit;
