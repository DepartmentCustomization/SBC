export class FiltersPackageHelperWithoutTimePosition {
    getFiltersPackage(filters) {
        const filtersPackage = [];
        filters.forEach(filter => {
            const properties = {
                name: filter.name,
                placeholder: filter.placeholder,
                type: filter.type,
                active: true,
                value: undefined
            }
            switch (filter.type) {
                case 'Select': {
                    properties.value = {
                        value: filter.value,
                        viewValue: filter.viewValue
                    }
                    filtersPackage.push(properties);
                    break;
                }
                case 'MultiSelect': {
                    properties.value = this.getMultiSelectPackage(filter);
                    filtersPackage.push(properties);
                    break;
                }
                case 'Time': {
                    properties.value = new Date(filter.value);
                    filtersPackage.push(properties);
                    break;
                }
                case 'Date': {
                    const index = filtersPackage.findIndex(f => f.name === filter.name);
                    properties.value = {
                        dateFrom: new Date(filter.value.dateFrom),
                        dateTo:new Date(filter.value.dateTo)
                    }
                    if (index === -1) {
                        filtersPackage.push(properties);
                    }
                    break;
                }
                case 'DateTime': {
                    const index = filtersPackage.findIndex(f => f.name === filter.name);
                    const value = filter.value;
                    properties.value = {
                        dateFrom: new Date(filter.value.dateFrom),
                        dateTo:new Date(filter.value.dateTo)
                    }
                    if (index === -1) {
                        filtersPackage.push(properties);
                    } else {
                        this.setDoubleDateValue(filter, filtersPackage[index].value, value);
                    }
                    break;
                }
                case 'CheckBox':
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

    setDoubleDateValue(filter, object,value) {
        object.dateFrom = value.dateFrom;
        object.dateTo = value.dateTo
        return object
    }

    getMultiSelectPackage(filter) {
        const multiSelectPackage = [];
        const values = filter.value.split(', ');
        const viewValues = filter.viewValue.split(', ');
        values.forEach((value, index) => {
            multiSelectPackage.push({
                value: Number(value),
                viewValue: viewValues[index],
                checked: true
            });
        });
        return multiSelectPackage;
    }
}