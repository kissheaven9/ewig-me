/* ==========================================================================
   ewig.me — app.js. Рендер лендинга ТОЧНО по Figma, i18n DE/RU, refresh-кнопки.
   ========================================================================== */
(function () {
  "use strict";
  var LANG_KEY = "ewig_lang";
  var urlLang = (new URLSearchParams(location.search)).get("lang");
  var state = { lang: (urlLang === "de" || urlLang === "ru") ? urlLang : (localStorage.getItem(LANG_KEY) || "de"), teaserIdx: 0 };
  var D = window.DATA, I = window.I18N;
  var P = window.PEOPLE || [], G = window.GALLERIES || {};
  function personById(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }
  function personGallery(id) { return (G[id] || []).map(function (x) { return x.src; }); }
  function personPhoto(id) { var g = G[id]; return (g && g[0] && g[0].src) || null; }
  function infoVal(person, keyDe) { var f = (person.info || []).filter(function (x) { return x.k.de === keyDe; })[0]; return f ? f.v : null; }

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function el(t, cls, html) { var e = document.createElement(t); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function t(k) { var d = I[state.lang]; return (d && d[k] != null) ? d[k] : (I.de[k] || k); }
  function L(o) { if (!o) return ""; return o[state.lang] != null ? o[state.lang] : (o.de || ""); }

  var ICON = {
    chevron: '<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="18" height="13" rx="2.5"/><circle cx="8.5" cy="11" r="1.8"/><path d="M4 18l5-4 3.5 2.5L16 13l4 4" stroke-linejoin="round"/><path d="M9 6l1.5-2h3L15 6" stroke-linejoin="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    bubble: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v11H8l-4 3z" stroke-linejoin="round"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-7v-3" stroke-linecap="round"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>'
  };

  function portrait(name) {
    var ini = (name || "").trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe6dc"/><stop offset="1" stop-color="#ddccbc"/></linearGradient></defs>' +
      '<rect width="200" height="200" fill="url(#pg)"/><circle cx="100" cy="82" r="34" fill="#fff" opacity=".55"/>' +
      '<path d="M46 168c0-30 24-46 54-46s54 16 54 46z" fill="#fff" opacity=".55"/>' +
      '<text x="100" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="30" font-weight="600" fill="#bb9174" opacity=".9">' + ini + '</text></svg>';
  }

  /* ---------- render ---------- */
  function renderAvatars() {
    var w = $("#heroAvatars"); if (!w) return; w.innerHTML = "";
    var order = [0, 1, 2, 3, 4];
    for (var i = 0; i < 5; i++) {
      var pid = (P[order[i]] || P[i % P.length] || {}).id;
      var ph = personPhoto(pid);
      var s = el("span");
      if (ph) { s.style.backgroundImage = "url(" + ph + ")"; s.style.backgroundSize = "cover"; s.style.backgroundPosition = "50% 12%"; }
      w.appendChild(s);
    }
  }

  function blurb(p) {
    var beruf = infoVal(p, "Beruf"); var ort = infoVal(p, "Geburtsort");
    var parts = [];
    if (beruf) parts.push(L(beruf));
    if (ort) parts.push(L(ort));
    return parts.join(" · ");
  }
  function exOrder() {
    if (!state.exOrder || state.exOrder.length !== P.length) state.exOrder = P.map(function (_, i) { return i; });
    return state.exOrder;
  }
  function renderExamples() {
    var g = $("#examplesGrid"); if (!g) return; g.innerHTML = "";
    var order = exOrder();
    var shown = state.exExpanded ? order : order.slice(0, 3);
    shown.forEach(function (idx) {
      var ex = P[idx]; if (!ex) return;
      var ph = personPhoto(ex.id);
      var c = el("article", "ecard");
      c.innerHTML =
        '<span class="ecard__tag">' + L(ex.cat) + '</span>' +
        '<div class="ecard__photo">' + (ph ? '<img src="' + ph + '" alt="' + L(ex.name) + '">' : portrait(L(ex.name))) + '</div>' +
        '<div class="ecard__name">' + L(ex.name) + '</div>' +
        '<div class="ecard__dates">' + ex.dates + '</div>' +
        '<p class="ecard__text">' + blurb(ex) + '</p>' +
        '<div class="ecard__foot"><a class="link-arrow" href="#/page/' + ex.id + '" data-route="/page/' + ex.id + '">' + t("examples.view") + ICON.chevron + '</a></div>';
      g.appendChild(c);
    });
    var mb = $("#examplesMore");
    if (mb) {
      if (order.length <= 3) mb.style.display = "none";
      else { mb.style.display = ""; mb.textContent = state.exExpanded ? t("examples.less") : t("examples.more").split("%n").join(order.length); }
    }
  }

  function renderFeatures() {
    var g = $("#featuresGrid"); if (!g) return; g.innerHTML = "";
    D.features.forEach(function (f) {
      var ic = f.icon === "t" ? '<div class="feat__ic is-t">T</div>' : '<div class="feat__ic">' + (ICON[f.icon] || "") + '</div>';
      var c = el("div", "feat", ic + '<div class="feat__title">' + L(f.title) + '</div><p>' + L(f.text) + '</p>');
      g.appendChild(c);
    });
  }

  function renderTeaser() {
    var wrap = $("#teaserCard"); if (!wrap) return;
    var p = P[state.teaserIdx % P.length]; if (!p) return;
    var ph = personPhoto(p.id);
    wrap.innerHTML =
      '<div class="teaser__top">' +
        '<div><button class="btn-refresh btn-refresh--muted" id="teaserAnother">' +
          '<span class="btn-refresh__ic">' + ICON.refresh + '</span>' +
          '<span class="btn-refresh__txt">' + t("teaser.another").split("%n").join(pageCount()) + '</span></button></div>' +
        '<div class="teaser__photo">' + (ph ? '<img src="' + ph + '" alt="' + L(p.name) + '">' : portrait(L(p.name))) + '</div>' +
        '<div class="teaser__quote">' + (L(p.quote) || blurb(p)) + '</div>' +
      '</div>' +
      '<div class="teaser__name">' + L(p.name) + '</div>' +
      '<div class="teaser__dates">' + p.dates + '</div>' +
      '<div class="teaser__life"><span>' + L(p.born) + '</span><span class="line"></span>' +
        '<span>(' + p.years + ' ' + t("teaser.years") + ')</span><span class="line"></span><span>' + L(p.died) + '</span></div>' +
      '<div class="teaser__actions"><a class="btn btn--primary" href="#/page/' + p.id + '" data-route="/page/' + p.id + '"><span>' + t("teaser.viewPage") + '</span>' + ICON.chevron + '</a></div>';
    var b = $("#teaserAnother");
    if (b) b.addEventListener("click", function () { state.teaserIdx++; renderTeaser(); });
  }

  function renderSteps() {
    var g = $("#stepsGrid"); if (!g) return; g.innerHTML = "";
    D.steps.forEach(function (s, i) {
      g.appendChild(el("div", "step",
        '<div class="step__img"><span class="step__n">' + (i + 1) + '</span><img src="' + s.img + '" alt=""></div>' +
        '<p>' + L(s.text) + '</p>'));
    });
  }

  function renderShare() {
    var g = $("#shareGrid"); if (!g) return; g.innerHTML = "";
    D.share.forEach(function (s) {
      var photo = s.img ? '<div class="share-item__photo"><img src="' + s.img + '" alt=""></div>' : '';
      g.appendChild(el("div", "share-item", photo + '<p>' + L(s.text) + '</p>'));
    });
  }

  function renderPlans() {
    var g = $("#plansGrid"); if (!g) return;
    function opts(list) { return list.map(function (o) { return '<li><span class="oic">' + (ICON[o.icon] || "") + '</span><span>' + L(o.t) + '</span></li>'; }).join(""); }
    function card(kind, data, best) {
      return '<div class="plan">' +
        (best ? '<div class="plan__badge">' + t("plans.best") + '</div>' : '') +
        '<div class="plan__inner">' +
          '<div>' +
            '<div class="plan__name">' + t(kind === "short" ? "plans.short" : "plans.extended") + '</div>' +
            '<a class="link-arrow plan__example" href="#/page/beethoven" data-route="/page/beethoven">' + t("plans.example") + ICON.chevron + '</a>' +
            '<div class="plan__price">' + L(data.price) + '</div>' +
            '<button class="btn btn--primary" data-route="/create">' + ICON.plus + '<span>' + t("plans.create") + '</span></button>' +
          '</div>' +
          '<div>' +
            '<div class="plan__opts-title">' + t(best ? "plans.plusIntro" : "plans.optsTitle") + '</div>' +
            '<ul class="plan__opts">' + opts(data.opts) + '</ul>' +
          '</div>' +
        '</div></div>';
    }
    g.innerHTML = card("short", D.plans.short, false) + card("extended", D.plans.extended, true);
  }

  function renderArticles() {
    var g = $("#articlesGrid"); if (!g) return; g.innerHTML = "";
    D.articles.forEach(function (a) {
      var c = el("a", "acard"); c.href = "#";
      c.innerHTML = '<img src="assets/img/article-photo.png" alt="">' +
        '<div class="acard__body"><div class="acard__label">' + t("articles.label") + '</div><div class="acard__title">' + L(a.title) + '</div></div>';
      g.appendChild(c);
    });
  }

  function renderFaq() {
    var g = $("#faqList"); if (!g) return; g.innerHTML = "";
    D.faq.forEach(function (f, i) {
      var item = el("div", "faq__item" + (i === 0 ? " is-open" : ""));
      item.innerHTML = '<button class="faq__q">' + L(f.q) + '<span class="pm"></span></button><div class="faq__a"><p>' + L(f.a) + '</p></div>';
      var q = $(".faq__q", item), a = $(".faq__a", item);
      if (i === 0) a.style.maxHeight = a.scrollHeight + "px";
      q.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
      });
      g.appendChild(item);
    });
  }

  function renderPress() {
    var g = $("#pressGrid"); if (!g) return; g.innerHTML = "";
    D.press.forEach(function (p) {
      g.appendChild(el("article", "pcard",
        '<div class="pcard__media"><img src="assets/img/article-photo.png" alt=""><div class="pcard__play">' + ICON.play + '</div></div>' +
        '<div class="pcard__label">' + L(p.label) + '</div>' +
        '<div class="pcard__title">' + L(p.title) + '</div>'));
    });
  }

  function renderStories() {
    var g = $("#storiesGrid"); if (!g) return; g.innerHTML = "";
    D.testimonials.forEach(function (s) {
      g.appendChild(el("article", "scard",
        '<div class="scard__name">' + L(s.name) + '</div>' +
        '<p class="scard__quote">' + L(s.quote) + '“</p>'));
    });
  }

  function renderAll() {
    renderAvatars(); renderExamples(); renderFeatures(); renderTeaser(); renderSteps();
    renderShare(); renderPlans(); renderArticles(); renderFaq(); renderPress(); renderStories();
    applyI18n(); observeReveal();
  }

  /* ---------- i18n static ---------- */
  function pageCount() { return P.length + getPages().length; }
  function applyI18n() {
    var cnt = pageCount();
    $all("[data-i18n]").forEach(function (n) { var v = t(n.getAttribute("data-i18n")); if (v) n.textContent = v.split("%n").join(cnt); });
    var c = $(".counter__num"); if (c) c.textContent = cnt;
    $all("[data-i18n-ph]").forEach(function (n) { var v = t(n.getAttribute("data-i18n-ph")); if (v) n.setAttribute("placeholder", v); });
    document.documentElement.lang = state.lang;
  }
  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang; localStorage.setItem(LANG_KEY, lang);
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === lang); });
    renderAll();
    if (state.route && state.route !== "/") routeTo(state.route); // перерисовать активный подэкран
  }

  /* ---------- reveal ---------- */
  var io;
  function observeReveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    $all(".reveal").forEach(function (n) { io.observe(n); });
    requestAnimationFrame(function () {
      $all(".reveal").forEach(function (n) { if (n.getBoundingClientRect().top < window.innerHeight) n.classList.add("is-in"); });
    });
  }

  /* ---------- modal / toast / router ---------- */
  function toast(msg) {
    var w = $("#toastWrap"); var e = el("div", "toast", msg); w.appendChild(e);
    setTimeout(function () { e.style.opacity = "0"; }, 2600);
    setTimeout(function () { e.remove(); }, 3000);
  }
  /* ---------- screens / router ---------- */
  function showScreen(name) {
    $all(".screen").forEach(function (s) { s.classList.toggle("is-active", s.id === "screen-" + name); });
    var f = $(".footer"); if (f) f.style.display = "";
    window.scrollTo(0, 0);
  }
  function go(path) {
    if (!path) return;
    if (location.hash !== "#" + path) { location.hash = "#" + path; }
    else routeTo(path);
  }
  function routeTo(path) {
    state.route = path;
    if (path && path.indexOf("/page/") !== 0) resetSEO();
    if (!path || path === "/" || path === "") { showScreen("home"); return; }
    var p = path.replace(/^\//, "").split("/"), seg = p[0], id = p[1];
    if (seg === "page") { renderPublic(id); showScreen("page"); }
    else if (seg === "create") { renderCreate(); showScreen("create"); }
    else if (seg === "editor") { renderEditor(id); showScreen("editor"); }
    else if (seg === "ai") { renderAI(id); showScreen("ai"); }
    else if (seg === "cabinet") { renderCabinet(); showScreen("cabinet"); }
    else if (seg === "plaque") { renderPlaque(id); showScreen("plaque"); }
    else if (seg === "checkout") { renderCheckout(id); showScreen("checkout"); }
    else { showScreen("home"); toast(t("common.soon")); }
  }

  /* ---------- localStorage pages ---------- */
  var memPages = null; // фолбэк, если localStorage недоступен (приватный режим/блокировка)
  function getPages() {
    if (memPages) return memPages.slice();
    try { return JSON.parse(localStorage.getItem("ewig_pages") || "[]"); } catch (e) { return memPages || []; }
  }
  function setPages(a) {
    memPages = a.slice();
    try { localStorage.setItem("ewig_pages", JSON.stringify(a)); } catch (e) { /* приватный режим — держим в памяти */ }
  }
  function savePage(p) { var a = getPages(); a.push(p); setPages(a); }
  function updatePage(id, patch) { var a = getPages().map(function (x) { return x.id === id ? Object.assign(x, patch) : x; }); setPages(a); }
  function findPage(id) { var u = getPages().filter(function (x) { return x.id === id; })[0]; return u || null; }

  function makeQR(text) {
    try { var q = qrcode(0, "M"); q.addData(text); q.make(); return q.createDataURL(6, 4); }
    catch (e) { return ""; }
  }
  function backLink() { return '<a class="back-link" href="#/" data-route="/">' + ICON.chevron + '<span>' + t("pub.back") + '</span></a>'; }

  /* ---------- SEO helpers ---------- */
  function setMeta(name, content) {
    var m = document.head.querySelector('meta[name="' + name + '"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", name); document.head.appendChild(m); }
    m.setAttribute("content", content);
  }
  function setJSONLD(obj) {
    var s = document.getElementById("ld-person");
    if (obj === null) { if (s) s.remove(); return; }
    if (!s) { s = document.createElement("script"); s.id = "ld-person"; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.textContent = JSON.stringify(obj);
  }
  function resetSEO() {
    document.title = "ewig.me — Digitale Gedenkseite erstellen";
    setMeta("description", "ewig.me — erstelle eine würdige digitale Gedenkseite mit Fotos, Biografie, Karte und QR-Code.");
    setJSONLD(null);
  }

  /* ---------- PUBLIC memorial page ---------- */
  function renderPublic(id) {
    var wrap = $("#screen-page");
    var person = personById(id);
    var up = person ? null : findPage(id);
    var name, dates, born, died, years, quote, photo, infoArr = [], bioArr = [], grave = "", coords = "", mapQuery = "", video = "", gallery = [], plan = "extended", isUser = false, wikiName = "";

    if (person) {
      name = L(person.name); dates = person.dates; born = L(person.born); died = L(person.died); years = person.years;
      quote = L(person.quote); infoArr = person.info || []; bioArr = (person.bio && person.bio[state.lang]) || [];
      grave = L(person.grave); coords = person.coords || ""; mapQuery = person.coords || ""; video = person.video || "";
      gallery = (G[id] || []); photo = personPhoto(id); wikiName = person.name.de;
    } else if (up) {
      isUser = true; name = up.name; born = up.born; died = up.died; dates = (up.born || "") + "–" + (up.died || "");
      quote = up.epitaph || ""; photo = (up.photos && up.photos[0]) || up.photo || null; plan = up.plan || "short";
      grave = up.cemetery || ""; coords = up.coords || ""; mapQuery = up.mapQuery || up.coords || ""; bioArr = up.bio ? [up.bio] : [];
      gallery = (up.photos || []).map(function (s) { return { src: s, caption: "" }; });
      if (up.birthplace || up.job) infoArr = [
        up.birthplace ? { k: { de: "Geburtsort", ru: "Место рождения" }, v: { de: up.birthplace, ru: up.birthplace } } : null,
        up.job ? { k: { de: "Beruf", ru: "Род деятельности" }, v: { de: up.job, ru: up.job } } : null
      ].filter(Boolean);
      video = (up.videos && up.videos[0]) ? ytId(up.videos[0]) : "";
    } else { wrap.innerHTML = '<div class="container subpage">' + backLink() + '<p>' + t("common.soon") + '</p></div>'; return; }

    var url = location.origin + location.pathname + "#/page/" + id;
    var photoHtml = photo ? '<img src="' + photo + '" alt="' + esc(name) + '">' : portrait(name);
    var html = '<div class="container subpage">' + backLink() +
      '<article class="pub"><div class="pub-hero">' +
        '<div class="pub-hero__photo">' + photoHtml + '</div>' +
        '<div><h1 class="pub-hero__name">' + esc(name) + '</h1>' +
        '<div class="pub-hero__dates">' + dates + (years ? ' <span>(' + years + ' ' + t("pub.years") + ')</span>' : '') + '</div>' +
        (quote ? '<p class="pub-hero__epitaph">«' + esc(quote) + '»</p>' : '') + '</div>' +
      '</div>';

    if (infoArr.length) {
      var infoHtml = infoArr.map(function (i) { return '<div class="info-cell"><dt>' + L(i.k) + '</dt><dd>' + esc(L(i.v)) + '</dd></div>'; }).join("");
      html += '<section class="block"><h2 class="block__title">' + t("pub.info") + '</h2><div class="info-grid">' + infoHtml + '</div></section>';
    }
    if (bioArr.length) {
      var bioHtml = bioArr.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("");
      html += '<section class="block"><h2 class="block__title">' + t("pub.bio") + '</h2><div class="bio-text">' + bioHtml + '</div></section>';
    }
    if (plan === "extended") {
      if (video) html += '<section class="block"><h2 class="block__title">' + t("pub.media") + '</h2>' +
        '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/' + video + '" title="Video: ' + esc(name) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></section>';
      if (gallery.length) {
        var tiles = gallery.map(function (g) {
          var cap = g.caption ? '<figcaption>' + esc(g.caption) + (g.commons ? ' · <a href="' + g.commons + '" target="_blank" rel="noopener">Quelle</a>' : '') + '</figcaption>' : '';
          return '<figure class="ph-fig"><div class="ph-img" style="background-image:url(' + g.src + ')"></div>' + cap + '</figure>';
        }).join("");
        html += '<section class="block"><h2 class="block__title">' + t("pub.photos") + '</h2><div class="photos-grid photos-grid--cap">' + tiles + '</div></section>';
      }
    }
    if (grave || mapQuery) {
      var mSrc = mapEmbedSrc(mapQuery);
      var label = esc(grave || "") + (coords && /^\s*-?\d/.test(coords) ? ' · ' + coords : "");
      var mapInner = mSrc
        ? '<div class="map-embed"><iframe src="' + mSrc + '" loading="lazy" title="Karte"></iframe>' + (label ? '<div class="map-coords">' + label + '</div>' : "") + '</div>'
        : '<a class="map-box" href="' + mapLink(mapQuery) + '" target="_blank" rel="noopener">' + ICON.pin + '<div class="map-coords">' + (label || esc(mapQuery)) + '</div></a>';
      html += '<section class="block"><h2 class="block__title">' + t("pub.grave") + '</h2>' + mapInner + '</section>';
    }
    if (wikiName) {
      var wikiUrl = "https://de.wikipedia.org/wiki/" + encodeURIComponent(wikiName.replace(/ /g, "_"));
      html += '<section class="block"><h2 class="block__title">' + t("pub.links") + '</h2><div class="ext-links">' +
        '<a href="' + wikiUrl + '" target="_blank" rel="noopener" aria-label="Wikipedia"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h3l3 9 3-9h2l3 9 3-9h2l-4.5 14h-2L15 10l-3.5 9h-2L5 5z"/></svg></a>' +
        '</div></section>';
    }
    html += '<section class="block"><h2 class="block__title">' + t("pub.qr") + '</h2><div class="qr-block">' +
      '<div class="qr-canvas"><img src="' + makeQR(url) + '" alt="QR-Code"></div>' +
      '<div class="qr-info"><p>' + t("pub.qrHint") + '</p><div class="ed-actions">' +
        '<button class="btn btn--primary" id="pubShare"><span>' + t("pub.share") + '</span></button>' +
        (isUser ? '<button class="btn btn--outline" data-route="/editor/' + id + '"><span>' + t("cab.edit") + '</span></button>' +
                  '<a class="link-arrow" href="#/" data-route="/cabinet"><span>' + t("cab.title") + '</span>' + ICON.chevron + '</a>' : '') +
      '</div></div></div></section></article></div>';
    wrap.innerHTML = html;
    var sb = $("#pubShare"); if (sb) sb.addEventListener("click", function () {
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      toast(t("pub.linkCopied"));
    });

    // SEO
    var descText = (bioArr[0] || quote || name).slice(0, 155);
    document.title = name + " – Gedenkseite | ewig.me";
    setMeta("description", descText);
    if (person) {
      var yy = (dates.match(/\d{4}/g) || []);
      setJSONLD({
        "@context": "https://schema.org", "@type": "Person", name: person.name.de,
        birthDate: yy[0] || "", deathDate: yy[1] || "", description: (person.bio.de[0] || "").slice(0, 200),
        image: photo ? (location.origin + location.pathname.replace(/index\.html$/, "") + photo) : "",
        birthPlace: (infoVal(person, "Geburtsort") || {}).de || "", deathPlace: (infoVal(person, "Sterbeort") || {}).de || "",
        jobTitle: (infoVal(person, "Beruf") || {}).de || "",
        sameAs: ["https://de.wikipedia.org/wiki/" + encodeURIComponent(person.name.de.replace(/ /g, "_"))]
      });
    } else setJSONLD(null);
  }

  /* ---------- CREATE wizard ---------- */
  function renderCreate() {
    if (!state.newPage) state.newPage = { step: 1 };
    var s = state.newPage.step || 1;
    var wrap = $("#screen-create");
    if (s === 1) {
      wrap.innerHTML = '<div class="container subpage">' + backLink() +
        '<div class="wizard"><div><div class="form-head"><h1 class="h-section">' + t("cr.title1") + '</h1><div class="step">' + t("cr.step1") + '</div></div>' +
        '<div class="card-box"><div style="display:flex;gap:30px;flex-wrap:wrap;margin-bottom:24px">' +
          '<label class="upload" id="upBox"><input type="file" accept="image/*" id="upFile" hidden><span class="upload__inner"><span class="upload__circle">' + ICON.photo + '</span><span>' + t("cr.photo") + '<br>' + t("cr.add") + '</span></span></label>' +
          '<div style="flex:1;min-width:260px"><div class="field"><label>' + t("cr.name") + '</label><input id="fName" type="text" placeholder="' + t("cr.namePh") + '"><div class="field__err"></div></div></div>' +
        '</div>' +
        '<div class="form-grid">' + dateField("fBirth", t("cr.birth")) + dateField("fDeath", t("cr.death")) + '</div>' +
        '<div class="field" style="margin-top:24px"><label>' + t("cr.epitaph") + '</label><textarea id="fEpitaph" placeholder="' + t("cr.epitaphPh") + '"></textarea></div>' +
        '<div class="field" style="margin-top:20px"><label>' + t("cr.author") + '</label><input id="fAuthor" type="text" placeholder="' + t("cr.authorPh") + '"></div>' +
        '<div class="ed-actions" style="margin-top:28px"><button class="btn btn--primary" id="crNext">' + ICON.plus + '<span>' + t("cr.create") + '</span></button></div>' +
        '</div></div><div class="wizard__bar"><span style="height:20%"></span></div></div></div>';
      var upFile = $("#upFile"), upBox = $("#upBox");
      // label уже открывает диалог по клику — свой click НЕ вешаем (двойной вызов ломал выбор)
      upFile.addEventListener("change", function () {
        var f = upFile.files[0]; if (!f) return; var r = new FileReader();
        r.onload = function () {
          state.newPage.photo = r.result;
          upBox.style.backgroundImage = "url(" + r.result + ")";
          upBox.style.backgroundSize = "cover"; upBox.style.backgroundPosition = "50% 14%";
          upBox.classList.add("has-photo");
        };
        r.readAsDataURL(f);
      });
      $("#crNext").addEventListener("click", function () {
        var nm = $("#fName").value.trim();
        if (!nm) { $("#fName").parentNode.classList.add("is-invalid"); $("#fName").parentNode.querySelector(".field__err").textContent = "!"; return; }
        state.newPage.name = nm;
        state.newPage.born = ($("#fBirth_y") ? $("#fBirth_y").value : "") || "";
        state.newPage.died = ($("#fDeath_y") ? $("#fDeath_y").value : "") || "";
        state.newPage.epitaph = $("#fEpitaph").value.trim();
        state.newPage.author = $("#fAuthor").value.trim();
        state.newPage.step = 2; renderCreate();
      });
    } else if (s === 2) {
      wrap.innerHTML = '<div class="container subpage">' +
        '<div class="card-box auth-card"><h2 class="h-section">' + t("cr.success") + '</h2><p>' + t("cr.loginHint") + '</p>' +
        '<div class="field" style="text-align:left"><label>' + t("cr.email") + '</label><input id="lgEmail" type="text" placeholder="name@mail.com"></div>' +
        '<div class="field" style="text-align:left;margin-top:16px"><label>' + t("cr.password") + '</label><input id="lgPass" type="password" placeholder="••••••"></div>' +
        '<button class="btn btn--primary btn--block" id="crLogin" style="margin-top:24px"><span>' + t("cr.loginBtn") + '</span></button>' +
        '<div class="auth-links"><a href="#" id="crRegister">' + t("cr.register") + '</a><a href="#" id="crForgot">' + t("cr.forgot") + '</a></div>' +
        '</div></div>';
      $("#crLogin").addEventListener("click", completeCreate);
      $("#crRegister").addEventListener("click", function (e) { e.preventDefault(); completeCreate(); });
      var fg = $("#crForgot"); if (fg) fg.addEventListener("click", function (e) { e.preventDefault(); toast(t("common.soon")); });
    }
  }
  function completeCreate() {
    var np = state.newPage || {};
    var base = (np.name || "seite").toLowerCase().replace(/[^a-z0-9]/gi, "").slice(0, 8) || "seite";
    var id = "u" + (getPages().length + 1) + base;
    var page = { id: id, name: np.name || "—", born: np.born || "", died: np.died || "",
      epitaph: np.epitaph || "", author: np.author || "", photo: np.photo || null, plan: "short", pub: true };
    savePage(page); state.newPage = null; state.lastCreated = id;
    toast(t("cr.done"));
    go("/page/" + id); // сразу показываем созданную страницу
  }
  function renderCreateSuccess(id) {
    $("#screen-create").innerHTML = '<div class="container subpage"><div class="card-box auth-card">' +
      '<div class="upload__circle" style="margin:0 auto 18px;width:70px;height:70px">' + ICON.check + '</div>' +
      '<h2 class="h-section">' + t("cr.done") + '</h2>' +
      '<div class="ed-actions" style="justify-content:center;margin-top:24px">' +
      '<button class="btn btn--primary" data-route="/editor/' + id + '"><span>' + t("cr.toEdit") + '</span></button>' +
      '<button class="btn btn--outline" data-route="/page/' + id + '"><span>' + t("cr.ok") + '</span></button></div></div></div>';
  }
  function dateField(idp, label) {
    var days = "", months = "", years = "";
    for (var d = 1; d <= 31; d++) days += '<option>' + d + '</option>';
    for (var m = 1; m <= 12; m++) months += '<option>' + m + '</option>';
    for (var y = 2024; y >= 1900; y--) years += '<option>' + y + '</option>';
    return '<div class="field"><label>' + label + '</label><div class="field-row">' +
      '<select id="' + idp + '_d"><option value="" disabled selected>' + t("cr.day") + '</option>' + days + '</select>' +
      '<select id="' + idp + '_m"><option value="" disabled selected>' + t("cr.month") + '</option>' + months + '</select>' +
      '<select id="' + idp + '_y"><option value="" disabled selected>' + t("cr.year") + '</option>' + years + '</select>' +
      '</div></div>';
  }

  /* ---------- EDITOR ---------- */
  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function ytId(url) { var m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/); return m ? m[1] : ""; }
  // Google-Maps-Link / Adresse / Koordinaten -> Embed-URL
  function mapEmbedSrc(input) {
    var s = String(input || "").trim(); if (!s) return "";
    var m = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || s.match(/[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)/) ||
            s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || s.match(/[?&#]ll=(-?\d+\.\d+),(-?\d+\.\d+)/) ||
            s.match(/^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/);
    if (m) return "https://maps.google.com/maps?q=" + m[1] + "," + m[2] + "&z=14&output=embed";
    var pm = s.match(/\/maps\/place\/([^\/@?]+)/);
    if (pm) return "https://maps.google.com/maps?q=" + encodeURIComponent(decodeURIComponent(pm[1]).replace(/\+/g, " ")) + "&z=14&output=embed";
    if (!/^https?:\/\//i.test(s)) return "https://maps.google.com/maps?q=" + encodeURIComponent(s) + "&z=14&output=embed"; // Adresse/Ort
    return ""; // Kurzlink ohne Koordinaten -> Fallback (Link)
  }
  function mapLink(input) { var s = String(input || "").trim(); return /^https?:\/\//i.test(s) ? s : ("https://maps.google.com/maps?q=" + encodeURIComponent(s)); }
  function esec(title, inner) { return '<div class="ed-section"><div class="ed-section__head"><div class="ed-section__title">' + title + '</div></div>' + inner + '</div>'; }

  function editorPhotos(page) {
    var tiles = (page.photos || []).map(function (p, i) {
      return '<div class="ph-tile" style="background-image:url(' + p + ')"><button class="ph-del" data-delphoto="' + i + '" title="löschen">' + ICON.close + '</button></div>';
    }).join("");
    return '<div class="ph-grid">' + tiles + '<label class="ph-add"><input type="file" accept="image/*" multiple id="edPhotoFile" hidden>' + ICON.plus + '</label></div>';
  }
  function editorVideos(page) {
    var rows = (page.videos || []).map(function (v, i) {
      return '<div class="row-item"><input type="text" data-vid="' + i + '" value="' + esc(v) + '" placeholder="https://youtube.com/watch?v=…"><button class="row-del" data-delvid="' + i + '">' + ICON.close + '</button></div>';
    }).join("");
    return rows + '<button class="btn btn--outline btn--sm" id="edAddVideo" style="margin-top:12px">' + ICON.plus + '<span>' + t("ed.addVideo") + '</span></button>';
  }
  function editorLinks(page) {
    var rows = (page.links || []).map(function (l, i) {
      return '<div class="row-item row-item--2"><input data-lurl="' + i + '" value="' + esc(l.url) + '" placeholder="https://…"><input data-lname="' + i + '" value="' + esc(l.name) + '" placeholder="' + t("ed.linkName") + '"><button class="row-del" data-dellink="' + i + '">' + ICON.close + '</button></div>';
    }).join("");
    return rows + '<button class="btn btn--outline btn--sm" id="edAddLink" style="margin-top:12px">' + ICON.plus + '<span>' + t("ed.addMore") + '</span></button>';
  }

  function editorPreview(page) {
    var photo = (page.photos && page.photos[0]) || page.photo;
    var vid = "", i;
    for (i = 0; i < (page.videos || []).length; i++) { vid = ytId(page.videos[i]); if (vid) break; }
    var info = [page.birthplace, page.job].filter(Boolean).join(" · ");
    var gal = (page.photos || []).slice(0, 6).map(function (p) { return '<div style="background-image:url(' + p + ')"></div>'; }).join("");
    var links = (page.links || []).filter(function (l) { return l.url || l.name; }).map(function (l) { return '<span class="pv-link">' + esc(l.name || l.url) + '</span>'; }).join("");
    var qrUrl = location.origin + location.pathname + "#/page/" + (page.id || "neu");
    var mq = page.mapQuery || page.coords || "";
    var mapSrc = mapEmbedSrc(mq);
    var mapText = page.cemetery || (/^https?:\/\//i.test(mq) ? "" : mq) || (mq ? "Standort" : "");
    return '<div class="pv">' +
      (photo ? '<div class="pv-photo"><img src="' + photo + '"></div>' : '<div class="pv-photo pv-photo--empty">' + portrait(page.name || "") + '</div>') +
      '<div class="pv-name">' + esc(page.name || "—") + '</div>' +
      '<div class="pv-dates">' + esc(page.born || "") + " – " + esc(page.died || "") + '</div>' +
      (page.epitaph ? '<div class="pv-epi">«' + esc(page.epitaph) + '»</div>' : '') +
      (info ? '<div class="pv-sub">' + t("pub.info") + '</div><div class="pv-info">' + esc(info) + '</div>' : '') +
      (page.bio ? '<div class="pv-sub">' + t("pub.bio") + '</div><div class="pv-bio">' + esc(page.bio) + '</div>' : '') +
      (vid ? '<div class="pv-sub">' + t("pub.media") + '</div><div class="pv-video" style="background-image:url(https://img.youtube.com/vi/' + vid + '/hqdefault.jpg)"><span class="pv-play">' + ICON.play + '</span></div>' : '') +
      (gal ? '<div class="pv-sub">' + t("pub.photos") + '</div><div class="pv-gal">' + gal + '</div>' : '') +
      (mapSrc ? '<div class="pv-sub">' + t("pub.grave") + '</div>' + (page.cemetery ? '<div class="pv-mapcap">' + esc(page.cemetery) + '</div>' : '') + '<div id="pvMapSlot" class="pv-mapwrap"></div>'
              : (mapText ? '<div class="pv-sub">' + t("pub.grave") + '</div><div class="pv-map"><span class="pv-map__pin">' + ICON.pin + '</span><span>' + esc(mapText) + '</span></div>' : '')) +
      (links ? '<div class="pv-sub">' + t("pub.links") + '</div><div class="pv-links">' + links + '</div>' : '') +
      '<div class="pv-sub">' + t("pub.qr") + '</div><div class="pv-qr"><img src="' + makeQR(qrUrl) + '" alt="QR"><button type="button" class="pv-sharebtn">' + t("pub.share") + '</button></div>' +
      '</div>';
  }
  function updatePreview() {
    var b = $("#previewBody"); if (!b || !state.editing) return;
    b.innerHTML = editorPreview(state.editing);
    var slot = $("#pvMapSlot", b);
    if (slot) {
      var mq = state.editing.mapQuery || state.editing.coords || "";
      var src = mapEmbedSrc(mq);
      if (src) {
        if (state.pvMapEl && state.pvMapSrc === src) { slot.appendChild(state.pvMapEl); } // без перезагрузки
        else {
          var f = document.createElement("iframe");
          f.src = src; f.loading = "lazy"; f.title = "Karte"; f.setAttribute("frameborder", "0");
          state.pvMapEl = f; state.pvMapSrc = src; slot.appendChild(f);
        }
      }
    }
  }

  function renderEditor(id) {
    var wrap = $("#screen-editor");
    var page = (state.editing && state.editing.id === id) ? state.editing : findPage(id);
    if (!page) { wrap.innerHTML = '<div class="container subpage">' + backLink() + '<p>' + t("common.soon") + '</p></div>'; return; }
    page.photos = page.photos || (page.photo ? [page.photo] : []);
    page.videos = page.videos || [];
    page.links = page.links || [];
    state.editing = page;

    var form = esec(t("ed.info"),
        '<div class="field"><label>' + t("cr.name") + '</label><input id="edName" value="' + esc(page.name) + '"></div>' +
        '<div class="form-grid" style="margin-top:16px"><div class="field"><label>' + t("cr.birth") + '</label><input id="edBorn" value="' + esc(page.born) + '" placeholder="1948"></div>' +
        '<div class="field"><label>' + t("cr.death") + '</label><input id="edDied" value="' + esc(page.died) + '" placeholder="2021"></div></div>' +
        '<div class="form-grid" style="margin-top:16px"><div class="field"><label>' + t("ed.birthplace") + '</label><input id="edBirthplace" value="' + esc(page.birthplace) + '"></div>' +
        '<div class="field"><label>' + t("ed.job") + '</label><input id="edJob" value="' + esc(page.job) + '"></div></div>' +
        '<div class="field" style="margin-top:16px"><label>' + t("cr.epitaph") + '</label><textarea id="edEpitaph">' + esc(page.epitaph) + '</textarea></div>') +
      esec(t("ed.bio"),
        '<div class="bio-choice"><button class="btn btn--outline btn--sm is-on"><span>' + t("ed.bioSelf") + '</span></button>' +
        '<button class="btn btn--primary btn--sm" data-route="/ai/' + id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></svg><span>' + t("ed.bioAI") + '</span></button></div>' +
        '<div class="field" style="margin-top:16px"><textarea id="edBio" style="min-height:150px" placeholder="' + t("ed.bioPh") + '">' + esc(page.bio) + '</textarea></div>') +
      esec(t("ed.photos"), '<p class="ed-hint">' + t("ed.photosHint") + '</p>' + editorPhotos(page)) +
      esec(t("ed.media"), '<p class="ed-hint">' + t("ed.videoHint") + '</p><div id="edVideos">' + editorVideos(page) + '</div>') +
      esec(t("ed.links"), '<div id="edLinks">' + editorLinks(page) + '</div>') +
      esec(t("ed.grave"),
        '<div class="field"><label>' + t("ed.cemetery") + '</label><input id="edCem" value="' + esc(page.cemetery) + '"></div>' +
        '<div class="field" style="margin-top:16px"><label>' + t("ed.mapLink") + '</label><input id="edMapQuery" value="' + esc(page.mapQuery || page.coords || "") + '" placeholder="' + t("ed.mapLinkPh") + '"><div class="field__err"></div></div>' +
        '<p class="ed-hint" style="margin:8px 0 0">' + t("ed.mapHint") + '</p>') +
      esec(t("ed.qr"),
        '<div class="qr-block"><div class="qr-canvas" style="width:120px;height:120px"><img src="' + makeQR(location.origin + location.pathname + "#/page/" + id) + '"></div>' +
        '<div style="flex:1;min-width:200px">' + toggleRow("edPub", t("ed.public"), page.pub !== false) + toggleRow("edIdx", t("ed.index"), true) + toggleRow("edPubl", t("ed.publish"), true) + '</div></div>') +
      '<div class="ed-actions"><button class="btn btn--primary" id="edSave"><span>' + t("ed.save") + '</span></button>' +
      '<a class="link-arrow" href="#/page/' + id + '" data-route="/page/' + id + '"><span>' + t("ed.preview") + '</span>' + ICON.chevron + '</a></div>';

    wrap.innerHTML = '<div class="container subpage">' + backLink() +
      '<h1 class="h-section" style="margin-bottom:6px">' + t("ed.titleExt") + '</h1>' +
      '<p style="color:var(--ink-soft);font-size:14px;margin-bottom:26px">' + t("ed.avgTime") + '</p>' +
      '<div class="editor-split"><div class="editor-form">' + form + '</div>' +
      '<div class="editor-preview"><div class="phone"><div class="phone__scroll"><div id="previewBody"></div></div></div></div></div></div>';
    bindEditor(id);
    updatePreview();
  }

  function bindEditor(id) {
    var p = state.editing;
    function live(sel, key) { var e = $(sel); if (e) e.addEventListener("input", function () { p[key] = e.value; updatePreview(); }); }
    live("#edName", "name"); live("#edBorn", "born"); live("#edDied", "died");
    live("#edBirthplace", "birthplace"); live("#edJob", "job"); live("#edEpitaph", "epitaph"); live("#edBio", "bio");
    live("#edCem", "cemetery"); live("#edMapQuery", "mapQuery");
    // фото: добавить
    var pf = $("#edPhotoFile");
    if (pf) pf.addEventListener("change", function () {
      var files = Array.prototype.slice.call(pf.files), left = files.length;
      files.forEach(function (f) {
        var r = new FileReader();
        r.onload = function () { p.photos.push(r.result); if (--left === 0) { persistEditor(id); renderEditor(id); } };
        r.readAsDataURL(f);
      });
    });
    // фото: удалить
    $all("[data-delphoto]").forEach(function (b) { b.addEventListener("click", function () { p.photos.splice(+b.getAttribute("data-delphoto"), 1); persistEditor(id); renderEditor(id); }); });
    // видео
    var av = $("#edAddVideo"); if (av) av.addEventListener("click", function () { p.videos.push(""); persistEditor(id); renderEditor(id); });
    $all("[data-vid]").forEach(function (i) { i.addEventListener("input", function () { p.videos[+i.getAttribute("data-vid")] = i.value; updatePreview(); }); });
    $all("[data-delvid]").forEach(function (b) { b.addEventListener("click", function () { p.videos.splice(+b.getAttribute("data-delvid"), 1); persistEditor(id); renderEditor(id); }); });
    // ссылки
    var al = $("#edAddLink"); if (al) al.addEventListener("click", function () { p.links.push({ url: "", name: "" }); persistEditor(id); renderEditor(id); });
    $all("[data-lurl]").forEach(function (i) { i.addEventListener("input", function () { p.links[+i.getAttribute("data-lurl")].url = i.value; updatePreview(); }); });
    $all("[data-lname]").forEach(function (i) { i.addEventListener("input", function () { p.links[+i.getAttribute("data-lname")].name = i.value; updatePreview(); }); });
    $all("[data-dellink]").forEach(function (b) { b.addEventListener("click", function () { p.links.splice(+b.getAttribute("data-dellink"), 1); persistEditor(id); renderEditor(id); }); });
    // сохранить
    var sv = $("#edSave"); if (sv) sv.addEventListener("click", function () { p.pub = $("#edPub").checked; persistEditor(id); toast(t("ed.saved")); });
  }
  function persistEditor(id) {
    var p = state.editing; if (!p) return;
    p.photo = (p.photos && p.photos[0]) || p.photo || null; // главное фото = первое
    updatePage(id, p);
  }
  function toggleRow(id, label, on) {
    return '<div class="toggle-row"><span>' + label + '</span><label class="toggle"><input type="checkbox" id="' + id + '"' + (on ? " checked" : "") + '><span class="toggle__track"></span></label></div>';
  }

  /* ---------- AI biographer ---------- */
  var AI_Q = {
    de: ["Wie hieß der Mensch mit vollem Namen und wann wurde er geboren?", "Wo ist er aufgewachsen und was prägte seine Kindheit?", "Welchen Beruf übte er aus und was bedeutete ihm die Arbeit?", "Was waren seine größten Leidenschaften und Hobbys?", "Welche Menschen waren ihm am wichtigsten?", "Welche Werte hat er im Leben vertreten?", "Was war sein größter Erfolg oder stolzester Moment?", "Welche schwierigen Zeiten hat er gemeistert?", "Woran sollen sich die Menschen bei ihm erinnern?", "Gibt es ein Zitat oder einen Satz, der ihn beschreibt?"],
    ru: ["Как звали человека полностью и когда он родился?", "Где он вырос и что определило его детство?", "Кем он работал и что значила для него работа?", "Какие были его главные увлечения?", "Какие люди были для него самыми важными?", "Каких ценностей он придерживался в жизни?", "Что было его самым большим достижением?", "Какие трудные времена он преодолел?", "Каким люди должны его запомнить?", "Есть ли фраза, которая его описывает?"]
  };
  function renderAI(id) {
    if (!state.ai || state.ai.id !== id) state.ai = { id: id, step: 0, answers: [] };
    var wrap = $("#screen-ai"), st = state.ai;
    if (st.step < 10) {
      var qs = AI_Q[state.lang] || AI_Q.de;
      wrap.innerHTML = '<div class="container subpage">' + backLink() +
        '<div class="ai-card card-box"><div class="ai-progress">' + t("ai.question") + ' ' + (st.step + 1) + ' ' + t("ai.of") + ' 10</div>' +
        '<div class="ai-track"><span style="width:' + ((st.step) * 10) + '%"></span></div>' +
        '<div class="ai-q">' + qs[st.step] + '</div>' +
        '<textarea id="aiAns" placeholder="' + t("ai.answerPh") + '"></textarea>' +
        '<div class="ed-actions" style="margin-top:22px"><button class="btn btn--primary" id="aiNext"><span>' + (st.step === 9 ? t("ai.generate") : t("ai.next")) + '</span></button></div></div></div>';
      $("#aiNext").addEventListener("click", function () {
        st.answers[st.step] = $("#aiAns").value; st.step++;
        if (st.step === 10) { renderAIResult(id); } else renderAI(id);
      });
    } else renderAIResult(id);
  }
  function renderAIResult(id) {
    var person = personById(id);
    var b = person ? person.bio[state.lang] : null;
    var formal = b ? b.join(" ") : (state.lang === "de" ? "Ein Leben voller Hingabe und Wärme, das viele Menschen berührt hat …" : "Жизнь, полная тепла и преданности, которая тронула многих …");
    var personal = b ? (b[0] + " " + (state.lang === "de" ? "In Erinnerung an einen Menschen, den wir sehr geliebt haben." : "В память о человеке, которого мы очень любили.")) : formal;
    $("#screen-ai").innerHTML = '<div class="container subpage">' + backLink() +
      '<h1 class="h-section" style="margin-bottom:24px">' + t("ai.title") + '</h1>' +
      '<div class="ai-variants"><div class="ai-variant"><h4>' + t("ai.formal") + '</h4><p>' + formal + '</p><button class="btn btn--primary btn--block" data-route="/editor/' + id + '"><span>' + t("ai.choose") + '</span></button></div>' +
      '<div class="ai-variant"><h4>' + t("ai.personal") + '</h4><p>' + personal + '</p><button class="btn btn--primary btn--block" data-route="/editor/' + id + '"><span>' + t("ai.choose") + '</span></button></div></div></div>';
    state.ai = null;
  }

  /* ---------- CABINET ---------- */
  function renderCabinet() {
    var pages = getPages(); var wrap = $("#screen-cabinet");
    var cards = pages.map(function (p) {
      var photo = p.photo ? '<img src="' + p.photo + '" alt="">' : portrait(p.name);
      return '<div class="cab-card"><div class="cab-card__photo">' + photo + '</div>' +
        '<div class="cab-card__body"><span class="cab-card__tag">' + t(p.plan === "extended" ? "cab.extended" : "cab.short") + '</span>' +
        '<div class="cab-card__name">' + p.name + '</div><div class="cab-card__dates">' + (p.born || "") + '–' + (p.died || "") + '</div>' +
        '<div class="cab-card__actions"><button class="btn btn--outline btn--sm" data-route="/editor/' + p.id + '"><span>' + t("cab.edit") + '</span></button>' +
        '<button class="btn btn--outline btn--sm" data-route="/page/' + p.id + '"><span>' + t("cab.view") + '</span></button>' +
        (p.plan !== "extended" ? '<button class="btn btn--primary btn--sm" data-route="/plaque/' + p.id + '"><span>' + t("cab.expand") + '</span></button>' : '') +
        '</div></div></div>';
    }).join("");
    var newCard = '<div class="cab-new" data-route="/create"><div><div class="upload__circle" style="margin:0 auto 12px">' + ICON.plus + '</div><span style="font-weight:600;font-size:14px">' + t("cab.newPage") + '</span></div></div>';
    wrap.innerHTML = '<div class="container subpage">' + backLink() + '<h1 class="h-section" style="margin-bottom:28px">' + t("cab.title") + '</h1>' +
      (pages.length ? '' : '<p style="color:var(--ink-soft);margin-bottom:24px">' + t("cab.empty") + '</p>') +
      '<div class="cab-grid">' + cards + newCard + '</div></div>';
  }

  /* ---------- PLAQUE ---------- */
  function renderPlaque(id) {
    $("#screen-plaque").innerHTML = '<div class="container subpage">' + backLink() +
      '<h1 class="h-section" style="margin-bottom:28px">' + t("pl.title") + '</h1><div class="opt-cards">' +
      '<div class="opt-card"><div class="opt-card__inner"><div class="opt-card__title">' + t("pl.noPlaque") + '</div><p>' + t("pl.noPlaqueText") + '</p>' +
      '<button class="btn btn--primary" data-route="/checkout/' + id + '"><span>' + t("pl.toPay") + '</span></button></div></div>' +
      '<div class="opt-card opt-card--best"><div class="opt-card__badge">' + t("pl.best") + '</div><div class="opt-card__inner"><div class="opt-card__title">' + t("pl.delivery") + '</div><p>' + t("pl.deliveryText") + '</p>' +
      '<button class="btn btn--outline" data-route="/checkout/' + id + '"><span>' + t("pl.choose") + '</span></button></div></div>' +
      '</div></div>';
  }

  /* ---------- CHECKOUT ---------- */
  function renderCheckout(id) {
    $("#screen-checkout").innerHTML = '<div class="container subpage">' + backLink() +
      '<h1 class="h-section" style="margin-bottom:28px">' + t("co.title") + '</h1>' +
      '<div class="order card-box"><div class="order__row"><span>' + t("co.item") + '</span><span>69 €</span></div>' +
      '<div class="order__total"><span>' + t("co.total") + '</span><b>69 €</b></div>' +
      '<div class="field" style="margin-top:10px"><label>' + t("co.card") + '</label><input id="ccNum" type="text" placeholder="1234 5678 9012 3456" maxlength="19"><div class="field__err"></div></div>' +
      '<div class="form-grid" style="margin-top:16px"><div class="field"><label>' + t("co.expiry") + '</label><input id="ccExp" type="text" placeholder="MM/JJ" maxlength="5"></div>' +
      '<div class="field"><label>' + t("co.cvc") + '</label><input id="ccCvc" type="text" placeholder="123" maxlength="4"></div></div>' +
      '<div class="field" style="margin-top:16px"><label>' + t("co.cardholder") + '</label><input id="ccName" type="text" placeholder="Max Mustermann"></div>' +
      '<button class="btn btn--primary btn--block" id="payBtn" style="margin-top:24px"><span>' + t("co.pay") + ' 69 €</span></button></div></div>';
    $("#payBtn").addEventListener("click", function () {
      // демо-режим: пропускаем без проверки карты, чтобы можно было протестировать флоу
      if (id && findPage(id)) updatePage(id, { plan: "extended" });
      openModal('<button class="modal__close" data-x>' + ICON.close + '</button><div class="upload__circle" style="margin:0 auto 16px;width:64px;height:64px">' + ICON.check + '</div>' +
        '<h3 class="modal__title" style="text-align:center">' + t("co.paid") + '</h3><p style="text-align:center;color:var(--ink-body)">' + t("co.paidText") + '</p>' +
        '<button class="btn btn--primary btn--block" style="margin-top:20px" data-route="/cabinet"><span>' + t("cab.title") + '</span></button>');
      var x = $("#modalDialog [data-x]"); if (x) x.addEventListener("click", closeModal);
    });
  }
  function openModal(html) { $("#modalDialog").innerHTML = html; $("#modal").classList.add("is-open"); document.body.classList.add("no-scroll"); }
  function closeModal() { $("#modal").classList.remove("is-open"); document.body.classList.remove("no-scroll"); }

  function bind() {
    $all("#langSwitch button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); }); });
    document.addEventListener("click", function (e) {
      var r = e.target.closest("[data-route]");
      if (r) { e.preventDefault(); go(r.getAttribute("data-route")); }
    });
    var mnav = $("#mobileNav");
    $("#burger").addEventListener("click", function () { mnav.classList.add("is-open"); document.body.classList.add("no-scroll"); });
    function closeMnav() { mnav.classList.remove("is-open"); document.body.classList.remove("no-scroll"); }
    $all("[data-close-mnav]").forEach(function (n) { n.addEventListener("click", closeMnav); });
    $all(".mobile-nav__panel a").forEach(function (a) { a.addEventListener("click", closeMnav); });
    $all("[data-close-modal]").forEach(function (n) { n.addEventListener("click", function () { $("#modal").classList.remove("is-open"); document.body.classList.remove("no-scroll"); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMnav(); });
    var er = $("#examplesRefresh"); if (er) er.addEventListener("click", function () {
      var o = exOrder().slice();
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = o[i]; o[i] = o[j]; o[j] = tmp; }
      state.exOrder = o; renderExamples();
    });
    var mb = $("#examplesMore"); if (mb) mb.addEventListener("click", function () { state.exExpanded = !state.exExpanded; renderExamples(); if (!state.exExpanded) { var s = $("#examples"); if (s) s.scrollIntoView(); } });
    var sr = $("#storiesRefresh"); if (sr) sr.addEventListener("click", function () { toast(t("common.soon")); });
    var bs = $("#btnSupport"); if (bs) bs.addEventListener("click", function () { toast(t("common.soon")); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === state.lang); });
    bind(); renderAll();
    window.addEventListener("hashchange", function () {
      var h = location.hash.replace(/^#/, "");
      if (h.charAt(0) === "/") { routeTo(h); applyI18n(); }
      else if (h === "") routeTo("/");
    });
    var ih = location.hash.replace(/^#/, "");
    if (ih.charAt(0) === "/") { routeTo(ih); applyI18n(); }
  });
})();
