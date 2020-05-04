import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { Announcement } from "../../models/Announcement";
import { IApplicationState } from "../../store";
import AnnouncementActions from "../../store/AnnouncementActions";
import usePermissions from "../../utilities/Permissions";
import AnnouncementDetail from "./AnnouncementDetail";
import { IDocumentSearch } from "../../store/DocumentActions";
import Constants from "../../constants";
import DocumentActions from "../../store/DocumentActions";

const AnnouncementList: React.FC = () => {
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const state = useSelector((state: IApplicationState) => state.announcements);
    const documentState = useSelector((state: IApplicationState) => state.documents);
    const canAdd = state.data.findIndex((a) => a.id === 0) < 0; // no pending add
    const query = {
        key: "current-documents",
        year: Constants.EventCalendarYear,
    } as IDocumentSearch;

    // Info on why we memoize the callback passed to a child component
    // https://react-redux.js.org/next/api/hooks#usedispatch
    const saveAnnouncement = useCallback(
        (announcement: Announcement) => dispatch(AnnouncementActions.Save(announcement)),
        [dispatch]
    );

    // TODO: Why, when I provide dispatch and query in the dependency array,
    // does the component go into an endless load loop?
    useEffect(() => {
        dispatch(AnnouncementActions.Load());
        dispatch(DocumentActions.Load(query));
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h3 className="text-primary">MPGA News</h3>
            {permissions.canEditAnnouncements() && canAdd && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(AnnouncementActions.AddNew())}>
                    Add Announcement
                </Button>
            )}
            <LoadingContainer hasData={state.data !== undefined}>
                {state.data.map((announcement: Announcement) => {
                    return (
                        <AnnouncementDetail
                            key={announcement.id}
                            announcement={announcement}
                            edit={announcement.id === 0}
                            currentDocuments={documentState.documents.get(query.key) || []}
                            Cancel={() => dispatch(AnnouncementActions.CancelNew())}
                            Save={saveAnnouncement}
                        />
                    );
                })}
            </LoadingContainer>
        </div>
    );
};

export default AnnouncementList;
