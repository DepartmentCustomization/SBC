import { DateTimeFilter } from '../../../Modules/TypeScript/Filters/DateTimeFilter';
import { SelectFilter } from '../../../Modules/TypeScript/Filters/SelectFilter';
import { MultiSelectFilter } from '../../../Modules/TypeScript/Filters/MultiSelectFilter';
import { CalendarFilter } from '../../../Modules/TypeScript/Filters/CalendarFilter';
import { CheckBoxFilter } from '../../../Modules/TypeScript/Filters/CheckBoxFilter';
import { InputFilter } from '../../../Modules/TypeScript/Filters/InputFilter';
import { IFilter } from '../../../Modules/TypeScript/interfaces/filters/filter';

export class FilterHelper {
    private filters: Array<IFilter>;
    private filterParams: Array<object> = [];
    constructor(filters: Array<IFilter>) {
        this.filters = filters;
    }

    public getFiltersParams() {
        return this.filterParams;
    }

    public setFiltersParams(): void {
        this.filters.forEach((filter: IFilter): void => {
            debugger;
            const active = filter.active;
            if(active) {
                const name = filter.name;
                const type = filter.type;
                const placeholder = filter.placeholder;
                const value: any = filter.value;
                switch (type) {
                case 'Select': {
                    let valueSelect = value.value;
                    let viewValueSelect = value.viewValue;
                    let filterSelect = new SelectFilter(name, placeholder, valueSelect, viewValueSelect);
                    this.filterParams.push(filterSelect);
                    break;
                }
                case 'MultiSelect': {
                    let valueMultiSelect = value.value;
                    let viewValueMultiSelect = value.viewValue;
                    let filterMultiSelect = new MultiSelectFilter(name, placeholder, valueMultiSelect, viewValueMultiSelect);
                    this.filterParams.push(filterMultiSelect);
                    break;
                }
                case 'Date':
                case 'DateTime':
                case 'Time': {
                    const dateFrom = value.dateFrom;
                    const dateTo = value.dateTo;
                    if(dateFrom === undefined || dateTo === undefined) {
                        const date = value;
                        const filterCalendar = new CalendarFilter(
                            name,
                            placeholder,
                            date
                        );
                        this.filterParams.push(filterCalendar);
                    } else {
                        const filterDateTime = new DateTimeFilter(
                            name,
                            placeholder,
                            dateFrom,
                            dateTo
                        );
                        this.filterParams.push(filterDateTime);
                    }
                    break;
                }
                case 'CheckBox': {
                    let valueInput = value;
                    let checkBoxFilter = new CheckBoxFilter(
                        name,
                        placeholder,
                        valueInput
                        );
                        this.filterParams.push(checkBoxFilter);
                }
                    break;
                case 'Input': {
                    let valueInput = value;
                    let inputFilter: InputFilter = new InputFilter(
                        name,
                        placeholder,
                        valueInput
                    );
                    this.filterParams.push(inputFilter);
                }
                    break;
                default:
                    break;
                }
            }
        });
    }
}
