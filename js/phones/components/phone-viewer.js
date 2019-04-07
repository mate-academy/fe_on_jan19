import Component from './component.js';

export default class PhoneViewer extends Component {
  constructor({
    element,
    goBack = () => {}
  }) {
    super({
      element
    });
    this.goBack = goBack;
    this._element.addEventListener('click', (event) => {
      const btnBack = this._element.querySelector('[data-go="back"]');
      if (!btnBack) return;
      this.goBack();
    })
  }
  show(phoneDetails) {
    this._phoneDetails = phoneDetails;
    ///const phoneDetails = PhonesService.getById(id) = phoneByIdDetails ;
    this._render();
    super.show();
  }

  _render() {
    this._element.innerHTML = `
        <img class="phone" src="${this._phoneDetails.images[0]}">
        <button data-go="back">Back</button>
        <button>Add to basket</button>
    
    
        <h1>${this._phoneDetails.name}</h1>
    
        <p>${this._phoneDetails.description}</p>
    
        <ul class="phone-thumbs">

            ${this._phoneDetails.images.map(imgSrc=>`
              <li>
                <img src="${imgSrc}">
              </li>
            `).join('')}
        </ul>
     `
  }
}