"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectFilter = void 0;

var _BaseFilter2 = require("./BaseFilter");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiSelectFilter =
/*#__PURE__*/
function (_BaseFilter) {
  _inherits(MultiSelectFilter, _BaseFilter);

  function MultiSelectFilter(name, placeholder, values, viewValues) {
    var _this;

    _classCallCheck(this, MultiSelectFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiSelectFilter).call(this, name, placeholder));

    _defineProperty(_assertThisInitialized(_this), "valueProperty", 'value');

    _defineProperty(_assertThisInitialized(_this), "viewValueProperty", 'viewValues');

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewValues", void 0);

    _this.value = _this.setMultipleValues(values, _this.valueProperty);
    _this.viewValues = _this.setMultipleValues(viewValues, _this.viewValueProperty);
    return _this;
  }

  _createClass(MultiSelectFilter, [{
    key: "setMultipleValues",
    value: function setMultipleValues(values, property) {
      var array = [];
      values.forEach(function (value) {
        return array.push(value[property]);
      });
      return array.join(', ');
    }
  }]);

  return MultiSelectFilter;
}(_BaseFilter2.BaseFilter);

exports.MultiSelectFilter = MultiSelectFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9NdWx0aVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6WyJNdWx0aVNlbGVjdEZpbHRlciIsIm5hbWUiLCJwbGFjZWhvbGRlciIsInZhbHVlcyIsInZpZXdWYWx1ZXMiLCJ2YWx1ZSIsInNldE11bHRpcGxlVmFsdWVzIiwidmFsdWVQcm9wZXJ0eSIsInZpZXdWYWx1ZVByb3BlcnR5IiwicHJvcGVydHkiLCJhcnJheSIsImZvckVhY2giLCJwdXNoIiwiam9pbiIsIkJhc2VGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxpQjs7Ozs7QUFLVCw2QkFBWUMsSUFBWixFQUEwQkMsV0FBMUIsRUFBK0NDLE1BQS9DLEVBQXNFQyxVQUF0RSxFQUFpRztBQUFBOztBQUFBOztBQUM3RiwyRkFBTUgsSUFBTixFQUFZQyxXQUFaOztBQUQ2RixvRUFKekUsT0FJeUU7O0FBQUEsd0VBSHJFLFlBR3FFOztBQUFBOztBQUFBOztBQUU3RixVQUFLRyxLQUFMLEdBQWEsTUFBS0MsaUJBQUwsQ0FBdUJILE1BQXZCLEVBQStCLE1BQUtJLGFBQXBDLENBQWI7QUFDQSxVQUFLSCxVQUFMLEdBQWtCLE1BQUtFLGlCQUFMLENBQXVCRixVQUF2QixFQUFtQyxNQUFLSSxpQkFBeEMsQ0FBbEI7QUFINkY7QUFJaEc7Ozs7c0NBRXlCTCxNLEVBQXdCTSxRLEVBQWU7QUFDN0QsVUFBTUMsS0FBb0IsR0FBRyxFQUE3QjtBQUNBUCxNQUFBQSxNQUFNLENBQUNRLE9BQVAsQ0FBZSxVQUFBTixLQUFLO0FBQUEsZUFBSUssS0FBSyxDQUFDRSxJQUFOLENBQVdQLEtBQUssQ0FBQ0ksUUFBRCxDQUFoQixDQUFKO0FBQUEsT0FBcEI7QUFDQSxhQUFPQyxLQUFLLENBQUNHLElBQU4sQ0FBVyxJQUFYLENBQVA7QUFDSDs7OztFQWZrQ0MsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRmlsdGVyIH0gZnJvbSAnLi9CYXNlRmlsdGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdEZpbHRlciBleHRlbmRzIEJhc2VGaWx0ZXIge1xyXG4gICAgdmFsdWVQcm9wZXJ0eTogc3RyaW5nID0gJ3ZhbHVlJztcclxuICAgIHZpZXdWYWx1ZVByb3BlcnR5OiBzdHJpbmcgPSAndmlld1ZhbHVlcyc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgdmlld1ZhbHVlczogYW55O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwbGFjZWhvbGRlcjogc3RyaW5nLCB2YWx1ZXM6IEFycmF5PHN0cmluZz4sIHZpZXdWYWx1ZXM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc2V0TXVsdGlwbGVWYWx1ZXModmFsdWVzLCB0aGlzLnZhbHVlUHJvcGVydHkpO1xyXG4gICAgICAgIHRoaXMudmlld1ZhbHVlcyA9IHRoaXMuc2V0TXVsdGlwbGVWYWx1ZXModmlld1ZhbHVlcywgdGhpcy52aWV3VmFsdWVQcm9wZXJ0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRNdWx0aXBsZVZhbHVlcyh2YWx1ZXM6ICBBcnJheTxzdHJpbmc+LCBwcm9wZXJ0eTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgYXJyYXk6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiBhcnJheS5wdXNoKHZhbHVlW3Byb3BlcnR5XSkpO1xyXG4gICAgICAgIHJldHVybiBhcnJheS5qb2luKCcsICcpO1xyXG4gICAgfVxyXG59Il19