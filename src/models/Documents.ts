import moment from 'moment';
import { Model } from './Model';

export interface ITag {
  id: number;
  name: string;
}

export interface IDocumentTag {
  id: number;
  document: number;
  tag: ITag;
}

export interface IPhotoTag {
  id: number;
  photo: number;
  tag: ITag;
}

export class MpgaDocument extends Model {
  year = moment().year();
  title = "";
  documentType = "Other";
  file?: string;
  lastUpdate?: Date;
  createdBy?: string;
  tournament?: number;
  tags?: ITag[];

  constructor(json: any) {
    super();
    const obj = this.fromJson(json);
    if (json && json.tags) {
      obj.tags = json.tags.map((t: any) => {
        return {
          id: t.id,
          name: t.tag,
        };
      });
    }
    Object.assign(this, obj);
  }
}

export class MpgaPhoto extends Model {
  year: number | undefined;
  caption: string | undefined;
  photoType: string | undefined;
  thumbnailUrl: string | undefined;
  imageUrl: string | undefined;
  lastUpdate: moment.Moment | undefined;
  createdBy: string | undefined;
  tournament: number | undefined;
  tags: string[] | undefined;

  constructor(json: any) {
    super();
    const obj = this.fromJson(json);
    if (json && json.tags) {
      obj.tags = json.tags.map((t: any) => t.tag);
    }
    Object.assign(this, obj);
  }
}
