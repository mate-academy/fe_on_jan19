import Component from "./component.js"

export default class ShoppingCart extends Component {
    constructor( {element} ) {
        super( {element} )
        this._render();
        this.allPhoneInBasket = [];
    }


    _addToBasket(selectedPhone) {
        this.allPhoneInBasket.push(selectedPhone);
        const namePhone = selectedPhone.name;
        const ourBasket = this._element.querySelector('[data-element="phone-in-basket"]');
        ourBasket.innerHTML += `
        <li> ${namePhone} </li>
        `
    }

    _render() {
        this._element.innerHTML = `
        <p>Shopping Cart</p>
          <ul data-element="phone-in-basket">
          </ul>
          `
    }
}