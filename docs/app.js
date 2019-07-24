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
  var PIN_CLICKED_SHOW_CLASS = 'pin__clicked_show';
  var openPin = null;
  /*
   * Pins
   */
  //set click handlers for all pins on the map

  var pins = document.getElementsByClassName(PIN_CLASS);
  pins = _toConsumableArray(pins);
  pins.forEach(function (pin) {
    pin.addEventListener('click', pinClickHandler);
  }); //set click handler for the empty space on the map

  var map = document.getElementsByClassName(MAP_CLASS)[0];
  map.addEventListener('click', mapClickHandler.bind(null, pins));
  /**
   * Switch
   */
  //get switch button

  var switchLeft = document.getElementsByClassName('switch__btn_left')[0];
  var switchRight = document.getElementsByClassName('switch__btn_right')[0];
  var route1Pins = document.getElementById('route-1-pins');
  var route2Pins = document.getElementById('route-2-pins');
  var route1 = document.getElementById('route-1');
  var route2 = document.getElementById('route-2');
  var switcher = document.getElementsByClassName('switch')[0];

  switcher.isSticky = function () {
    return this.classList.contains('switch_sticky');
  };

  var switcherOffset = switcher.offsetTop;
  switchLeft.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (switchLeft.classList.contains('switch__btn_off')) {
      switchLeft.classList.remove('switch__btn_off');
      switchRight.classList.add('switch__btn_off');
      route1Pins.classList.remove('route_hide');
      route2Pins.classList.add('route_hide');
      route1.classList.remove('route_hide');
      route2.classList.add('route_hide');
      switcher.isSticky() && scrollTo('routes-start');
    }
  });
  switchRight.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (switchRight.classList.contains('switch__btn_off')) {
      switchRight.classList.remove('switch__btn_off');
      switchLeft.classList.add('switch__btn_off');
      route2Pins.classList.remove('route_hide');
      route1Pins.classList.add('route_hide');
      route2.classList.remove('route_hide');
      route1.classList.add('route_hide');
      switcher.isSticky() && scrollTo('routes-start');
      console.log(switcher.isSticky());
    }
  });
  /*
   * Switcher stickiness
   */

  window.onscroll = function () {
    if (window.pageYOffset > switcherOffset) {
      switcher.classList.add("switch_sticky");
    } else {
      switcher.classList.remove("switch_sticky");
    }
  };
  /**
   * Functions
   */


  function scrollTo(hash) {
    location.href = "#";
    location.href = "#" + hash;
  }

  var zIndex = 1;

  function pinClickHandler(evt) {
    //togglePopup(this);
    //togglePinClicked(this);
    //zIndex++;
    if (openPin) {
      hidePopup(openPin);
      hidePinClicked(openPin);
    }

    if (evt.target.classList.contains('popup__close')) {
      console.log(this);
      hidePopup(this);
      hidePinClicked(this);
    } else {
      togglePopup(this);
      togglePinClicked(this);
      zIndex++;
      openPin = this;
    }
  }

  function findChild(parent, childClass) {
    var child = _toConsumableArray(parent.children).reduce(function (acc, elem) {
      return elem.classList.contains(childClass) ? elem : acc;
    }, null);

    return child;
  }

  function togglePopup(pin) {
    var popup = findChild(pin, POPUP_CLASS);
    console.log(popup);
    popup.style.zIndex = zIndex;
    popup.classList.toggle(POPUP_SHOW_CLASS);
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
    zIndex = 1;
  }

  function hidePopup(pin) {
    findChild(pin, POPUP_CLASS).classList.remove(POPUP_SHOW_CLASS);
  }

  function hidePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS).classList.remove(PIN_CLICKED_SHOW_CLASS);
  }
})();