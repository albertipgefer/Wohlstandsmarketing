// Wohlstandsmarketing — animations.js

document.addEventListener('DOMContentLoaded', function() {

  // === SCROLL ANIMATIONS (IntersectionObserver) ===
  const animateElements = document.querySelectorAll('.animate-in');

  const animateObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateObserver.unobserve(entry.target); // Einmal triggern
      }
    });
  }, { threshold: 0.15 });

  animateElements.forEach(function(el) {
    animateObserver.observe(el);
  });

  // === WSM-METHODE STEPS ===
  const wsmSteps = document.querySelectorAll('.wsm-step');

  const wsmObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const step = entry.target;
        const delay = (parseInt(step.dataset.step) - 1) * 200; // Staffelung
        setTimeout(function() {
          step.classList.add('active');
        }, delay);
        wsmObserver.unobserve(step);
      }
    });
  }, { threshold: 0.3 });

  wsmSteps.forEach(function(step) {
    wsmObserver.observe(step);
  });

  // === COUNTER ANIMATIONEN ===
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const divide = el.dataset.divide ? parseFloat(el.dataset.divide) : 1;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.round(target * eased);
          const value = divide > 1 ? (current / divide).toFixed(2) : current.toLocaleString('de-DE');
          el.textContent = prefix + value + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function(el) {
    counterObserver.observe(el);
  });

  // === ERGEBNIS-BARS ===
  const ergebnisBars = document.querySelectorAll('.ergebnis-bar[data-bar]');

  if (ergebnisBars.length > 0) {
    const barObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.getAttribute('data-bar');
          setTimeout(function() {
            bar.style.width = target + '%';
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });

    ergebnisBars.forEach(function(bar) {
      barObserver.observe(bar);
    });
  }

  // === KONTAKTFORMULAR ===
  const form = document.getElementById('kontakt-form');
  const formSuccess = document.getElementById('form-success');

  if (form && formSuccess) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.textContent = 'Wird gesendet...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.style.display = 'none';
          formSuccess.style.display = 'block';
        } else {
          submitBtn.textContent = 'Fehler — bitte erneut versuchen';
          submitBtn.disabled = false;
        }
      } catch (err) {
        submitBtn.textContent = 'Fehler — bitte erneut versuchen';
        submitBtn.disabled = false;
      }
    });
  }

});
