import { BaseFilter } from '/Modules/Filters/BaseFilter.js';

export class MultiSelectFilter extends BaseFilter {
    valueProperty = 'value';
    viewValueProperty = 'viewValue';
    constructor(name, placeholder, value, viewValue) {
        super(name, placeholder, value);
        this.value = this.setMultipleValues(value, this.valueProperty);
        this.viewValue = this.setMultipleValues(viewValue, this.viewValueProperty);
    }

    setMultipleValues(values, property) {
        const array = [];
        values.forEach(value => array.push(value[property]));
        return array.join(', ');
    }
}
