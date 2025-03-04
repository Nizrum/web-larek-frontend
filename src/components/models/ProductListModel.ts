import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface IProductListModel {
	productCards: IProductItem[];
	selectedСard: IProductItem;
	showCard(item: IProductItem): void;
}

export class ProductListModel implements IProductListModel {
	protected _productCards: IProductItem[];
	selectedСard: IProductItem;

	constructor(protected events: IEvents) {
		this._productCards = [];
	}

	set productCards(data: IProductItem[]) {
		this._productCards = data;
		this.events.emit("products:set");
	}

	get productCards() {
		return this._productCards;
	}

	showCard(item: IProductItem) {
		this.selectedСard = item;
		this.events.emit("cardModal:open", item);
	}
}
