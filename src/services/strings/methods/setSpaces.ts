import I from '../types';

const chars = [
    'и',
    'а',
    'в',
    'во',
    'на',
    'с',
    'со',
    'к',
    'но',
    'по',
    'за',
    'о',
    'у',
    'об',
    'под',
    'из',
    'не',
    'вы',
    'их',
    'от',
    'при',
    'или',
    'я',
    'где',
    'это',
    'до',
];

const setSpaces: I['setSpaces'] = function (s) {
    const arrText = s.split(' ');

    let result = '';

    for (let i = 0; i < arrText.length; i++) {
        if (chars.indexOf(arrText[i].toLowerCase().replace(/[^а-я]/gi, '')) !== -1) {
            result += `${arrText[i]}&nbsp;`;
        } else {
            result += `${arrText[i]} `;
        }
    }

    if (result[result.length - 1] === ' ') {
        result = result.slice(0, -1);
    }

    return result;
};

export default setSpaces;
