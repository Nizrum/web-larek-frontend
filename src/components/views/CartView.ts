import { createElement, cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface ICartView {
	cart: HTMLElement;
	title: HTMLElement;
	cartList: HTMLElement;
	button: HTMLButtonElement;
	cartTotalPrice: HTMLElement;
	headerCartButton: HTMLButtonElement;
	headerCartCounter: HTMLElement;
	renderHeaderCartCounter(value: number): void;
	renderTotalCost(sumAll: number): void;
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

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
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

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.cartList.replaceChildren(...items);
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
