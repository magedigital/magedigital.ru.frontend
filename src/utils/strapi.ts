export const setStrapiContent = (d: {
    sections: ObjT[];
}): Partial<Record<string, StrapiBlockT>> => {
    const content: Partial<Record<string, StrapiBlockT>> = {};

    d.sections.forEach((s) => {
        let id = s.__component as string;

        if (id === 'sections.text') {
            id = s.code as string;
        }

        if (id) {
            content[id] = s as never;
        }
    });

    return content;
};
