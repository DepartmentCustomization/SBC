import { BaseFilter } from '../../TypeScript/Filters/BaseFilter';

export class DateTimeFilter extends BaseFilter {
    dateFrom: Date;
    dateTo: Date;
    constructor(name: string, placeholder: string, dateFrom: Date, dateTo: Date) {
        super(name, placeholder);
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}
