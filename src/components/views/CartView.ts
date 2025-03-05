import { IProductItem } from "../../types";
import { createElement, cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { CartItemView } from "./CartItemView";

export interface ICartView {
	cart: HTMLElement;
	title: HTMLElement;
	cartList: HTMLElement;
	button: HTMLButtonElement;
	cartTotalPrice: HTMLElement;
	headerCartButton: HTMLButtonElement;
	headerCartCounter: HTMLElement;
	items: HTMLElement[];
	renderHeaderCartCounter(value: number): void;
	renderTotalCost(total: number): void;
	render(): HTMLElement;
}

export class CartView implements ICartView {
	cart: HTMLElement;
	title: HTMLElement;
	cartList: HTMLElement;
	button: HTMLButtonElement;
	cartTotalPrice: HTMLElement;
	headerCartButton: HTMLButtonElement;
	headerCartCounter: HTMLElement;
	items: HTMLElement[];

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		protected cartItemTemplate: HTMLTemplateElement
	) {
		this.cart = cloneTemplate<HTMLElement>(template);
		this.title = this.cart.querySelector(".modal__title");
		this.cartList = this.cart.querySelector(".basket__list");
		this.button = this.cart.querySelector(".basket__button");
		this.cartTotalPrice = this.cart.querySelector(".basket__price");
		this.headerCartButton = document.querySelector(".header__basket");
		this.headerCartCounter = document.querySelector(
			".header__basket-counter"
		);

		this.button.addEventListener("click", () => {
			this.events.emit("orderForm:open");
		});
		this.headerCartButton.addEventListener("click", () => {
			this.events.emit("cart:open");
		});

		this.items = [];
	}

	renderItems(items: IProductItem[]) {
		let i = 0;
		this.items = items.map((item) => {
			const basketItem = new CartItemView(
				this.cartItemTemplate,
				this.events,
				() => this.events.emit("cart:removeFromCart", item)
			);
			i = i + 1;
			return basketItem.render(item, i);
		});
		if (this.items.length) {
			this.cartList.replaceChildren(...this.items);
			this.button.removeAttribute("disabled");
		} else {
			this.button.setAttribute("disabled", "true");
			this.cartList.replaceChildren(
				createElement<HTMLParagraphElement>("p", {
					textContent: "Корзина пуста",
				})
			);
		}
	}

	renderHeaderCartCounter(value: number) {
		this.headerCartCounter.textContent = String(value);
	}

	renderTotalCost(total: number) {
		this.cartTotalPrice.textContent = String(total + " синапсов");
	}

	render() {
		this.title.textContent = "Корзина";
		return this.cart;
	}
}
