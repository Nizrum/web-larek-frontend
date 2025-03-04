import { IProductItem } from "../../types";

export interface ICartModel {
	cartProducts: IProductItem[];
	getAmount: () => number;
	getTotalCost: () => number;
	addToCart(data: IProductItem): void;
	deleteFromCart(item: IProductItem): void;
	clearCart(): void;
}

export class CartModel implements ICartModel {
	protected _cartProducts: Set<IProductItem>;

	constructor() {
		this._cartProducts = new Set<IProductItem>();
	}

	set cartProducts(data: IProductItem[]) {
		this._cartProducts = new Set<IProductItem>(data);
	}

	get cartProducts() {
		return Array.from(this._cartProducts);
	}

	getAmount() {
		return this.cartProducts.length;
	}

	getTotalCost() {
		return this.cartProducts.reduce((total, item) => total + item.price, 0);
	}

	addToCart(item: IProductItem) {
		this._cartProducts.add(item);
	}

	deleteFromCart(item: IProductItem) {
		this._cartProducts.delete(item);
	}

	clearCart() {
		this.cartProducts = [];
	}
}
