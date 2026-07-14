/* ewig.me — ИИ-биограф · прокси к OpenAI (Cloudflare Worker). Ключ — в секрете env.OPENAI_KEY. */
const ALLOWED = ["https://ewig.me", "https://www.ewig.me", "https://kissheaven9.github.io"];
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allow = ALLOWED.indexOf(origin) !== -1 ? origin : ALLOWED[0];
    const cors = { "Access-Control-Allow-Origin": allow, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return j({ error: "method" }, 405, cors);
    if (!env.OPENAI_KEY) return j({ error: "no_key" }, 500, cors);
    let body; try { body = await request.json(); } catch (e) { return j({ error: "bad_json" }, 400, cors); }
    const name = String(body.name || "").slice(0, 120);
    const lang = body.lang === "ru" ? "русском" : "немецком (Deutsch)";
    const ans = Array.isArray(body.answers) ? body.answers.slice(0, 12).map(a => String(a == null ? "" : a).slice(0, 800)) : [];
    const sys = "Ты пишешь уважительные, тёплые биографии для мемориальной страницы на " + lang + " языке. Верни СТРОГО JSON вида {\"formal\":\"...\",\"personal\":\"...\"}. formal — достойная энциклопедичная биография из 3-4 абзацев (абзацы через двойной перенос строки). personal — тёплый личный текст от лица семьи, 3-4 абзаца. Опирайся только на предоставленные ответы, не выдумывай фактов.";
    const user = "Имя: " + (name || "(не указано)") + "\nОтветы:\n" + (ans.length ? ans.map((a, i) => (i + 1) + ". " + a).join("\n") : "(нет)");
    let r;
    try {
      r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.OPENAI_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: sys }, { role: "user", content: user }], response_format: { type: "json_object" }, temperature: 0.7, max_tokens: 1100 })
      });
    } catch (e) { return j({ error: "fetch" }, 502, cors); }
    if (!r.ok) return j({ error: "openai_" + r.status }, 502, cors);
    const data = await r.json();
    let out = {};
    try { out = JSON.parse((data.choices && data.choices[0] && data.choices[0].message.content) || "{}"); } catch (e) {}
    return j({ formal: String(out.formal || ""), personal: String(out.personal || "") }, 200, cors);
  }
};
function j(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: Object.assign({ "Content-Type": "application/json" }, cors) });
}
