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
	protected _cartProducts: IProductItem[];

	constructor() {
		this._cartProducts = [];
	}

	set cartProducts(data: IProductItem[]) {
		this._cartProducts = data;
	}

	get cartProducts() {
		return this._cartProducts;
	}

	getAmount() {
		return this.cartProducts.length;
	}

	getTotalCost() {
		return this.cartProducts.reduce((total, item) => total + item.price, 0);
	}

	addToCart(data: IProductItem) {
		this._cartProducts.push(data);
	}

	deleteFromCart(item: IProductItem) {
		const index = this._cartProducts.indexOf(item);
		if (index != -1) {
			this._cartProducts.splice(index, 1);
		}
	}

	clearCart() {
		this.cartProducts = [];
	}
}
