import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface ICardView {
	cardElement: HTMLElement;
	cardCategory: HTMLElement;
	cardTitle: HTMLElement;
	cardImage: HTMLImageElement;
	cardPrice: HTMLElement;
	render(data: IProductItem): HTMLElement;
}

export class CardView implements ICardView {
	cardElement: HTMLElement;
	cardCategory: HTMLElement;
	cardTitle: HTMLElement;
	cardImage: HTMLImageElement;
	cardPrice: HTMLElement;
	protected _colors = <Record<string, string>>{
		дополнительное: "additional",
		"софт-скил": "soft",
		кнопка: "button",
		"хард-скил": "hard",
		другое: "other",
	};

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		clickHandler?: (event: MouseEvent) => void
	) {
		this.cardElement = cloneTemplate<HTMLElement>(template);
		this.cardCategory = this.cardElement.querySelector(".card__category");
		this.cardTitle = this.cardElement.querySelector(".card__title");
		this.cardImage = this.cardElement.querySelector(".card__image");
		this.cardPrice = this.cardElement.querySelector(".card__price");

		if (clickHandler) {
			this.cardElement.addEventListener("click", clickHandler);
		}
	}

	getPriceText(value: null | number): string {
		return value === null ? "Бесценно" : String(value) + " синапсов";
	}

	render(data: IProductItem): HTMLElement {
		this.cardCategory.textContent = data.category;
		this.cardCategory.className = `card__category card__category_${
			this._colors[data.category]
		}`;
		this.cardTitle.textContent = data.title;
		this.cardImage.src = data.image;
		this.cardImage.alt = this.cardTitle.textContent;
		this.cardPrice.textContent = this.getPriceText(data.price);
		return this.cardElement;
	}
}
