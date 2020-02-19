import { Filter } from '../../TypeScript/Filters/Filter';

export class SelectFilter extends Filter {
    viewValue: string;
    constructor(name: string, placeholder: string, value: string, viewValue: string) {
        super(name, placeholder, value);
        this.viewValue = viewValue;
    }
}
