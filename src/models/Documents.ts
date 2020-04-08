import moment from "moment";
import { Model } from "./Model";

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
    document: number;
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

    get extension(): string {
        if (this.file) {
            const parts = this.file.split(".");
            return parts[parts.length - 1];
        }
        return "";
    }
}

export class MpgaPhoto extends Model {
    year = moment().year();
    caption?: string;
    photoType = "Other";
    thumbnailUrl?: string;
    imageUrl?: string;
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
