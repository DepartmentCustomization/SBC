import { BaseFilter } from '../../TypeScript/Filters/BaseFilter';

export class Filter extends BaseFilter {
    value: string;
    constructor(name: string, placeholder: string, value: string) {
        super(name, placeholder);
        this.value = value;
    }
}
