import Component from './component.js';


export default class PhoneViewer extends Component {
    constructor({
                    element,
                    back = () => {
                    }
                }) {
        super({element});
        this._element = element;
        this.back = back;
        this._element.addEventListener('click', (event) => {
            const btnBack = event.target.closest('[data-button = "back-button"]');
            if (!btnBack) {
                return;
            }
            this.back()
        })
    }

    show(phoneDetails) {
        this._phoneDetails = phoneDetails;
        this._render();
        super.show();
    }

    _render() {
        this._element.innerHTML = `
            <img class="phone" src="${this._phoneDetails.images[0]}">

    <button data-button="back-button">Back</button>
    <button>Add to basket</button>


    <h1>"${this._phoneDetails.name}"</h1>

    <p>"${this._phoneDetails.description}"</p>

    <ul class="phone-thumbs">
      <li>
        <img src="${this._phoneDetails.images[1]}">
      </li>
      <li>
        <img src="${this._phoneDetails.images[2]}">
      </li>
      <li>
        <img src="${this._phoneDetails.images[3]}">
      </li>
      <li>
        <img src="${this._phoneDetails.images[4]}">
      </li>
      <li>
        <img src="${this._phoneDetails.images[5]}">
      </li>
      <li>
        <img src="${this._phoneDetails.images[6]}">
      </li>
    </ul>
            }`
    }
}