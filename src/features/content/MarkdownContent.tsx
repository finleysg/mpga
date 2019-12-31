import React from 'react';

import MarkdownDiv from '../../components/MarkdownDiv';

export interface IMarkdownContentProps {
    title: string,
    markdown: string,
}

const MarkdownContent: React.FC<IMarkdownContentProps> = (props) => {
    const {title, markdown} = props;
    return (
        <div>
            <h5>{title}</h5>
            <MarkdownDiv text={markdown} />
        </div>
    );
}

export default MarkdownContent;
