const s = function (): boolean {
    return typeof window === 'undefined';
};

const w: Window = s()
    ? ({
          innerHeight: 1000,
      } as unknown as Window)
    : window;

const d: Document = s()
    ? ({
          documentElement: {
              clientWidth: 1000,
          },
          querySelector: () => undefined,
          addEventListener: () => undefined,
          cookie: '',
      } as unknown as Document)
    : document;

const l = s()
    ? {
          getItem: () => '',
          setItem: () => '',
          deleteItem: () => '',
      }
    : localStorage;

export { s, w, d, l };
