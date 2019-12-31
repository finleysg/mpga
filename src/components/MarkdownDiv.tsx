import React from "react";
import showdown from 'showdown';

export interface IMarkdownProps {
    text: string;
}

const MarkdownDiv: React.FC<IMarkdownProps> = (props) => {
    const converter = new showdown.Converter({openLinksInNewWindow: true});
    const markdownToHtml = (markdown: string) => {
        return {__html: converter.makeHtml(markdown)}
    };
    return (
        <div dangerouslySetInnerHTML={markdownToHtml(props.text)} />
    )
}

export default MarkdownDiv;
