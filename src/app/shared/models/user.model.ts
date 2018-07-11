export class User {
	constructor(
		public email: string,
		public password: string,
		public name: string,
		public id?: number // необов'язкове поле - буде даватись сервером
	) {}
}