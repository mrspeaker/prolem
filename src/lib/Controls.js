function Controls () {

  var _keys = {};
  this._keys = _keys;

  // Bind event handlers
  document.addEventListener('keydown', function (e) {
    if ([37,38,39,40].indexOf(e.which) >= 0) {
      e.preventDefault();
    }
    _keys[e.which] = true;
  }, false);

  document.addEventListener('keyup', function (e) {
    _keys[e.which] = false;
  }, false);
}

Controls.prototype = {

  // Handle key actions
  action: function () {
    return this._keys[32];
  },

  reset: function () {
    this._keys[32] = false;
    for (key in this._keys) {
      this._keys[key] = false;
    }
  },

  x: function () {
    if (this._keys[37] || this._keys[65]) {
      return -1;
    }
    if (this._keys[39] || this._keys[68]) {
      return 1;
    }
    return 0;
  },

  y: function () {
    if (this._keys[38] || this._keys[87]) {
      return -1;
    }
    if (this._keys[40] || this._keys[83]) {
      return 1;
    }
    return 0;
  }

};
