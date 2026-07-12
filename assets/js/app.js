/* ==========================================================================
   ewig.me — app.js
   Лендинг: i18n-переключатель, рендер секций, аккордеон, reveal, модалки,
   роутер-скелет. Публичная страница/мастер/редактор — следующие итерации.
   ========================================================================== */
(function () {
  "use strict";

  var LANG_KEY = "ewig_lang";
  var urlLang = (new URLSearchParams(location.search)).get("lang");
  var state = { lang: (urlLang === "de" || urlLang === "ru") ? urlLang : (localStorage.getItem(LANG_KEY) || "de") };
  var D = window.DATA, I = window.I18N;

  /* -------- helpers -------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function t(key) { var d = I[state.lang]; return (d && d[key] != null) ? d[key] : (I.de[key] || key); }
  function L(obj) { if (!obj) return ""; return obj[state.lang] != null ? obj[state.lang] : (obj.de || ""); }

  /* -------- icons -------- */
  var ICON = {
    chevron: '<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="5" width="15" height="14" rx="3"/><path d="M17 10l5-3v10l-5-3z"/></svg>',
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="11" r="2"/><path d="M4 18l5-4 4 3 3-2 4 3"/></svg>',
    text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 6h14M5 10h14M5 14h9M5 18h9" stroke-linecap="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    register: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    fill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke-linecap="round"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3h16v18H4z"/><path d="M9 8h6M9 12h6M9 16h4" stroke-linecap="round"/></svg>'
  };
  var STEP_ICONS = [ICON.register, ICON.fill, ICON.share, ICON.expand];

  /* нейтральный портрет-плейсхолдер (тактично, без лиц; заменяется реальным фото) */
  function portrait(name) {
    var initials = (name || "").trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe6dc"/><stop offset="1" stop-color="#ddccbc"/></linearGradient></defs>' +
      '<rect width="200" height="200" fill="url(#g)"/>' +
      '<circle cx="100" cy="82" r="34" fill="#fff" opacity=".55"/>' +
      '<path d="M46 168c0-30 24-46 54-46s54 16 54 46z" fill="#fff" opacity=".55"/>' +
      '<text x="100" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="30" font-weight="600" fill="#bb9174" opacity=".9">' + initials + '</text>' +
      '</svg>';
  }

  /* -------- render: landing sections -------- */
  function renderAvatars() {
    var wrap = $("#heroAvatars"); if (!wrap) return;
    wrap.innerHTML = "";
    for (var i = 0; i < 5; i++) {
      var s = el("span");
      s.style.background = "linear-gradient(135deg,#efe6dc," + ["#e3d4c6", "#dcc9b8", "#e7dacd", "#d8c4b1", "#e0d0bf"][i] + ")";
      wrap.appendChild(s);
    }
  }

  function renderExamples() {
    var g = $("#examplesGrid"); if (!g) return;
    g.innerHTML = "";
    D.examples.forEach(function (ex) {
      var c = el("article", "mcard reveal");
      c.innerHTML =
        '<div class="mcard__photo">' + portrait(L(ex.name)) + '</div>' +
        '<span class="mcard__tag">' + L(ex.cat) + '</span>' +
        '<div class="mcard__name">' + L(ex.name) + '</div>' +
        '<div class="mcard__dates">' + ex.dates + '</div>' +
        '<p class="mcard__text">' + L(ex.bio) + '</p>' +
        '<div class="mcard__foot"><a class="link-arrow" href="#/page/' + ex.id + '" data-route="/page/' + ex.id + '">' +
          t("examples.view") + ICON.chevron + '</a></div>';
      g.appendChild(c);
    });
  }

  function renderFeatures() {
    var g = $("#featuresGrid"); if (!g) return;
    g.innerHTML = "";
    D.features.forEach(function (f) {
      var c = el("div", "feature reveal");
      c.innerHTML =
        '<div class="feature__ic">' + (ICON[f.icon] || "") + '</div>' +
        '<div class="feature__title">' + L(f.title) + '</div>' +
        '<p>' + L(f.text) + '</p>';
      g.appendChild(c);
    });
  }

  function renderSteps() {
    var g = $("#stepsGrid"); if (!g) return;
    g.innerHTML = "";
    D.steps.forEach(function (s, i) {
      var c = el("div", "step");
      c.innerHTML =
        '<div class="step__n">' + (i + 1) + '</div>' +
        '<div class="step__img">' + STEP_ICONS[i] + '</div>' +
        '<p>' + L(s.text) + '</p>';
      g.appendChild(c);
    });
  }

  function renderTeaser() {
    var wrap = $("#teaserCard"); if (!wrap) return;
    var p = D.demoPerson;
    wrap.innerHTML =
      '<div class="teaser__photo">' + portrait(L(p.name)) + '</div>' +
      '<div class="teaser__body">' +
        '<div class="teaser__name">' + L(p.name) + '</div>' +
        '<div class="teaser__dates">' + p.born + '–' + p.died + ' <span>(' + p.years + ' ' + t("teaser.years") + ')</span></div>' +
        '<p class="teaser__quote">«' + L(p.epitaph) + '»</p>' +
        '<div class="teaser__chips">' +
          '<span class="chip">' + ICON.play + '</span>' +
          '<span class="chip">' + ICON.photo + '</span>' +
          '<span class="chip chip--t">T</span>' +
          '<span class="chip">' + ICON.pin + '</span>' +
        '</div>' +
        '<div class="teaser__actions">' +
          '<a class="btn btn--primary" href="#/page/' + p.id + '" data-route="/page/' + p.id + '"><span>' + t("teaser.viewPage") + '</span></a>' +
          '<button class="link-arrow" id="teaserAnother">' + t("teaser.showAnother") + ICON.chevron + '</button>' +
        '</div>' +
      '</div>';
  }

  function renderPlans() {
    var g = $("#plansGrid"); if (!g) return;
    var pl = D.plans;
    function planCard(kind, data, best) {
      var items = data.items.map(function (it) {
        return '<li>' + ICON.check + '<span>' + L(it) + '</span></li>';
      }).join("");
      return '<div class="plan' + (best ? ' plan--best' : '') + '">' +
        (best ? '<span class="plan__badge">' + t("plans.best") + '</span>' : '') +
        '<div class="plan__name">' + t(kind === "short" ? "plans.short" : "plans.extended") + '</div>' +
        '<div class="plan__price">' + L(data.price) + '</div>' +
        (best ? '<div class="plan__more">' + t("plans.plusIntro") + '</div>' : '') +
        '<ul class="plan__list">' + items + '</ul>' +
        '<button class="btn ' + (best ? 'btn--primary' : 'btn--outline') + ' btn--block" data-route="/create"><span>' + t("plans.create") + '</span></button>' +
        '</div>';
    }
    g.innerHTML = planCard("short", pl.short, false) + planCard("extended", pl.extended, true);
  }

  function renderArticles() {
    var g = $("#articlesGrid"); if (!g) return;
    g.innerHTML = "";
    D.articles.forEach(function (a, i) {
      var c = el("a", "article reveal");
      c.href = "#";
      c.style.setProperty("--tint", i);
      c.innerHTML =
        '<div style="width:100%;height:100%;background:linear-gradient(135deg,' +
          ['#cbb69f,#a98a6b', '#c2ac96,#9f8365', '#d0bda6,#b09372', '#c7b39c,#a68a69'][i] + ')"></div>' +
        '<span class="article__label">' + t("articles.label") + '</span>' +
        '<div class="article__title">' + L(a.title) + '</div>';
      g.appendChild(c);
    });
  }

  function renderFaq() {
    var g = $("#faqList"); if (!g) return;
    g.innerHTML = "";
    D.faq.forEach(function (f) {
      var item = el("div", "faq__item");
      item.innerHTML =
        '<button class="faq__q">' + L(f.q) + ICON.plus + '</button>' +
        '<div class="faq__a"><p>' + L(f.a) + '</p></div>';
      var q = $(".faq__q", item), a = $(".faq__a", item);
      q.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
      });
      g.appendChild(item);
    });
  }

  function renderPress() {
    var g = $("#pressGrid"); if (!g) return;
    g.innerHTML = "";
    D.press.forEach(function (p) {
      var c = el("article", "pcard reveal");
      c.innerHTML =
        '<div class="pcard__media"><div class="pcard__play">' + ICON.play + '</div></div>' +
        '<div class="pcard__body">' +
          '<div class="pcard__label">' + L(p.label) + '</div>' +
          '<div class="pcard__title">' + L(p.title) + '</div>' +
        '</div>';
      g.appendChild(c);
    });
  }

  function renderStories() {
    var g = $("#storiesGrid"); if (!g) return;
    g.innerHTML = "";
    D.testimonials.forEach(function (s) {
      var c = el("article", "tcard reveal");
      c.innerHTML =
        '<p class="tcard__quote">«' + L(s.quote) + '»</p>' +
        '<div class="tcard__top"><div class="tcard__ava"></div><div class="tcard__name">' + L(s.name) + '</div></div>';
      g.appendChild(c);
    });
  }

  function renderAll() {
    renderAvatars(); renderExamples(); renderFeatures(); renderSteps();
    renderTeaser(); renderPlans(); renderArticles(); renderFaq(); renderPress(); renderStories();
    applyI18nStatic();
    observeReveal();
    bindDynamic();
  }

  /* -------- i18n static -------- */
  function applyI18nStatic() {
    $all("[data-i18n]").forEach(function (n) {
      var key = n.getAttribute("data-i18n");
      var val = t(key);
      if (val) n.textContent = val;
    });
    document.documentElement.lang = state.lang;
    var ph = $("#btnSearch"); // search placeholder handled in modal
  }

  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === lang); });
    renderAll();
  }

  /* -------- reveal -------- */
  var io;
  function observeReveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $all(".reveal").forEach(function (n) { io.observe(n); });
    // страховка: ключевой контент виден гарантированно (см. дневник ошибок)
    requestAnimationFrame(function () {
      $all(".reveal").forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < window.innerHeight) n.classList.add("is-in");
      });
    });
  }

  /* -------- modal / toast -------- */
  function openModal(html) {
    $("#modalDialog").innerHTML = html;
    $("#modal").classList.add("is-open");
    document.body.classList.add("no-scroll");
  }
  function closeModal() { $("#modal").classList.remove("is-open"); document.body.classList.remove("no-scroll"); }
  function toast(msg, kind) {
    var w = $("#toastWrap");
    var el2 = el("div", "toast" + (kind ? " toast--" + kind : ""), msg);
    w.appendChild(el2);
    setTimeout(function () { el2.style.opacity = "0"; el2.style.transform = "translateY(10px)"; }, 2600);
    setTimeout(function () { el2.remove(); }, 3000);
  }

  /* -------- router (скелет; экраны кроме home — след. итерации) -------- */
  function go(path) {
    if (!path || path === "/" || path === "") {
      showScreen("home");
      return;
    }
    // публичная страница, мастер, кабинет и т.д. — в разработке
    toast(t("common.soon"));
  }
  function showScreen(name) {
    $all(".screen").forEach(function (s) { s.classList.toggle("is-active", s.id === "screen-" + name); });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* -------- dynamic bindings (после каждого рендера) -------- */
  function bindDynamic() {
    var another = $("#teaserAnother");
    if (another) another.addEventListener("click", function () { toast(t("common.soon")); });
  }

  /* -------- static bindings (один раз) -------- */
  function bindStatic() {
    // язык
    $all("#langSwitch button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    // роутинг по data-route
    document.addEventListener("click", function (e) {
      var r = e.target.closest("[data-route]");
      if (r) { e.preventDefault(); go(r.getAttribute("data-route")); return; }
    });
    // бургер / мобильное меню
    var mnav = $("#mobileNav");
    $("#burger").addEventListener("click", function () { mnav.classList.add("is-open"); document.body.classList.add("no-scroll"); });
    $all("[data-close-mnav]").forEach(function (n) { n.addEventListener("click", closeMnav); });
    $all(".mobile-nav__panel a").forEach(function (a) { a.addEventListener("click", closeMnav); });
    function closeMnav() { mnav.classList.remove("is-open"); document.body.classList.remove("no-scroll"); }
    // модалка закрытие
    $all("[data-close-modal]").forEach(function (n) { n.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeModal(); closeMnav(); } });
    // поиск
    $("#btnSearch").addEventListener("click", function () {
      openModal('<button class="modal__close" data-close-modal>' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>' +
        '<h3 class="modal__title">' + t("search.placeholder") + '</h3>' +
        '<div class="field"><input type="text" placeholder="' + t("search.placeholder") + '"></div>' +
        '<p style="margin-top:14px;font-size:.9rem;color:var(--ink-soft)">' + t("common.soon") + '</p>');
      $(".modal__close", $("#modalDialog")).addEventListener("click", closeModal);
      var inp = $("#modalDialog input"); if (inp) inp.focus();
    });
    // поддержка
    $("#btnSupport").addEventListener("click", function () { toast(t("common.soon")); });
    // "другие истории"
    $("#storiesMore").addEventListener("click", function () { toast(t("common.soon")); });
    // hash routing on load/change
    window.addEventListener("hashchange", function () {
      var h = location.hash.replace(/^#/, "");
      if (h.charAt(0) === "/") go(h);
    });
  }

  /* -------- init -------- */
  document.addEventListener("DOMContentLoaded", function () {
    $all("#langSwitch button").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-lang") === state.lang); });
    bindStatic();
    renderAll();
  });
})();
