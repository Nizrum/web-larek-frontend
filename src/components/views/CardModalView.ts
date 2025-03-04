import { CardView } from "./CardView";
import { IActions, IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface ICardModalView {
	description: HTMLElement;
	button: HTMLElement;
	render(data: IProductItem): HTMLElement;
}

export class CardModalView extends CardView implements ICardModalView {
	description: HTMLElement;
	button: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this.description = this.cardElement.querySelector(".card__text");
		this.button = this.cardElement.querySelector(".card__button");
		this.button.addEventListener("click", () => {
			this.events.emit("card:addToCart");
		});
	}

	render(data: IProductItem): HTMLElement {
		super.render(data)
		this.description.textContent = data.description;
		if (!data.price) {
            this.button.setAttribute("disabled", "true");
        }
		return this.cardElement;
	}
}
