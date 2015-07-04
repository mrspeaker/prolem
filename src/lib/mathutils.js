(function () {
  function lerp (x, inf, sup) {
    return (x-inf) / (sup-inf);
  }

  function clamp (x, min, max) {
    return Math.max(min, Math.min(x, max));
  }

  function smoothstep (value, inf, sup) {
    var x = clamp(lerp(value, inf, sup), 0, 1);
    return x*x*(3 - 2*x); // smooth formula
  }

  function gauss (x) {
    return Math.exp(- x * x);
  }

  function gaussDistance (x, center, dist) {
    return gauss((x-center)/dist);
  }

  function mix (a, b, p) {
    return a * (1 - p) + b * p;
  }

  window.mathutils = {
    lerp: lerp,
    clamp: clamp,
    smoothstep: smoothstep,
    gauss: gauss,
    gaussDistance: gaussDistance,
    mix: mix
  };

}());
