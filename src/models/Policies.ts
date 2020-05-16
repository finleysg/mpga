import { BaseModel } from './Model';

export class PageContent extends BaseModel {
    pageType: string = "";
    title: string = "";
    content: string = "";

    constructor(json: any) {
        super();
        const obj = this.fromJson(json);
        Object.assign(this, obj);
    }
}

export class Policy extends BaseModel {
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