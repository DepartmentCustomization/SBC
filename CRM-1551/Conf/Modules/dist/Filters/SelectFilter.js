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
import { Filter } from '../Filters/Filter.js';
var SelectFilter = /** @class */ (function (_super) {
    __extends(SelectFilter, _super);
    function SelectFilter(name, placeholder, value, viewValue) {
        var _this = _super.call(this, name, placeholder, value) || this;
        _this.viewValue = viewValue;
        return _this;
    }
    return SelectFilter;
}(Filter));
export { SelectFilter };
