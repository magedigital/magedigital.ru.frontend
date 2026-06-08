import EditorI from '@components/editor/types';

type PropsT = {};

type StateT = {
    projectCurrentIndex: number;
    popup?: PopupsT;
};

type PopupsT = 'services' | 'contacts';

interface IndexI extends EditorI<PropsT, StateT> {
    email: string;
    projects: string[];

    startProjectsAnimate(this: IndexI): Promise<void>;
    setPopupState(this: IndexI, d: { name: PopupsT; isShow: boolean }): Promise<void>;

    renderBackVideo(this: IndexI): React.ReactNode;
    renderHead(this: IndexI): React.ReactNode;
    renderContent(this: IndexI): React.ReactNode;
    renderFoot(this: IndexI): React.ReactNode;
    renderProjects(this: IndexI): React.ReactNode;
    renderPopups(this: IndexI): React.ReactNode;
}

export default IndexI;
