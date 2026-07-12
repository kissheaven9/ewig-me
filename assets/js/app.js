/* ==========================================================================
   ewig.me — app.js. Рендер лендинга ТОЧНО по Figma, i18n DE/RU, refresh-кнопки.
   ========================================================================== */
(function () {
  "use strict";
  var LANG_KEY = "ewig_lang";
  var urlLang = (new URLSearchParams(location.search)).get("lang");
  var state = { lang: (urlLang === "de" || urlLang === "ru") ? urlLang : (localStorage.getItem(LANG_KEY) || "de"), teaserIdx: 0 };
  var D = window.DATA, I = window.I18N;

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

  /* ---------- render ---------- */
  function renderAvatars() {
    var w = $("#heroAvatars"); if (!w) return; w.innerHTML = "";
    for (var i = 0; i < 5; i++) w.appendChild(el("span", null, ICON.user));
  }

  function renderExamples() {
    var g = $("#examplesGrid"); if (!g) return; g.innerHTML = "";
    D.examples.forEach(function (ex) {
      var c = el("article", "ecard");
      c.innerHTML =
        '<span class="ecard__tag">' + L(ex.cat) + '</span>' +
        '<div class="ecard__photo"><img src="' + ex.photo + '" alt="' + L(ex.name) + '"></div>' +
        '<div class="ecard__name">' + L(ex.name) + '</div>' +
        '<div class="ecard__dates">' + ex.dates + '</div>' +
        '<p class="ecard__text">' + L(ex.bio) + '</p>' +
        '<div class="ecard__foot"><a class="link-arrow" href="#/page/' + ex.id + '" data-route="/page/' + ex.id + '">' + t("examples.view") + ICON.chevron + '</a></div>';
      g.appendChild(c);
    });
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
    var p = D.examples[state.teaserIdx % D.examples.length];
    wrap.innerHTML =
      '<div class="teaser__top">' +
        '<div><button class="btn-refresh btn-refresh--muted" id="teaserAnother">' +
          '<span class="btn-refresh__ic">' + ICON.refresh + '</span>' +
          '<span class="btn-refresh__txt">' + t("teaser.another") + '</span></button></div>' +
        '<div class="teaser__photo"><img src="' + p.photo + '" alt="' + L(p.name) + '"></div>' +
        '<div class="teaser__quote">' + L(p.quote) + '</div>' +
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
  function applyI18n() {
    $all("[data-i18n]").forEach(function (n) { var v = t(n.getAttribute("data-i18n")); if (v) n.textContent = v; });
    $all("[data-i18n-ph]").forEach(function (n) { var v = t(n.getAttribute("data-i18n-ph")); if (v) n.setAttribute("placeholder", v); });
    document.documentElement.lang = state.lang;
  }
  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang; localStorage.setItem(LANG_KEY, lang);
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === lang); });
    renderAll();
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
  function go(path) { if (!path || path === "/") return; toast(t("common.soon")); }

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
    var er = $("#examplesRefresh"); if (er) er.addEventListener("click", function () { toast(t("common.soon")); });
    var sr = $("#storiesRefresh"); if (sr) sr.addEventListener("click", function () { toast(t("common.soon")); });
    var bs = $("#btnSupport"); if (bs) bs.addEventListener("click", function () { toast(t("common.soon")); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === state.lang); });
    bind(); renderAll();
  });
})();
