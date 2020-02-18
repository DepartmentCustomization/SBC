"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectFilter = void 0;

var _Filter2 = require("../../../Modules/TypeScript/Filters/Filter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectFilter =
/*#__PURE__*/
function (_Filter) {
  _inherits(SelectFilter, _Filter);

  function SelectFilter(name, placeholder, value, viewValue) {
    var _this;

    _classCallCheck(this, SelectFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectFilter).call(this, name, placeholder, value));

    _defineProperty(_assertThisInitialized(_this), "viewValue", void 0);

    _this.viewValue = viewValue;
    return _this;
  }

  return SelectFilter;
}(_Filter2.Filter);

exports.SelectFilter = SelectFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9TZWxlY3RGaWx0ZXIudHMiXSwibmFtZXMiOlsiU2VsZWN0RmlsdGVyIiwibmFtZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJ2aWV3VmFsdWUiLCJGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFk7Ozs7O0FBRVQsd0JBQVlDLElBQVosRUFBMEJDLFdBQTFCLEVBQStDQyxLQUEvQyxFQUE4REMsU0FBOUQsRUFBaUY7QUFBQTs7QUFBQTs7QUFDN0Usc0ZBQU1ILElBQU4sRUFBWUMsV0FBWixFQUF5QkMsS0FBekI7O0FBRDZFOztBQUU3RSxVQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUY2RTtBQUdoRjs7O0VBTDZCQyxlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvRmlsdGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RGaWx0ZXIgZXh0ZW5kcyBGaWx0ZXIge1xyXG4gICAgdmlld1ZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBsYWNlaG9sZGVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHZpZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgcGxhY2Vob2xkZXIsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLnZpZXdWYWx1ZSA9IHZpZXdWYWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=