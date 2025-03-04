import { ApiListResponse, Api } from "../base/api";
import { IOrder, IOrderResult, IProductItem } from "../../types";

export interface IApiModel {
	resourcesUrl: string;
	items: IProductItem[];
	fetchProducts: () => Promise<IProductItem[]>;
	getOrderResult: (order: IOrder) => Promise<IOrderResult>;
}

export class ApiModel extends Api implements IApiModel {
	resourcesUrl: string;
	items: IProductItem[];

	constructor(resourcesUrl: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.resourcesUrl = resourcesUrl;
	}

	fetchProducts(): Promise<IProductItem[]> {
		return this.get("/product").then(
			(data: ApiListResponse<IProductItem>) =>
				data.items.map((item) => ({
					...item,
					image: this.resourcesUrl + item.image,
				}))
		);
	}

	getOrderResult(order: IOrder): Promise<IOrderResult> {
		return this.post(`/order`, order).then((data: IOrderResult) => data);
	}
}
