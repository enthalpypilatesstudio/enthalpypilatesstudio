/* ENTHALPY — button motion: magnetic pull, cursor light, press ripple.
   Behaviour only; adds no UI. Off for reduced motion and touch-only devices. */
(function () {
  if (window.__enthalpyMotion) return;
  window.__enthalpyMotion = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var SEL = '.btn';
  var current = null;

  function reset(el) {
    if (!el) return;
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  }

  if (fine && !reduce) {
    document.addEventListener('pointermove', function (e) {
      var el = e.target && e.target.closest ? e.target.closest(SEL) : null;
      if (current && current !== el) { reset(current); current = null; }
      if (!el) return;
      current = el;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;   // 0..1
      var py = (e.clientY - r.top) / r.height;   // 0..1
      el.style.setProperty('--mx', ((px - 0.5) * 10).toFixed(2) + 'px');
      el.style.setProperty('--my', ((py - 0.5) * 8).toFixed(2) + 'px');
      el.style.setProperty('--px', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--py', (py * 100).toFixed(1) + '%');
    }, { passive: true });
    document.addEventListener('pointerleave', function () { reset(current); current = null; });
  }

  document.addEventListener('pointerdown', function (e) {
    var el = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (!el || reduce) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty('--rx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--ry', (e.clientY - r.top) + 'px');
    el.classList.remove('rip');
    void el.offsetWidth;
    el.classList.add('rip');
    setTimeout(function () { el.classList.remove('rip'); }, 700);
  }, { passive: true });
})();
