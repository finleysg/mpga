import React, { useEffect, useCallback } from "react";
import { Announcement } from "../../models/Announcement";
import Loading from "../../components/Loading";
import AnnouncementDetail from "./AnnouncementDetail";
import Button from "react-bootstrap/Button";
import AnnouncementActions from "../../store/AnnouncementActions";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../store";

const AnnouncementList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IApplicationState) => state.announcements);
    const session = useSelector((state: IApplicationState) => state.session);
    const canAdd = state.data.findIndex(a => a.id === 0) < 0; // no pending add

    // Info on why we memoize the callback passed to a child component
    // https://react-redux.js.org/next/api/hooks#usedispatch
    const saveAnnouncement = useCallback(
        (announcement: Announcement) => dispatch(AnnouncementActions.Save(announcement)),
        [dispatch]
    )

    useEffect(() => {
        dispatch(AnnouncementActions.Load());  
    }, [dispatch]);

    return <div>
        <h3 className="text-primary">MPGA News</h3>
        {state.isBusy ?
            <Loading /> :
            state.data.map((announcement: Announcement) => {
                return <AnnouncementDetail key={announcement.id}
                    announcement={announcement}
                    edit={announcement.id === 0}
                    Cancel={() => dispatch(AnnouncementActions.CancelNew())}
                    Save={saveAnnouncement} />
            })}
        {session.user.isFullEditor && <Button variant="outline-secondary" 
            size="sm"
            disabled={!canAdd} 
            onClick={() => dispatch(AnnouncementActions.AddNew())}>
            Add Announcement
        </Button>}
    </div>
}

export default AnnouncementList;
