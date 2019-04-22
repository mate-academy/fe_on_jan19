'use strict';

import Component from './component.js';
import utils from '../../utils.js';

export default class Filter extends Component {
	constructor({ element }) {
		super({element});

		this._render();

		this._orderField = this._element.querySelector('[data-element="order-field"]');
		this._queryField = this._element.querySelector('[data-element="query-field"]');

		this.on('change', '[data-element="order-field"]', (event) => {
			this.emit('order-change');
		})

		const debounceOnInput = utils.debounce((event) => {
			this.emit('query-change')
		}, 500)

		this.on('input', '[data-element="query-field"]', debounceOnInput )
	}


	getCurrent() {
		return {
			order: this._orderField.value,
			query: this._queryField.value
		}
	}

	_render() {
		this._element.innerHTML = `
			<p>
        Search:
        <input data-element="query-field">
      </p> 
      <p>
        Sort by:
        <select data-element="order-field">
	        <option value="name">Alphabetical</option>
	        <option value="age">Newest</option>
      	</select>
      </p>
		`
	}
}
