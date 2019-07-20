"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var pins = document.getElementsByClassName('pin');
  pins = _toConsumableArray(pins);
  pins.forEach(function (pin) {
    return pin.addEventListener('click', pinClickPopupHandler);
  });

  function pinClickPopupHandler() {
    var popup = _toConsumableArray(this.children).reduce(function (acc, elem) {
      return elem.classList.contains('popup') ? elem : acc;
    }, null);

    var pinInner = this.nextElementSibling;
    console.log(pinInner, popup);
    popup.classList.toggle('popup_show');
    pinInner.classList.toggle('pininner_show');
  }
})();