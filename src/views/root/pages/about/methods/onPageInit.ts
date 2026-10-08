import { strapiClient } from '@/src';
import { appStore } from '@/src/store/store.tsx';
import { setStrapiContent } from '@/src/utils/strapi.ts';

import I from '../types.ts';

const onPageInit: I['onPageInit'] = async function (this: I) {
    if (!this.props.contents.about) {
        const page = strapiClient.single('about-page');
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
                        'sections.mage': {
                            populate: {
                                button: true,
                                steps: {
                                    populate: {
                                        logo: true,
                                        icon: {
                                            populate: {
                                                svgFile: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        'sections.history': {
                            populate: {
                                button: true,
                                thenPhotos: {
                                    populate: {
                                        image: true,
                                    },
                                },
                                nowPhotos: {
                                    populate: {
                                        image: true,
                                    },
                                },
                            },
                        },
                        'sections.team': {
                            populate: {
                                button: true,
                                members: {
                                    populate: {
                                        video: true,
                                    },
                                },
                            },
                        },
                        'sections.principles': {
                            populate: {
                                button: true,
                                principles: true,
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
        appStore.getState().setContent('about', content);
    }
};

export default onPageInit;
