import Component from './component.js'

export default class ShoppingCart extends Component {
    constructor({
        element
    }) {
        super({
            element
        });
        this._items = [];
        this._render();

    }

    addToCart(phone) {
        this._element.querySelector('UL').insertAdjacentHTML('beforeend', `<li>${phone}</li>`);
    }

    _render() {
        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>
            </ul>
        `
    }
}