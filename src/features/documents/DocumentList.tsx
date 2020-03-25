import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { MpgaDocument } from '../../models/Documents';
import { IApplicationState } from '../../store';
import DocumentActions from '../../store/DocumentActions';
import DocumentDetail from './DocumentDetail';
import { IDocumentRenderProps } from './DocumentView';
import { IDocumentSearch } from '../../store/DocumentActions';

export interface IDocumentListProps {
    query: IDocumentSearch,
    documents: MpgaDocument[],
    render: IDocumentRenderProps,
}

const DocumentList: React.FC<IDocumentListProps> = (props) => {
    const { query, documents } = props;
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.documents);
    const session = useSelector((state: IApplicationState) => state.session);
    const canAdd = documents?.findIndex(d => d.id === 0) || -1 < 0;

    const saveDocument = useCallback(
        (file: File, document: MpgaDocument) => {
            dispatch(DocumentActions.Save(query.key, file, document))
        },
        [dispatch, query]
    )

    const deleteDocument = useCallback(
        (document: MpgaDocument) => {
            dispatch(DocumentActions.Delete(query.key, document))
        },
        [dispatch, query]
    )

    return <div>
        {state.isBusy ?
            <Loading /> :
            documents.map((document: MpgaDocument) => {
                return <DocumentDetail key={document.id}
                    document={document}
                    render={props.render}
                    edit={document.id === 0}
                    Cancel={() => dispatch(DocumentActions.CancelNew(query.key))}
                    Delete={deleteDocument}
                    Save={saveDocument} />
            })}
        {session.user.isFullEditor && <Button variant="link" 
            className="text-warning"
            disabled={!canAdd} 
            onClick={() => dispatch(DocumentActions.AddNew(query))}>
            New Document
        </Button>}
    </div>
}

export default DocumentList;
