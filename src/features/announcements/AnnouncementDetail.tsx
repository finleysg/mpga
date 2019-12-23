import React from "react";
import AnnouncementEdit, { IAnnouncementEdit } from "./AnnouncementEdit";
import AnnouncementView from "./AnnouncementView";
import EditableCard from "../../components/EditableCard";

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean,
};

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, edit, Cancel, Save } = props;
    return (
        <EditableCard initEdit={edit} canEdit={true}
            viewComponent={<AnnouncementView announcement={announcement} />}
            editComponent={<AnnouncementEdit announcement={announcement} Cancel={Cancel} Save={Save} />}>
        </EditableCard>
    );
}

export default AnnouncementDetail;
