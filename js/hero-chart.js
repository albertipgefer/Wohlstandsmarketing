document.addEventListener('DOMContentLoaded', function () {
  var card = document.querySelector('.hero-chart-card');
  var lineAfter = document.getElementById('hero-chart-line-after');
  var areaAfter = document.getElementById('hero-chart-area-after');
  var tooltip = document.getElementById('chart-tooltip');
  var svgEl = card ? card.querySelector('.hero-chart-svg') : null;

  if (!card || !lineAfter) return;

  // Stroke-Dasharray über getTotalLength berechnen
  var lineLen = Math.ceil(lineAfter.getTotalLength()) + 10;
  lineAfter.style.strokeDasharray = lineLen;
  lineAfter.style.strokeDashoffset = lineLen;
  lineAfter.style.transition = 'none';

  if (areaAfter) {
    areaAfter.style.opacity = '0';
  }

  function animateIn() {
    lineAfter.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
    lineAfter.style.strokeDashoffset = '0';
    if (areaAfter) {
      areaAfter.style.transition = 'opacity 0.8s ease 1.2s';
      areaAfter.style.opacity = '1';
    }
  }

  function animateOut() {
    lineAfter.style.transition = 'stroke-dashoffset 0.5s ease';
    lineAfter.style.strokeDashoffset = lineLen;
    if (areaAfter) {
      areaAfter.style.transition = 'opacity 0.3s ease';
      areaAfter.style.opacity = '0';
    }
  }

  // Einmal automatisch abspielen wenn sichtbar
  var played = false;
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !played) {
          played = true;
          setTimeout(animateIn, 400);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(card);
  } else {
    // Fallback ohne IntersectionObserver
    setTimeout(animateIn, 600);
    played = true;
  }

  // Bei Hover erneut animieren
  card.addEventListener('mouseenter', function () {
    lineAfter.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    lineAfter.style.strokeDashoffset = '0';
    if (areaAfter) {
      areaAfter.style.transition = 'opacity 0.5s ease 0.7s';
      areaAfter.style.opacity = '1';
    }
  });
  card.addEventListener('mouseleave', animateOut);

  // Tooltips für Datenpunkte
  var points = document.querySelectorAll('.chart-point');

  points.forEach(function (pt) {
    pt.addEventListener('mouseenter', function () {
      if (!tooltip || !svgEl) return;
      var svgRect = svgEl.getBoundingClientRect();
      var cardRect = card.getBoundingClientRect();
      var cx = parseFloat(pt.getAttribute('cx'));
      var cy = parseFloat(pt.getAttribute('cy'));
      var scaleX = svgRect.width / 380;
      var scaleY = svgRect.height / 160;
      var x = cx * scaleX + (svgRect.left - cardRect.left);
      var y = cy * scaleY + (svgRect.top - cardRect.top);
      tooltip.textContent = pt.dataset.label;
      tooltip.style.left = x + 'px';
      tooltip.style.top = (y - 38) + 'px';
      tooltip.style.opacity = '1';
    });
    pt.addEventListener('mouseleave', function () {
      if (tooltip) tooltip.style.opacity = '0';
    });
  });
});
