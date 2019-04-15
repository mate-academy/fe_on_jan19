import PhonesCatalog from './components/phones-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesService from './services/phones-service.js';

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;
        this._render();
        this._initialCatalog();
        this._initialViewer();
        this._initialSoppingCart();
    }

    _initialCatalog(){
        this._catalog = new PhonesCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhonesService.getAll(),
        });

        this._catalog.subscribe('phone-selected', (id) => {
            const phoneDetails = PhonesService.getById(id);
            this._catalog.hide();
            this._viewer.setDataAttribute({ id });
            this._viewer.show(phoneDetails);
        });

        this._catalog.subscribe('add-to-cart',({phoneSrc, phoneName})=>{
          console.log('Selected: ', phoneName);
            this._cart.addToCart({phoneSrc, phoneName});
        })

    }
    _initialViewer(){

        this._viewer = new PhoneViewer({
                element: this._element.querySelector('[data-component="phone-viewer"]'),
                phones: PhonesService.getAll(),
        });

        this._viewer.subscribe('back', ()=>{
            this._catalog.show();
            this._viewer.hide();
        });

        this._viewer.subscribe('add-to-cart',({phoneSrc, phoneName})=>{
            this._cart.addToCart({phoneSrc, phoneName});
        })
    }

    _initialSoppingCart(){
        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="phone-shopping-cart"]')
        })
    }

    _render() {
        this._element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
            <section>
            <p>
                Search:
                <input>
            </p>

            <p>
                Sort by:
                <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
                </select>
            </p>
            </section>

            <section>
            <div data-component="phone-shopping-cart"></div>  
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
            <div data-component="phone-viewer"></div>
            <div data-component="phone-catalog"></div>
        </div>
        </div>`
    }
}