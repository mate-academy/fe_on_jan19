import Component from './component.js'

export default class PhoneViewer extends Component{
    constructor({
        element,
        onBack = () => {}
        }) {
        super({element}),
        this._onBack = onBack;
        this._element.addEventListener('click', (event) => {
            const backButton = event.target.closest('[data-batton="back-button"]');
            if(!backButton) {
                return;
            }
            this._onBack();
        })
    }
      
    show(phoneDetails) {
        super.show();
        this._phoneDetaild = phoneDetails;
        this._render();
      }

    _render() {
        this._element.innerHTML = `
        <img class="phone" src="${this._phoneDetaild.images[0]}">

        <button data-batton="back-button">Back</button>
        <button>Add to basket</button>
    
    
        <h1>${this._phoneDetaild.name}</h1>
    
        <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
    
        <ul class="phone-thumbs">
          <li>
            <img src="${this._phoneDetaild.images[0]}">
          </li>
          <li>
            <img src="${this._phoneDetaild.images[1]}">
          </li>
          <li>
            <img src="${this._phoneDetaild.images[2]}">
          </li>
          <li>
            <img src="${this._phoneDetaild.images[3]}">
          </li>
          <li>
            <img src="${this._phoneDetaild.images[4]}">
          </li>
          <li>
            <img src="${this._phoneDetaild.images[5]}">
          </li>
        </ul>
        `
    }
}