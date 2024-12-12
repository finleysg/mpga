import { Announcement } from "../../models/Announcement";
import { MpgaDocument } from "../../models/Documents";

export type AnnouncementViewProps = {
  announcement: Announcement;
};

export type AnnouncementEditProps = AnnouncementViewProps & {
  documents: MpgaDocument[];
  onClose: () => void;
};

export type AnnouncementDetailProps = AnnouncementEditProps & {
  edit: boolean;
};
