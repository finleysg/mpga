import { BaseModel } from "./Model";

export class ContactMessage extends BaseModel {
    messageType: string = "General";
    course: string = "";
    contactName: string = "";
    contactEmail: string = "";
    contactPhone: string | undefined;
    event: string | undefined;
    message: string = "";

    constructor(messageType?: string, eventName?: string) {
        super();
        if (messageType) {
            this.messageType = messageType;
            this.event = eventName;
        }
    }
}
