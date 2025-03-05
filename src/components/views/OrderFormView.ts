import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface IOrderFormView {
	form: HTMLFormElement;
	paymentOptionsButtons: HTMLButtonElement[];
	formErrors: HTMLElement;
    selectPaymentMethod(paymentMethod: string): void;
	render(): HTMLElement;
}

export class OrderFormView implements IOrderFormView {
	form: HTMLFormElement;
	paymentOptionsButtons: HTMLButtonElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.form = cloneTemplate<HTMLFormElement>(template);
		this.paymentOptionsButtons = Array.from(
			this.form.querySelectorAll(".button_alt")
		);
		this.buttonSubmit = this.form.querySelector(".order__button");
		this.formErrors = this.form.querySelector(".form__errors");

		this.paymentOptionsButtons.forEach((item) => {
			item.addEventListener("click", () => {
				this.selectPaymentMethod(item.name);
				events.emit("orderForm:paymentSelection", item);
			});
		});

		this.form.addEventListener("input", (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;
			this.events.emit(`orderForm:changeAddress`, { field, value });
		});

		this.form.addEventListener("submit", (event: Event) => {
			event.preventDefault();
			this.events.emit("contactsForm:open");
		});
	}

	selectPaymentMethod(paymentMethod: string): void {
		this.paymentOptionsButtons.forEach((item) => {
			item.classList.toggle(
				"button_alt-active",
				item.name === paymentMethod
			);
		});
	}

	toggleButtonDisability(value: boolean) {
		this.buttonSubmit.disabled = !value;
	}

	render() {
		return this.form;
	}
}
