(function() {

  let pins = document.getElementsByClassName('pin');
  pins = [...pins];
  
  pins.forEach(pin => pin.addEventListener('click', pinClickPopupHandler));
  
  function pinClickPopupHandler() {
    const popup = 
      [...this.children]
        .reduce((acc, elem) => 
          elem.classList.contains('popup') ? elem : acc, null);

    const pinInner = this.nextElementSibling;
    console.log(pinInner, popup);

    popup.classList.toggle('popup_show');
    pinInner.classList.toggle('pininner_show');
  }

})();
