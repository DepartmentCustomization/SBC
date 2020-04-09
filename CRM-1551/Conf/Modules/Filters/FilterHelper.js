import { Filter } from '/Modules/Filters/Filter.js';
import { DateTimeFilter } from '/Modules/Filters/DateTimeFilter.js';
import { SelectFilter } from '/Modules/Filters/SelectFilter.js';
import { MultiSelectFilter } from '/Modules/Filters/MultiSelectFilter.js';
import { FilterType } from '/Modules/enums/FilterType.js';

export class FilterHelper {
    getActiveFilters(filters) {
        const activeFilters = [];
        filters.forEach(filter => {
            const active = filter.active;
            if (active) {
                const name = filter.name;
                const type = filter.type;
                const placeholder = filter.placeholder;
                const value = filter.value;
                switch (type) {
                    case FilterType.Select: {
                        const valueSelect = value.value;
                        const viewValueSelect = value.viewValue;
                        const filterSelect = new SelectFilter(name, placeholder, type, valueSelect, viewValueSelect);
                        activeFilters.push(filterSelect);
                        break;
                    }
                    case 'MultiSelect': {
                        const filterMultiSelect = new MultiSelectFilter(name, placeholder, type, value);
                        activeFilters.push(filterMultiSelect);
                        break;
                    }
                    case 'Date':
                    case 'DateTime':
                    case 'Time': {
                        const dateFrom = value.dateFrom;
                        const dateTo = value.dateTo;
                        if (dateFrom === undefined || dateTo === undefined) {
                            const date = value;
                            const filterCalendar = new Filter(
                                name,
                                placeholder,
                                type,
                                date
                            );
                            activeFilters.push(filterCalendar);
                        } else {
                            const filterDateTime = new DateTimeFilter(
                                name,
                                placeholder,
                                type,
                                dateFrom,
                                dateTo
                            );
                            activeFilters.push(filterDateTime);
                        }
                        break;
                    }
                    case 'CheckBox':
                    case 'Input': {
                        const valueInput = value;
                        const simpleFilter = new Filter(
                            name,
                            placeholder,
                            type,
                            valueInput
                        );
                        activeFilters.push(simpleFilter);
                        break;
                    }
                    default:
                        break;
                }
            }
        });
        return activeFilters;
    }
}
