import I from '../types';

const validateDomen: I['validateDomen'] = function (s) {
    return !!s.match(/^(https?:\/\/)+([\w-]+\.)+[\w-]+(\/[\w-]*)*$/);
};

export default validateDomen;
