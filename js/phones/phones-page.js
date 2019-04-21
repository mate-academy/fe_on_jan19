'use strict'
import PhonesCatalog from './components/phones-catalog.js';
import PhoneService from './service/phones-service.js';
import PhoneVieWer from './components/phone-viewer.js'
import ShoppingCart from './components/shoping-cart.js';
import Filter from './components/filter.js';

export default class PhonesPage{
    constructor({ element }) {
        this._element = element;
        this._render();

        this._initFilter();
        this._initCatalog();
        this._initVeiwer();
        this._initCart();

    }

    _initCatalog() {
      this._catalog = new PhonesCatalog({
        element: this._element.querySelector('[data-component = "phone-catalog"]')
    })

    this._showPhones();
    this._catalog.subscribe('phone-selected', (id) =>{
      console.log('selected ' + id)
      const phoneDetails = PhoneService.getById(id);
      this._catalog.hide();
      this._viewer.show(phoneDetails)
    });

    this._catalog.subscribe('add-to-basket',(selectedPhone) => {
      this._cart.addToBasket(selectedPhone);
    })
    };

    _initVeiwer() {
      this._viewer = new PhoneVieWer({
        element: this._element.querySelector('[data-component = "phone-viewer"]'),
      });

      this._viewer.subscribe('back', () => {
        this._showPhones();
        this._viewer.hide();
      })

      this._viewer.subscribe('add-to-basket',(selectedPhone) => {
        this._cart.addToBasket(selectedPhone);
      })

    }

    _initCart() {
      this._cart = new ShoppingCart({
        element: this._element.querySelector('[data-component = "shoping-cart"]')
      });
      
    }

    _initFilter() {
      this._filter = new Filter({
        element: this._element.querySelector('[data-component="filter"]')
      })

      this._filter.subscribe('query-change', (eventData) => {
        this._showPhones();
      })

      this._filter.subscribe('order-change', (eventData) => {
        this._showPhones();
      })
    }

    _showPhones() {
      this._currentFiltering = this._filter.getCurrent();
      const phones = PhoneService.getAll(this._currentFiltering);
      console.log(this._currentFiltering)
      this._catalog.show(phones);
    }


    _render() {
        this._element.innerHTML = `
        <div class="row">

      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div data-component="filter"> </div>
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