import { BaseFilter } from '../../../Modules/TypeScript/Filters/BaseFilter';

export class InputFilter extends BaseFilter {
    value: string;
    constructor(name: string, placeholder: string, value: string) {
        super(name, placeholder);
        this.value = value;
    }
}