import { DateTimeFilter } from '../../../Modules/TypeScript/Filters/DateTimeFilter';
import { SelectFilter } from '../../../Modules/TypeScript/Filters/SelectFilter';
import { MultiSelectFilter } from '../../../Modules/TypeScript/Filters/MultiSelectFilter';
import { CalendarFilter } from '../../../Modules/TypeScript/Filters/CalendarFilter';
import { CheckBoxFilter } from '../../../Modules/TypeScript/Filters/CheckBoxFilter';
import { InputFilter } from '../../../Modules/TypeScript/Filters/InputFilter';

export class FilterHelper {
    private getFiltersProps(filters) {
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
                    let valueInput = value;
                    let checkBoxFilter = new CheckBoxFilter(
                        name,
                        placeholder,
                        valueInput
                    );
                    filterParams.push(checkBoxFilter);
                case 'Input': {
                    let valueInput = value;
                    let inputFilter: InputFilter = new InputFilter(
                        name,
                        placeholder,
                        valueInput
                    );
                    filterParams.push(inputFilter);
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
