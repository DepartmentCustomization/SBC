"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBoxFilter = void 0;

var _BaseFilter2 = require("../../../Modules/TypeScript/Filters/BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckBoxFilter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(CheckBoxFilter, _BaseFilter);

  function CheckBoxFilter(name, placeholder, value) {
    var _this;

    _classCallCheck(this, CheckBoxFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckBoxFilter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _this.value = value;
    return _this;
  }

  return CheckBoxFilter;
}(_BaseFilter2.BaseFilter);

exports.CheckBoxFilter = CheckBoxFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9DaGVja0JveEZpbHRlci50cyJdLCJuYW1lcyI6WyJDaGVja0JveEZpbHRlciIsIm5hbWUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwiQmFzZUZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYzs7Ozs7QUFFVCwwQkFBWUMsSUFBWixFQUEwQkMsV0FBMUIsRUFBK0NDLEtBQS9DLEVBQStEO0FBQUE7O0FBQUE7O0FBQzNELHdGQUFNRixJQUFOLEVBQVlDLFdBQVo7O0FBRDJEOztBQUUzRCxVQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFGMkQ7QUFHOUQ7OztFQUwrQkMsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvQmFzZUZpbHRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3hGaWx0ZXIgZXh0ZW5kcyBCYXNlRmlsdGVyIHtcclxuICAgIHZhbHVlOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwbGFjZWhvbGRlcjogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHBsYWNlaG9sZGVyKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn0iXX0=