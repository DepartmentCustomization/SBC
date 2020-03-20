import { Filter } from '/modules/Filters/Filter.js';

export class SelectFilter extends Filter {
    constructor(name, placeholder, type, value, viewValue) {
        super(name, placeholder, type, value);
        this.viewValue = viewValue;
    }
}
