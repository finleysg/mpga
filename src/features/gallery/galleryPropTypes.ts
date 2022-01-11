import { MpgaPhoto } from "models/Documents";
import { IPhotoData } from "services/Data";

export interface IPhotoSearch {
  tournamentId: number;
  year?: number;
}

export type PhotoParams = {
  photo: IPhotoData;
  file?: File;
};

export type GalleryProps = {
  photos: MpgaPhoto[];
  onSelect: (index: number) => void;
};

export type PhotoProps = {
  photo: MpgaPhoto;
  onSelect?: () => void;
};

export type PhotoEditrops = PhotoProps & {
  show: boolean;
  onClose: () => void;
};

export type PhotoUploadProps = {
  tournamentId: number;
  year?: number;
  onClose: () => void;
};
