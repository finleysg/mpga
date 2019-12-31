import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import { MpgaDocument } from '../../models/Documents';
import { IApplicationState } from '../../store';
import DocumentActions from '../../store/DocumentActions';
import DocumentEdit from './DocumentEdit';
import DocumentView, { IDocumentView } from './DocumentView';

export interface IDocumentDetail extends IDocumentView {
    edit: boolean,
};

const DocumentDetail: React.FC<IDocumentDetail> = (props) => {
    const session = useSelector((state: IApplicationState) => state.session);
    const dispatch = useDispatch();
    const { document, edit } = props;

    const saveDocument = useCallback(
        (file: File, document: MpgaDocument) => dispatch(DocumentActions.Save(file, document)),
        [dispatch]
    );

    return (
        <EditableDiv initEdit={edit} canEdit={session.user.isFullEditor}
            viewComponent={<DocumentView document={document} />}
            editComponent={
                <DocumentEdit document={document} 
                    Cancel={() => dispatch(DocumentActions.CancelNew)} 
                    Save={saveDocument} />
            }>
        </EditableDiv>
    );
}

export default DocumentDetail;
