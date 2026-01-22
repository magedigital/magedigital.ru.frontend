import I from '../types.ts';

const setError: I['setError'] = async function (error, focus = true) {
    await this.asyncSetState({ error });

    if (focus && error?.name) {
        const inputNode = this.parent.current
            ?.querySelector(`[data-field="${error.name}"]`)
            ?.querySelector('input');

        if (inputNode) {
            inputNode.focus();
        }
    }
};

export default setError;
