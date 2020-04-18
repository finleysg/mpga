import React, { useState } from "react";

import EditContainer from "../../components/EditContainer";
import { Announcement } from "../../models/Announcement";
import usePermissions from "../../utilities/Permissions";
import AnnouncementEdit, { IAnnouncementEdit } from "./AnnouncementEdit";
import AnnouncementView from "./AnnouncementView";

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean;
}

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, currentDocuments, edit, Cancel, Save } = props;
    const [doEdit, setDoEdit] = useState(edit);
    const permissions = usePermissions();

    const saveAnnouncement = (announcement: Announcement) => {
        setDoEdit(false);
        Save(announcement);
    };

    return (
        <EditContainer
            doEdit={doEdit}
            canEdit={permissions.canEditAnnouncements()}
            ToggleEdit={() => setDoEdit(!doEdit)}
            viewComponent={<AnnouncementView announcement={announcement} />}
            editComponent={
                <AnnouncementEdit
                    announcement={announcement}
                    currentDocuments={currentDocuments}
                    Cancel={Cancel}
                    Save={saveAnnouncement}
                />
            }
        />
    );
};

export default AnnouncementDetail;
