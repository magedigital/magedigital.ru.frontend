import setAsyncTimer from '@/src/utils/setAsyncTimer.ts';

import I from '../types.ts';

const loadPopup: I['loadPopup'] = async function () {
    const { name } = this.props;
    const folderName = name.replace('Popup', '');
    const popupName = folderName[0].toUpperCase() + folderName.slice(1);

    if (0) {
        await setAsyncTimer(1_000);
    }

    try {
        const PopupComponent = (await import(`@/src/components/popups/${folderName}/${popupName}.tsx`))
            .default;

        await this.asyncSetState({ PopupComponent });
    } catch (error) {}
};

export default loadPopup;
