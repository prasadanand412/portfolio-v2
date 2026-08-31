(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- theme toggle ----
  // The initial value is resolved by the inline script in <head> so there is no
  // flash of the wrong palette; this only handles the toggle and later OS changes.
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var osLight = window.matchMedia('(prefers-color-scheme: light)');

  function savedTheme() {
    try {
      var v = localStorage.getItem('theme');
      return (v === 'light' || v === 'dark') ? v : null;
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (!btn) return;
    var isLight = theme === 'light';
    btn.textContent = isLight ? '— dark' : '— light';
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }

  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) { /* non-fatal */ }
      applyTheme(next);
    });
  }

  // Keep following the OS palette until the visitor makes an explicit choice.
  function followOS(e) {
    if (savedTheme()) return;
    applyTheme(e.matches ? 'light' : 'dark');
  }
  if (osLight.addEventListener) osLight.addEventListener('change', followOS);
  else if (osLight.addListener) osLight.addListener(followOS);
  // ---- last commit stamp (real, from the GitHub API) ----
  // Falls back to the em-dash already in the markup if the request fails or
  // the unauthenticated rate limit (60/hr per IP) is hit.
  var commitEl = document.getElementById('last-commit');
  if (commitEl && window.fetch) {
    fetch('https://api.github.com/repos/prasadanand412/portfolio-v2/commits?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' }
    })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (data) {
        var c = data && data[0] && data[0].commit;
        var iso = c && ((c.committer && c.committer.date) || (c.author && c.author.date));
        if (!iso) return;
        var mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
        var ago;
        if (mins < 60) ago = Math.max(mins, 1) + 'm ago';
        else if (mins < 1440) ago = Math.round(mins / 60) + 'h ago';
        else ago = Math.round(mins / 1440) + 'd ago';
        commitEl.textContent = ago + ' · main';
      })
      .catch(function () { /* leave the placeholder as-is */ });
  }

  // ---- live typing hero cell ----
  var live = document.getElementById('live-cell');
  var prompts = [
    'docusense.extract("rental_agreement.pdf")',
    'ollama run qwen2.5:7b --temp 0.2',
    'bart.classify(doc, candidate_labels=DOC_TYPES)',
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

  // ---- contact form -> mail client ----
  // There is no backend, so the form hands the message to the visitor's mail
  // client. The <form> posts to the same mailto as a no-JS fallback: it must
  // never fall back to a GET, which would put the message in the URL and logs.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.reportValidity && !form.reportValidity()) return;
      var field = function (n) {
        var el = form.elements[n];
        return el ? el.value.trim() : '';
      };
      var href = 'mailto:prasadanand412@gmail.com'
        + '?subject=' + encodeURIComponent('Portfolio enquiry from ' + field('name'))
        + '&body=' + encodeURIComponent(
            'From: ' + field('name') + ' <' + field('email') + '>\n\n' + field('message'));
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        var original = button.innerHTML;
        button.textContent = 'opening mail client…';
        setTimeout(function () { button.innerHTML = original; }, 4000);
      }
      window.location.href = href;
    });
  }
})();
