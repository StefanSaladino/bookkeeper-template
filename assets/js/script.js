(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.mobile-menu');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.querySelectorAll('.faq-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var isOpen = button.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-item').forEach(function (otherItem) {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-button').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (element) { observer.observe(element); });
  } else {
    reveals.forEach(function (element) { element.classList.add('visible'); });
  }

  var form = document.querySelector('#consultation-form');
  var formStatus = document.querySelector('#form-status');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var firstName = form.querySelector('#first-name').value.trim();
      formStatus.textContent = 'Thanks' + (firstName ? ', ' + firstName : '') + '. This demo form is ready to connect to your preferred inbox or CRM.';
      form.reset();
    });
  }

  var year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
