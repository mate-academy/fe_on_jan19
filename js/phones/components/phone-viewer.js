import Component from './component.js';

export default class PhoneViewer extends Component {

    constructor({element,
                 phones
                })
    {
        super({element});
        this._element = element;
        this._phones  = phones;
        this._addEvents();
    }

    show(phoneDetails) {
        this._phoneDetails = phoneDetails;
        this._render();
        super.show();
    }

    _addEvents(){


        this.on('click','[data-back-button="backToCatalog"]',()=>{
            this.emit('back')
        });
        this.on('click','[data-element="small-image"]', (event)=>{
            const largeImg = this._element.querySelector('[data-element="large-image"]'),
                    newSrc = event.target.getAttribute('src');

            largeImg.setAttribute('src', newSrc);
        });
        this.on('click','[data-element="add-to-cart-view"]',()=>{
            const phoneSrc = this._element.querySelector('[data-element="large-image"]').getAttribute('src'),
                  phoneName = this._phones[0]['id'];

            this.emit('add-to-cart',{phoneSrc, phoneName});
        })

    }
    _render() {
        this._element.innerHTML = `
        <img 
        data-element="large-image"
        class="phone" 
        src="${this._phoneDetails.images[0]}"
        >

        <button data-back-button="backToCatalog">Back</button>
        <button
        data-element="add-to-cart-view"
        >Add to basket</button>
    
    
        <h1>${this._phoneDetails.name}</h1>
    
        <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
    
        <ul class="phone-thumbs">
        ${this._phoneDetails.images.map((imageUrl)=>{
            return `<li>
            <img 
            data-element="small-image"    
            src="${imageUrl}"
             ></li>`
        }).join('')}

        </ul>
        `
    }
}