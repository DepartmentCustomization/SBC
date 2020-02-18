"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarFilter = void 0;

var _BaseFilter2 = require("../../../Modules/TypeScript/Filters/BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalendarFilter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(CalendarFilter, _BaseFilter);

  function CalendarFilter(name, placeholder, date) {
    var _this;

    _classCallCheck(this, CalendarFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarFilter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "date", void 0);

    _this.date = date;
    return _this;
  }

  return CalendarFilter;
}(_BaseFilter2.BaseFilter);

exports.CalendarFilter = CalendarFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9DYWxlbmRhckZpbHRlci50cyJdLCJuYW1lcyI6WyJDYWxlbmRhckZpbHRlciIsIm5hbWUiLCJwbGFjZWhvbGRlciIsImRhdGUiLCJCYXNlRmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxjOzs7OztBQUVULDBCQUFZQyxJQUFaLEVBQTBCQyxXQUExQixFQUErQ0MsSUFBL0MsRUFBMkQ7QUFBQTs7QUFBQTs7QUFDdkQsd0ZBQU1GLElBQU4sRUFBWUMsV0FBWjs7QUFEdUQ7O0FBRXZELFVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUZ1RDtBQUcxRDs7O0VBTCtCQyx1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9CYXNlRmlsdGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckZpbHRlciBleHRlbmRzIEJhc2VGaWx0ZXIge1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcGxhY2Vob2xkZXI6IHN0cmluZywgZGF0ZTogRGF0ZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHBsYWNlaG9sZGVyKTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgfVxyXG59Il19