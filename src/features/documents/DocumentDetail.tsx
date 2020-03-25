import React from 'react';
import { useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import { MpgaDocument } from '../../models/Documents';
import { IApplicationState } from '../../store';
import DocumentEdit from './DocumentEdit';
import DocumentView, { IDocumentViewProps } from './DocumentView';

export interface IDocumentDetail extends IDocumentViewProps {
    edit: boolean;
    Cancel: () => void;
    Save: (file: File, document: MpgaDocument) => void;
    Delete: (document: MpgaDocument) => void;
}

const DocumentDetail: React.FC<IDocumentDetail> = props => {
    const session = useSelector((state: IApplicationState) => state.session);
    const { document, edit, render, Cancel, Delete, Save } = props;

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={session.user.isFullEditor}
            viewComponent={<DocumentView document={document} render={render} />}
            editComponent={<DocumentEdit document={document} Cancel={Cancel} Delete={Delete} Save={Save} />}
        />
    );
};

export default DocumentDetail;
