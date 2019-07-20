"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var MAP_CLASS = 'map';
  var MAP_IMG_CLASS = 'map__img';
  var POPUP_CLASS = 'popup';
  var POPUP_SHOW_CLASS = 'popup_show';
  var PIN_CLASS = 'pin';
  var PIN_CLICKED_CLASS = 'pin__clicked';
  var PIN_CLICKED_SHOW_CLASS = 'pin__clicked_SHOW'; //get all pins

  var pins = document.getElementsByClassName(PIN_CLASS); //transform to regular array

  pins = _toConsumableArray(pins); //set click handler for each pin

  pins.forEach(function (pin) {
    pin.addEventListener('click', pinClickHandler);
  }); //set click handler for the empty space on the map

  var map = document.getElementsByClassName(MAP_CLASS)[0];
  map.addEventListener('click', mapClickHandler.bind(null, pins)); //-------------------------------------------
  // pin functions

  function pinClickHandler() {
    togglePopup(this);
    togglePinClicked(this);
  }

  function findChild(parent, childClass) {
    return _toConsumableArray(parent.children).reduce(function (acc, elem) {
      return elem.classList.contains(childClass) ? elem : acc;
    }, null);
  }

  function togglePopup(pin) {
    findChild(pin, POPUP_CLASS).classList.toggle(POPUP_SHOW_CLASS);
  }

  function togglePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS).classList.toggle(PIN_CLICKED_SHOW_CLASS);
  }

  function mapClickHandler(pins, evt) {
    if (!evt.target.classList.contains(MAP_IMG_CLASS)) return;
    pins.forEach(function (pin) {
      hidePopup(pin);
      hidePinClicked(pin);
    });
  }

  function hidePopup(pin) {
    findChild(pin, POPUP_CLASS).classList.remove(POPUP_SHOW_CLASS);
  }

  function hidePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS).classList.remove(PIN_CLICKED_SHOW_CLASS);
  }
})();