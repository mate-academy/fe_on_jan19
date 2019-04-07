'use strict';


import Component from './components/component.js';
import PhonesCatalog from './components/phones-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesService from './services/phones-service.js';

export default class PhonesPage {
    constructor({element}) {
        this._element = element;
				this._render();

				this._catalog = new PhonesCatalog({
					element: this._element.querySelector('[data-component="phone-catalog"]'),
					phones: PhonesService.getAll(),
          onPhoneSelected: (id) => {
            const phoneDetails = PhonesService.getById(id);
            this._catalog.hide();
            this._viewer.show(phoneDetails);
          }
				});

        this._viewer = new PhoneViewer({
          element: this._element.querySelector('[data-component="phone-viewer"]'),
          onBack: () => {
            this._viewer.hide();
            this._catalog.show();
          }
        });
    };

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
              <p>Shopping Cart</p>
              <ul>
              <li>Phone 1</li>
              <li>Phone 2</li>
              <li>Phone 3</li>
              </ul>
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
