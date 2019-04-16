import Component from "./component.js"

export default class ShoppingCart extends Component {
    constructor( {element} ) {
        super( {element} )
        this.allPhoneInBasket = {};
        this._render();
        this.on('click', '[data-element ="remove-button"]', (event) => {
            const phone = event.target.closest('li');
            this.remove(phone.dataset.elementId);
        })
    }


    addToBasket(selectedPhone) {
        if(!this.allPhoneInBasket.hasOwnProperty(selectedPhone)) {
            this.allPhoneInBasket[selectedPhone] = 0;
        }
        this.allPhoneInBasket[selectedPhone] += 1;
        this._render();

    }

    remove(phone) {
        if(this.allPhoneInBasket.hasOwnProperty(phone)) {
            this.allPhoneInBasket[phone] -= 1;
        }
        
        if(this.allPhoneInBasket[phone] === 0) {
            delete this.allPhoneInBasket[phone]
        }
        this._render()

    }

    _render() {
        this._element.innerHTML = `
        <p>Shopping Cart</p>
          <ul data-element="phone-in-basket">
            ${
                Object.entries(this.allPhoneInBasket)
                .map(([name, quantity]) => `
                <li
                data-element-id="${name}"
                >
                ${name} - ${quantity}
                <button data-element ="remove-button">X</button>
                 </li>`)
                .join('')
            }
          </ul>
          `
    }
}