import EditorI from '@components/editor/types';

type PropsT = {};

type StateT = {
    projectCurrentIndex: number;
};

interface IndexI extends EditorI<PropsT, StateT> {
    email: string;
    projects: string[];

    startProjectsAnimate(this: IndexI): Promise<void>;

    renderBackVideo(this: IndexI): React.ReactNode;
    renderHead(this: IndexI): React.ReactNode;
    renderContent(this: IndexI): React.ReactNode;
    renderFoot(this: IndexI): React.ReactNode;
    renderProjects(this: IndexI): React.ReactNode;
}

export default IndexI;
