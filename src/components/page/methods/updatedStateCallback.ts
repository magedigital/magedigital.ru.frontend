import I from '../types.ts';

const updatedStateCallback: I['updatedStateCallback'] = async function (this: I) {
    const { currentPopup } = this.props;

    if (currentPopup !== this.currentPopup) {
        const scrollNode = this.parent.current!.querySelector('.page__scroll') as HTMLElement;
        this.currentPopup = currentPopup;
        scrollNode.dispatchEvent(new CustomEvent('scroll'));
    }
};

export default updatedStateCallback;
