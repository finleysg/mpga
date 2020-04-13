import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableDiv from '../../components/EditableDiv';
import Loading from '../../components/Loading';
import { PageContent } from '../../models/Policies';
import { IApplicationState } from '../../store';
import ContentActions from '../../store/ContentActions';
import PageContentEdit from './PageContentEdit';
import PageContentView from './PageContentView';
import usePermissions from "../../utilities/Permissions";

export interface IPageContentDetailProps {
    pageCode: string;
}

const PageContentDetail: React.FC<IPageContentDetailProps> = (props) => {
    const { pageCode } = props;
    const state = useSelector((state: IApplicationState) => state.content);
    const dispatch = useDispatch();
    const permissions = usePermissions();

    const getPage = () => {
        return state.pages.get(pageCode);
    }

    const saveContent = useCallback(
        (pageContent: PageContent) => dispatch(ContentActions.SavePageContent(pageContent)),
        [dispatch]
    )

    useEffect(() => {
        dispatch(ContentActions.LoadPageContent(pageCode));
    }, [dispatch, pageCode]);

    return (
        <>
            {state.isBusy ?
            <Loading /> :
            <EditableDiv initEdit={false} canEdit={permissions.canEditPageContent()}
                viewComponent={<PageContentView pageContent={getPage() || new PageContent({})} />}
                editComponent={<PageContentEdit pageContent={getPage() || new PageContent({})} Save={saveContent} />}>
            </EditableDiv>}
        </>
    );
}

export default PageContentDetail;
