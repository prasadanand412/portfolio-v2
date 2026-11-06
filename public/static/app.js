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
  // ---- last commit stamp (live, from the GitHub API) ----
  // Reads the account's public commit history so a commit to *any* public
  // repository refreshes the stamp on the next page load, on tab focus, and
  // every few minutes while the page stays open - no manual edits or rebuilds.
  // Commit search gives the exact commit timestamp; the events feed and this
  // site's own history are fallbacks, and the em-dash stays if GitHub is
  // unreachable (or the unauthenticated rate limit is hit).
  var commitEl = document.getElementById('last-commit');
  var GITHUB_USER = 'prasadanand412';
  var SITE_REPO = 'prasadanand412/portfolio-v2';
  var COMMIT_POLL_MS = 5 * 60 * 1000;
  var commitFetchedAt = 0;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function githubJSON(path) {
    return fetch('https://api.github.com' + path, {
      headers: { 'Accept': 'application/vnd.github+json' },
      cache: 'no-store'
    }).then(function (r) {
      if (!r.ok) throw new Error('github ' + r.status);
      return r.json();
    });
  }

  function timeAgo(iso) {
    var mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    if (mins < 1440) return Math.round(mins / 60) + 'h ago';
    if (mins < 43200) return Math.round(mins / 1440) + 'd ago';
    return Math.round(mins / 43200) + 'mo ago';
  }

  function renderCommit(iso, label) {
    if (!commitEl || !iso) return;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return;
    var exact = d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear()
      + ', ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    commitEl.textContent = timeAgo(iso) + ' · ' + label;
    commitEl.title = 'Last commit: ' + exact + ' (' + label + ')';
  }

  function loadFromEvents() {
    return githubJSON('/users/' + GITHUB_USER + '/events/public?per_page=100&_=' + Date.now())
      .then(function (events) {
        var push = null;
        for (var i = 0; i < events.length; i++) {
          if (events[i].type === 'PushEvent' && events[i].created_at) {
            push = events[i];
            break;
          }
        }
        if (!push) throw new Error('no public push events');
        var repo = push.repo && push.repo.name ? push.repo.name.split('/').pop() : 'main';
        renderCommit(push.created_at, repo);
      });
  }

  function loadFromRepo() {
    return githubJSON('/repos/' + SITE_REPO + '/commits?per_page=1&_=' + Date.now())
      .then(function (data) {
        var c = data && data[0] && data[0].commit;
        var iso = c && ((c.committer && c.committer.date) || (c.author && c.author.date));
        renderCommit(iso, 'main');
      });
  }

  function loadCommit() {
    if (!commitEl || !window.fetch) return;
    commitFetchedAt = Date.now();
    githubJSON('/search/commits?q=author:' + GITHUB_USER
      + '&sort=committer-date&order=desc&per_page=1&_=' + Date.now())
      .then(function (data) {
        var item = data && data.items && data.items[0];
        var c = item && item.commit;
        var iso = c && ((c.committer && c.committer.date) || (c.author && c.author.date));
        if (!iso) throw new Error('no public commits');
        var repo = item.repository && item.repository.full_name
          ? item.repository.full_name.split('/').pop() : 'main';
        renderCommit(iso, repo);
      })
      .catch(loadFromEvents)
      .catch(loadFromRepo)
      .catch(function () { /* leave the placeholder as-is */ });
  }

  if (commitEl && window.fetch) {
    loadCommit();
    // Keep the stamp live while the tab is open, and refresh on return.
    setInterval(function () {
      if (!document.hidden) loadCommit();
    }, COMMIT_POLL_MS);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && Date.now() - commitFetchedAt > 60000) loadCommit();
    });
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

})();
