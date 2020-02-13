import { Filter } from '/modules/Filters/Filter.js';
import { DateTimeFilter } from '/modules/Filters/DateTimeFilter.js';
import { SelectFilter } from '/modules/Filters/SelectFilter.js';
import { CalendarFilter } from '/modules/Filters/CalendarFilter.js';

export class FilterHelper {
    filterParams = [];
    constructor(filters) {
        this.filters = filters;
    }
    getFiltersProps() {
        this.filters.forEach(filter => {
            const active = filter.active;
            if(active) {
                const name = filter.name;
                const type = filter.type;
                const placeholder = filter.placeholder;
                const value = filter.value;
                switch (type) {
                case 'Select': {
                    let valueSelect = value.value;
                    let viewValueSelect = value.viewValue;
                    let filterSelect = new SelectFilter(name, placeholder, valueSelect, viewValueSelect);
                    this.filterParams.push(filterSelect);
                    break;
                }
                case 'MultiSelect': {
                    let valueMultiSelect = setMultipleValues(value, 'value');
                    let viewValueMultiSelect = setMultipleValues(value, 'viewValue');
                    let filterMultiSelect = new SelectFilter(name, placeholder, valueMultiSelect, viewValueMultiSelect);
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
                case 'CheckBox':
                case 'Input': {
                    let valueInput = value;
                    let simpleFilter = new Filter(
                        name,
                        placeholder,
                        valueInput
                    );
                    this.filterParams.push(simpleFilter);
                }
                    break;
                default:
                    break;
                }
            }
        });
    }
    getFiltersParams() {
        this.getFiltersProps();
        return this.filterParams;
    }
}

function setMultipleValues(values, property) {
    const array = [];
    values.forEach(value => array.push(value[property]));
    return array.join(', ');
}
