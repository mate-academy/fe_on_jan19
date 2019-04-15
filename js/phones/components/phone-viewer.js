import Component from './component.js';

export default class PhoneViewer extends Component {

    constructor({element,
                 phones
                })
    {
        super({element});
        this._element = element;
        this._phones = phones;
        this._addEvents();

    }

    show(phoneDetails) {
        this._phoneDetails = phoneDetails;
        this._render();
        super.show();
    }

    _addEvents(){


        this.on('click','[data-back-button="backToCatalog"]',()=>{
            this._element.setAttribute(`data-component`,`phone-viewer`);
            this.emit('back')
        });
        this.on('click','[data-element="small-image"]', (event)=>{
            const largeImg = this._element.querySelector('[data-element="large-image"]'),
                    newSrc = event.target.getAttribute('src');

            largeImg.setAttribute('src', newSrc);
        });
        this.on('click','[data-element="add-to-cart-view"]',()=>{
            const phoneSrc = this._element.querySelector('[data-element="large-image"]').getAttribute('src'),
                  phoneName = this._phone[0]['id'];
            this.emit('add-to-cart',{phoneSrc, phoneName});
        })

    }
    setDataAttribute({id}){
       this._element.setAttribute(`data-component`,`phone-${id}`);
       this._phone = this._phones.filter((selectedPhone)=>{
            if(selectedPhone['id'] === id){
                return selectedPhone;
           }
       });

    }
    _render() {
        this._element.innerHTML = `
        <img 
        data-element="large-image"
        class="phone" 
        src="${this._phone[0]['imageUrl']}"
        >

        <button data-back-button="backToCatalog">Back</button>
        <button
        data-element="add-to-cart-view"
        >Add to basket</button>
    
    
        <h1>${this._phone[0]['name']}</h1>
    
        <p>${this._phone[0]['snippet']}</p>
    
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