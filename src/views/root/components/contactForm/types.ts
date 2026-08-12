import EditorI from '@/src/components/editor/types';

type PropsT = {};

type StateT = {
    form?: Partial<{
        type: string;
        name: string;
        contact: string;
        about: string;
        agreement: boolean;
        filename: string;
    }>;
};

interface ContactFormI extends EditorI<PropsT, StateT> {}

export default ContactFormI;
