import { BaseFilter } from '../../../Modules/TypeScript/Filters/BaseFilter';

export class CheckBoxFilter extends BaseFilter {
    value: boolean;
    constructor(name: string, placeholder: string, value: boolean) {
        super(name, placeholder);
        this.value = value;
    }
}