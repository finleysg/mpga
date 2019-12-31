import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import MarkdownDiv from '../../components/MarkdownDiv';
import { IApplicationState } from '../../store';
import ContentActions from '../../store/ContentActions';

const HomeContent: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.content);

    const getPage = () => {
        return state.pages.get("H");
    }

    useEffect(() => {
        dispatch(ContentActions.LoadPageContent("H"));
    }, [dispatch]);

    return (
        <div>
            {state.isBusy ?
            <Loading /> :
            <>
                <h3 className="text-primary mb-3">{getPage()?.title}</h3>
                <MarkdownDiv text={getPage()?.content!} />
            </>}
        </div>
    );
}

export default HomeContent;
