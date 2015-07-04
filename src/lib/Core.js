function Container () {
  this.pos = {x: 0, y: 0};
  this.children = [];
}

Container.prototype = {

  add: function (child) {
    this.children.push(child);
  },

  remove: function (child) {
    this.children = this.children.filter(function (c) {
      return c !== child;
    });
  },

  update: function (dt, t) {
    this.children.forEach(function (child) {
      if (child.update) {
        child.update(dt, t);
      }
    });
  }

};


function Rect (color, w, h) {
  this.color = color;
  this.w = w;
  this.h = h;
}

function Text (text, style) {
  this.text = text;
  this.style = style;
}

function Texture (url) {
  this.img = new Image();
  this.img.src = url;
}

function Sprite (texture) {
  this.texture = texture;
  this.pos = { x: 0, y: 0 };
  this.scale = { x: 1, y: 1 };
  this.pivot = { x: 0, y: 0 };
}

function TileSprite (texture, w, h) {
  Sprite.call(this, texture);
  this.tileW = w;
  this.tileH = h;
  this.frame = { x: 0, y: 0 };
}
TileSprite.prototype = Object.create(Sprite.prototype);

function TileMap (map) {
  Container.call(this);
  this.map = map;
  this.children = map.tiles.map(function (frame, i) {
    var s = new TileSprite(map.texture, map.tileW, map.tileH);
    s.frame = frame;
    s.pos = this.tileToWorldPosition(this.tileIndexToPosition(i));
    return s;
  }, this);
}
TileMap.prototype = Object.create(Container.prototype);
TileMap.prototype.constructor = TileMap;

TileMap.prototype.tileAtPosition = function(p) {
  return this.children[p.y * this.map.w + p.x];
};

TileMap.prototype.tileIndexToPosition = function (i) {
  var w = this.map.w;
  return {
    x: i % w,
    y: Math.floor(i / w)
  };
};
TileMap.prototype.positionToTileIndex = function (p) {
  return this.map.w * p.y + p.x;
};
TileMap.prototype.worldToTilePosition = function (p) {
  return {
    x: Math.floor(p.x / this.map.tileW),
    y: Math.floor(p.y / this.map.tileH)
  };
};
TileMap.prototype.tileToWorldPosition = function (p) {
  return {
    x: p.x * this.map.tileW,
    y: p.y * this.map.tileH
  };
};
