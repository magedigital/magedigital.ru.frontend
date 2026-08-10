export type ThrottleSettingsT = Partial<{ type: 'debounce' }>;
export const throttle = <F extends (...p: any[]) => any>(
    d: number,
    f: F,
    s?: ThrottleSettingsT,
): {
    fn: (...p: Parameters<F>) => any;
    getTimerId: () => ReturnType<typeof setTimeout> | undefined;
} => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    return {
        fn: (...p) => {
            if (timerId) {
                if (s?.type === 'debounce') {
                    clearTimeout(timerId);
                } else {
                    return;
                }
            }

            timerId = setTimeout(() => {
                f(...p);
                timerId = undefined;
            }, d);
        },
        getTimerId: () => timerId,
    };
};
