import React from "react";

import EditableDiv from "../../components/EditableDiv";
import usePermissions from "../../utilities/Permissions";
import AnnouncementEdit, { IAnnouncementEdit } from "./AnnouncementEdit";
import AnnouncementView from "./AnnouncementView";

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean;
}

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, edit, Cancel, Save } = props;
    const permissions = usePermissions();

    return (
        <EditableDiv
            initEdit={edit}
            canEdit={permissions.canEditAnnouncements()}
            viewComponent={<AnnouncementView announcement={announcement} />}
            editComponent={<AnnouncementEdit announcement={announcement} Cancel={Cancel} Save={Save} />}
        />
    );
};

export default AnnouncementDetail;
