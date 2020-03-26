export class QueryHelper {
    queryParameters = [];
    defaultFilterValue = null;
    setQueryParameters(filters) {
        filters.forEach(filter => {
            switch (filter.type) {
                case 'Date':
                    if(filter.value.dateFrom === undefined || filter.value.dateTo === undefined) {
                        this.setSimpleQueryParametersKey(filter);
                    } else {
                        this.setDateTimeQueryParametersKey(filter);
                    }
                    break;
                case 'DateTime':
                case 'Time': {
                    this.setDateTimeQueryParametersKey(filter);
                    break;
                }
                case 'Select':
                case 'MultiSelect':
                case 'CheckBox':
                case 'Input': {
                    this.setSimpleQueryParametersKey(filter);
                    break;
                }
                default:
                    break;
            }
        });
    }

    setDateTimeQueryParametersKey(filter) {
        if (filter.value.dateFrom || filter.value.dateFrom === '') {
            const parameters = { key: `@${filter.name}DateFrom`, value: this.defaultFilterValue }
            this.queryParameters.push(parameters);
        }
        if (filter.value.dateTo || filter.value.dateTo === '') {
            const parameters = { key: `@${filter.name}DateTo`, value: this.defaultFilterValue }
            this.queryParameters.push(parameters);
        }
    }

    setSimpleQueryParametersKey(filter) {
        const parameters = { key: `@${filter.name}`, value: this.defaultFilterValue }
        this.queryParameters.push(parameters);
    }

    getQueryParameters(filters, activeFilters) {
        this.setQueryParameters(filters);
        activeFilters.forEach(filter => {
            switch (filter.type) {
                case 'Date':
                    if (filter.value || filter.value === '') {
                        const index = this.getIndex(`@${filter.name}`);
                        this.setQueryParameterValue(filter.value, index);
                    } else {
                        this.setDateTimeQueryParametersValues(filter);
                    }
                    break;
                case 'DateTime':
                case 'Time': {
                    this.setDateTimeQueryParametersValues(filter);
                    break;
                }
                case 'Select':
                case 'MultiSelect':
                case 'CheckBox':
                case 'Input': {
                    const index = this.getIndex(`@${filter.name}`);
                    this.setQueryParameterValue(filter.value, index);
                    break;
                }
                default:
                    break;
            }
        });
        return this.queryParameters;
    }

    setDateTimeQueryParametersValues(filter) {
        if (filter.dateFrom) {
            this.getQueryParameterProps(filter.name, filter.dateFrom, 'DateFrom');
        }
        if (filter.dateTo) {
            this.getQueryParameterProps(filter.name, filter.dateTo, 'DateTo');
        }
    }

    setQueryParameterProps(name, value, text) {
        const index = this.getIndex(`@${name}${text}`);
        this.setQueryParameterValue(value, index);
    }

    getIndex(key) {
        return this.queryParameters.findIndex(p => p.key === key);
    }

    setQueryParameterValue(value, index) {
        this.queryParameters[index].value = value;
    }
}