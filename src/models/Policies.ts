import { Model } from './Model';

export class Policy extends Model {
    policyType: string | undefined;
    name: string | undefined;
    title: string | undefined;
    description: string | undefined;
}
