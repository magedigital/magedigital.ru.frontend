export const setStrapiContent = (d: { sections: ObjT[] }): Partial<Record<string, ObjT>> => {
    const content: Partial<Record<string, ObjT>> = {};

    d.sections.forEach((s) => {
        const id = s.__component as string;

        if (id) {
            content[id] = s;
        }
    });

    return content;
};
