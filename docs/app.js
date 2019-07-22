"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  console.log("HELLO WoRLD!");
  var MAP_CLASS = 'map';
  var MAP_IMG_CLASS = 'map__img';
  var POPUP_CLASS = 'popup';
  var POPUP_SHOW_CLASS = 'popup_show';
  var PIN_CLASS = 'pin';
  var PIN_CLICKED_CLASS = 'pin__clicked';
  var PIN_CLICKED_SHOW_CLASS = 'pin__clicked_show'; //get all pins

  var pins = document.getElementsByClassName(PIN_CLASS); //transform to regular array

  pins = _toConsumableArray(pins); //set click handler for each pin

  pins.forEach(function (pin) {
    pin.addEventListener('click', pinClickHandler);
  }); //set click handler for the empty space on the map

  var map = document.getElementsByClassName(MAP_CLASS)[0];
  map.addEventListener('click', mapClickHandler.bind(null, pins)); //get switch button

  var switchLeft = document.getElementsByClassName('switch__btn_left')[0];
  var switchRight = document.getElementsByClassName('switch__btn_right')[0];
  var root1 = document.getElementsByClassName('root_1')[0];
  var root2 = document.getElementsByClassName('root_2')[0];
  switchLeft.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (switchLeft.classList.contains('switch__btn_off')) {
      switchLeft.classList.remove('switch__btn_off');
      switchRight.classList.add('switch__btn_off');
      root1.classList.remove('root_off');
      root2.classList.add('root_off');
    }
  });
  switchRight.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (switchRight.classList.contains('switch__btn_off')) {
      console.log(switchRight.classList);
      switchRight.classList.remove('switch__btn_off');
      switchLeft.classList.add('switch__btn_off');
      root2.classList.remove('root_off');
      root1.classList.add('root_off');
    }
  }); //-------------------------------------------
  // pin functions

  function pinClickHandler() {
    togglePopup(this);
    togglePinClicked(this);
  }

  function findChild(parent, childClass) {
    var child = _toConsumableArray(parent.children).reduce(function (acc, elem) {
      return elem.classList.contains(childClass) ? elem : acc;
    }, null);

    return child;
  }

  function togglePopup(pin) {
    var child = findChild(pin, POPUP_CLASS);
    child.classList.toggle(POPUP_SHOW_CLASS);
  }

  function togglePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS).classList.toggle(PIN_CLICKED_SHOW_CLASS);
  }

  function mapClickHandler(pins, evt) {
    if (!evt.target.classList.contains(MAP_IMG_CLASS)) return;
    var timeout = 0;
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