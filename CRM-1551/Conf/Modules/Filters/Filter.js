import { BaseFilter } from '/modules/Filters/BaseFilter.js';

export class Filter extends BaseFilter {
    constructor(name, placeholder, value) {
        super(name, placeholder);
        this.value = value;
    }
}
