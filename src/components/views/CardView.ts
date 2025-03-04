import { IActions, IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export interface ICardView {
	render(data: IProductItem): HTMLElement;
}

export class CardView implements ICardView {
	protected _cardElement: HTMLElement;
	protected _cardCategory: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;
	protected _cardPrice: HTMLElement;
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
		actions?: IActions
	) {
		this._cardElement = cloneTemplate<HTMLElement>(template);
		this._cardCategory =
			this._cardElement.querySelector(".card__category");
		this._cardTitle = this._cardElement.querySelector(".card__title");
		this._cardImage = this._cardElement.querySelector(".card__image");
		this._cardPrice = this._cardElement.querySelector(".card__price");

		if (actions?.onClick) {
			this._cardElement.addEventListener("click", actions.onClick);
		}
	}

    getPriceText(value: null | number): string {
        return value === null ? "Бесценно" : String(value) + " синапсов"
    }

	render(data: IProductItem): HTMLElement {
		this._cardCategory.textContent = data.category;
		this._cardCategory.className = `card__category card__category_${
			this._colors[data.category]
		}`;
		this._cardTitle.textContent = data.title;
		this._cardImage.src = data.image;
		this._cardImage.alt = this._cardTitle.textContent;
		this._cardPrice.textContent = this.getPriceText(data.price);
		return this._cardElement;
	}
}
