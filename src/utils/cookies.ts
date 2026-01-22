import { d } from './seo.ts';

function getCookie(name: string): string | undefined {
    const matches = d.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type OptionsT = { expires?: Date | string } & ObjT;

function setCookie(name: string, value: string, optionsRes: OptionsT = {}): void {
    const options: OptionsT = {
        path: '/',
        'max-age': 3600 * 24 * 7,
        ...optionsRes,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    Object.keys(options).forEach((optionKey) => {
        updatedCookie += `; ${optionKey}`;

        const optionValue = options[optionKey];

        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
        }
    });

    d.cookie = updatedCookie;
}

function deleteCookie(name: string): void {
    setCookie(name, '', {
        'max-age': -1,
    });
}

export { getCookie, setCookie, deleteCookie };
