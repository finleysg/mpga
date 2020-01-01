import React from 'react';

import MarkdownDiv from '../../components/MarkdownDiv';
import { PageContent } from '../../models/Policies';

export interface IPageContentViewProps {
    pageContent: PageContent,
};

const PageContentView: React.FC<IPageContentViewProps> = (props) => {
    const {pageContent} = props;
    return (
        <div>
            <h3 className="text-primary mb-3">{pageContent.title}</h3>
            <MarkdownDiv text={pageContent.content!} />
        </div>
    );
}

export default PageContentView;
