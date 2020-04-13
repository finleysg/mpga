import React, { useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import LoadingContainer from "../../components/LoadingContainer";
import { Announcement } from "../../models/Announcement";
import { IApplicationState } from "../../store";
import AnnouncementActions from "../../store/AnnouncementActions";
import usePermissions from "../../utilities/Permissions";
import AnnouncementDetail from "./AnnouncementDetail";

const AnnouncementList: React.FC = () => {
    const dispatch = useDispatch();
    const permissions = usePermissions();
    const state = useSelector((state: IApplicationState) => state.announcements);
    const canAdd = state.data.findIndex((a) => a.id === 0) < 0; // no pending add

    // Info on why we memoize the callback passed to a child component
    // https://react-redux.js.org/next/api/hooks#usedispatch
    const saveAnnouncement = useCallback(
        (announcement: Announcement) => dispatch(AnnouncementActions.Save(announcement)),
        [dispatch]
    );

    useEffect(() => {
        dispatch(AnnouncementActions.Load());
    }, [dispatch]);

    return (
        <div>
            <h3 className="text-primary">MPGA News</h3>
            {permissions.canEditAnnouncements() && (
                <Button
                    variant="link"
                    className="text-warning"
                    disabled={!canAdd}
                    onClick={() => dispatch(AnnouncementActions.AddNew())}>
                    Add Announcement
                </Button>
            )}
            <LoadingContainer hasData={state.data?.length > 0}>
                {state.data.map((announcement: Announcement) => {
                    return (
                        <AnnouncementDetail
                            key={announcement.id}
                            announcement={announcement}
                            edit={announcement.id === 0}
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
