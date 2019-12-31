import { Model } from './Model';

export class PageContent extends Model {
    pageType: string = "";
    title: string = "";
    content: string = "";
}

export class Policy extends Model {
    policyType: string = "";
    name: string = "";
    title: string = "";
    description: string = "";
}