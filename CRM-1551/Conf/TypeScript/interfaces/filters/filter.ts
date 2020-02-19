export interface IFilter {
	name: string;
	value: string | Array<object> | boolean;
	active: boolean;
	isRequired: boolean;
	placeholder: string;
	type: string;
}