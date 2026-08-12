import DefaultI from '@/src/components/default/types';

type PropsT = {
    value: string | undefined;
    support: string;
    onChange: (d: { file: File | undefined }) => Promise<void>;
};

type StateT = {};

export type FileFieldModeT = 'empty' | 'drag' | 'loading' | 'uploaded';

interface FileFieldI extends DefaultI<PropsT, StateT> {
    getMode(this: FileFieldI): FileFieldModeT;
}

export default FileFieldI;
