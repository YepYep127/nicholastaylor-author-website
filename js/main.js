// Theme: apply saved preference before paint
(function () {
  var t = localStorage.getItem('nt-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

function toggleTheme() {
  var html = document.documentElement;
  var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('nt-theme', next);
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {
  // Scroll fade
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.fade').forEach(function (el) { el.classList.add('visible'); });
  }
});
