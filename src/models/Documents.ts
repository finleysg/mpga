import moment from 'moment';
import { Model } from './Model';

export interface Tag {
  id: number;
  tag: string;
}

export interface DocumentTag {
  id: number;
  document: number;
  tag: Tag;
}

export interface PhotoTag {
  id: number;
  photo: number;
  tag: Tag;
}

export class MpgaDocument extends Model {
  year: number | undefined;
  title: string | undefined;
  documentType: string | undefined;
  file: string | undefined;
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
