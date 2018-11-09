(function flexible(window, document) {
  var docEl = document.documentElement;
  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }

  setRemUnit();
})(window, document);
