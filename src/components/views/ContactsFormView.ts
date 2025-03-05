import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface IContactsFormView {
	form: HTMLFormElement;
	contactsInputs: HTMLInputElement[];
	submitButton: HTMLButtonElement;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export class ContactsFormView implements IContactsFormView {
	form: HTMLFormElement;
	contactsInputs: HTMLInputElement[];
	submitButton: HTMLButtonElement;
	formErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.form = cloneTemplate<HTMLFormElement>(template);
		this.contactsInputs = Array.from(
			this.form.querySelectorAll(".form__input")
		);
		this.submitButton = this.form.querySelector(".button");
		this.formErrors = this.form.querySelector(".form__errors");

		this.contactsInputs.forEach((item) => {
			item.addEventListener("input", (event) => {
				const target = event.target as HTMLInputElement;
				const field = target.name;
				const value = target.value;
				this.events.emit(`contactsForm:changeContacts`, { field, value });
			});
		});

		this.form.addEventListener("submit", (event: Event) => {
			event.preventDefault();
			this.events.emit("successfulOrder:open");
		});
	}

	toggleButtonDisability(value: boolean) {
		this.submitButton.disabled = !value;
	}

	render() {
		return this.form;
	}
}
