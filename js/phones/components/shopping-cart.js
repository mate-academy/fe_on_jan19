import Component from './component.js';

export default class ShoppingCart extends Component{

    constructor({element}){
        super({element});
        this._element = element;
        this._render();
        this._el = this._element.querySelector('[data-element="add-phones"]');
    }

    addToCart({phoneSrc , phoneName}){
        // const el = this._element.querySelector('[data-element="add-phones"]');
              // li = document.createTextNode('li'),
              // img = document.createElement('img');

        this._el.innerHTML += `
        <li style="list-style: none">
            <b>${phoneName}</b>
            <img width="100px" height="100px" src="${phoneSrc}">
        </li>
        
        `
        // img.setAttribute('src', phoneSrc);
        // li.appendChild(img);
        // el.appendChild(li);
    // return  console.dir(phone);
    }

    _render(){
        this._element.innerHTML =
        `
            <p>Shopping Cart</p>
            <ul
            data-element="add-phones"
            >
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
            </ul>
        `
    }
}