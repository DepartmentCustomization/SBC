"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterHelper = void 0;

var _DateTimeFilter = require("../../../Modules/TypeScript/Filters/DateTimeFilter");

var _SelectFilter = require("../../../Modules/TypeScript/Filters/SelectFilter");

var _MultiSelectFilter = require("../../../Modules/TypeScript/Filters/MultiSelectFilter");

var _CalendarFilter = require("../../../Modules/TypeScript/Filters/CalendarFilter");

var _CheckBoxFilter = require("../../../Modules/TypeScript/Filters/CheckBoxFilter");

var _InputFilter = require("../../../Modules/TypeScript/Filters/InputFilter");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterHelper =
/*#__PURE__*/
function () {
  function FilterHelper(filters) {
    _classCallCheck(this, FilterHelper);

    _defineProperty(this, "filters", void 0);

    _defineProperty(this, "filterParams", []);

    this.filters = filters;
  }

  _createClass(FilterHelper, [{
    key: "getFiltersParams",
    value: function getFiltersParams() {
      return this.filterParams;
    }
  }, {
    key: "setFiltersParams",
    value: function setFiltersParams() {
      var _this = this;

      this.filters.forEach(function (filter) {
        debugger;
        var active = filter.active;

        if (active) {
          var name = filter.name;
          var type = filter.type;
          var placeholder = filter.placeholder;
          var value = filter.value;

          switch (type) {
            case 'Select':
              {
                var valueSelect = value.value;
                var viewValueSelect = value.viewValue;
                var filterSelect = new _SelectFilter.SelectFilter(name, placeholder, valueSelect, viewValueSelect);

                _this.filterParams.push(filterSelect);

                break;
              }

            case 'MultiSelect':
              {
                var valueMultiSelect = value.value;
                var viewValueMultiSelect = value.viewValue;
                var filterMultiSelect = new _MultiSelectFilter.MultiSelectFilter(name, placeholder, valueMultiSelect, viewValueMultiSelect);

                _this.filterParams.push(filterMultiSelect);

                break;
              }

            case 'Date':
            case 'DateTime':
            case 'Time':
              {
                var dateFrom = value.dateFrom;
                var dateTo = value.dateTo;

                if (dateFrom === undefined || dateTo === undefined) {
                  var date = value;
                  var filterCalendar = new _CalendarFilter.CalendarFilter(name, placeholder, date);

                  _this.filterParams.push(filterCalendar);
                } else {
                  var filterDateTime = new _DateTimeFilter.DateTimeFilter(name, placeholder, dateFrom, dateTo);

                  _this.filterParams.push(filterDateTime);
                }

                break;
              }

            case 'CheckBox':
              {
                var valueInput = value;
                var checkBoxFilter = new _CheckBoxFilter.CheckBoxFilter(name, placeholder, valueInput);

                _this.filterParams.push(checkBoxFilter);
              }
              break;

            case 'Input':
              {
                var _valueInput = value;
                var inputFilter = new _InputFilter.InputFilter(name, placeholder, _valueInput);

                _this.filterParams.push(inputFilter);
              }
              break;

            default:
              break;
          }
        }
      });
    }
  }]);

  return FilterHelper;
}();

