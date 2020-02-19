var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseFilter } from '../Filters/BaseFilter.js';
var MultiSelectFilter = /** @class */ (function (_super) {
    __extends(MultiSelectFilter, _super);
    function MultiSelectFilter(name, placeholder, values, viewValues) {
        var _this = _super.call(this, name, placeholder) || this;
        _this.valueProperty = 'value';
        _this.viewValueProperty = 'viewValues';
        _this.value = _this.setMultipleValues(values, _this.valueProperty);
        _this.viewValues = _this.setMultipleValues(viewValues, _this.viewValueProperty);
        return _this;
    }
    MultiSelectFilter.prototype.setMultipleValues = function (values, property) {
        var array = [];
        values.forEach(function (value) { return array.push(value[property]); });
        return array.join(', ');
    };
    return MultiSelectFilter;
}(BaseFilter));
export { MultiSelectFilter };
