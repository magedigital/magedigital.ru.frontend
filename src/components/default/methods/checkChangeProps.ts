import I from '../types.ts';

const checkChangeProps: I['checkChangeProps'] = async function (this: I) {
    if (!this.isCheckAuth && this.props.isCheckAuth === true && this.checkAuthCb) {
        this.isCheckAuth = true;

        if (this.props.authUser) {
            await this.asyncSetState({ authUser: this.props.authUser });

            if (this.init) {
                this.init();
            }
        }

        this.checkAuthCb();
    }

    if (!this.changingProps) {
        return;
    }

    this.changingProps.forEach((prop) => {
        if (this.changedProps[prop] !== this.props[prop] && this.changePropsCb) {
            this.changePropsCb(prop);

            this.changedProps[prop] = this.props[prop];
        }
    });
};

export default checkChangeProps;