exports.FilterHelper = FilterHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9GaWx0ZXJIZWxwZXIudHMiXSwibmFtZXMiOlsiRmlsdGVySGVscGVyIiwiZmlsdGVycyIsImZpbHRlclBhcmFtcyIsImZvckVhY2giLCJmaWx0ZXIiLCJhY3RpdmUiLCJuYW1lIiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJ2YWx1ZVNlbGVjdCIsInZpZXdWYWx1ZVNlbGVjdCIsInZpZXdWYWx1ZSIsImZpbHRlclNlbGVjdCIsIlNlbGVjdEZpbHRlciIsInB1c2giLCJ2YWx1ZU11bHRpU2VsZWN0Iiwidmlld1ZhbHVlTXVsdGlTZWxlY3QiLCJmaWx0ZXJNdWx0aVNlbGVjdCIsIk11bHRpU2VsZWN0RmlsdGVyIiwiZGF0ZUZyb20iLCJkYXRlVG8iLCJ1bmRlZmluZWQiLCJkYXRlIiwiZmlsdGVyQ2FsZW5kYXIiLCJDYWxlbmRhckZpbHRlciIsImZpbHRlckRhdGVUaW1lIiwiRGF0ZVRpbWVGaWx0ZXIiLCJ2YWx1ZUlucHV0IiwiY2hlY2tCb3hGaWx0ZXIiLCJDaGVja0JveEZpbHRlciIsImlucHV0RmlsdGVyIiwiSW5wdXRGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUdhQSxZOzs7QUFHVCx3QkFBWUMsT0FBWixFQUFxQztBQUFBOztBQUFBOztBQUFBLDBDQURDLEVBQ0Q7O0FBQ2pDLFNBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNIOzs7O3VDQUV5QjtBQUN0QixhQUFPLEtBQUtDLFlBQVo7QUFDSDs7O3VDQUUrQjtBQUFBOztBQUM1QixXQUFLRCxPQUFMLENBQWFFLE9BQWIsQ0FBcUIsVUFBQ0MsTUFBRCxFQUEyQjtBQUM1QztBQUNBLFlBQU1DLE1BQU0sR0FBR0QsTUFBTSxDQUFDQyxNQUF0Qjs7QUFDQSxZQUFHQSxNQUFILEVBQVc7QUFDUCxjQUFNQyxJQUFJLEdBQUdGLE1BQU0sQ0FBQ0UsSUFBcEI7QUFDQSxjQUFNQyxJQUFJLEdBQUdILE1BQU0sQ0FBQ0csSUFBcEI7QUFDQSxjQUFNQyxXQUFXLEdBQUdKLE1BQU0sQ0FBQ0ksV0FBM0I7QUFDQSxjQUFNQyxLQUFVLEdBQUdMLE1BQU0sQ0FBQ0ssS0FBMUI7O0FBQ0Esa0JBQVFGLElBQVI7QUFDQSxpQkFBSyxRQUFMO0FBQWU7QUFDWCxvQkFBSUcsV0FBVyxHQUFHRCxLQUFLLENBQUNBLEtBQXhCO0FBQ0Esb0JBQUlFLGVBQWUsR0FBR0YsS0FBSyxDQUFDRyxTQUE1QjtBQUNBLG9CQUFJQyxZQUFZLEdBQUcsSUFBSUMsMEJBQUosQ0FBaUJSLElBQWpCLEVBQXVCRSxXQUF2QixFQUFvQ0UsV0FBcEMsRUFBaURDLGVBQWpELENBQW5COztBQUNBLGdCQUFBLEtBQUksQ0FBQ1QsWUFBTCxDQUFrQmEsSUFBbEIsQ0FBdUJGLFlBQXZCOztBQUNBO0FBQ0g7O0FBQ0QsaUJBQUssYUFBTDtBQUFvQjtBQUNoQixvQkFBSUcsZ0JBQWdCLEdBQUdQLEtBQUssQ0FBQ0EsS0FBN0I7QUFDQSxvQkFBSVEsb0JBQW9CLEdBQUdSLEtBQUssQ0FBQ0csU0FBakM7QUFDQSxvQkFBSU0saUJBQWlCLEdBQUcsSUFBSUMsb0NBQUosQ0FBc0JiLElBQXRCLEVBQTRCRSxXQUE1QixFQUF5Q1EsZ0JBQXpDLEVBQTJEQyxvQkFBM0QsQ0FBeEI7O0FBQ0EsZ0JBQUEsS0FBSSxDQUFDZixZQUFMLENBQWtCYSxJQUFsQixDQUF1QkcsaUJBQXZCOztBQUNBO0FBQ0g7O0FBQ0QsaUJBQUssTUFBTDtBQUNBLGlCQUFLLFVBQUw7QUFDQSxpQkFBSyxNQUFMO0FBQWE7QUFDVCxvQkFBTUUsUUFBUSxHQUFHWCxLQUFLLENBQUNXLFFBQXZCO0FBQ0Esb0JBQU1DLE1BQU0sR0FBR1osS0FBSyxDQUFDWSxNQUFyQjs7QUFDQSxvQkFBR0QsUUFBUSxLQUFLRSxTQUFiLElBQTBCRCxNQUFNLEtBQUtDLFNBQXhDLEVBQW1EO0FBQy9DLHNCQUFNQyxJQUFJLEdBQUdkLEtBQWI7QUFDQSxzQkFBTWUsY0FBYyxHQUFHLElBQUlDLDhCQUFKLENBQ25CbkIsSUFEbUIsRUFFbkJFLFdBRm1CLEVBR25CZSxJQUhtQixDQUF2Qjs7QUFLQSxrQkFBQSxLQUFJLENBQUNyQixZQUFMLENBQWtCYSxJQUFsQixDQUF1QlMsY0FBdkI7QUFDSCxpQkFSRCxNQVFPO0FBQ0gsc0JBQU1FLGNBQWMsR0FBRyxJQUFJQyw4QkFBSixDQUNuQnJCLElBRG1CLEVBRW5CRSxXQUZtQixFQUduQlksUUFIbUIsRUFJbkJDLE1BSm1CLENBQXZCOztBQU1BLGtCQUFBLEtBQUksQ0FBQ25CLFlBQUwsQ0FBa0JhLElBQWxCLENBQXVCVyxjQUF2QjtBQUNIOztBQUNEO0FBQ0g7O0FBQ0QsaUJBQUssVUFBTDtBQUFpQjtBQUNiLG9CQUFJRSxVQUFVLEdBQUduQixLQUFqQjtBQUNBLG9CQUFJb0IsY0FBYyxHQUFHLElBQUlDLDhCQUFKLENBQ2pCeEIsSUFEaUIsRUFFakJFLFdBRmlCLEVBR2pCb0IsVUFIaUIsQ0FBckI7O0FBS0ksZ0JBQUEsS0FBSSxDQUFDMUIsWUFBTCxDQUFrQmEsSUFBbEIsQ0FBdUJjLGNBQXZCO0FBQ1A7QUFDRzs7QUFDSixpQkFBSyxPQUFMO0FBQWM7QUFDVixvQkFBSUQsV0FBVSxHQUFHbkIsS0FBakI7QUFDQSxvQkFBSXNCLFdBQXdCLEdBQUcsSUFBSUMsd0JBQUosQ0FDM0IxQixJQUQyQixFQUUzQkUsV0FGMkIsRUFHM0JvQixXQUgyQixDQUEvQjs7QUFLQSxnQkFBQSxLQUFJLENBQUMxQixZQUFMLENBQWtCYSxJQUFsQixDQUF1QmdCLFdBQXZCO0FBQ0g7QUFDRzs7QUFDSjtBQUNJO0FBNURKO0FBOERIO0FBQ0osT0F2RUQ7QUF3RUgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZUZpbHRlciB9IGZyb20gJy4uLy4uLy4uL01vZHVsZXMvVHlwZVNjcmlwdC9GaWx0ZXJzL0RhdGVUaW1lRmlsdGVyJztcclxuaW1wb3J0IHsgU2VsZWN0RmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvU2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9NdWx0aVNlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IENhbGVuZGFyRmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvQ2FsZW5kYXJGaWx0ZXInO1xyXG5pbXBvcnQgeyBDaGVja0JveEZpbHRlciB9IGZyb20gJy4uLy4uLy4uL01vZHVsZXMvVHlwZVNjcmlwdC9GaWx0ZXJzL0NoZWNrQm94RmlsdGVyJztcclxuaW1wb3J0IHsgSW5wdXRGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9JbnB1dEZpbHRlcic7XHJcbmltcG9ydCB7IElGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvaW50ZXJmYWNlcy9maWx0ZXJzL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsdGVySGVscGVyIHtcclxuICAgIHByaXZhdGUgZmlsdGVyczogQXJyYXk8SUZpbHRlcj47XHJcbiAgICBwcml2YXRlIGZpbHRlclBhcmFtczogQXJyYXk8b2JqZWN0PiA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoZmlsdGVyczogQXJyYXk8SUZpbHRlcj4pIHtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGaWx0ZXJzUGFyYW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RmlsdGVyc1BhcmFtcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyOiBJRmlsdGVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBmaWx0ZXIuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZihhY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWx0ZXIubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBmaWx0ZXIudHlwZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZmlsdGVyLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWU6IGFueSA9IGZpbHRlci52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnU2VsZWN0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNlbGVjdCA9IHZhbHVlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3VmFsdWVTZWxlY3QgPSB2YWx1ZS52aWV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclNlbGVjdCA9IG5ldyBTZWxlY3RGaWx0ZXIobmFtZSwgcGxhY2Vob2xkZXIsIHZhbHVlU2VsZWN0LCB2aWV3VmFsdWVTZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyUGFyYW1zLnB1c2goZmlsdGVyU2VsZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgJ011bHRpU2VsZWN0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZU11bHRpU2VsZWN0ID0gdmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXdWYWx1ZU11bHRpU2VsZWN0ID0gdmFsdWUudmlld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJNdWx0aVNlbGVjdCA9IG5ldyBNdWx0aVNlbGVjdEZpbHRlcihuYW1lLCBwbGFjZWhvbGRlciwgdmFsdWVNdWx0aVNlbGVjdCwgdmlld1ZhbHVlTXVsdGlTZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyUGFyYW1zLnB1c2goZmlsdGVyTXVsdGlTZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdEYXRlVGltZSc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdUaW1lJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVGcm9tID0gdmFsdWUuZGF0ZUZyb207XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVRvID0gdmFsdWUuZGF0ZVRvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGVGcm9tID09PSB1bmRlZmluZWQgfHwgZGF0ZVRvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDYWxlbmRhciA9IG5ldyBDYWxlbmRhckZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJQYXJhbXMucHVzaChmaWx0ZXJDYWxlbmRhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0ZVRpbWUgPSBuZXcgRGF0ZVRpbWVGaWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlRnJvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclBhcmFtcy5wdXNoKGZpbHRlckRhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlICdDaGVja0JveCc6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVJbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVja0JveEZpbHRlciA9IG5ldyBDaGVja0JveEZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlSW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJQYXJhbXMucHVzaChjaGVja0JveEZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdJbnB1dCc6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVJbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEZpbHRlcjogSW5wdXRGaWx0ZXIgPSBuZXcgSW5wdXRGaWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclBhcmFtcy5wdXNoKGlucHV0RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=