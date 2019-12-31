import React from "react";
import AnnouncementEdit, { IAnnouncementEdit } from "./AnnouncementEdit";
import AnnouncementView from "./AnnouncementView";
import EditableDiv from "../../components/EditableDiv";

export interface IAnnouncementDetail extends IAnnouncementEdit {
    edit: boolean,
};

const AnnouncementDetail: React.FC<IAnnouncementDetail> = (props) => {
    const { announcement, edit, Cancel, Save } = props;
    return (
        <EditableDiv initEdit={edit} canEdit={true}
            viewComponent={<AnnouncementView announcement={announcement} />}
            editComponent={<AnnouncementEdit announcement={announcement} Cancel={Cancel} Save={Save} />}>
        </EditableDiv>
    );
}

export default AnnouncementDetail;
