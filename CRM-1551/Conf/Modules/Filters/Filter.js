import { BaseFilter } from '/Modules/Filters/BaseFilter.js';

export class Filter extends BaseFilter {
    constructor(name, placeholder, value) {
        super(name, placeholder);
        this.value = value;
    }
}
