'use strict';
import Component from './component.js';


export default class PhoneViewer extends Component {
  constructor({ element }){
    super({element});

    this.on('click', '[data-element = "back-button"]', () => {
      this.emit('back');
    })

    this.on('click', '[data-element="small-preview"]', (event) => {
      const bigPreview = this._element.querySelector('[data-element="big-preview"]');
      bigPreview.src = event.target.src;
    })
    
  }

  show(phoneDetails){
    this._phoneDetails = phoneDetails;
    this._render();
    super.show();
  }

  _render(){
    this._element.innerHTML = `
    <img
    data-element = "big-preview"
     class="phone"
     src="${this._phoneDetails.images[0]}"
     >

    <button data-element = "back-button" >Back</button>
    <button data-element = "addToBasket" >Add to basket</button>


    <h1>${this._phoneDetails.name}</h1>

    <p>${this._phoneDetails.description}</p>

    <ul class="phone-thumbs">
    ${this._phoneDetails.images.map(imageUrl => `
        <li>
          <img src = "${imageUrl}"
          data-element = "small-preview"
          >
          </li>
      `). join('')}
    </ul>

    <ul class="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>Availability</dt>
          <dd></dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>
          <dt>Type</dt>
          <dd>${this._phoneDetails.battery.type}</dd>
          <dt>Talk Time</dt>
          <dd>${this._phoneDetails.battery.talkTime}</dd>
          <dt>Standby time (max)</dt>
          <dd>${this._phoneDetails.battery.standbyTime}</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>${this._phoneDetails.storage.ram}</dd>
          <dt>Internal Storage</dt>
          <dd>${this._phoneDetails.storage.flash}</dd>
        </dl>
      </li>
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd></dd>
          <dt>WiFi</dt>
          <dd>${this._phoneDetails.connectivity.wifi}</dd>
          <dt>Bluetooth</dt>
          <dd>${this._phoneDetails.connectivity.bluetooth}</dd>
          <dt>Infrared</dt>
          <dd>✘</dd>
          <dt>GPS</dt>
          <dd> ✓</dd>
        </dl>
      </li>
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>${this._phoneDetails.android.os}</dd>
          <dt>UI</dt>
          <dd>${this._phoneDetails.android.ui}</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          <dd>${this._phoneDetails.sizeAndWeight[0]}</dd>
          <dd>${this._phoneDetails.sizeAndWeight[1]}</dd>
          <dd>${this._phoneDetails.sizeAndWeight[2]}</dd>
          <dt>Weight</dt>
          <dd>${this._phoneDetails.sizeAndWeight[3]}</dd>
        </dl>
      </li>
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>${this._phoneDetails.display.screenSize}</dd>
          <dt>Screen resolution</dt>
          <dd>${this._phoneDetails.display.screenResolution}</dd>
          <dt>Touch screen</dt>
          <dd>✓</dd>
        </dl>
      </li>
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>${this._phoneDetails.hardware.cpu}</dd>
          <dt>USB</dt>
          <dd>${this._phoneDetails.hardware.usb}</dd>
          <dt>Audio / headphone jack</dt>
          <dd>${this._phoneDetails.hardware.audioJack}</dd>
          <dt>FM Radio</dt>
          <dd>✘</dd>
          <dt>Accelerometer</dt>
          <dd>✓</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>${this._phoneDetails.camera.primary}</dd>
          <dt>Features</dt>
          <dd>${this._phoneDetails.camera.features}</dd>
        </dl>
      </li>
      <li>
        <span>Additional Features</span>
        <dd>Sensors: proximity, ambient light, barometer, gyroscope</dd>
      </li>
    </ul>
    `
  }
}
