import Component from './component.js';

export default class ShoppingCart extends Component{

    constructor({element}){
        super({element});

        this._addedPhones = {};
        this._render();
        this._element.addEventListener('click',(event)=>{
            if(!event.target.closest('#remove')){
                return;
            }

            const select = event.target.closest('li');
            const phone = select.dataset.elementName;
            this.remove(phone)
        })
    }



    addToCart({phoneSrc , phoneName}){
        if(this._addedPhones[`${phoneName}`]){
            this._addedPhones[`${phoneName}`] ++;
        }else {
            this._addedPhones[`${phoneName}`] = 1 ;
        }

        this._render();
    }


    remove(phone) {
        console.log(phone)
        if (this._addedPhones[phone]) {
            this._addedPhones[phone] --;
        }
        if (this._addedPhones[phone] === 0) {
            delete this._addedPhones[phone];
        }
        this._render();
    }


    _render(){
        this._element.innerHTML =
            `
            <p>Shopping Cart:</p>
            <ul
            data-element="add-phones"
           >
            ${this._renderList()}
            </ul>
        `
    }

    _renderList(){
        const values = [];
        for (let key in this._addedPhones){
            values.push(`<li data-element-name="${key}">${key}: ${this._addedPhones[key]}
            <button id="remove">Remove</button>
            </li>`)
        }
        return values.join('');
    }

}