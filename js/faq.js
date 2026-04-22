// Wohlstandsmarketing — faq.js

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', function() {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Alle anderen schließen
      faqItems.forEach(function(otherItem) {
        const otherQ = otherItem.querySelector('.faq-question');
        const otherA = otherItem.querySelector('.faq-answer');
        if (otherQ && otherA && otherItem !== item) {
          otherQ.setAttribute('aria-expanded', 'false');
          otherA.classList.remove('open');
        }
      });

      // Dieses Toggle
      question.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      answer.classList.toggle('open', !isOpen);
    });
  });
});
