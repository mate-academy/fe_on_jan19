import Component from './component.js'

export default class PhonesCatalog extends Component{
    constructor({
       element,
       phones = []
      }) {
        super({ element });
        this._element = element;
        this._phones = phones;
        this._render();

        this.on('click', '[data-element="details-link"]', () => {
            
          const phoneEl = event.target.closest('[data-element="phone-elnment"]');
          const phoneId = phoneEl.dataset.phoneId;
          this.emit('phone-selected', phoneId);
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
            <a 
            data-element="details-link"
            href="#!/phones/motorola-xoom-with-wi-fi"
            class="thumb"
            >
              <img alt="Motorola XOOM™ with Wi-Fi" src="${phone.imageUrl}">
            </a>

            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>

            <a 
            data-element="details-link"
            href="#!/phones/motorola-xoom-with-wi-fi"
            >${phone.name}</a>
            <p>${phone.snippet}</p>
            </li>
              `
            ).join('')
          }

        
      </ul>
        `
    }
}