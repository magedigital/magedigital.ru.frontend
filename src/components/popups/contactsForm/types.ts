import EditorI from '@/src/components/editor/types';
import { StoreT } from '@/src/store/store';

type PropsT = {
    contents: StoreT['contents'];
};

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

interface ContactsFormI extends EditorI<PropsT, StateT> {
    formData: FormData;
    
    sendForm(this: ContactsFormI): Promise<void>;
}

export default ContactsFormI;
