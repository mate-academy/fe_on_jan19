'use strict';


import Component from './components/component.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesCatalog from './components/phones-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesService from './services/phones-service.js';
import Filter from './components/filter.js';

export default class PhonesPage {
    constructor({element}) {
        this._element = element;
				this._render();

        this._initFilter();
        this._initCatalog();
        this._initViewer();
        this._initCart();
    };

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

    _initCatalog() {
      this._catalog = new PhonesCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]')
      });

      this._showPhones();

      this._catalog.subscribe('phone-selected', (id) => {
        console.log('Selected: ', id)
        PhonesService.getById(id).then((phoneDetails) => {
          this._catalog.hide();
          this._viewer.show(phoneDetails);
        });
      })

      this._catalog.subscribe('add-to-basket', (phoneId) => {
        this._cart.addToBasket(phoneId);
      })
    }

    _showPhones() {
      this._currentFiltering = this._filter.getCurrent();
      PhonesService.getAll(this._currentFiltering).then((phones) => {
        this._catalog.show(phones);
      })
    }

    _initCart() {
      this._cart = new ShoppingCart({
        element: this._element.querySelector('[data-component="shopping-cart"]')
      });
      
    }

    _initViewer() {
      this._viewer = new PhoneViewer({
        element: this._element.querySelector('[data-component="phone-viewer"]')
      });

      this._viewer.subscribe('back', () => {
        this._showPhones();
        this._viewer.hide();
      })

      this._viewer.subscribe('add-to-basket', (phoneId) => {
        this._cart.addToBasket(phoneId);
      })
    }

    _render() {
        this._element.innerHTML = `
          <div class="row">

            <!--Sidebar-->
            <div class="col-md-2">
            <section>
              <div data-component="filter"></div>
            </section>
            <section>
              <div data-component="shopping-cart"></div>
            </section>
            </div>
            <!--END Sidebar-->
  
            <!--Main content-->
            <div class="col-md-10">
							<div data-component="phone-viewer"></div>
              <div data-component="phone-catalog"></div>
            </div>
          </div>
        `
    }
}
