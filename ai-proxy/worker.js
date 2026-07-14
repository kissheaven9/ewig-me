/* ==========================================================================
   ewig.me — ИИ-биограф · прокси к OpenAI (Cloudflare Worker)
   Держит ключ OpenAI в секрете воркера (env.OPENAI_KEY), сайт зовёт этот воркер.
   Деплой и настройка — см. README.md в этой папке.
   ========================================================================== */

const ALLOWED = ["https://ewig.me", "https://www.ewig.me", "https://kissheaven9.github.io"];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allow = ALLOWED.indexOf(origin) !== -1 ? origin : ALLOWED[0];
    const cors = {
      "Access-Control-Allow-Origin": allow,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);
    if (!env.OPENAI_KEY) return json({ error: "no_key_configured" }, 500, cors);

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: "bad_json" }, 400, cors); }

    const name = String(body.name || "").slice(0, 120);
    const lang = body.lang === "ru" ? "ru" : "de";
    const answers = Array.isArray(body.answers)
      ? body.answers.slice(0, 12).map(function (a) { return String(a == null ? "" : a).slice(0, 800); })
      : [];

    const langName = lang === "ru" ? "русском" : "немецком (Deutsch)";
    const sys = "Ты пишешь уважительные, тёплые биографии для мемориальной страницы на " + langName +
      " языке. Верни СТРОГО JSON вида {\"formal\":\"...\",\"personal\":\"...\"}. " +
      "\"formal\" — достойная, энциклопедичная биография из 3-4 абзацев (абзацы разделяй двойным переносом строки). " +
      "\"personal\" — тёплый, личный текст от лица семьи, 3-4 абзаца. " +
      "Опирайся только на предоставленные ответы, не выдумывай фактов. Тон уважительный, без пафоса.";
    const user = "Имя: " + (name || "(не указано)") + "\n\nОтветы о человеке:\n" +
      (answers.length ? answers.map(function (a, i) { return (i + 1) + ". " + a; }).join("\n") : "(ответов нет)");

    let r;
    try {
      r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.OPENAI_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: sys }, { role: "user", content: user }],
          response_format: { type: "json_object" },
          temperature: 0.7,
          max_tokens: 1100
        })
      });
    } catch (e) {
      return json({ error: "upstream_fetch_failed" }, 502, cors);
    }

    if (!r.ok) return json({ error: "openai_" + r.status }, 502, cors);
    const data = await r.json();
    let out = {};
    try {
      out = JSON.parse((data.choices && data.choices[0] && data.choices[0].message.content) || "{}");
    } catch (e) { out = {}; }
    return json({ formal: String(out.formal || ""), personal: String(out.personal || "") }, 200, cors);
  }
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": cors["Access-Control-Allow-Origin"],
      "Access-Control-Allow-Methods": cors["Access-Control-Allow-Methods"],
      "Access-Control-Allow-Headers": cors["Access-Control-Allow-Headers"],
      "Vary": cors["Vary"]
    }
  });
}
