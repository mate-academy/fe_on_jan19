import Component from './component.js'

export default class PhoneViewer extends Component{
    constructor({
        element
        }) {
        super({element}),

        this.on('click', '[data-batton="back-button"]', () => {
          this.emit('back');
        })
        
        this.on('click', '[data-element="small-preview"]', (event) =>{
         this.bigImg = this._element.querySelector('[data-element="big-preview"]');
         this.bigImg.src = event.target.src;
        })

        this.on('click', '[data-batton="add-to-basket"]', () => {
          this.emit('add-to-basket',this._phoneDetaild.id);
        })

    }
      
    show(phoneDetails) {
        super.show();
        this._phoneDetaild = phoneDetails;
        this._render();
      }

    _render() {
        this._element.innerHTML = `
        <img
        data-element="big-preview"
        class="phone" 
        src="${this._phoneDetaild.images[0]}"
        >

        <button data-batton="back-button">Back</button>
        <button data-batton="add-to-basket">Add to basket</button>
    
    
        <h1>${this._phoneDetaild.name}</h1>
    
        <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
    
        <ul class="phone-thumbs">
          ${
            this._phoneDetaild.images.map( src => `
            <li>
              <img src="${src}" data-element="small-preview">
            </li>
          `
           ).join('')
          }
        </ul>
        `
    }
}