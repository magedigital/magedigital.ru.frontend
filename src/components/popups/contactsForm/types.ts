import EditorI from '@/src/components/editor/types';

type PropsT = {};

type StateT = {
    form?: Partial<{
        types: string[];
        name: string;
        contact: string;
        about: string;
        agreement: boolean;
        filename: string;
    }>;
};

interface ContactsFormI extends EditorI<PropsT, StateT> {}

export default ContactsFormI;
