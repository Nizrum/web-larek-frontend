import "./scss/styles.scss";

import { CDN_URL, API_URL } from "./utils/constants";
import { ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/events";
import { IShippingDetails, IContacts, IProductItem } from "./types";
import { ApiModel } from "./components/models/ApiModel";
import { CartModel } from "./components/models/CartModel";
import { FormModel } from "./components/models/FormModel";
import { ProductListModel } from "./components/models/ProductListModel";
import { CardModalView } from "./components/views/CardModalView";
import { CardListView } from "./components/views/CardListView";
import { CartView } from "./components/views/CartView";
import { ContactsFormView } from "./components/views/ContactsFormView";
import { ModalView } from "./components/views/ModalView";
import { OrderFormView } from "./components/views/OrderFormView";
import { SuccessfulOrderView } from "./components/views/SuccessfulOrderView";

const modalContainer: HTMLElement =
	ensureElement<HTMLElement>("#modal-container");
const cardCatalogTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#card-catalog");
const cardModalTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#card-preview");
const cartTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#basket");
const catalogCartTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#card-basket");
const orderTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#contacts");
const successfulOrderTemplate: HTMLTemplateElement =
	ensureElement<HTMLTemplateElement>("#success");
const cardsCatalog: HTMLElement = ensureElement<HTMLElement>(".gallery");

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const productListModel = new ProductListModel(events);
const modal = new ModalView(modalContainer, events);
const cart = new CartView(cartTemplate, events, catalogCartTemplate);
const cartModel = new CartModel();
const formModel = new FormModel(events);
const order = new OrderFormView(orderTemplate, events);
const contacts = new ContactsFormView(contactsTemplate, events);
const cardList = new CardListView(cardsCatalog, events, cardCatalogTemplate);

events.on("products:set", () => {
	cardList.render(productListModel.productCards);
});

events.on("card:select", (item: IProductItem) => {
	productListModel.showCard(item);
});

events.on("cardModal:open", (item: IProductItem) => {
	const cardPreview = new CardModalView(cardModalTemplate, events);
	modal.content = cardPreview.render(item);
	if (cartModel.cartProducts.indexOf(item) !== -1 || item.price == null) {
		cardPreview.toggleButtonDisability(true);
	} else {
		cardPreview.toggleButtonDisability(false);
	}
	modal.open();
});

events.on("card:addToCart", () => {
	cartModel.addToCart(productListModel.selectedСard);
	cart.renderHeaderCartCounter(cartModel.getAmount());
	modal.close();
});

events.on("cart:open", () => {
	cart.renderTotalCost(cartModel.getTotalCost());
	cart.renderItems(cartModel.cartProducts);
	modal.content = cart.render();
	modal.open();
});

events.on("cart:removeFromCart", (item: IProductItem) => {
	cartModel.deleteFromCart(item);
	cart.renderHeaderCartCounter(cartModel.getAmount());
	cart.renderTotalCost(cartModel.getTotalCost());
	cart.renderItems(cartModel.cartProducts);
});

events.on("orderForm:open", () => {
	modal.content = order.render();
	modal.open();
	formModel.items = cartModel.cartProducts.map((item) => item.id);
});

events.on("orderForm:paymentSelection", (button: HTMLButtonElement) => {
	formModel.payment = button.name;
	formModel.validateOrder("payment");
});

events.on(
	`orderForm:changeAddress`,
	(data: { field: string; value: string }) => {
		formModel.setOrderData(data.field, data.value);
	}
);

events.on("formErrors:shipping", (errors: IShippingDetails) => {
	const { address, payment } = errors;
	order.toggleButtonDisability(!address && !payment);
	order.formErrors.textContent = Object.values({ address, payment })
		.filter((i) => !!i)
		.join("; ");
});

events.on("contactsForm:open", () => {
	formModel.total = cartModel.getTotalCost();
	modal.content = contacts.render();
	modal.open();
});

events.on(
	`contactsForm:changeContacts`,
	(data: { field: string; value: string }) => {
		formModel.setOrderData(data.field, data.value);
	}
);

events.on("formErrors:contacts", (errors: IContacts) => {
	const { email, phone } = errors;
	contacts.toggleButtonDisability(!email && !phone);
	contacts.formErrors.textContent = Object.values({ phone, email })
		.filter((i) => !!i)
		.join("; ");
});

events.on("successfulOrder:open", () => {
	apiModel
		.getOrderResult(formModel.getOrderData())
		.then((data) => {
			console.log(data);
			const success = new SuccessfulOrderView(
				successfulOrderTemplate,
				events
			);
			modal.content = success.render(cartModel.getTotalCost());
			cartModel.clearCart();
			cart.renderHeaderCartCounter(cartModel.getAmount());
			modal.open();
		})
		.catch((error) => console.log(error));
});

events.on("successfulOrder:close", () => modal.close());

events.on("modal:open", () => {
	modal.locked = true;
});

events.on("modal:close", () => {
	modal.locked = false;
});

apiModel
	.fetchProducts()
	.then(function (data: IProductItem[]) {
		productListModel.productCards = data;
	})
	.catch((error) => console.log(error));
