import Component from './component.js'

export default class PhonesCatalog extends Component{
    constructor({element}) {

        super({ element });
         
        this._phones = [];
        this._render();

        this.on('click', '[data-element="details-link"]', () => {
            
          const phoneEl = event.target.closest('[data-element="phone-elnment"]');
          const phoneId = phoneEl.dataset.phoneId;
          this.emit('phone-selected', phoneId);
        })

        this.on('click', '[data-element="add-phone-to-basket"]', () => {
          const phoneEl = event.target.closest('[data-element="phone-elnment"]');
          const phoneId = phoneEl.dataset.phoneId;
          this.emit('add-to-basket', phoneId);
        })
  
    }

    show(phones) {
      this._phones = phones;
      super.show();
      this._render();
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
              <a 
              data-element="add-phone-to-basket"
              class="btn btn-success"
              >
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