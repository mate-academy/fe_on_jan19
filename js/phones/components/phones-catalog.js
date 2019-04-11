import Component from './component.js';

export default class PhonesCatalog extends Component{
    constructor({   element, 
        phones = [], 
        onPhoneSelected = () => {} 
    }) {
        super({ element });
        this._phones = phones;
        this.onPhoneSelected = onPhoneSelected;
        this._render();

        this._element.addEventListener('click', (event) => {
            const phoneElem = event.target.closest('[data-element="phone-element"]');
            if (!phoneElem){
                return;
            }
            const phoneId = phoneElem.dataset.phoneId;
            this.onPhoneSelected(phoneId);
        })    
    }

    _render() {
        this._element.innerHTML = `
         <ul class="phones">
            ${
                this._phones.map(phone => `
                    <li 
                    class="thumbnail"
                    data-element="phone-element"
                    data-phone-id=${phone.id}
                    >
                        <a href="#!/phones/${phone.name}" class="thumb">
                        <img alt="${phone.name}" src="${phone.imageUrl}">
                        </a>
                        <div class="phones__btn-buy-wrapper">
                        <a class="btn btn-success">
                            Add
                        </a>
                        </div>
                        <a href="#!/phones/${phone.name}">${phone.name}</a>
                        <p>${phone.snippet}</p>
                    </li>
                `).join('')
            }
        </ul>
        `
    }
}