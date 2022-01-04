import { Club, ClubContact } from "../../models/Clubs";

export type ClubProps = {
  club: Club;
};

export type ClubContactProps = {
  clubContact: ClubContact;
};

export type ClubContactEditProps = ClubContactProps & {
  onClose: () => void;
};

export type ClubContactDetailProps = ClubContactEditProps & {
  edit: boolean;
};

export type MemberClubEditProps = ClubProps & {
  onClose: () => void;
};
