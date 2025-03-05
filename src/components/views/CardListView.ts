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
		protected catalogCardTemplate: HTMLTemplateElement
	) {}

	render(data: IProductItem[]): HTMLElement {
		data.forEach((item) => {
			const card = new CardView(
				this.catalogCardTemplate,
				this.events,
				() => this.events.emit("card:select", item)
			);
			this.catalogElement.append(card.render(item));
		});
		return this.catalogElement;
	}
}
