import { Filter } from '/Modules/JavaScript/Filters/Filter.js';
import { DateTimeFilter } from '/Modules/JavaScript/Filters/DateTimeFilter.js';
import { SelectFilter } from '/Modules/JavaScript/Filters/SelectFilter.js';
import { MultiSelectFilter } from '/Modules/JavaScript/Filters/MultiSelectFilter.js';
import { CalendarFilter } from '/Modules/JavaScript/Filters/CalendarFilter.js';

export class FilterHelper {
    filters = [];
    constructor(filters) {
        this.filters = filters;
    }

    getFiltersParams() {
        const filterParams = [];
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
                    filterParams.push(filterSelect);
                    break;
                }
                case 'MultiSelect': {
                    let valueMultiSelect = value.value;
                    let viewValueMultiSelect = value.viewValue;
                    let filterMultiSelect = new MultiSelectFilter(name, placeholder, valueMultiSelect, viewValueMultiSelect);
                    filterParams.push(filterMultiSelect);
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
                        filterParams.push(filterCalendar);
                    } else {
                        const filterDateTime = new DateTimeFilter(
                            name,
                            placeholder,
                            dateFrom,
                            dateTo
                        );
                        filterParams.push(filterDateTime);
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
                    filterParams.push(simpleFilter);
                }
                    break;
                default:
                    break;
                }
            }
        });
        return filterParams;
    }
}
