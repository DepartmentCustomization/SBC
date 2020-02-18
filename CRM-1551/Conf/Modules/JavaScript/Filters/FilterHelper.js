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

var FilterHelper =
/*#__PURE__*/
function () {
  function FilterHelper() {
    _classCallCheck(this, FilterHelper);
  }

  _createClass(FilterHelper, [{
    key: "getFiltersParams",
    value: function getFiltersParams(filters) {
      var filterParams = [];
      filters.forEach(function (filter) {
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
                filterParams.push(filterSelect);
                break;
              }

            case 'MultiSelect':
              {
                var _value = filter.value;
                var valueMultiSelect = _value.value;
                var viewValueMultiSelect = _value.viewValue;
                var filterMultiSelect = new _MultiSelectFilter.MultiSelectFilter(name, placeholder, valueMultiSelect, viewValueMultiSelect);
                filterParams.push(filterMultiSelect);
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
                  filterParams.push(filterCalendar);
                } else {
                  var filterDateTime = new _DateTimeFilter.DateTimeFilter(name, placeholder, dateFrom, dateTo);
                  filterParams.push(filterDateTime);
                }

                break;
              }

            case 'CheckBox':
              {
                var valueInput = value;
                var checkBoxFilter = new _CheckBoxFilter.CheckBoxFilter(name, placeholder, valueInput);
                filterParams.push(checkBoxFilter);
              }
              break;

            case 'Input':
              {
                var _valueInput = value;
                var inputFilter = new _InputFilter.InputFilter(name, placeholder, _valueInput);
                filterParams.push(inputFilter);
              }
              break;

            default:
              break;
          }
        }
      });
      return filterParams;
    }
  }]);

  return FilterHelper;
}();

