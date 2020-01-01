import { Model } from './Model';

export class PageContent extends Model {
    pageType: string = "";
    title: string = "";
    content: string = "";

    constructor(json: any) {
        super();
        const obj = this.fromJson(json);
        Object.assign(this, obj);
    }
}

export class Policy extends Model {
    policyType: string = "";
    name: string = "";
    title: string = "";
    description: string = "";

    constructor(json: any) {
        super();
        const obj = this.fromJson(json);
        Object.assign(this, obj);
    }
}