"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputFilter = void 0;

var _BaseFilter2 = require("../../../Modules/TypeScript/Filters/BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputFilter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(InputFilter, _BaseFilter);

  function InputFilter(name, placeholder, value) {
    var _this;

    _classCallCheck(this, InputFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputFilter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _this.value = value;
    return _this;
  }

  return InputFilter;
}(_BaseFilter2.BaseFilter);

exports.InputFilter = InputFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9JbnB1dEZpbHRlci50cyJdLCJuYW1lcyI6WyJJbnB1dEZpbHRlciIsIm5hbWUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwiQmFzZUZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsVzs7Ozs7QUFFVCx1QkFBWUMsSUFBWixFQUEwQkMsV0FBMUIsRUFBK0NDLEtBQS9DLEVBQThEO0FBQUE7O0FBQUE7O0FBQzFELHFGQUFNRixJQUFOLEVBQVlDLFdBQVo7O0FBRDBEOztBQUUxRCxVQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFGMEQ7QUFHN0Q7OztFQUw0QkMsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvQmFzZUZpbHRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWx0ZXIgZXh0ZW5kcyBCYXNlRmlsdGVyIHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBsYWNlaG9sZGVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59Il19