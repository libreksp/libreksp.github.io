/* Split-flap countdown clocks.
 *
 * Markup is just the target; the cards are generated here:
 *
 *   <div class="flipclock" data-end="2038-01-19T03:14:07Z" data-days="4"></div>
 *
 * data-days sets how many day digits to show, so a clock running to 2038 and
 * one running to 2999 can share the same code without either being padded to
 * absurdity or overflowing. Everything degrades to nothing without JS, so any
 * page using a clock should also state the target date in text.
 */
(function () {
  'use strict';

  var CARD = '<i class="fc-up"><b>0</b></i><i class="fc-dn"><b>0</b></i>' +
             '<i class="fc-up fc-fold fc-fup"><b>0</b></i>' +
             '<i class="fc-dn fc-fold fc-fdn"><b>0</b></i>';

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function buildUnit(label, count) {
    var unit = document.createElement('div');
    unit.className = 'fc-unit';

    var row = document.createElement('div');
    row.className = 'fc-digits';
    for (var i = 0; i < count; i++) {
      var c = document.createElement('span');
      c.className = 'fc-digit';
      c.innerHTML = CARD;
      row.appendChild(c);
    }

    var cap = document.createElement('div');
    cap.className = 'fc-cap';
    cap.appendChild(document.createTextNode(label));

    unit.appendChild(row);
    unit.appendChild(cap);
    return unit;
  }

  function setDigit(card, ch, first) {
    if (card.getAttribute('data-v') === ch) { return; }
    var was = card.getAttribute('data-v');
    var b = card.getElementsByTagName('b');   /* up, dn, foldUp, foldDn */
    card.setAttribute('data-v', ch);

    if (first || reduce || was === null) {
      b[0].firstChild.nodeValue = ch;
      b[1].firstChild.nodeValue = ch;
      b[2].firstChild.nodeValue = ch;
      b[3].firstChild.nodeValue = ch;
      return;
    }

    b[0].firstChild.nodeValue = ch;    /* static top    -> incoming value */
    b[1].firstChild.nodeValue = was;   /* static bottom -> outgoing value */
    b[2].firstChild.nodeValue = was;   /* leaf folding down and away */
    b[3].firstChild.nodeValue = ch;    /* leaf folding in from above */

    card.classList.remove('fc-flipping');
    void card.offsetWidth;             /* reflow, so the animation restarts */
    card.classList.add('fc-flipping');

    window.setTimeout(function () {
      /* Both leaves snap back to their resting transforms when the class comes
         off, so they have to be carrying the current value first or the top
         leaf flashes the digit we just flipped away from. */
      var now = card.getAttribute('data-v');
      b[1].firstChild.nodeValue = now;
      b[2].firstChild.nodeValue = now;
      b[3].firstChild.nodeValue = now;
      card.classList.remove('fc-flipping');
    }, 460);
  }

  function pad(n, width) {
    var s = String(n);
    while (s.length < width) { s = '0' + s; }
    return s;
  }

  function makeClock(el) {
    var end = Date.parse(el.getAttribute('data-end'));
    if (isNaN(end)) { return null; }

    var dw = parseInt(el.getAttribute('data-days'), 10) || 4;

    el.appendChild(buildUnit('Days', dw));
    el.appendChild(buildUnit('Hours', 2));
    el.appendChild(buildUnit('Minutes', 2));
    el.appendChild(buildUnit('Seconds', 2));

    var cards = el.getElementsByClassName('fc-digit');
    var first = true;

    return function tick() {
      var left = end - Date.now();
      if (left < 0) { left = 0; }
      var t = Math.floor(left / 1000);
      var days = Math.floor(t / 86400);
      /* a clock whose day count outgrew its digits pins rather than wraps */
      var cap = Math.pow(10, dw) - 1;
      if (days > cap) { days = cap; }

      var str = pad(days, dw) +
                pad(Math.floor(t % 86400 / 3600), 2) +
                pad(Math.floor(t % 3600 / 60), 2) +
                pad(t % 60, 2);

      var n = Math.min(cards.length, str.length);
      for (var i = 0; i < n; i++) { setDigit(cards[i], str.charAt(i), first); }
      first = false;
    };
  }

  var ticks = [];
  var nodes = document.getElementsByClassName('flipclock');
  for (var i = 0; i < nodes.length; i++) {
    var t = makeClock(nodes[i]);
    if (t) { ticks.push(t); }
  }
  if (!ticks.length) { return; }

  function tickAll() {
    for (var j = 0; j < ticks.length; j++) { ticks[j](); }
  }
  tickAll();
  window.setInterval(tickAll, 250);
}());
