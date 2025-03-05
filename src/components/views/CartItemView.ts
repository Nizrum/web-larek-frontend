import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface ICartItemView {
	cartItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;
	render(data: IProductItem, item: number): HTMLElement;
}

export class CartItemView implements ICartItemView {
	cartItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		clickHandler?: (event: MouseEvent) => void
	) {
		this.cartItem = cloneTemplate<HTMLElement>(template);
		this.index = this.cartItem.querySelector(".basket__item-index");
		this.title = this.cartItem.querySelector(".card__title");
		this.price = this.cartItem.querySelector(".card__price");
		this.deleteButton = this.cartItem.querySelector(
			".basket__item-delete"
		);

		if (clickHandler) {
			this.deleteButton.addEventListener("click", clickHandler);
		}
	}

	getPriceText(value: null | number): string {
		return value === null ? "Бесценно" : String(value) + " синапсов";
	}

	render(data: IProductItem, item: number) {
		this.index.textContent = String(item);
		this.title.textContent = data.title;
		this.price.textContent = this.getPriceText(data.price);
		return this.cartItem;
	}
}
