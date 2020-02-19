import { BaseFilter } from '../../TypeScript/Filters/BaseFilter';

export class CalendarFilter extends BaseFilter {
    date: Date;
    constructor(name: string, placeholder: string, date: Date) {
        super(name, placeholder);
        this.date = date;
    }
}