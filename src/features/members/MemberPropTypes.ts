import { Club, ClubContact, IClubContact } from "../../models/Clubs";

export type ClubProps = {
  club: Club;
};

export type ClubContactProps = {
  clubContact: ClubContact;
};

export type ClubContactDetailProps = ClubContactProps & {
  clubId: number;
  edit: boolean;
  onClose: () => void;
};

export type ClubContactEditProps = ClubContactProps & {
  onCancel: () => void;
  onRemove: (clubContact: ClubContact) => void;
  onSave: (data: IClubContact) => void;
};

export type MemberClubEditProps = ClubProps & {
  onSave: (club: Club) => void;
  onCancel: () => void;
};
