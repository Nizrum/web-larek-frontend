export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IShippingDetails {
    payment: string;
	address: string;
}

export interface IContacts {
    phone: string;
	email: string;
}

export interface IOrder extends IShippingDetails, IContacts {
	items: string[];
    total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
