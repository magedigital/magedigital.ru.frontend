import I from '../types.ts';

const checkChange: I['checkChange'] = async function (start) {
    const { isShow, initCb } = this.props;

    if (isShow !== this.isShow) {
        this.isShow = isShow;

        if (start) {
            await this.asyncSetState.call(this, { isShow });

            if (isShow && this.parent.current) {
                this.parent.current.setAttribute('data-show', '');
            }

            if (isShow && initCb) {
                initCb();
            }

            return;
        }

        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        if (isShow) {
            await this.asyncSetState.call(this, { isShow: true });

            if (initCb) {
                initCb();
            }

            this.timerId = setTimeout(() => {
                if (this.parent.current) {
                    this.parent.current.setAttribute('data-show', '');
                }
            }, 10);

            return;
        }

        if (this.parent.current) {
            this.parent.current.removeAttribute('data-show');
        }

        this.timerId = setTimeout(async () => {
            await this.asyncSetState.call(this, { isShow: false });
        }, 300);
    }
};

export default checkChange;
