import React, { useCallback, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { ToggleDiv } from "../../../components/EditableDiv";
import Loading from "../../../components/Loading";
import ToggleEditButton from "../../../components/ToggleEditButton";
import { MpgaPhoto } from "../../../models/Documents";
import { EventDetail } from "../../../models/Events";
import { IApplicationState } from "../../../store";
import PhotoActions from "../../../store/PhotoActions";
import usePermissions from "../../../utilities/Permissions";
import PhotoUpload from "../../gallery/PhotoUpload";
import EventGalleryView from "./EventGalleryView";

interface IEventGalleryDetailProps {
    eventDetail: EventDetail;
}

const EventGalleryDetail: React.FC<IEventGalleryDetailProps> = (props) => {
    const { eventDetail } = props;
    const [doUpload, setDoUpload] = useState(false);
    const photoState = useSelector((state: IApplicationState) => state.photos);
    const dispatch = useDispatch();
    const permissions = usePermissions();

    useEffect(() => {
        dispatch(PhotoActions.LoadRandomPhoto(eventDetail.tournament!));
    }, [dispatch, eventDetail]);

    const savePhoto = useCallback((file: File, photo: MpgaPhoto) => dispatch(PhotoActions.UploadPhoto(photo, file)), [
        dispatch,
    ]);

    return (
        <>
            {!photoState.randomPhoto ? (
                <Loading />
            ) : (
                <ToggleDiv doEdit={doUpload}>
                    {permissions.canManageEvent() && (
                        <ToggleEditButton
                            isEditting={doUpload}
                            openIcon={<FaCamera size={20} color={"warning"} />}
                            Toggled={() => setDoUpload(!doUpload)}
                        />
                    )}
                    {doUpload && !photoState.isBusy && (
                        <PhotoUpload
                            tournament={eventDetail.tournament!}
                            year={eventDetail.eventYear}
                            Save={savePhoto}
                        />
                    )}
                    {doUpload && photoState.isBusy && <Loading />}
                    {!doUpload && <EventGalleryView eventDetail={eventDetail} samplePhoto={photoState.randomPhoto} />}
                </ToggleDiv>
            )}
        </>
    );
};

export default EventGalleryDetail;
