import I from '../types.ts';

const updatedStateCallback: I['updatedStateCallback'] = async function (this: I) {
    const { isMobMenuShow } = this.props;
    const menuBtnNode = this.parent.current!.querySelector<HTMLElement>('.topBar__menuBtn');
    const menuBtnPointsNodes =
        this.parent.current!.querySelectorAll<HTMLElement>('.topBar__menuBtnPoint');

    if (!menuBtnNode) {
        return;
    }

    if (this.timers.animate) {
        clearTimeout(this.timers.animate);
    }

    if (isMobMenuShow !== this.isMobMenuShow) {
        if (isMobMenuShow) {
            menuBtnPointsNodes.forEach((n) => {
                n.style.transition = '.15s cubic-bezier(.6,-0.73,.65,.25)';
            });
            menuBtnNode.setAttribute('data-start', 't');

            this.timers.animate = setTimeout(() => {
                menuBtnPointsNodes.forEach((n) => {
                    n.style.transition = '.15s ease-out';
                });
                menuBtnNode.setAttribute('data-end', 't');
            }, 300);
        }

        if (!isMobMenuShow) {
            menuBtnPointsNodes.forEach((n) => {
                n.style.transition = '.15s ease-in';
            });
            menuBtnNode.removeAttribute('data-end');

            this.timers.animate = setTimeout(() => {
                menuBtnPointsNodes.forEach((n) => {
                    n.style.transition = '.15s cubic-bezier(.22,.89,.39,1.53)';
                });
                menuBtnNode.removeAttribute('data-start');
            }, 300);
        }

        this.isMobMenuShow = isMobMenuShow;
    }
};

export default updatedStateCallback;
