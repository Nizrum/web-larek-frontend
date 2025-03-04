import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface ISuccessfulOrderView {
	modal: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;
	render(total: number): HTMLElement;
}

export class SuccessfulOrderView implements ISuccessfulOrderView {
	modal: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.modal = cloneTemplate<HTMLElement>(template);
		this.description = this.modal.querySelector(
			".order-success__description"
		);
		this.button = this.modal.querySelector(".order-success__close");

		this.button.addEventListener("click", () => {
			events.emit("successfulOrder:close");
		});
	}

	render(total: number) {
		this.description.textContent = String(`Списано ${total} синапсов`);
		return this.modal;
	}
}
