import { Filter } from '/Modules/Filters/Filter.js';
import { DateTimeFilter } from '/Modules/Filters/DateTimeFilter.js';
import { SelectFilter } from '/Modules/Filters/SelectFilter.js';
import { MultiSelectFilter } from '/Modules/Filters/MultiSelectFilter.js';
import { CalendarFilter } from '/Modules/Filters/CalendarFilter.js';

export class FilterHelper {
    getFiltersProps(filters) {
        const filterParams = [];
        filters.forEach(filter => {
            const active = filter.active;
            if(active) {
                const name = filter.name;
                const type = filter.type;
                const placeholder = filter.placeholder;
                const value = filter.value;
                switch (type) {
                    case 'Select': {
                        const valueSelect = value.value;
                        const viewValueSelect = value.viewValue;
                        const filterSelect = new SelectFilter(name, placeholder, valueSelect, viewValueSelect);
                        filterParams.push(filterSelect);
                        break;
                    }
                    case 'MultiSelect': {
                        const filterMultiSelect = new MultiSelectFilter(name, placeholder, value);
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
                        const valueInput = value;
                        const simpleFilter = new Filter(
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
