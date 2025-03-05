import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { CardView } from "./CardView";

export interface ICardListView {
	render(data: IProductItem[]): HTMLElement;
}

export class CardListView implements ICardListView {
	constructor(
		public catalogElement: HTMLElement,
		protected events: IEvents,
        protected cardCatalogTemplate: HTMLTemplateElement
	) {}

	render(data: IProductItem[]): HTMLElement {
		data.forEach((item) => {
            const card = new CardView(this.cardCatalogTemplate, this.events, {
                onClick: () => this.events.emit("card:select", item),
            });
			this.catalogElement.append(card.render(item));
		});
        return this.catalogElement;
	}
}
