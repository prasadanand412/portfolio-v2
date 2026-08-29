(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- theme toggle ----
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
  function syncBtnLabel() {
    btn.textContent = root.dataset.theme === 'light' ? '— dark' : '— light';
  }
  if (btn) {
    syncBtnLabel();
    btn.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', root.dataset.theme);
      syncBtnLabel();
    });
  }

  // ---- last commit fake stamp (relative) ----
  var commitEl = document.getElementById('last-commit');
  if (commitEl) {
    var hrs = Math.floor(Math.random() * 18) + 2;
    commitEl.textContent = hrs + 'h ago · main';
  }

  // ---- live typing hero cell ----
  var live = document.getElementById('live-cell');
  var prompts = [
    'docusense.extract("rental_agreement.pdf")',
    'ollama run qwen2.5:7b --temp 0.2',
    'gemini.generate_content(doc, schema=Clauses)',
    'oiltrace.backtrace(spill_mask, wind, current)',
    'ats_score = docusense.rank("resume.pdf")',
    'grep -R "loss.backward()" ./experiments/',
    'git commit -m "feat(nlp): clause classifier v3"'
  ];

  if (live) {
    if (prefersReducedMotion) {
      // Show a single static command instead of animating.
      live.textContent = prompts[0];
    } else {
      var pIdx = 0, cIdx = 0, deleting = false;
      (function tick() {
        var cur = prompts[pIdx];
        if (!deleting) {
          cIdx++;
          live.textContent = cur.slice(0, cIdx);
          if (cIdx === cur.length) {
            deleting = true;
            setTimeout(tick, 1600);
            return;
          }
        } else {
          cIdx--;
          live.textContent = cur.slice(0, cIdx);
          if (cIdx === 0) {
            deleting = false;
            pIdx = (pIdx + 1) % prompts.length;
          }
        }
        var caret = document.createElement('span');
        caret.className = 'caret';
        live.appendChild(caret);
        setTimeout(tick, deleting ? 40 : 70);
      })();
    }
  }

  // ---- project filter ----
  var filters = document.querySelectorAll('.filter-btn');
  var projs = document.querySelectorAll('.proj');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('on'); });
      f.classList.add('on');
      var t = f.dataset.filter;
      projs.forEach(function (p) {
        var tags = (p.dataset.tags || '').split(' ');
        p.style.display = (t === 'all' || tags.indexOf(t) !== -1) ? '' : 'none';
      });
    });
  });

  // ---- nav active state on scroll ----
  var navLinks = document.querySelectorAll('.nav a');
  var sectionIds = ['work', 'about', 'skills', 'experience', 'projects', 'contact'];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  window.addEventListener('scroll', function () {
    var y = window.scrollY + 120;
    var active = sections[0] && sections[0].id;
    sections.forEach(function (s) { if (s.offsetTop <= y) active = s.id; });
    navLinks.forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('href') === '#' + active);
    });
  }, { passive: true });

  // ---- contact form (client-side stub) ----
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (button) button.textContent = 'queued ✓';
    });
  }
})();
