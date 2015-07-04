'use strict';

function CanvasRenderer (w, h) {
  var canvas = document.createElement('canvas');
  this.w = canvas.width = w;
  this.h = canvas.height = h;
  this.view = canvas;
  this.ctx = canvas.getContext('2d');
}
CanvasRenderer.prototype = {
  render: function (container) {
    // Render the container
    var ctx = this.ctx;

    function render (container) {
      // Render the container children
      var pos = container.pos;

      container.children.forEach(function (child) {
        ctx.save();
        if (child.pos) ctx.translate(child.pos.x | 0, child.pos.y | 0);
        if (child.scale) ctx.scale(child.scale.x, child.scale.y);

        var pivotX = child.pivot && child.pivot.x || 0;
        var pivotY = child.pivot && child.pivot.y || 0;

        // Handle the child types
        if (child.children) {
          render(child);
        }
        else if (child.text) {
          ctx.font = child.style.font;
          ctx.fillStyle = child.style.fill;
          ctx.fillText(child.text, -pivotX, -pivotY);
        }
        else if (child.color) {
          ctx.fillStyle = child.color;
          ctx.fillRect(0, 0, child.w, child.h);
        }
        else if (child.texture) {
          var img = child.texture.img;
          if (child instanceof TileSprite) {
            ctx.drawImage(
              img,
              child.frame.x * child.tileW,
              child.frame.y * child.tileH,
              child.tileW, child.tileH,
              -pivotX, -pivotY,
              child.tileW, child.tileH);
          }
          else {
            ctx.drawImage(img, -pivotX, -pivotY);
          }
        }

        ctx.restore();
      });
    }

    ctx.clearRect(0, 0, this.w, this.h);
    render(container);
  }
};
