import removeTransition from './removeTransition.ts';

interface ReturnedParams {
    width: number;
    height: number;
    offsetLeft: number;
    offsetRight: number;
    offsetTop: number;
    offsetBottom: number;
    scrollWidth: number;
    scrollHeight: number;
    scrollHeightArea: number;
    getBoundingClientRect: DOMRect;
    scrollTop: number;
}

const getParams = (elem: HTMLElement): ReturnedParams => ({
    width: elem.offsetWidth,
    height: elem.offsetHeight,
    offsetLeft: elem.offsetLeft,
    offsetRight:
        ((elem.parentNode as HTMLElement)?.offsetWidth || 0) - elem.offsetWidth - elem.offsetLeft,
    offsetTop: elem.offsetTop,
    offsetBottom:
        ((elem.parentNode as HTMLElement)?.offsetHeight || 0) -
        (elem.offsetHeight + elem.offsetTop),
    scrollWidth: elem.scrollWidth,
    scrollHeight: elem.scrollHeight,
    scrollHeightArea: elem.scrollHeight - elem.offsetHeight,
    getBoundingClientRect: elem.getBoundingClientRect(),
    scrollTop: elem.scrollTop,
});

type Elem = { className: string; id: string; params?: string[]; style?: { [s: string]: string } };
type ClearStyleElem = string | { className: string; params: string[] };

interface PropsT {
    parent: HTMLElement;
    elem?: string;
    elems?: Elem[];
    width?: number | string;
    height?: number | string;
    isClearStyleParent?: boolean;
    isClearStyles?: boolean;
    classNames?: string[];
    clearStyleElems?: ClearStyleElem[];
    isNotRemove?: boolean;
    checkChange?: {
        target: {
            [k: string]: {
                [t: string]: string | number;
            };
        };
        props: (key: string) => string[];
    };
    isTransform?: boolean;
    isNotRemoveMedia?: boolean;
}

type ReturnedType = { [t: string]: ReturnedParams | number } & {
    condForChange?: boolean;
    parent: ReturnedParams;
};

export default function getRealParams({
    parent,
    elem,
    elems,
    width,
    height,
    isClearStyleParent,
    isClearStyles,
    classNames = [],
    clearStyleElems = [],
    isNotRemove,
    checkChange,
    isTransform,
    isNotRemoveMedia,
}: PropsT): ReturnedType {
    const newParent: HTMLElement = parent.cloneNode(true) as HTMLElement;
    const newElem: HTMLElement = newParent?.querySelector(elem as string) || newParent;
    const id = new Date().getTime();

    if (isClearStyles) {
        newParent.removeAttribute('style');

        newParent.querySelectorAll('*').forEach((el) => {
            el.removeAttribute('style');
        });
    }

    if (isClearStyleParent) {
        newParent.removeAttribute('style');
    }

    clearStyleElems.forEach((el) => {
        if (el) {
            if (typeof el === 'string') {
                newParent.querySelectorAll(el).forEach((elemLoop) => {
                    elemLoop.removeAttribute('style');
                });
            } else {
                const { className, params } = el;

                newParent.querySelectorAll(className).forEach((elemLoop) => {
                    params.forEach((param) => {
                        (
                            (elemLoop as HTMLElement).style as unknown as {
                                [t: string]: string | null;
                            }
                        )[param] = null;
                    });
                });
            }
        }
    });

    if (!isNotRemove) {
        newParent.style.opacity = '0';
        newParent.style.pointerEvents = 'none';
    }

    if (width) {
        newParent.style.width = width === 'auto' ? 'auto' : `${width}px`;
    }

    if (height) {
        newParent.style.height = height === 'auto' ? 'auto' : `${height}px`;
    }

    newParent.querySelectorAll('input').forEach((input) => {
        input.removeAttribute('name');
        input.removeAttribute('id');
    });

    newParent.querySelectorAll('audio').forEach((item) => {
        item.remove();
    });

    if (!isNotRemoveMedia) {
        newParent.querySelectorAll('img').forEach((item) => {
            item.removeAttribute('src');
        });
    }

    newParent.querySelectorAll('.animateChange').forEach((elemAnimate) => {
        elemAnimate.classList.add('_static');
    });

    classNames.forEach((className) => {
        newParent.classList.add(className);
    });

    if (elems) {
        elems.forEach((elemLoop) => {
            const newElemLoop: HTMLElement | null = newParent.querySelector(elemLoop.className);

            if (newElemLoop && isClearStyles) {
                newElemLoop.removeAttribute('style');
            }

            if (isTransform === false && newElemLoop) {
                (newElemLoop.style as unknown as { [t: string]: string | null }).left = null;
                (newElemLoop.style as unknown as { [t: string]: string | null }).top = null;
            }

            if (elemLoop.style && newElemLoop) {
                const { style } = elemLoop;

                (Object.keys(style) as []).forEach((key): void => {
                    newElemLoop.style[key] = style[key];
                });
            }
        });
    }

    const wrapper = document.createElement('div');

    classNames.forEach((className) => {
        wrapper.classList.add(className);
    });

    wrapper.setAttribute('id', id.toString());
    wrapper.style.position = 'fixed';
    wrapper.style.zIndex = '99999999999';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.background = '#fff';

    wrapper.classList.add('_parentCalc');

    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';

    wrapper.appendChild(newParent);

    document.querySelector('.body__content')?.appendChild(wrapper);

    newParent.scrollTop = parent.scrollTop;

    removeTransition({ item: `#${id}` });

    if (!width) {
        const { offsetWidth: widthParent } = newParent;

        newParent.style.width = `${widthParent}px`;
    }

    const params: ReturnedType = {
        parent: getParams(newParent),
    };

    if (elems) {
        elems.forEach((elemLoop) => {
            const newElemLoop = newParent.querySelector(elemLoop.className) as HTMLElement;

            if (newElemLoop) {
                params[elemLoop.id] = getParams(newElemLoop);
            }
        });
    } else if (newElem) {
        const elemParams = getParams(newElem);

        (Object.keys(elemParams) as (keyof ReturnedParams)[]).forEach((key) => {
            params[key] = elemParams[key] as number;
        });
    }

    if (!isNotRemove) {
        wrapper.parentNode?.removeChild(wrapper);
    }

    let condForChange = !checkChange;

    if (checkChange) {
        if (checkChange.target && Object.keys(checkChange.target).length) {
            Object.keys(checkChange.target).forEach((key) => {
                const resultParam = checkChange.target[key];
                const resultParamNext: ReturnedParams = params[key] as ReturnedParams;

                if (resultParamNext && resultParam) {
                    const props =
                        typeof checkChange.props === 'function'
                            ? checkChange.props(key)
                            : checkChange.props;

                    (props as (keyof ReturnedParams)[]).forEach(
                        <T extends keyof ReturnedParams>(prop: T) => {
                            if (resultParam[prop] !== resultParamNext[prop]) {
                                condForChange = true;
                            }
                        },
                    );
                } else {
                    condForChange = true;
                }
            });
        } else {
            condForChange = true;
        }
    }

    params.condForChange = condForChange;

    return params;
}

export type { ReturnedParams as RealParamsItemT };
