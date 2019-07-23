(function() {

  console.log("HELLO WoRLD!");

  const MAP_CLASS = 'map';
  const MAP_IMG_CLASS = 'map__img';
  const POPUP_CLASS = 'popup';
  const POPUP_SHOW_CLASS = 'popup_show';
  const PIN_CLASS = 'pin';
  const PIN_CLICKED_CLASS = 'pin__clicked';
  const PIN_CLICKED_SHOW_CLASS = 'pin__clicked_show';

  //get all pins
  let pins = document.getElementsByClassName(PIN_CLASS);

  //transform to regular array
  pins = [...pins];

  //set click handler for each pin
  pins.forEach(pin => {
    pin.addEventListener('click', pinClickHandler);
  });

  //set click handler for the empty space on the map
  const map = document.getElementsByClassName(MAP_CLASS)[0];
  map.addEventListener('click', mapClickHandler.bind(null, pins));


  //get switch button
  const switchLeft = document.getElementsByClassName('switch__btn_left')[0];
  const switchRight= document.getElementsByClassName('switch__btn_right')[0];

  switchLeft.addEventListener('click', (evt) => {
    evt.preventDefault();

    if(switchLeft.classList.contains('switch__btn_off')) {
      switchLeft.classList.remove('switch__btn_off');
      switchRight.classList.add('switch__btn_off');
      root1.classList.remove('root_off');
      root2.classList.add('root_off');
    }
  })

  switchRight.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    if(switchRight.classList.contains('switch__btn_off')) {
      console.log(switchRight.classList)
      switchRight.classList.remove('switch__btn_off');
      switchLeft.classList.add('switch__btn_off');
      root2.classList.remove('root_off');
      root1.classList.add('root_off');
    }
  })
  //-------------------------------------------
  // pin functions

  let zIndex = 1;
  function pinClickHandler() {
    togglePopup(this);
    togglePinClicked(this);
    zIndex++;
  }


  function findChild(parent, childClass) {
    const child = [...parent.children].reduce((acc, elem) => 
    elem.classList.contains(childClass) ? elem : acc, null);
    return child;
  }


  function togglePopup(pin) {
    const popup = findChild(pin, POPUP_CLASS)
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
