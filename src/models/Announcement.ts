import moment from 'moment';
import { Model } from "./Model";
import { MpgaDocument } from "./Documents";

export class Announcement extends Model {

    static Create = () => {
        const instance = new Announcement({
            id: 0,
            title: "",
            text: "",
            starts: moment().toDate(),
            expires: moment().add(7, "days").toDate(),
        });
        return instance;
    }

    title = "";
    text = "";
    starts = new Date();
    expires = new Date();
    externalUrl?: string;
    externalName?: string;
    event?: number;
    document?: MpgaDocument;

    constructor(obj: any) {
        super();
        const announcement = super.fromJson(obj);
        announcement.starts = new Date(obj.starts); // starts and expires don't play by the naming rules
        announcement.expires = new Date(obj.expires);
        announcement.document = new MpgaDocument(obj["document"]);
        Object.assign(this, announcement);
    }
}
