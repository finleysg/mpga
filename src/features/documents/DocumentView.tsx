import React from 'react';
import { MpgaDocument } from '../../models/Documents';

export interface IDocumentView {
    document: MpgaDocument;
};

const DocumentView: React.FC<IDocumentView> = (props) => {
    const document = props.document;
    return (
        <a href={document.file!}>{document.title}</a>
    );
}

export default DocumentView;
