"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;

var _BaseFilter2 = require("../../../Modules/TypeScript/Filters/BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Filter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(Filter, _BaseFilter);

  function Filter(name, placeholder, value) {
    var _this;

    _classCallCheck(this, Filter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Filter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _this.value = value;
    return _this;
  }

  return Filter;
}(_BaseFilter2.BaseFilter);

exports.Filter = Filter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9GaWx0ZXIudHMiXSwibmFtZXMiOlsiRmlsdGVyIiwibmFtZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJCYXNlRmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxNOzs7OztBQUVULGtCQUFZQyxJQUFaLEVBQTBCQyxXQUExQixFQUErQ0MsS0FBL0MsRUFBOEQ7QUFBQTs7QUFBQTs7QUFDMUQsZ0ZBQU1GLElBQU4sRUFBWUMsV0FBWjs7QUFEMEQ7O0FBRTFELFVBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUYwRDtBQUc3RDs7O0VBTHVCQyx1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9CYXNlRmlsdGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBCYXNlRmlsdGVyIHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBsYWNlaG9sZGVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==