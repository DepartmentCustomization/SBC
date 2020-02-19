import { BaseFilter } from './BaseFilter';

export class MultiSelectFilter extends BaseFilter {
    valueProperty: string = 'value';
    viewValueProperty: string = 'viewValues';
    value: any;
    viewValues: any;
    constructor(name: string, placeholder: string, values: Array<string>, viewValues: Array<string>) {
        super(name, placeholder);
        this.value = this.setMultipleValues(values, this.valueProperty);
        this.viewValues = this.setMultipleValues(viewValues, this.viewValueProperty);
    }

    private setMultipleValues(values:  Array<string>, property: any) {
        const array: Array<string> = [];
        values.forEach(value => array.push(value[property]));
        return array.join(', ');
    }
}