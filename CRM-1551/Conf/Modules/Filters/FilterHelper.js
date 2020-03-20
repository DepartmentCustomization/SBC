import { Filter } from '/Modules/Filters/Filter.js';
import { DateTimeFilter } from '/Modules/Filters/DateTimeFilter.js';
import { SelectFilter } from '/Modules/Filters/SelectFilter.js';
import { MultiSelectFilter } from '/Modules/Filters/MultiSelectFilter.js';

export class FilterHelper {
    getActiveFilters(filters) {
        const activeFilters = [];
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
                        if(dateFrom === undefined || dateTo === undefined) {
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
    getQueryParameters(filters) {
        const queryParameters = [];
        filters.forEach(filter => {
            const parameters = { }
            switch (filter.type) {
                case 'Date':
                    if(filter.dateFrom === undefined || filter.dateTo === undefined) {
                        this.setSimpleQueryParametersValue(filter, queryParameters, parameters);
                    } else {
                        this.setDateTimeQueryParametersValue(filter, queryParameters, parameters);
                    }
                    break;
                case 'DateTime':
                case 'Time': {
                    this.setDateTimeQueryParametersValue(filter, queryParameters, parameters);
                    break;
                }
                case 'Select':
                case 'MultiSelect':
                case 'CheckBox':
                case 'Input': {
                    this.setSimpleQueryParametersValue(filter, queryParameters, parameters);
                    break;
                }
                default:
                    break;
            }
        });

        return queryParameters;
    }

    setDateTimeQueryParametersValue(filter, queryParameters, parameters) {
        if(filter.dateFrom) {
            parameters.key = `@${filter.name}DateFrom`;
            parameters.value = filter.dateFrom;
            queryParameters.push(parameters);
        }
        if(filter.dateTo) {
            parameters.key = `@${filter.name}DateTo`;
            parameters.value = filter.dateTo;
            queryParameters.push(parameters);
        }
    }

    setSimpleQueryParametersValue(filter, queryParameters, parameters) {
        parameters.key = `@${filter.name}`;
        parameters.value = filter.value;
        queryParameters.push(parameters);
    }
}
