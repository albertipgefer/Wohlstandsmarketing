document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Preloader-Inhalt via DOM-Methoden aufbauen (kein innerHTML mit dynamischem Inhalt)
  if (!preloader.firstElementChild) {
    const logo = document.createElement('div');
    logo.className = 'preloader-logo';
    const logoWhite = document.createElement('span');
    logoWhite.textContent = 'WOHLSTANDS';
    const logoOrange = document.createElement('span');
    logoOrange.className = 'preloader-logo-orange';
    logoOrange.textContent = 'MARKETING';
    logo.appendChild(logoWhite);
    logo.appendChild(logoOrange);

    const lineWrap = document.createElement('div');
    lineWrap.className = 'preloader-line-wrap';

    const line = document.createElement('div');
    line.className = 'preloader-line';

    lineWrap.appendChild(line);
    preloader.appendChild(logo);
    preloader.appendChild(lineWrap);
  }

  window.addEventListener('load', function() {
    setTimeout(function() {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 2400); // Warten bis Linie fertig animiert
  });
});
