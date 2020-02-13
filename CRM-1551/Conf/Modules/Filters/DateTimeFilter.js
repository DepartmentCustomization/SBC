import { BaseFilter } from '/modules/Filters/BaseFilter.js';

export class DateTimeFilter extends BaseFilter {
    constructor(name, placeholder, dateFrom, dateTo) {
        super(name, placeholder);
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
