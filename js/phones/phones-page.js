'use strict'
import PhonesCatalog from './components/phones-catalog.js';
import PhoneService from './service/phones-service.js';
import PhoneVieWer from './components/phone-viewer.js'
import ShoppingCart from './components/shoping-cart.js';

export default class PhonesPage{
    constructor({ element }) {
        this._element = element;
        this._render();

        this._initCatalog();
        this._initVeiwer();
        this._initCart();

    }

    _initCatalog() {
      this._catalog = new PhonesCatalog({
        element: this._element.querySelector('[data-component = "phone-catalog"]'),
        phones: PhoneService.getAll(),
    })

    this._catalog.subscribe('phone-selected', (id) =>{
      console.log('selected ' + id)
      const phoneDetails = PhoneService.getById(id);
      this._catalog.hide();
      this._viewer.show(phoneDetails)
    });

    this._catalog.subscribe('add-to-basket',(selectedPhone) => {
      this._cart._addToBasket(selectedPhone);
    })
    };

    _initVeiwer() {
      this._viewer = new PhoneVieWer({
        element: this._element.querySelector('[data-component = "phone-viewer"]'),
      });

      this._viewer.subscribe('back', () => {
        this._catalog.show();
        this._viewer.hide();
      })

      this._viewer.subscribe('add-to-basket',(selectedPhone) => {
        this._cart._addToBasket(selectedPhone);
      })

    }

    _initCart() {
      this._cart = new ShoppingCart({
        element: this._element.querySelector('[data-component = "shoping-cart"]')
      });
      
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
          <div data-component="shoping-cart"> </div>
        </section>
      </div>

      <!--Main content-->
      <div class="col-md-10">
      <div data-component = "phone-viewer"></div>
      <div data-component = "phone-catalog"></div>
      </div>
    </div>
        `
    }
}