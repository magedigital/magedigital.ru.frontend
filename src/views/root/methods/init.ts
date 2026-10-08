import { strapiClient } from '@/src/index.tsx';
import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function () {
    this.resizeHandler(true);

    document.body.style.setProperty('--mediaM', `${window.mediaM}px`);

    window.addEventListener('resize', () => {
        this.resizeHandler();
    });

    this.popupsHandler(true);

    setTimeout(() => {
        appStore.getState().showCookies();
    }, 1_000);

    const globalContent: GlobalContentT = {};

    await Promise.all(
        (['contacts', 'learn-more', 'cookies', 'site-setting'] as const).map(async (name) => {
            if (name === 'contacts') {
                const data = await strapiClient.single('contacts-section').find({
                    populate: {
                        content: {
                            populate: {
                                tags: true,
                            },
                        },
                    },
                });

                globalContent.contacts = data.data.content;
            }

            if (name === 'cookies') {
                const data = await strapiClient.single('cookie-banner').find({});
                globalContent.cookies = data.data as never;
            }

            if (name === 'learn-more') {
                const data = await strapiClient.single('learn-more').find({
                    populate: {
                        content: {
                            populate: {
                                button: true,
                            },
                        },
                    },
                });
                globalContent.learnMore = data.data.content;
            }

            if (name === 'site-setting') {
                const data = await strapiClient.single('site-setting').find({
                    populate: {},
                });
                globalContent.siteSettings = data.data as never;
            }
        }),
    );

    appStore.getState().setContent('global', globalContent);
};

export default init;
