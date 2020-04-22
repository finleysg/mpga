import React from "react";

import WithEdit from "../../components/WithEdit";
import { Announcement } from "../../models/Announcement";
import { AnnouncementForm } from "../../store/AnnouncementActions";
import usePermissions from "../../utilities/Permissions";
import AnnouncementEdit, { IAnnouncementEdit } from "./AnnouncementEdit";
import AnnouncementView from "./AnnouncementView";

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean;
}

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, currentDocuments, edit, Cancel, Save } = props;
    const permissions = usePermissions();

    const saveAnnouncement = (announcement: Announcement) => {
        Save(announcement);
    };

    return (
        <WithEdit
            formName={AnnouncementForm}
            initEdit={edit}
            canEdit={permissions.canEditAnnouncements()}
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
