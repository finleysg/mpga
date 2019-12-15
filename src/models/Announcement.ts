import { Model } from "./Model";
import { MpgaDocument } from "./Documents";

export class Announcement extends Model {
    title = "";
    text = "";
    externalUrl?: string;
    externalName?: string;
    event?: number;
    document?: MpgaDocument;

    constructor(obj: any) {
        super();
        const announcement = super.fromJson(obj);
        announcement.document = new MpgaDocument(obj["document"]);
        return announcement;
    }
}
