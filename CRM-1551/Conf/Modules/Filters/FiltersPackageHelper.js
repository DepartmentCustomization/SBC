export class FiltersPackageHelper {
    getFiltersPackage(filters) {
        const filtersPackage = [];
        filters.forEach(filter => {
            const properties = {
                name: filter.name,
                placeholder: filter.placeholder,
                type: filter.type,
                active: true
            }
            switch (filter.type) {
                case 'Select': {
                    break;
                }
                case 'MultiSelect': {
                    break;
                }
                case 'Date':
                case 'DateTime':
                case 'Time': {
                    if (filter.timePosition === undefined) {
                        properties.value = filter.value;
                        filtersPackage.push(properties);
                    } else {
                        const index = filtersPackage.findIndex(f => f.name === filter.name);
                        const value = new Date(filter.value);
                        properties.value = {
                            dateFrom: undefined,
                            dateTo: undefined
                        }
                        if (index === -1) {
                            this.setDoubleDateValue(filter, properties.value, value);
                            filtersPackage.push(properties);
                        } else {
                            this.setDoubleDateValue(filter, filtersPackage[index].value, value);
                        }
                    }
                    break;
                }
                case 'CheckBox': {
                    properties.value = true;
                    filtersPackage.push(properties);
                    break;
                }
                case 'Input': {
                    properties.value = filter.value;
                    filtersPackage.push(properties);
                    break;
                }
                default:
                    break;
            }
        });
        return filtersPackage;
    }

    setDoubleDateValue(filter, object, value) {
        if (filter.timePosition === 'dateFrom') {
            object.dateFrom = value;
        }
        if (filter.timePosition === 'dateTo') {
            object.dateTo = value;
        }
    }
}