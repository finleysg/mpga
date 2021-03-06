import React from 'react';
import ReactMarkdown from "react-markdown";

import { PageContent } from '../../models/Policies';

export interface IPageContentViewProps {
    pageContent: PageContent,
};

const PageContentView: React.FC<IPageContentViewProps> = (props) => {
    const {pageContent} = props;
    return (
        <div>
            <h3 className="text-primary mb-3">{pageContent.title}</h3>
            <ReactMarkdown source={pageContent.content} escapeHtml={true} />
        </div>
    );
}

export default PageContentView;
