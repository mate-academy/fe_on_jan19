import PhonesCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesService from './services/phone-services.js';
import Filter from './components/filter.js';

export default class PhonesPage {
    constructor({ element }) {
        this._element = element;
        this._render();

        this._initViewer();
        this._initCart();
        this._initFilter();
        this._initCatalog();
    }

  _initFilter(){
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
    })

    this._filter.subscribe('query-order', (eventData) => {
      this._currentFiltering = this._filter.getCurrent();
        this._showPhones();
    })

    this._filter.subscribe('query-field', (eventData) => {
      this._showPhones();
    })
  }

  _showPhones(){
        this._currentFiltering = this._filter.getCurrent();
        const phones = PhonesService.getAll(this._currentFiltering);
        console.log(this._currentFiltering);
        this._catalog.show(phones);
  }

    _initCatalog() {
        this._catalog = new PhonesCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
        })
        this._showPhones();

        this._catalog.subscribe('phone-selected', (id) => {
            console.log('Selected: ', id);
            const phoneDetails = PhonesService.getById(id);
            this._catalog.hide();
            this._viewer.show(phoneDetails);
        })

        this._catalog.subscribe('add-phone', (phoneId) => {
          this._cart.addToCart(phoneId);
      })
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        })

        this._viewer.subscribe('back', () => {
            this._showPhones();
            this._viewer.hide();
        })

        this._viewer.subscribe('add-phone', (phoneId) => {
          this._cart.addToCart(phoneId);
        })
    }

    _initCart() {
      this._cart = new ShoppingCart({
             element: this._element.querySelector('[data-component="shopping-cart"]')
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
        <!--Main content-->
        <div class="col-md-10">
            <div data-component="phone-viewer"></div>
            <div data-component="phone-catalog"></div>
        </div>
        </div>`
    }
}
