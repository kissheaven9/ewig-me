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
    var photos = D.examples.map(function (e) { return e.photo; });
    var order = [0, 1, 2, 0, 2];
    for (var i = 0; i < 5; i++) {
      var s = el("span");
      s.style.backgroundImage = "url(" + photos[order[i] % photos.length] + ")";
      s.style.backgroundSize = "cover"; s.style.backgroundPosition = "50% 12%";
      w.appendChild(s);
    }
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
  function getPages() { try { return JSON.parse(localStorage.getItem("ewig_pages") || "[]"); } catch (e) { return []; } }
  function setPages(a) { localStorage.setItem("ewig_pages", JSON.stringify(a)); }
  function savePage(p) { var a = getPages(); a.push(p); setPages(a); }
  function updatePage(id, patch) { var a = getPages().map(function (x) { return x.id === id ? Object.assign(x, patch) : x; }); setPages(a); }
  function findPage(id) { var u = getPages().filter(function (x) { return x.id === id; })[0]; return u || null; }

  function makeQR(text) {
    try { var q = qrcode(0, "M"); q.addData(text); q.make(); return q.createDataURL(6, 4); }
    catch (e) { return ""; }
  }
  function backLink() { return '<a class="back-link" href="#/" data-route="/">' + ICON.chevron + '<span>' + t("pub.back") + '</span></a>'; }

  /* ---------- PUBLIC memorial page ---------- */
  function renderPublic(id) {
    var wrap = $("#screen-page");
    var ex = D.examples.filter(function (e) { return e.id === id; })[0];
    var mem = D.memorials[id];
    var up = findPage(id);
    var name, dates, born, died, years, quote, photo, infoHtml = "", bioHtml = "", grave = "", coords = "", wiki = "", plan = "extended", isUser = false;
    if (ex && mem) {
      name = L(ex.name); dates = ex.dates; born = L(ex.born); died = L(ex.died); years = ex.years;
      quote = L(ex.quote); photo = ex.photo;
      infoHtml = mem.info.map(function (i) { return '<div class="info-cell"><dt>' + L(i.k) + '</dt><dd>' + L(i.v) + '</dd></div>'; }).join("");
      bioHtml = mem.bio[state.lang].map(function (p) { return '<p>' + p + '</p>'; }).join("");
      grave = L(mem.grave); coords = mem.coords; wiki = mem.wiki;
    } else if (up) {
      isUser = true; name = up.name; born = up.born; died = up.died; dates = (up.born || "") + "–" + (up.died || "");
      quote = up.epitaph || ""; photo = up.photo || null; plan = up.plan || "short"; grave = up.cemetery || ""; coords = up.coords || "";
    } else { wrap.innerHTML = '<div class="container subpage">' + backLink() + '<p>' + t("common.soon") + '</p></div>'; return; }

    var photoHtml = photo ? '<img src="' + photo + '" alt="' + name + '">' : portrait(name);
    var url = location.origin + location.pathname + "#/page/" + id;
    var html = '<div class="container subpage">' + backLink() +
      '<div class="pub-hero">' +
        '<div class="pub-hero__photo">' + photoHtml + '</div>' +
        '<div><div class="pub-hero__name">' + name + '</div>' +
        '<div class="pub-hero__dates">' + dates + (years ? ' <span>(' + years + ' ' + t("pub.years") + ')</span>' : '') + '</div>' +
        (quote ? '<p class="pub-hero__epitaph">«' + quote + '»</p>' : '') + '</div>' +
      '</div>';

    if (infoHtml) html += '<div class="block"><div class="block__title">' + t("pub.info") + '</div><div class="info-grid">' + infoHtml + '</div></div>';
    if (bioHtml) html += '<div class="block"><div class="block__title">' + t("pub.bio") + '</div><div class="bio-text">' + bioHtml + '</div></div>';
    if (plan === "extended") {
      var vq = (mem && mem.video) ? mem.video : name;
      var yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent(vq);
      var poster = photo ? 'background-image:url(' + photo + ');background-size:cover;background-position:50% 18%' : '';
      html += '<div class="block"><div class="block__title">' + t("pub.media") + '</div>' +
        '<a class="media-box" href="' + yt + '" target="_blank" rel="noopener" style="' + poster + '"><span class="media-box__ov"></span><div class="pcard__play">' + ICON.play + '</div></a></div>';
      if (photo) {
        var tile = '<div style="background-image:url(' + photo + ');background-size:cover;background-position:50% 12%"></div>';
        html += '<div class="block"><div class="block__title">' + t("pub.photos") + '</div><div class="photos-grid">' + tile + '<div></div><div></div><div></div></div></div>';
      }
    }
    if (grave) html += '<div class="block"><div class="block__title">' + t("pub.grave") + '</div><div class="map-box">' + ICON.pin + '<div class="map-coords">' + grave + (coords ? ' · ' + coords : '') + '</div></div></div>';
    if (wiki) html += '<div class="block"><div class="block__title">' + t("pub.links") + '</div><div class="ext-links">' +
      '<a href="' + wiki + '" target="_blank" rel="noopener" aria-label="Wikipedia"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h3l3 9 3-9h2l3 9 3-9h2l-4.5 14h-2L15 10l-3.5 9h-2L5 5z"/></svg></a>' +
      '<a href="#" aria-label="Teilen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.1 10.9l7.8-3.8M8.1 13.1l7.8 3.8"/></svg></a>' +
      '</div></div>';
    html += '<div class="block"><div class="block__title">' + t("pub.qr") + '</div><div class="qr-block">' +
      '<div class="qr-canvas"><img src="' + makeQR(url) + '" alt="QR"></div>' +
      '<div class="qr-info"><p>' + t("pub.qrHint") + '</p><div class="ed-actions">' +
        '<button class="btn btn--primary" id="pubShare"><span>' + t("pub.share") + '</span></button>' +
        (isUser ? '<button class="btn btn--outline" data-route="/editor/' + id + '"><span>' + t("cab.edit") + '</span></button>' +
                  '<a class="link-arrow" href="#/" data-route="/cabinet"><span>' + t("cab.title") + '</span>' + ICON.chevron + '</a>' : '') +
      '</div></div></div></div>';
    wrap.innerHTML = html;
    var sb = $("#pubShare"); if (sb) sb.addEventListener("click", function () {
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      toast(t("pub.linkCopied"));
    });
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
  function renderEditor(id) {
    var page = findPage(id); var wrap = $("#screen-editor");
    if (!page) { wrap.innerHTML = '<div class="container subpage">' + backLink() + '<p>' + t("common.soon") + '</p></div>'; return; }
    var ext = page.plan === "extended";
    function lockedSection(title) {
      return '<div class="ed-section"><div class="ed-locked__overlay"><div class="ed-locked__msg">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' +
        '<span><b style="text-transform:uppercase;font-weight:400;color:var(--ink-head)">' + title + '</b> — ' + t("ed.locked") + '</span></div>' +
        '<button class="btn btn--primary btn--sm" data-route="/plaque/' + id + '"><span>' + t("ed.buy") + '</span></button></div></div>';
    }
    function openSection(title, inner) { return '<div class="ed-section"><div class="ed-section__head"><div class="ed-section__title">' + title + '</div></div>' + inner + '</div>'; }
    var html = '<div class="container subpage">' + backLink() +
      '<h1 class="h-section" style="margin-bottom:8px">' + t(ext ? "ed.titleExt" : "ed.titleShort") + '</h1>' +
      '<p style="color:var(--ink-soft);font-size:14px;margin-bottom:28px">' + t("ed.avgTime") + '</p>';
    if (ext) {
      html += openSection(t("ed.bio"),
        '<div class="bio-choice"><button class="btn btn--outline"><span>' + t("ed.bioSelf") + '</span></button>' +
        '<button class="btn btn--primary" data-route="/ai/' + id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></svg><span>' + t("ed.bioAI") + '</span></button></div>' +
        '<textarea style="margin-top:16px;min-height:140px" placeholder="…"></textarea>');
      html += openSection(t("ed.photos"), '<p style="font-size:14px;color:var(--ink-body);margin-bottom:14px">' + t("ed.photosHint") + '</p><button class="btn btn--outline"><span>' + t("ed.addPhoto") + '</span></button>');
    } else {
      html += lockedSection(t("ed.bio")) + lockedSection(t("pub.media")) + lockedSection(t("ed.photos")) + lockedSection(t("ed.links"));
    }
    html += openSection(t("ed.grave"),
      '<div class="form-grid"><div class="field"><label>' + t("ed.cemetery") + '</label><input type="text" value="' + (page.cemetery || "") + '" id="edCem"></div>' +
      '<div class="field"><label>' + t("ed.coords") + '</label><input type="text" value="' + (page.coords || "") + '" id="edCoords" placeholder="48.15, 16.44"></div></div>');
    html += openSection(t("ed.qr"),
      '<div class="qr-block" style="margin-bottom:20px"><div class="qr-canvas" style="width:130px;height:130px"><img src="' + makeQR(location.origin + location.pathname + "#/page/" + id) + '"></div>' +
      '<div style="flex:1;min-width:220px">' +
      toggleRow("edPub", t("ed.public"), page.pub !== false) +
      toggleRow("edIdx", t("ed.index"), true) +
      toggleRow("edPubl", t("ed.publish"), true) + '</div></div>');
    html += '<div class="ed-actions"><button class="btn btn--primary" id="edSave"><span>' + t("ed.save") + '</span></button>' +
      '<a class="link-arrow" href="#/page/' + id + '" data-route="/page/' + id + '"><span>' + t("ed.preview") + '</span>' + ICON.chevron + '</a></div></div>';
    wrap.innerHTML = html;
    $("#edSave").addEventListener("click", function () {
      updatePage(id, { cemetery: ($("#edCem") || {}).value || "", coords: ($("#edCoords") || {}).value || "", pub: $("#edPub").checked });
      toast(t("ed.saved"));
    });
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
    var mem = D.memorials[id] || (D.examples.filter(function (e) { return e.id === id; })[0] && D.memorials[id]);
    var b = mem ? mem.bio[state.lang] : null;
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
      var num = ($("#ccNum").value || "").replace(/\s/g, "");
      if (num.length < 12) { $("#ccNum").parentNode.classList.add("is-invalid"); $("#ccNum").parentNode.querySelector(".field__err").textContent = "!"; return; }
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
    var er = $("#examplesRefresh"); if (er) er.addEventListener("click", function () { toast(t("common.soon")); });
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
