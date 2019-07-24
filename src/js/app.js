(function() {

  console.log("HELLO WoRLD!");

  const MAP_CLASS = 'map';
  const MAP_IMG_CLASS = 'map__img';
  const POPUP_CLASS = 'popup';
  const POPUP_SHOW_CLASS = 'popup_show';
  const PIN_CLASS = 'pin';
  const PIN_CLICKED_CLASS = 'pin__clicked';
  const PIN_CLICKED_SHOW_CLASS = 'pin__clicked_show';

  let openPin = null;

  /*
   * Pins
   */

  //set click handlers for all pins on the map
  let pins = document.getElementsByClassName(PIN_CLASS);
  pins = [...pins];
  pins.forEach(pin => {
    pin.addEventListener('click', pinClickHandler);
  });

  //set click handler for the empty space on the map
  const map = document.getElementsByClassName(MAP_CLASS)[0];
  map.addEventListener('click', mapClickHandler.bind(null, pins));


  /**
   * Switch
   */

  //get switch button
  const switchLeft = document.getElementsByClassName('switch__btn_left')[0];
  const switchRight= document.getElementsByClassName('switch__btn_right')[0];
  const route1Pins = document.getElementById('route-1-pins');
  const route2Pins = document.getElementById('route-2-pins');
  const route1 = document.getElementById('route-1');
  const route2 = document.getElementById('route-2');

  const switcher = document.getElementsByClassName('switch')[0];
  switcher.isSticky = function() {
    return this.classList.contains('switch_sticky');
  }
  const switcherOffset = switcher.offsetTop;

  switchLeft.addEventListener('click', (evt) => {
    evt.preventDefault();

    if(switchLeft.classList.contains('switch__btn_off')) {
      switchLeft.classList.remove('switch__btn_off');
      switchRight.classList.add('switch__btn_off');

      route1Pins.classList.remove('route_hide');
      route2Pins.classList.add('route_hide');

      route1.classList.remove('route_hide');
      route2.classList.add('route_hide');

      switcher.isSticky() && scrollTo('routes-start');
    }
  })

  switchRight.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    if(switchRight.classList.contains('switch__btn_off')) {
      switchRight.classList.remove('switch__btn_off');
      switchLeft.classList.add('switch__btn_off');

      route2Pins.classList.remove('route_hide');
      route1Pins.classList.add('route_hide');

      route2.classList.remove('route_hide');
      route1.classList.add('route_hide');

      switcher.isSticky() && scrollTo('routes-start');
      console.log(switcher.isSticky());
    }
  })

  /*
   * Switcher stickiness
   */

  window.onscroll = function() {
    if(window.pageYOffset > switcherOffset) {
      switcher.classList.add("switch_sticky");
    } else {
      switcher.classList.remove("switch_sticky");
    }
  }

 /**
  * Functions
  */

  function scrollTo(hash) {
    location.href = "#";
    location.href = "#" + hash;
  } 

  let zIndex = 1;
  function pinClickHandler(evt) {
    //togglePopup(this);
    //togglePinClicked(this);
    //zIndex++;

    if(openPin) {
              hidePopup(openPin);
              hidePinClicked(openPin);
          
    }

    if(evt.target.classList.contains('popup__close')) {
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
    const child = [...parent.children].reduce((acc, elem) => 
    elem.classList.contains(childClass) ? elem : acc, null);
    return child;
  }


  function togglePopup(pin) {
    const popup = findChild(pin, POPUP_CLASS)
    console.log(popup);
    popup.style.zIndex = zIndex;
    popup.classList.toggle(POPUP_SHOW_CLASS);
  }


  function togglePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS)
      .classList.toggle(PIN_CLICKED_SHOW_CLASS);
  }


  function mapClickHandler(pins, evt) {
    if(!evt.target.classList.contains(MAP_IMG_CLASS)) 
      return;
    pins.forEach(pin => {
        hidePopup(pin);
        hidePinClicked(pin);
    });
    zIndex = 1;
  }


  function hidePopup(pin) {
    findChild(pin, POPUP_CLASS)
      .classList.remove(POPUP_SHOW_CLASS);
  }


  function hidePinClicked(pin) {
    findChild(pin, PIN_CLICKED_CLASS)
      .classList.remove(PIN_CLICKED_SHOW_CLASS);
  }


})();