exports.FilterHelper = FilterHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1R5cGVTY3JpcHQvRmlsdGVycy9GaWx0ZXJIZWxwZXIudHMiXSwibmFtZXMiOlsiRmlsdGVySGVscGVyIiwiZmlsdGVycyIsImZpbHRlclBhcmFtcyIsImZvckVhY2giLCJmaWx0ZXIiLCJhY3RpdmUiLCJuYW1lIiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJ2YWx1ZVNlbGVjdCIsInZpZXdWYWx1ZVNlbGVjdCIsInZpZXdWYWx1ZSIsImZpbHRlclNlbGVjdCIsIlNlbGVjdEZpbHRlciIsInB1c2giLCJ2YWx1ZU11bHRpU2VsZWN0Iiwidmlld1ZhbHVlTXVsdGlTZWxlY3QiLCJmaWx0ZXJNdWx0aVNlbGVjdCIsIk11bHRpU2VsZWN0RmlsdGVyIiwiZGF0ZUZyb20iLCJkYXRlVG8iLCJ1bmRlZmluZWQiLCJkYXRlIiwiZmlsdGVyQ2FsZW5kYXIiLCJDYWxlbmRhckZpbHRlciIsImZpbHRlckRhdGVUaW1lIiwiRGF0ZVRpbWVGaWx0ZXIiLCJ2YWx1ZUlucHV0IiwiY2hlY2tCb3hGaWx0ZXIiLCJDaGVja0JveEZpbHRlciIsImlucHV0RmlsdGVyIiwiSW5wdXRGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFXYUEsWTs7Ozs7Ozs7O3FDQUNnQkMsTyxFQUFrQjtBQUN2QyxVQUFNQyxZQUFpQixHQUFHLEVBQTFCO0FBQ0FELE1BQUFBLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQixVQUFDQyxNQUFELEVBQXFCO0FBQ2pDLFlBQU1DLE1BQU0sR0FBR0QsTUFBTSxDQUFDQyxNQUF0Qjs7QUFDQSxZQUFHQSxNQUFILEVBQVc7QUFDUCxjQUFNQyxJQUFJLEdBQUdGLE1BQU0sQ0FBQ0UsSUFBcEI7QUFDQSxjQUFNQyxJQUFJLEdBQUdILE1BQU0sQ0FBQ0csSUFBcEI7QUFDQSxjQUFNQyxXQUFXLEdBQUdKLE1BQU0sQ0FBQ0ksV0FBM0I7QUFDQSxjQUFNQyxLQUFVLEdBQUdMLE1BQU0sQ0FBQ0ssS0FBMUI7O0FBQ0Esa0JBQVFGLElBQVI7QUFDQSxpQkFBSyxRQUFMO0FBQWU7QUFDWCxvQkFBSUcsV0FBVyxHQUFHRCxLQUFLLENBQUNBLEtBQXhCO0FBQ0Esb0JBQUlFLGVBQWUsR0FBR0YsS0FBSyxDQUFDRyxTQUE1QjtBQUNBLG9CQUFJQyxZQUFZLEdBQUcsSUFBSUMsMEJBQUosQ0FBaUJSLElBQWpCLEVBQXVCRSxXQUF2QixFQUFvQ0UsV0FBcEMsRUFBaURDLGVBQWpELENBQW5CO0FBQ0FULGdCQUFBQSxZQUFZLENBQUNhLElBQWIsQ0FBa0JGLFlBQWxCO0FBQ0E7QUFDSDs7QUFDRCxpQkFBSyxhQUFMO0FBQW9CO0FBQ2hCLG9CQUFNSixNQUFLLEdBQUdMLE1BQU0sQ0FBQ0ssS0FBckI7QUFDQSxvQkFBSU8sZ0JBQWdCLEdBQUdQLE1BQUssQ0FBQ0EsS0FBN0I7QUFDQSxvQkFBSVEsb0JBQW9CLEdBQUdSLE1BQUssQ0FBQ0csU0FBakM7QUFDQSxvQkFBSU0saUJBQWlCLEdBQUcsSUFBSUMsb0NBQUosQ0FBc0JiLElBQXRCLEVBQTRCRSxXQUE1QixFQUF5Q1EsZ0JBQXpDLEVBQTJEQyxvQkFBM0QsQ0FBeEI7QUFDQWYsZ0JBQUFBLFlBQVksQ0FBQ2EsSUFBYixDQUFrQkcsaUJBQWxCO0FBQ0E7QUFDSDs7QUFDRCxpQkFBSyxNQUFMO0FBQ0EsaUJBQUssVUFBTDtBQUNBLGlCQUFLLE1BQUw7QUFBYTtBQUNULG9CQUFNRSxRQUFRLEdBQUdYLEtBQUssQ0FBQ1csUUFBdkI7QUFDQSxvQkFBTUMsTUFBTSxHQUFHWixLQUFLLENBQUNZLE1BQXJCOztBQUNBLG9CQUFHRCxRQUFRLEtBQUtFLFNBQWIsSUFBMEJELE1BQU0sS0FBS0MsU0FBeEMsRUFBbUQ7QUFDL0Msc0JBQU1DLElBQUksR0FBR2QsS0FBYjtBQUNBLHNCQUFNZSxjQUFjLEdBQUcsSUFBSUMsOEJBQUosQ0FDbkJuQixJQURtQixFQUVuQkUsV0FGbUIsRUFHbkJlLElBSG1CLENBQXZCO0FBS0FyQixrQkFBQUEsWUFBWSxDQUFDYSxJQUFiLENBQWtCUyxjQUFsQjtBQUNILGlCQVJELE1BUU87QUFDSCxzQkFBTUUsY0FBYyxHQUFHLElBQUlDLDhCQUFKLENBQ25CckIsSUFEbUIsRUFFbkJFLFdBRm1CLEVBR25CWSxRQUhtQixFQUluQkMsTUFKbUIsQ0FBdkI7QUFNQW5CLGtCQUFBQSxZQUFZLENBQUNhLElBQWIsQ0FBa0JXLGNBQWxCO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFDRCxpQkFBSyxVQUFMO0FBQWlCO0FBQ2Isb0JBQUlFLFVBQVUsR0FBR25CLEtBQWpCO0FBQ0Esb0JBQUlvQixjQUFjLEdBQUcsSUFBSUMsOEJBQUosQ0FDakJ4QixJQURpQixFQUVqQkUsV0FGaUIsRUFHakJvQixVQUhpQixDQUFyQjtBQUtJMUIsZ0JBQUFBLFlBQVksQ0FBQ2EsSUFBYixDQUFrQmMsY0FBbEI7QUFDUDtBQUNHOztBQUNKLGlCQUFLLE9BQUw7QUFBYztBQUNWLG9CQUFJRCxXQUFVLEdBQUduQixLQUFqQjtBQUNBLG9CQUFJc0IsV0FBd0IsR0FBRyxJQUFJQyx3QkFBSixDQUMzQjFCLElBRDJCLEVBRTNCRSxXQUYyQixFQUczQm9CLFdBSDJCLENBQS9CO0FBS0ExQixnQkFBQUEsWUFBWSxDQUFDYSxJQUFiLENBQWtCZ0IsV0FBbEI7QUFDSDtBQUNHOztBQUNKO0FBQ0k7QUE3REo7QUErREg7QUFDSixPQXZFRDtBQXdFQSxhQUFPN0IsWUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWVGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9EYXRlVGltZUZpbHRlcic7XHJcbmltcG9ydCB7IFNlbGVjdEZpbHRlciB9IGZyb20gJy4uLy4uLy4uL01vZHVsZXMvVHlwZVNjcmlwdC9GaWx0ZXJzL1NlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0RmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvTXVsdGlTZWxlY3RGaWx0ZXInO1xyXG5pbXBvcnQgeyBDYWxlbmRhckZpbHRlciB9IGZyb20gJy4uLy4uLy4uL01vZHVsZXMvVHlwZVNjcmlwdC9GaWx0ZXJzL0NhbGVuZGFyRmlsdGVyJztcclxuaW1wb3J0IHsgQ2hlY2tCb3hGaWx0ZXIgfSBmcm9tICcuLi8uLi8uLi9Nb2R1bGVzL1R5cGVTY3JpcHQvRmlsdGVycy9DaGVja0JveEZpbHRlcic7XHJcbmltcG9ydCB7IElucHV0RmlsdGVyIH0gZnJvbSAnLi4vLi4vLi4vTW9kdWxlcy9UeXBlU2NyaXB0L0ZpbHRlcnMvSW5wdXRGaWx0ZXInO1xyXG5cclxuaW50ZXJmYWNlIElGaWx0ZXIge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3RyaW5nOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gICAgYWN0aXZlOiBib29sZWFuO1xyXG4gICAgdmFsdWU6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlckhlbHBlcntcclxuICAgIHByaXZhdGUgZ2V0RmlsdGVyc1BhcmFtcyhmaWx0ZXJzOiBbXSk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyUGFyYW1zOiBhbnkgPSBbXTtcclxuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKGZpbHRlcjogSUZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBmaWx0ZXIuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZihhY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWx0ZXIubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBmaWx0ZXIudHlwZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZmlsdGVyLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWU6IGFueSA9IGZpbHRlci52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnU2VsZWN0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNlbGVjdCA9IHZhbHVlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3VmFsdWVTZWxlY3QgPSB2YWx1ZS52aWV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclNlbGVjdCA9IG5ldyBTZWxlY3RGaWx0ZXIobmFtZSwgcGxhY2Vob2xkZXIsIHZhbHVlU2VsZWN0LCB2aWV3VmFsdWVTZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtcy5wdXNoKGZpbHRlclNlbGVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlICdNdWx0aVNlbGVjdCc6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZpbHRlci52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVNdWx0aVNlbGVjdCA9IHZhbHVlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3VmFsdWVNdWx0aVNlbGVjdCA9IHZhbHVlLnZpZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyTXVsdGlTZWxlY3QgPSBuZXcgTXVsdGlTZWxlY3RGaWx0ZXIobmFtZSwgcGxhY2Vob2xkZXIsIHZhbHVlTXVsdGlTZWxlY3QsIHZpZXdWYWx1ZU11bHRpU2VsZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXMucHVzaChmaWx0ZXJNdWx0aVNlbGVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlICdEYXRlJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGVUaW1lJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1RpbWUnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZUZyb20gPSB2YWx1ZS5kYXRlRnJvbTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlVG8gPSB2YWx1ZS5kYXRlVG87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0ZUZyb20gPT09IHVuZGVmaW5lZCB8fCBkYXRlVG8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNhbGVuZGFyID0gbmV3IENhbGVuZGFyRmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXMucHVzaChmaWx0ZXJDYWxlbmRhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0ZVRpbWUgPSBuZXcgRGF0ZVRpbWVGaWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlRnJvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXMucHVzaChmaWx0ZXJEYXRlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAnQ2hlY2tCb3gnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlSW5wdXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tCb3hGaWx0ZXIgPSBuZXcgQ2hlY2tCb3hGaWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtcy5wdXNoKGNoZWNrQm94RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ0lucHV0Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUlucHV0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0RmlsdGVyOiBJbnB1dEZpbHRlciA9IG5ldyBJbnB1dEZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlSW5wdXRcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtcy5wdXNoKGlucHV0RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmlsdGVyUGFyYW1zO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==