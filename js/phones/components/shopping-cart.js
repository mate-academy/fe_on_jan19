import Component from './component.js';

export default class ShoppingCart extends Component{

    constructor({element}){
        super({element});
        this._element = element;
        this._render();
        this._addedPhones = {};

    }

    addToCart({phoneSrc , phoneName}){

        let selector = `[data-element="count-phone-${phoneName}"]`;

        console.log(this._addedPhones);
        console.log(selector);

        if(this._addedPhones[`${phoneName}`]){
           this._addedPhones[`${phoneName}`]++;
            this._element.querySelector(selector).innerHTML = '<b>'+this._addedPhones[`${phoneName}`]+'</b>';
                return;
        }else {
            this._addedPhones[`${phoneName}`] = 1;

            if(this._element.querySelector(selector)){
                this._element.querySelector(selector).innerHTML  += '<b>'+this._addedPhones[`${phoneName}`]+'</b>';
            }
        }

        this._element.querySelector('[data-element="add-phones"]').innerHTML += `
        <li style="list-style: none;
                    border: 2px black solid;
                  "
        data-element="added-phone-list"
        >  
        <div
        data-element="count-phone-${phoneName}"
        >
        1
        </div>
        
       
        <span>${phoneName}</span>
             <input 
             type="button" 
             value="Remove Selected Phone"
             style="border-radius: 3px"
             data-element="remove-selected-${phoneName}"
             >
            <img width="100px" height="50px" src="${phoneSrc}">
        </li>
        
        `;

         this._removePhone(phoneName);
        }

    _removePhone(phoneName){
        this.on('click',`[data-element="remove-selected-${phoneName}"]`, ()=> {
            const child = document.querySelector(`[data-element="count-phone-${phoneName}"]`);
            const parent = document.querySelector('[ data-element="add-phones"]');
            if(child){
                parent.removeChild(child.parentNode);
            }
            delete this._addedPhones[phoneName];
        }
   )};

    _render(){
        this._element.innerHTML =
        `
            <p>Shopping Cart:</p>
            <ul
            data-element="add-phones"
            >
           
            </ul>
        `
    }
}