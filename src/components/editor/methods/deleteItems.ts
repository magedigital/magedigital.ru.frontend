import I from '../types.ts';

const deleteItems: I['deleteItems'] = async function ({ items, name }) {
    const resultItems = [
        ...((this.state[name as keyof typeof this.state] as { _id: string }[]) || []),
    ];

    items.forEach((id) => {
        const index = resultItems.findIndex((item) => item._id === id);

        if (index !== -1) {
            resultItems.splice(index, 1);
        }
    });

    await this.asyncSetState({ [name]: resultItems });
};

export default deleteItems;
