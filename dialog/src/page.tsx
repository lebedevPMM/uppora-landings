import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import "../landing/dialog.css";

export const Route = createFileRoute("/")({
  component: Dialog,
});

function Dialog() {
  useDialog();
  return (
    <div className="dlg-root">
      <div id="chat-app">
        <header className="chead">
          <div className="ava">
            <video src="/assets/uppi-avatar.mp4" poster="/assets/uppi-avatar-poster.png" autoPlay muted loop playsInline aria-hidden="true"></video>
          </div>
          <div>
            <b>Уппи</b>
            <small id="status">в сети</small>
          </div>
          <span className="brand">uppora</span>
        </header>
        <main id="feed" aria-live="polite">
          <div className="day">сегодня</div>
          {/* первое сообщение — статикой (мгновенный первый кадр) */}
          <div className="msg otter">Привет! Я Уппи — выдра из uppora 🦦<span className="t" id="t0"></span></div>
        </main>
        <div id="dock"></div>
      </div>
      <canvas id="confetti" aria-hidden="true"></canvas>
    </div>
  );
}

/* ============================================================
   Движок переписки. SSR-safe: всё в эффекте.
   ============================================================ */
function useDialog() {
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("dlg");
    const feed = document.getElementById("feed")!;
    let interacted = false;
    const buzz = (p: number | number[]) => { if (!interacted) return; try { (navigator as any).vibrate && navigator.vibrate(p); } catch {} };
    document.addEventListener("pointerdown", () => { interacted = true; }, { once: true, capture: true });
    const dock = document.getElementById("dock")!;
    let alive = true;
    const now = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const t0 = document.getElementById("t0"); if (t0) t0.textContent = now();
    const scroll = () => { feed.scrollTop = feed.scrollHeight + 999; };
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, rm ? 1 : ms));

    const bubble = (cls: string, html: string) => {
      const d = document.createElement("div");
      d.className = "msg " + cls;
      d.innerHTML = html + `<span class="t">${now()}</span>`;
      feed.appendChild(d); scroll(); return d;
    };
    let lastOtter = false;
    const status = document.getElementById("status");
    const say = async (html: string) => {
      if (!alive) return;
      if (status) status.textContent = "печатает…";
      const tp = document.createElement("div");
      tp.className = "typing";
      tp.innerHTML = '<span class="tava"><img src="/assets/otter-peek.png" alt=""/></span><i></i><i></i><i></i>';
      feed.appendChild(tp); scroll();
      await sleep(Math.min(400 + html.length * 16, 1700));
      tp.remove();
      if (status) status.textContent = "в сети";
      if (!alive) return;
      bubble("otter" + (lastOtter ? " chain" : ""), html);
      buzz(8);
      lastOtter = true;
      await sleep(280);
    };
    const sticker = async (src2: string) => {
      if (status) status.textContent = "отправляет стикер…";
      await sleep(650);
      if (status) status.textContent = "в сети";
      const d = document.createElement("div");
      d.className = "sticker"; d.innerHTML = `<img src="${src2}" alt=""/>`;
      feed.appendChild(d); scroll(); lastOtter = false;
      buzz(8);
      await sleep(500);
    };
    const me = (text: string) => { lastOtter = false; bubble("me", text); };
    const attach = async (html: string, cls = "") => {
      await sleep(350);
      const d = document.createElement("div");
      d.className = "attach " + cls; d.innerHTML = html;
      feed.appendChild(d); scroll(); lastOtter = false;
      const amt = d.querySelector("[data-amt]") as HTMLElement | null;
      if (amt && !rm) {
        const to = parseInt(amt.dataset.amt || "0", 10), s0 = performance.now();
        (function tk(t: number) {
          const p = Math.min((t - s0) / 700, 1);
          amt.textContent = "+" + Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("ru-RU") + " ₽";
          if (p < 1) requestAnimationFrame(tk);
        })(s0);
        const r = d.getBoundingClientRect();
        for (let k = 0; k < 3; k++) setTimeout(() => {
          const h = document.createElement("div");
          h.className = "heartburst"; h.textContent = "💚";
          h.style.setProperty("--dx", (k - 1) * 26 + "px");
          h.style.left = r.left + 40 + k * 34 + "px"; h.style.top = r.top + 10 + "px";
          document.body.appendChild(h); setTimeout(() => h.remove(), 1400);
        }, 250 + k * 160);
      }
      buzz([10, 40, 10]);
      return d;
    };
    const ask = (opts: Array<{ l: string; v: string; p?: boolean }>): Promise<string> =>
      new Promise((res) => {
        const w = document.createElement("div"); w.className = "opts";
        opts.forEach((o) => {
          const b = document.createElement("button");
          b.type = "button"; b.className = "opt" + (o.p ? " primary" : ""); b.textContent = o.l;
          b.onclick = () => { dock.innerHTML = ""; me(o.l); res(o.v); };
          w.appendChild(b);
        });
        dock.innerHTML = ""; dock.appendChild(w); scroll();
      });
    const input = (ph: string, type = "text", validate?: (v: string) => string | null): Promise<string> =>
      new Promise((res) => {
        const w = document.createElement("div"); w.className = "inrow";
        const i = document.createElement("input");
        i.placeholder = ph; i.type = type; (i as any).autocapitalize = "sentences";
        if (type === "email") i.autocomplete = "email";
        if (type === "number") i.inputMode = "numeric";
        const b = document.createElement("button");
        b.type = "button"; b.className = "send";
        b.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12 L20 5 L14 12 L20 19 Z" fill="currentColor"/></svg>';
        const go = () => {
          const v = i.value.trim();
          const err = validate ? validate(v) : v ? null : "напиши что-нибудь";
          if (err) { i.placeholder = err; i.value = ""; return; }
          dock.innerHTML = ""; me(v); res(v);
        };
        b.onclick = go;
        i.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
        w.append(i, b);
        dock.innerHTML = ""; dock.appendChild(w); scroll();
        setTimeout(() => i.focus(), rm ? 0 : 350);
      });

    /* реакция-сердце по тапу на пузырь Уппи */
    feed.addEventListener("click", (e) => {
      const m = (e.target as HTMLElement).closest(".msg.otter, .attach");
      if (!m || rm) return;
      const h = document.createElement("div");
      h.className = "heartfly"; h.textContent = "💚";
      h.style.left = (e as MouseEvent).clientX - 8 + "px";
      h.style.top = (e as MouseEvent).clientY - 8 + "px";
      document.body.appendChild(h); setTimeout(() => h.remove(), 1000);
    });

    function confetti() {
      const cv = document.getElementById("confetti") as HTMLCanvasElement, ctx = cv.getContext("2d")!;
      cv.width = innerWidth; cv.height = innerHeight;
      const cs = ["#00C147", "#7FE0A7", "#F0F5EF", "#D9B896"];
      const ps = Array.from({ length: 50 }, () => ({
        x: innerWidth / 2 + (Math.random() - 0.5) * 260, y: innerHeight / 2 + (Math.random() - 0.5) * 90,
        vx: (Math.random() - 0.5) * 7, vy: -(Math.random() * 7 + 3),
        s: Math.random() * 7 + 4, r: Math.random() * Math.PI, c: cs[(Math.random() * cs.length) | 0],
      }));
      const s0 = performance.now();
      (function f(t: number) {
        const dt = t - s0; ctx.clearRect(0, 0, cv.width, cv.height);
        if (dt > 1500) return;
        for (const p of ps) {
          p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.r += 0.06;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.globalAlpha = Math.max(1 - dt / 1500, 0); ctx.fillStyle = p.c;
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); ctx.restore();
        }
        requestAnimationFrame(f);
      })(s0);
    }

    const fmt = (n: number) => n.toLocaleString("ru-RU");
    const st = { name: "", about: "", amounts: [100, 300, 500], goal: 0 };
    const pageCardHTML = (withGoal: boolean) => `
      <div class="pagecard">
        <div class="plabel">твоя страница · живая</div>
        <div class="ph">
          <div class="pa">${st.name ? Array.from(st.name)[0].toUpperCase() : "?"}</div>
          <div><div class="pn">${st.name || "Твоя страница"}</div><div class="pd">${st.about || ""}</div></div>
        </div>
        ${withGoal && st.goal ? `<div class="pgoal"><span>цель</span><b id="pg-num">0 из ${fmt(st.goal)} ₽</b></div><div class="pbar"><i id="pg-bar"></i></div>` : ""}
        <div class="chips">${st.amounts.map((a) => `<span class="chip">${fmt(a)} ₽</span>`).join("")}</div>
        <div class="pbtn">Поддержать</div>
      </div>`;

    /* ================= СЦЕНАРИЙ ================= */
    (async () => {
      await sleep(900);
      await say("Это не сайт. Это переписка. Так у нас всё и устроено 😌");
      const w0 = await ask([{ l: "Ну, привет", v: "hi", p: true }, { l: "А ты кто вообще?", v: "who" }]);
      if (w0 === "who") {
        await say("Талисман и первый сотрудник uppora. Отвечаю за то, чтобы авторам говорили спасибо. Зарплату беру рыбой 🐟");
      }
      await say("Ты делаешь что-то своё? Треки, стримы, тексты, видео?");
      const w1 = await ask([{ l: "Да, делаю", v: "y", p: true }, { l: "Пока только думаю", v: "n" }]);
      if (w1 === "n") await say("Тогда досмотри переписку — поймёшь, ради чего начинать 😉");
      await say("А что бесит в деньгах за творчество?");
      const pain = await ask([
        { l: "Реклама решает всё", v: "ads" },
        { l: "Просить — стыдно", v: "shame" },
        { l: "Сервисы жрут процент", v: "fees" },
      ]);
      if (pain === "ads") await say("Ага. Один-два рекламодателя решают, будет ли у тебя месяц. А аудитория «маловата для брендов» — хотя ждёт именно тебя.");
      if (pain === "shame") await say("Знакомо. Ссылка «на кофе» ощущается как протянутая ладонь. Так быть не должно.");
      if (pain === "fees") await say("Да-да. Комиссии мутные, выплаты «в течение N дней», а через год сервис закрывается.");
      await sticker("/assets/uppi-sad.png");
      await say("Мы это переворачиваем. Смотри, что мне только что прилетело 👇");
      await attach(`
        <div class="don">
          <div class="dico">💚</div>
          <div>
            <b data-amt="300">+0 ₽</b> <span class="dc">· гостевой донат</span>
            <div class="dnote">«твои треки со мной весь год. продолжай!»</div>
          </div>
        </div>`, "glow");
      await say("Вот это — донат на uppora. <em>Не милостыня. Признание.</em> Человек просто сказал: «я вижу, что ты делаешь».");
      await say("<b>Ты не просишь — тебя благодарят.</b>");
      await sticker("/assets/uppi-heart.png");
      const w2 = await ask([{ l: "А комиссия какая?", v: "fee" }, { l: "Хочу так же", v: "go", p: true }]);
      if (w2 === "fee") {
        await say("7,5% в бете. <b>Вся.</b> В кабинете три строки: заработано, комиссия, чистыми. Платежи проводит Т-Банк, вывод на карту с SMS-подтверждением.");
        await ask([{ l: "Ок, хочу так же", v: "go", p: true }]);
      }
      await say("Тогда собираю твою страницу прямо в переписке. Как тебя зовут — или как называется проект?");
      st.name = await input("Маша пишет музыку");
      await say(`${st.name} — звучит! Чем занимаешься? Одной строкой.`);
      st.about = await input("Инди-треки каждую неделю");
      await say("Суммы поддержки поставлю 100 / 300 / 500 ₽ — донатер сможет ввести и свою. Ок?");
      const w3 = await ask([{ l: "Ок", v: "ok", p: true }, { l: "Хочу свои", v: "own" }]);
      if (w3 === "own") {
        const a = await input("Три суммы через запятую: 50, 200, 1000", "text", (v) => {
          const xs = v.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => n >= 10);
          return xs.length ? null : "числа от 10, через запятую";
        });
        st.amounts = a.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => n >= 10).slice(0, 5);
      }
      await say("Цель с полоской прогресса добавим? Типа «на новый микрофон — 30 000 ₽». Полоску ужасно хочется добить 😄");
      const w4 = await ask([{ l: "Давай", v: "y", p: true }, { l: "Без цели", v: "n" }]);
      if (w4 === "y") {
        const g = await input("Сумма цели, например 30000", "number", (v) => (parseInt(v, 10) >= 100 ? null : "от 100 ₽"));
        st.goal = parseInt(g, 10);
      }
      await say("Готово. Смотри 👇");
      await attach(pageCardHTML(true));
      await say("Она настоящая — не макет. Куда прислать ключи от кабинета? Пароля не будет, только ссылка на почту.");
      await input("you@example.com", "email", (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "похоже, опечатка в адресе"));
      /* ДЛЯ ИГОРЯ: сюда — endpoint одношаговой регистрации (magic link); payload = st + email */
      console.log("uppora register:", st);
      if (!rm) confetti();
      await say("Письмо летит ✉️ Открой его — и можно делиться страницей.");
      await say("И сразу репетиция. Лови первое признание 👇");
      await attach(`
        <div class="don">
          <div class="dico">🦦</div>
          <div>
            <b data-amt="100">+0 ₽</b> <span class="dc">· от Уппи</span>
            <div class="dnote">«добро пожаловать. продолжай!»</div>
          </div>
        </div>`, "glow");
      const bar = document.getElementById("pg-bar"), num = document.getElementById("pg-num");
      if (bar && num && st.goal) { bar.style.width = Math.max(5, Math.min(100, (100 / st.goal) * 100)) + "%"; num.textContent = `100 из ${fmt(st.goal)} ₽`; }
      await say("Это была репетиция — настоящее начнётся после подтверждения почты. Мы, кстати, первые авторы на собственной платформе: наши донаты открыто идут в разработку.");
      const tail = await ask([
        { l: "Про вывод денег", v: "money" },
        { l: "Кто вы такие?", v: "team" },
        { l: "Всё, я в деле 💚", v: "done", p: true },
      ]);
      if (tail === "money") await say("Баланс в кабинете: заработано / комиссия 7,5% / чистыми. Вывод на карту с подтверждением по SMS, статус каждой выплаты виден в истории.");
      if (tail === "team") await say("Костя, Илья, Игорь и я. Строим в открытую: каждый донат платформе превращается в фичу — и в сторис о ней.");
      await sticker("/assets/otter-megaphone.png");
      await say("Тогда до встречи в кабинете. И помни: <em>сто рублей громче ста лайков</em> 💚");
      const el = document.getElementById("status"); if (el) el.textContent = "печатает для авторов…";
    })();

    return () => { alive = false; document.body.classList.remove("dlg"); };
  }, []);
}
