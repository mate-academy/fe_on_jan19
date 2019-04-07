import Component from './component.js'

export default class PhonesCatalog extends Component{
    constructor({
       element,
       phones = [],
       onPhonesSelected = () => {}
      }) {
        super({ element });
        this._element = element;
        this._phones = phones;
        this._onPhonesSelected = onPhonesSelected;
        this._render();
        this._element.addEventListener('click', (event) => {
          const phoneEl = event.target.closest('[data-element="phone-elnment"]');
          if (!phoneEl) {
            return;
          }
          const phoneId = phoneEl.dataset.phoneId;
          this._onPhonesSelected(phoneId);
        })
    }
    
    _render() {
        this._element.innerHTML = `
        <ul class="phones">
          ${

            this._phones.map(phone => `
            <li 
            class="thumbnail"
            data-element="phone-elnment"
             data-phone-id="${phone.id}
             ">
            <a href="#!/phones/motorola-xoom-with-wi-fi" class="thumb">
              <img alt="Motorola XOOM™ with Wi-Fi" src="${phone.imageUrl}">
            </a>

            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>

            <a href="#!/phones/motorola-xoom-with-wi-fi">${phone.name}</a>
            <p>${phone.snippet}</p>
            </li>
              `
            ).join('')
          }

        
      </ul>
        `
    }
}