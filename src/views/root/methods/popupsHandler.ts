import { PopupsT, popups } from '@/src/store/popups.ts';
import { appStore } from '@/src/store/store.tsx';
import getLocation from '@/src/utils/getLocation.ts';

import I from '../types.ts';

const initPopup = <T extends keyof PopupsT>(name: T): Omit<PopupsT[T], 'isShow'> => {
    let data: ObjT = {};

    if (name === 'contactsFormPopup') {
        data = {};
    }

    return data as Omit<PopupsT[T], 'isShow'>;
};

const popupsHandler: I['popupsHandler'] = function (set) {
    const { currentPopup } = this.props;
    const location = getLocation();

    if (currentPopup && !location.search.popup) {
        appStore.getState().closePopup({ name: currentPopup, pushHistory: false });
    }

    if (location.search.popup && set) {
        const popupName = [location.search.popup, 'Popup'].join('') as keyof PopupsT;

        if (popups[popupName]) {
            appStore.getState().setPopup({
                name: popupName,
                data: initPopup(popupName),
                pushHistory: false,
            });
        } else {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }
};

export default popupsHandler;
