import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageContent } from '../../models/Policies';
import { IApplicationState } from '../../store';
import ContentActions, { PageContentForm } from '../../store/ContentActions';
import PageContentEdit from './PageContentEdit';
import PageContentView from './PageContentView';
import usePermissions from "../../utilities/Permissions";
import LoadingContainer from "../../components/LoadingContainer";
import WithEdit from "../../components/WithEdit";

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
        <LoadingContainer hasData={getPage() !== undefined}>
            <WithEdit
                formName={PageContentForm}
                initEdit={false} 
                canEdit={permissions.canEditPageContent()}
                viewComponent={<PageContentView pageContent={getPage() || new PageContent({})} />}
                editComponent={<PageContentEdit pageContent={getPage() || new PageContent({})} Save={saveContent} />}
            />
        </LoadingContainer>
    );
}

export default PageContentDetail;
