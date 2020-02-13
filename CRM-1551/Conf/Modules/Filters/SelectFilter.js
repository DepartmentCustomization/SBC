import { Filter } from '/modules/Filters/Filter.js';

export class SelectFilter extends Filter {
    constructor(name, placeholder, value, viewValue) {
        super(name, placeholder, value);
        this.viewValue = viewValue;
    }
}
