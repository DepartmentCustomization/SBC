import { BaseFilter } from './BaseFilter';

export class MultiSelectFilter extends BaseFilter {
    valueProperty: string = 'value';
    viewValueProperty: string = 'viewValues';
    value: Array<string> = [];
    viewValues: Array<string> = [];
    constructor(name: string, placeholder: string, value: Array<string>, viewValues: Array<string>) {
        super(name, placeholder);
        value = this.setMultipleValues(value, this.valueProperty);
        viewValues = this.setMultipleValues(viewValues, this.viewValueProperty);
    }

    private setMultipleValues(values, property: string) {
        const array: Array<string> = [];
        values.forEach(value => array.push(value[property]));
        return array.join(', ');
    }
}