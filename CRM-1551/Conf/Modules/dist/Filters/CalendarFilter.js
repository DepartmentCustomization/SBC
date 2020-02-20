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
var CalendarFilter = /** @class */ (function (_super) {
    __extends(CalendarFilter, _super);
    function CalendarFilter(name, placeholder, date) {
        var _this = _super.call(this, name, placeholder) || this;
        _this.date = date;
        return _this;
    }
    return CalendarFilter;
}(BaseFilter));
export { CalendarFilter };
//# sourceMappingURL=CalendarFilter.js.map