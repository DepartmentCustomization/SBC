import { DateTimeFilter } from '../Filters/DateTimeFilter.js';
import { SelectFilter } from '../Filters/SelectFilter.js';
import { MultiSelectFilter } from '../Filters/MultiSelectFilter.js';
import { CalendarFilter } from '../Filters/CalendarFilter.js';
import { CheckBoxFilter } from '../Filters/CheckBoxFilter.js';
import { InputFilter } from '../Filters/InputFilter.js';
var FilterHelper = /** @class */ (function () {
    function FilterHelper(filters) {
        this.filterParams = [];
        this.filters = filters;
    }
    FilterHelper.prototype.getFiltersParams = function () {
        this.setFiltersParams();
        return this.filterParams;
    };
    FilterHelper.prototype.setFiltersParams = function () {
        var _this = this;
        this.filters.forEach(function (filter) {
            var active = filter.active;
            if (active) {
                var name_1 = filter.name;
                var type = filter.type;
                var placeholder = filter.placeholder;
                var value = filter.value;
                switch (type) {
                    case 'Select': {
                        var valueSelect = value.value;
                        var viewValueSelect = value.viewValue;
                        var filterSelect = new SelectFilter(name_1, placeholder, valueSelect, viewValueSelect);
                        _this.filterParams.push(filterSelect);
                        break;
                    }
                    case 'MultiSelect': {
                        var valueMultiSelect = value.value;
                        var viewValueMultiSelect = value.viewValue;
                        var filterMultiSelect = new MultiSelectFilter(name_1, placeholder, valueMultiSelect, viewValueMultiSelect);
                        _this.filterParams.push(filterMultiSelect);
                        break;
                    }
                    case 'Date':
                    case 'DateTime':
                    case 'Time': {
                        var dateFrom = value.dateFrom;
                        var dateTo = value.dateTo;
                        if (dateFrom === undefined || dateTo === undefined) {
                            var date = value;
                            var filterCalendar = new CalendarFilter(name_1, placeholder, date);
                            _this.filterParams.push(filterCalendar);
                        }
                        else {
                            var filterDateTime = new DateTimeFilter(name_1, placeholder, dateFrom, dateTo);
                            _this.filterParams.push(filterDateTime);
                        }
                        break;
                    }
                    case 'CheckBox':
                        {
                            var valueInput = value;
                            var checkBoxFilter = new CheckBoxFilter(name_1, placeholder, valueInput);
                            _this.filterParams.push(checkBoxFilter);
                        }
                        break;
                    case 'Input':
                        {
                            var valueInput = value;
                            var inputFilter = new InputFilter(name_1, placeholder, valueInput);
                            _this.filterParams.push(inputFilter);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    };
    return FilterHelper;
}());
export { FilterHelper };
//# sourceMappingURL=FilterHelper.js.map