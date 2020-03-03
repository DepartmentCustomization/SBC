import { BaseFilter } from '/Modules/Filters/BaseFilter.js';

export class CalendarFilter extends BaseFilter {
    constructor(name, placeholder, date) {
        super(name, placeholder);
        this.date = date;
    }
}
