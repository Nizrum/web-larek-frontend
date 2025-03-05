import { CardView } from "./CardView";
import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardModalView {
	description: HTMLElement;
	button: HTMLElement;
	toggleButtonDisability(value: boolean): void;
	render(data: IProductItem): HTMLElement;
}

export class CardModalView extends CardView implements ICardModalView {
	description: HTMLElement;
	button: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		clickHandler?: (event: MouseEvent) => void
	) {
		super(template, events, clickHandler);
		this.description = this.cardElement.querySelector(".card__text");
		this.button = this.cardElement.querySelector(".card__button");
		this.button.addEventListener("click", () => {
			this.events.emit("card:addToCart");
		});
	}

	toggleButtonDisability(value: boolean): void {
		if (value) {
			this.button.setAttribute("disabled", "true");
		} else {
            this.button.removeAttribute("disabled");
        }
	}

	render(data: IProductItem): HTMLElement {
		super.render(data);
		this.description.textContent = data.description;
		if (!data.price) {
			this.button.setAttribute("disabled", "true");
		}
		return this.cardElement;
	}
}
