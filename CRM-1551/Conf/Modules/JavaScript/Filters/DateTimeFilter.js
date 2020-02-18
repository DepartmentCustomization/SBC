"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeFilter = void 0;

var _BaseFilter2 = require("../../../Modules/TypeScript/Filters/BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DateTimeFilter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(DateTimeFilter, _BaseFilter);

  function DateTimeFilter(name, placeholder, dateFrom, dateTo) {
    var _this;

    _classCallCheck(this, DateTimeFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateTimeFilter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "dateFrom", void 0);

    _defineProperty(_assertThisInitialized(_this), "dateTo", void 0);

    _this.dateFrom = dateFrom;
    _this.dateTo = dateTo;
    return _this;
  }

  return DateTimeFilter;
}(_BaseFilter2.BaseFilter);

exports.DateTimeFilter = DateTimeFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9EYXRlVGltZUZpbHRlci50cyJdLCJuYW1lcyI6WyJEYXRlVGltZUZpbHRlciIsIm5hbWUiLCJwbGFjZWhvbGRlciIsImRhdGVGcm9tIiwiZGF0ZVRvIiwiQmFzZUZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYzs7Ozs7QUFHVCwwQkFBWUMsSUFBWixFQUEwQkMsV0FBMUIsRUFBK0NDLFFBQS9DLEVBQStEQyxNQUEvRCxFQUE2RTtBQUFBOztBQUFBOztBQUN6RSx3RkFBTUgsSUFBTixFQUFZQyxXQUFaOztBQUR5RTs7QUFBQTs7QUFFekUsVUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxVQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFIeUU7QUFJNUU7OztFQVArQkMsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvQmFzZUZpbHRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVGaWx0ZXIgZXh0ZW5kcyBCYXNlRmlsdGVyIHtcclxuICAgIGRhdGVGcm9tOiBEYXRlO1xyXG4gICAgZGF0ZVRvOiBEYXRlO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwbGFjZWhvbGRlcjogc3RyaW5nLCBkYXRlRnJvbTogRGF0ZSwgZGF0ZVRvOiBEYXRlKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgcGxhY2Vob2xkZXIpO1xyXG4gICAgICAgIHRoaXMuZGF0ZUZyb20gPSBkYXRlRnJvbTtcclxuICAgICAgICB0aGlzLmRhdGVUbyA9IGRhdGVUbztcclxuICAgIH1cclxufVxyXG4iXX0=