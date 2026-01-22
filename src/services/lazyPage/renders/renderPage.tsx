import React from 'react';

import LoaderBlock from '@components/loaderBlock/LoaderBlock';

import LazyPageI from '../types.ts';

const renderPage: LazyPageI['renderPage'] = function (name, DefaultPage, props) {
    const { loadPages } = this.context.state;
    const ReadyPage = loadPages[name]?.Component;
    const isLoad = loadPages[name]?.load;

    if (DefaultPage) {
        return <DefaultPage {...props} />;
    }

    this.loadPage.call(this, name);

    return (
        <>
            {ReadyPage && (
                <>
                    <div className={`body__pageWrapper ${isLoad ? '_show' : ''}`}>
                        <ReadyPage {...props} />
                    </div>
                </>
            )}

            <LoaderBlock className="body__pageLoader" isShow={!ReadyPage} />
        </>
    );
};

export default renderPage;
