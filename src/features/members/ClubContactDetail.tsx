import React, { useRef } from "react";

import { toast } from "react-toastify";

import { CloseableEditContainer, CloseHandle } from "../../components/WithEdit";
import { ClubContact, IClubContact } from "../../models/Clubs";
import { IClubContactData } from "../../models/Data";
import {
  useAddClubContactMutation,
  useRemoveClubContactMutation,
  useUpdateClubContactMutation,
} from "../../services/ClubEndpoints";
import usePermissions from "../../utilities/Permissions";
import ClubContactEdit from "./ClubContactEdit";
import ClubContactView from "./ClubContactView";
import { ClubContactDetailProps } from "./MemberPropTypes";

const ClubContactDetail: React.FC<ClubContactDetailProps> = (props) => {
  const { clubId, clubContact, edit, onClose } = props;

  const permissions = usePermissions();
  const [updateClubContact] = useUpdateClubContactMutation();
  const [addClubContact] = useAddClubContactMutation();
  const [removeClubContact] = useRemoveClubContactMutation();
  const closeRef = useRef<CloseHandle>();

  const handleSave = async (clubContact: IClubContact) => {
    const data = ClubContact.Create(clubId, clubContact).prepJson() as IClubContactData;
    const mutation = data.id > 0 ? updateClubContact(data) : addClubContact(data);
    await mutation
      .unwrap()
      .then(() => {
        toast.success(`${clubContact.firstName + " " + clubContact.lastName} has been saved.`);
        closeRef.current.close();
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  const handleDelete = async (clubContact: ClubContact) => {
    await removeClubContact(clubContact.prepJson())
      .unwrap()
      .then(() => {
        toast.success(`${clubContact.contact.firstName + " " + clubContact.contact.lastName} has been removed.`);
        closeRef.current.close();
        onClose();
      })
      .catch((error) => {
        toast.error("💣 " + error);
      });
  };

  const handleCancel = () => {
    closeRef.current.close();
    onClose();
  };

  return (
    <CloseableEditContainer
      ref={closeRef}
      initEdit={edit}
      canEdit={permissions.canEditClubPage()}
      viewComponent={<ClubContactView clubContact={clubContact} />}
      editComponent={
        <ClubContactEdit
          clubContact={clubContact}
          onCancel={handleCancel}
          onSave={handleSave}
          onRemove={handleDelete}
        />
      }
    />
  );
};

export default ClubContactDetail;
