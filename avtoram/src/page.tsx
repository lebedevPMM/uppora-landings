import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type CSSProperties } from "react";
import "../landing/landing.css";

declare global { interface Window { __HERO_FRAMES__?: number } }

export const Route = createFileRoute("/")({
  component: Index,
});

/* Декоративный SVG-спрайт иконок (aria-hidden). */
const SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<g id="i-check"><path d="M4 10.5 L8.5 15 L16 5.5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g id="i-heart"><path d="M10 17 C4 12.5 2 9.5 2 6.8 C2 4.5 3.8 3 5.8 3 C7.3 3 8.9 3.8 10 5.6 C11.1 3.8 12.7 3 14.2 3 C16.2 3 18 4.5 18 6.8 C18 9.5 16 12.5 10 17 Z" fill="currentColor"/></g>
<g id="i-shield"><path d="M10 2 L17 5 V10 C17 14 14 16.8 10 18 C6 16.8 3 14 3 10 V5 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 10 L9.2 12.2 L13.5 7.8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<g id="i-link"><path d="M8 12 L12 8 M6.5 9 L5 10.5 A3.5 3.5 0 0 0 9.5 15 L11 13.5 M13.5 11 L15 9.5 A3.5 3.5 0 0 0 10.5 5 L9 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>
<g id="i-card"><rect x="2" y="4" width="16" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 8.5 H18" stroke="currentColor" stroke-width="1.8"/><path d="M5 12.5 H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></g>
<g id="i-chat"><path d="M3 4 H17 V13 H8 L4.5 16 V13 H3 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></g>
<g id="i-bell"><path d="M10 3 C7 3 5.5 5.2 5.5 7.5 C5.5 11 4 12.5 4 12.5 H16 C16 12.5 14.5 11 14.5 7.5 C14.5 5.2 13 3 10 3 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 15.5 A1.8 1.8 0 0 0 11.5 15.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>
<g id="i-eye"><path d="M2 10 C4.5 5.5 8 4 10 4 C12 4 15.5 5.5 18 10 C15.5 14.5 12 16 10 16 C8 16 4.5 14.5 2 10 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/></g>
<g id="i-target"><circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="10" r="3.8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/></g>
<g id="i-report"><rect x="4" y="2.5" width="12" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 7 H13 M7 10 H13 M7 13 H10.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></g>
<g id="i-layers"><path d="M10 3 L17 7 L10 11 L3 7 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 11 L10 14.7 L16.5 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>
<g id="i-spark"><path d="M10 2 L11.8 7.6 L17.5 8.2 L13.2 11.9 L14.6 17.5 L10 14.3 L5.4 17.5 L6.8 11.9 L2.5 8.2 L8.2 7.6 Z" fill="currentColor"/></g>
</defs></svg>`;

function Icon({ id, size = 20, style }: { id: string; size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={style} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

function Chev() {
  return (
    <svg className="chev" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10 H15 M11 5 L16 10 L11 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


function Kinetic({ text, from = 0 }: { text: string; from?: number }) {
  let i = from;
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <span className="kword" key={wi}>
          {Array.from(w).map((ch, ci) => (
            <span className="kchar" style={{ ["--ci" as string]: i++ } as CSSProperties} key={ci}>{ch}</span>
          ))}
          {"\u00A0"}
        </span>
      ))}
    </>
  );
}

function Index() {
  useLanding();
  return (
    <div className="uppora">
      <div dangerouslySetInnerHTML={{ __html: SPRITE }} />
      <header className="up-header">
        <nav className="nav">
          <a className="wordmark" href="#top">uppora <small>для авторов</small></a>
          <a className="btn" href="#builder">Собрать страницу</a>
        </nav>
      </header>

      <main className="uppora-main" id="top">
        {/* HERO */}
        <div className="hero-pin" id="hero-pin">
        <section className="hero hero-act">
          <canvas id="hero-canvas" aria-hidden="true"></canvas>
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">открытая бета · подключение за 5 минут</span>
              <h1 aria-label="Ты не просишь — тебя благодарят"><span aria-hidden="true"><Kinetic text="Ты не просишь — тебя" /><span className="kword kchar kpulse" style={{ ["--ci" as string]: 19 } as CSSProperties}>благодарят<i className="kunderline"></i></span></span></h1>
              <p className="lead">uppora — страница, где твою работу признают рублём. Твоя аудитория и так хочет сказать тебе «продолжай». Мы просто даём ей способ — без пейволла, без кода и{" "}без неловкости.</p>
              <div className="hero-ctas">
                <a className="btn btn-primary btn-lg" href="#builder">Собрать страницу</a>
                <a className="btn btn-secondary btn-lg" href="#how">Как это работает</a>
              </div>
              <p className="hero-proof">
                <Icon id="i-heart" style={{ color: "var(--primary-ink)" }} />
                <span>Мы запускаем uppora как первые авторы на{" "}ней: донаты платформе открыто идут в{" "}разработку — и{" "}видно, во{" "}что.</span>
              </p>
            </div>
            <div className="hero-visual">
              <div className="film-plate" id="film-plate">
                <img id="film-poster" src="/frames/hero/f001.webp" alt="" aria-hidden="true" />
                <canvas id="hero-film" aria-hidden="true"></canvas>
                <div className="film-progress" aria-hidden="true"><span>признание</span><i><b id="film-bar"></b></i></div>
              </div>
              <div className="demo-card" role="img" aria-label="Пример страницы автора на uppora">
                <span className="demo-badge" aria-hidden="true">пример страницы</span>
                <div className="live-toast" id="live-toast" aria-hidden="true"><b id="lt-amt">+300 ₽</b><span id="lt-msg">«продолжай!»</span></div>
                <div className="dc-head">
                  <div className="dc-ava">М</div>
                  <div>
                    <div className="dc-name">Маша пишет музыку</div>
                    <div className="dc-desc">Инди-треки каждую неделю</div>
                  </div>
                </div>
                <div className="dc-goal"><span>На новый микрофон</span><b><span className="count" data-to="68">68</span>%</b></div>
                <div className="bar" id="hero-bar-wrap"><i id="hero-bar" style={{ width: "68%" }} /></div>
                <div className="dc-chips" aria-hidden="true">
                  <span className="chip">100 ₽</span><span className="chip on">300 ₽</span><span className="chip">500 ₽</span>
                </div>
                <span className="btn btn-primary dc-btn" aria-hidden="true">Поддержать Машу</span>
                <p className="dc-note">Так твою страницу видит донатер</p>
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true"><span>листай — выдра оживает</span><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 3 V16 M4 11 L10 17 L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        </section>
        </div>

        {/* БОЛИ */}
        <section>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">знакомо?</span>
              <h2>Три вещи, которые бесят в{" "}монетизации</h2>
              <p className="section-sub">Если узнаёшь себя хотя бы в{" "}одном — мы строили uppora для тебя.</p>
            </div>
            <div className="pains">
              <article className="pain reveal">
                <p className="pain-q">Весь мой доход — реклама</p>
                <p className="pain-body">Один-два рекламодателя решают, будет ли у тебя месяц. А для брендов аудитория вечно «маловата» — хотя каждый день ждёт именно твой контент.</p>
                <p className="pain-a"><Icon id="i-check" /><span>Тёплая аудитория готова поддерживать напрямую. Ей просто негде. Теперь есть где — и{" "}контент остаётся открытым.</span></p>
              </article>
              <article className="pain reveal">
                <p className="pain-q">Просить донаты — стыдно</p>
                <p className="pain-body">Ссылка «на кофе» ощущается как протянутая ладонь. Куда уходят деньги — непонятно, и от этого ещё неловче.</p>
                <p className="pain-a"><Icon id="i-check" /><span>Донат — это признание, а не милостыня. Сто рублей говорят автору больше, чем сто лайков. Страница говорит «спасибо», а{" "}не «подайте».</span></p>
              </article>
              <article className="pain reveal">
                <p className="pain-q">Очередной сервис заберёт процент и{" "}пропадёт</p>
                <p className="pain-body">Комиссии мутные, выплаты «в течение N дней», настройка съедает вечер. А через год сервис закрывается.</p>
                <p className="pain-a"><Icon id="i-check" /><span>Скучная честность: комиссия беты — 7,5%, и{" "}она видна в{" "}балансе отдельной строкой. Подключение — пять минут, без кода.</span></p>
              </article>
            </div>
          </div>
        </section>

        {/* КАК РАБОТАЕТ */}
        <section id="how" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">как это работает</span>
              <h2>Три шага — и{" "}тебя можно поддержать</h2>
            </div>
            <div className="steps">
              <article className="step reveal">
                <div className="step-n" aria-hidden="true"></div>
                <h3>Собери страницу</h3>
                <p>Имя, пара строк о себе, свои суммы поддержки. Хочешь — добавь цель с прогресс-баром: «на новый микрофон». Без кода, без пароля — вход по ссылке из письма.</p>
              </article>
              <article className="step reveal">
                <div className="step-n" aria-hidden="true"></div>
                <h3>Поделись ссылкой</h3>
                <p>В Telegram, на стриме, в шапке профиля. Ссылка и QR-код — всё, что нужно. Донатеру не надо регистрироваться: открыл, выбрал сумму, сказал «ты крутой».</p>
              </article>
              <article className="step reveal">
                <div className="step-n" aria-hidden="true"></div>
                <h3>Принимай признание</h3>
                <p>Донаты приходят с комментариями, баланс прозрачен до рубля, вывод — на карту. А когда что-то получилось — расскажи об этом поддержавшим. Это твой способ сказать «спасибо» в ответ.</p>
              </article>
            </div>
          </div>
        </section>

        {/* БИЛДЕР — главный CTA. Для Игоря: payload регистрации собирает buildPayload() в useLanding(). */}
        <section id="builder">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">попробуй прямо здесь</span>
              <h2>Собери свою страницу — она уже настоящая</h2>
              <p className="section-sub">Это не демо. Всё, что заполнишь ниже, станет твоей страницей на uppora, как только подтвердишь почту. Регистрация — одно поле, без пароля.</p>
            </div>
            <div className="builder-shell reveal">
              <div className="builder-grid" id="builder-live">
                <form id="builder-form" noValidate>
                  <div className="field">
                    <label htmlFor="f-name">Как тебя зовут — или как называется твой проект</label>
                    <input className="input" id="f-name" type="text" maxLength={60} placeholder="Маша пишет музыку" autoComplete="off" />
                    <p className="err-text" id="e-name">Без имени страница не соберётся — впиши хоть псевдоним.</p>
                  </div>
                  <div className="field">
                    <label htmlFor="f-about">Чем занимаешься — одна-две строки</label>
                    <input className="input" id="f-about" type="text" maxLength={90} placeholder="Инди-треки каждую неделю" autoComplete="off" />
                  </div>
                  <fieldset className="field">
                    <legend>Суммы поддержки, ₽</legend>
                    <div className="amount-row">
                      <input className="input" id="f-a1" type="number" inputMode="numeric" min={10} defaultValue={100} aria-label="Первая сумма" />
                      <input className="input" id="f-a2" type="number" inputMode="numeric" min={10} defaultValue={300} aria-label="Вторая сумма" />
                      <input className="input" id="f-a3" type="number" inputMode="numeric" min={10} defaultValue={500} aria-label="Третья сумма" />
                    </div>
                    <p className="err-text" id="e-amounts">Оставь хотя бы одну сумму — от 10 ₽.</p>
                    <p className="hint">Три стартовые — ещё две добавишь в кабинете. Донатер также сможет ввести свою сумму.</p>
                  </fieldset>
                  <div className="field">
                    <label className="toggle-row" htmlFor="f-goal-on">
                      <span className="toggle"><input type="checkbox" id="f-goal-on" /><i></i></span>
                      <span>Показать цель с прогресс-баром</span>
                    </label>
                    <div className="goal-fields" id="goal-fields">
                      <div>
                        <div className="field">
                          <label htmlFor="f-goal-title">На что собираешь</label>
                          <input className="input" id="f-goal-title" type="text" maxLength={60} placeholder="На новый микрофон" />
                        </div>
                        <div className="field">
                          <label htmlFor="f-goal-amount">Сумма цели, ₽</label>
                          <input className="input" id="f-goal-amount" type="number" inputMode="numeric" min={100} placeholder="30 000" />
                          <p className="err-text" id="e-goal">Впиши сумму цели — или выключи тумблер, цель не обязательна.</p>
                          <p className="hint">Цель ни к чему не обязывает — её можно менять или скрыть.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="save-row">
                    <button className="btn btn-primary btn-lg" type="button" id="btn-save" style={{ width: "100%" }}>Сохранить мою страницу</button>
                    <div className="email-step" id="email-step">
                      <div>
                        <div className="field">
                          <label htmlFor="f-email">Почта — и страница твоя</label>
                          <input className="input" id="f-email" type="email" placeholder="you@example.com" autoComplete="email" />
                          <p className="err-text" id="e-email">Похоже, в адресе опечатка — проверь.</p>
                          <p className="hint">Без пароля: пришлём ссылку для входа в кабинет. Почта нужна только для этого.</p>
                        </div>
                        <button className="btn btn-primary btn-lg" type="submit" id="btn-email" style={{ width: "100%" }}>Получить ссылку на кабинет</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="preview-col">
                  <div className="preview-sticky">
                    <p className="preview-label">Живое превью — так тебя увидят</p>
                    <div className="demo-card" id="pv-card" style={{ width: "100%" }}>
                      <img className="otter-img otter-peek otter-peek-rise" id="pv-otter" src="/assets/otter-peek.png" alt="" aria-hidden="true" />
                      <div className="dc-head">
                        <div className="dc-ava" id="pv-ava">?</div>
                        <div>
                          <div className="dc-name" id="pv-name">Твоя страница</div>
                          <div className="dc-desc" id="pv-about">Пара слов о том, что ты делаешь</div>
                        </div>
                      </div>
                      <div id="pv-goal-wrap" style={{ display: "none" }}>
                        <div className="dc-goal"><span id="pv-goal-title">Цель</span><b>0 из <span id="pv-goal-amount">0</span> ₽</b></div>
                        <div className="bar"><i style={{ width: "6%" }} /></div>
                      </div>
                      <div className="dc-chips" id="pv-chips">
                        <span className="chip">100 ₽</span><span className="chip">300 ₽</span><span className="chip">500 ₽</span>
                      </div>
                      <span className="btn btn-primary dc-btn" id="pv-btn" aria-hidden="true">Поддержать</span>
                      <p className="dc-note">Гостевой донат: без регистрации, оплата на стороне Т-Банка</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="builder-success" id="builder-success" role="status">
                <img className="otter-img" id="success-otter" src="/assets/otter-megaphone.png" alt="" style={{ width: 138, margin: "0 auto" }} aria-hidden="true" />
                <h3>Страница собрана!</h3>
                <p>Осталось подтвердить почту — письмо летит на <b id="success-email"></b>. Открой его, зайди в кабинет, и можно делиться страницей.</p>
                <div id="rehearsal-slot"></div>
                <p className="rehearsal-caption" id="rehearsal-caption" style={{ display: "none" }}>Это была репетиция. Настоящее признание — после подтверждения почты.</p>
                <p style={{ marginTop: 12 }}><button type="button" className="tlink" id="btn-fix-email" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: ".9rem" }}>Опечатка в почте? Исправить</button></p>
              </div>
            </div>
          </div>
        </section>

        {/* ФУНКЦИОНАЛ БЕТЫ — bento */}
        <section>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">что внутри беты</span>
              <h2>Из чего состоит твоя страница и{" "}кабинет</h2>
              <p className="section-sub">Без «скоро» и звёздочек: вот как устроена бета — страница, донаты, деньги и общение с теми, кто тебя поддержал.</p>
            </div>
            <div className="feats">
              <article className="feat wide reveal">
                <div className="ico"><Icon id="i-heart" /></div>
                <h3>Гостевой донат</h3>
                <p>Поддержать может любой — без регистрации и приложения. Весь путь донатера:</p>
                <div className="mini-flow" aria-hidden="true">
                  <span className="pill">открыл ссылку</span><Arrow /><span className="pill">выбрал сумму</span><Arrow /><span className="pill ok">оплатил в Т-Банке ✓</span>
                </div>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-shield" /></div>
                <h3>Оплата через Т-Банк</h3>
                <p>Карта донатера вводится на стороне банка, не у нас. Безопасная сделка на каждом платеже.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-spark" /></div>
                <h3>Свои суммы поддержки</h3>
                <p>До пяти шаблонов сумм + произвольная. И кнопка «докинуть до цели» — донатеры любят красивые числа.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-target" /></div>
                <h3>Цель с прогресс-баром</h3>
                <p>«Собрано 5 256 из 10 000» — если хочешь. Полоску хочется добить: так уж устроены люди.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-report" /></div>
                <h3>Отчёты «что получилось»</h3>
                <p>Расскажи поддержавшим, что выросло из их донатов. Добровольно — вывод денег отчёты не блокируют.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-chat" /></div>
                <h3>Комментарии и подписчики</h3>
                <p>Донаты приходят со словами. Подписчики, ответы автора, модерация — всё под твоим контролем.</p>
              </article>
              <article className="feat wide reveal">
                <div className="ico"><Icon id="i-eye" /></div>
                <h3>Прозрачный баланс</h3>
                <p>Никакой арифметики мелким шрифтом — три строки в кабинете:</p>
                <div className="mini-balance" aria-hidden="true">
                  <div><span>Заработано</span><b><span className="count" data-to="12000">12 000</span> ₽</b></div>
                  <div><span>Комиссия беты (7,5%)</span><b>− <span className="count" data-to="900">900</span> ₽</b></div>
                  <div className="net"><span>Чистыми — твои</span><b><span className="count" data-to="11100">11 100</span> ₽</b></div>
                </div>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-card" /></div>
                <h3>Вывод на карту</h3>
                <p>Из кабинета, с подтверждением по SMS. И несколько проектов на одном аккаунте, если ведёшь сразу пару дел.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-link" /></div>
                <h3>Ссылка и QR</h3>
                <p>Шаринг без танцев: скопировал ссылку в шапку профиля — или показал QR со сцены и со стрима.</p>
              </article>
              <article className="feat reveal">
                <div className="ico"><Icon id="i-bell" /></div>
                <h3>Уведомления</h3>
                <p>Донат, новый подписчик, комментарий — узнаёшь сразу: колокольчик в кабинете и почта.</p>
              </article>
            </div>
            <p className="beta-note reveal">
              <Icon id="i-spark" style={{ color: "var(--primary-ink)" }} />
              <span>Бета — значит, продукт растёт каждую неделю, и запросы первых авторов попадают в план работ без очереди.</span>
            </p>
          </div>
        </section>

        {/* ДЕНЬГИ */}
        <section className="money">
          <div className="coin c1" aria-hidden="true">₽</div>
          <div className="coin c2" aria-hidden="true">₽</div>
          <div className="coin c3" aria-hidden="true">₽</div>
          <div className="coin c4" aria-hidden="true">₽</div>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">про деньги — скучно и честно</span>
              <h2>Одна комиссия. Видна всегда.</h2>
            </div>
            <div className="money-grid reveal">
              <div className="money-big"><span className="count" data-to="7.5" data-decimals="1">7,5</span>%<small>комиссия в бете — вся, целиком</small></div>
              <ul className="money-list">
                <li><Icon id="i-check" style={{ color: "var(--primary-ink)" }} /><span><b>Остальное — твоё.</b> Никаких «от 90 до 96% в зависимости от фазы луны»: в балансе три строки — заработано, комиссия, чистыми.</span></li>
                <li><Icon id="i-shield" style={{ color: "var(--primary-ink)" }} /><span><b>Платежи проводит Т-Банк.</b> Мы не храним карточные данные — ни твои, ни донатеров.</span></li>
                <li><Icon id="i-card" style={{ color: "var(--primary-ink)" }} /><span><b>Вывод — на карту из кабинета.</b> Подтверждение по SMS, статус каждой выплаты виден в истории.</span></li>
                <li><Icon id="i-eye" style={{ color: "var(--primary-ink)" }} /><span><b>Если что-то изменится — скажем заранее.</b> Мы строим uppora в открытую, и условия — не исключение.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* МАРКИ-ЛЕНТА ПРИЗНАНИЯ */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (<span key={k}>спасибо ♥ продолжай <b>·</b> ты крутой ♥ мы тебя видим <b>·</b> сто рублей громче ста лайков <b>·</b>{"\u00A0"}</span>))}
          </div>
        </div>

        {/* СЦЕНА ПРИЗНАНИЯ */}
        <section>
          <div className="wrap">
            <div className="manifesto reveal">
              <span className="eyebrow">зачем мы это делаем</span>
              <h2>Вот что такое донат</h2>
              <div className="scene-wrap">
                <div className="scene-phone" id="scene">
                  <div className="scene-top">кабинет автора · сцена-пример</div>
                  <div className="sc-item sc-notif" id="sc-notif">
                    <span className="ic"><Icon id="i-heart" /></span>
                    <p><b>Кто-то поддержал тебя · 400 ₽</b><br />гостевой донат, с телефона, без регистрации</p>
                  </div>
                  <div className="sc-item sc-bubble" id="sc-bubble"><span id="sc-text"></span><i className="caret"></i></div>
                  <div className="sc-item sc-foot" id="sc-foot">
                    <span>Баланс чистыми</span>
                    <span><b id="sc-bal">12 400</b> ₽ <span className="sc-plus" id="sc-plus">+370 ₽</span></span>
                  </div>
                  <img className="otter-img scene-otter" id="sc-otter" src="/assets/otter-coin.png" alt="" aria-hidden="true" />
                </div>
                <button type="button" className="sc-replay" id="sc-replay">Проиграть ещё раз</button>
                <p className="scene-caption">400 ₽ − комиссия беты 7,5% (30 ₽) = 370 ₽ чистыми. Всё видно сразу.</p>
              </div>
              <p className="lead" style={{ marginTop: 26 }}><span className="kicker">Никакой милостыни и никаких подписок.</span> Человек просто говорит: «Я вижу, что ты делаешь. Продолжай». Мы строим uppora, чтобы это было легко сказать — и{" "}легко услышать.</p>
              <div className="first-author reveal">
                <div className="ico"><Icon id="i-spark" size={22} /></div>
                <div>
                  <h3>Первый автор на uppora — сама uppora</h3>
                  <p>Мы заводим собственные страницы на платформе: донаты открыто идут в разработку, и видно, во что именно. Механику признания проверяем на себе — раньше, чем предлагаем её тебе.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="section-head reveal" style={{ textAlign: "center" }}>
              <span className="eyebrow">честные ответы</span>
              <h2>Что обычно спрашивают</h2>
            </div>
            <div className="faq reveal">
              {[
                ["Я не технарь. Точно справлюсь?", "Да. Страница собирается в конструкторе выше — ты уже видел всё, что нужно уметь. Пароля нет: вход по ссылке из письма. Код, хостинг, настройки платёжки — не твоя забота."],
                ["У меня небольшая аудитория. Есть ли смысл?", "Поддержка начинается с десятков людей, не с тысяч. Для рекламодателя 800 подписчиков — «мало», для доната достаточно пяти человек, которым ты правда важен. Маленькие реальные цифры — это не стыдно, это начало."],
                ["Это не будет выглядеть как попрошайничество?", "Нет — и это главное, что мы делаем иначе. Страница построена вокруг признания: донатер говорит «ты крутой», а не «держи на бедность». Без давящих попапов, без грустных счётчиков, без вины. А отчёты «что получилось» превращают поддержку в общее дело."],
                ["А если никто не задонатит?", "Страница ничего не стоит и никуда не торопит. Цель можно не показывать, суммы — любые. Начни с ближнего круга: первый донат почти всегда приходит от того, кто давно хотел сказать спасибо, но не знал как."],
                ["Какая комиссия и куда уходят деньги?", "Комиссия беты — 7,5%, всё остальное — автору. В кабинете три строки: заработано, комиссия, чистыми. Платежи проводит Т-Банк, вывод — на твою карту с подтверждением по SMS."],
                ["Почему бета? Что это значит для меня?", "Значит, продукт молодой и растёт каждую неделю — и мы говорим об этом прямо, а не прячем. Для тебя это ранний доступ: внимания команды хватает на каждого, потому что на бете каждый автор на счету."],
              ].map(([q, a], i) => (
                <div className="qa" key={i}>
                  <button type="button" aria-expanded="false">{q}<Chev /></button>
                  <div className="qa-a"><div><p>{a}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ФИНАЛ */}
        <section className="final">
          <div className="wrap">
            <img className="otter-img otter-final otter-sway" src="/assets/otter-megaphone.png" alt="" aria-hidden="true" />
            <h2>Сделай себе место, где говорят «продолжай»</h2>
            <p>Ты видел, как это просто, — конструктор выше уже ждёт. Осталось вписать своё имя.</p>
            <a className="btn btn-primary btn-lg" href="#builder">Собрать страницу</a>
          </div>
        </section>
      </main>

      <footer className="up-footer">
        <div className="wrap">
          <div className="foot-row">
            <span className="foot-brand">uppora</span>
            <nav className="foot-links">
              <a href="#top">Условия сервиса</a>
              <a href="#top">Политика данных</a>
              <a href="#top">Поддержка</a>
            </nav>
          </div>
          <p className="foot-note">uppora — платформа поддержки авторов. Открытая бета: функциональность растёт, о заметных изменениях — включая условия и комиссию — сообщаем заранее.</p>
        </div>
      </footer>

      <canvas id="confetti" aria-hidden="true"></canvas>
      <div id="companion" className="comp-hidden" aria-hidden="true">
        <img id="companion-img" src="/assets/otter-peek.png" alt="" />
      </div>
      <div id="pageGoal" aria-hidden="true"><i id="pageGoalFill"></i></div>
      <div id="pageGoalChip" aria-hidden="true"><span id="pageGoalText">дочитано 0%</span></div>
    </div>
  );
}

/* ============================================================
   Вся интерактивность (C8 + сюжетные механики) — в одном эффекте.
   SSR-safe: браузерные API только внутри useEffect.
   ============================================================ */
function useLanding() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("uppora");
    const cleanups: Array<() => void> = [];
    const on = (t: EventTarget, e: string, fn: any, opts?: any) => { t.addEventListener(e, fn, opts); cleanups.push(() => t.removeEventListener(e, fn, opts)); };

    /* ---------- count-up ---------- */
    function countUp(el: HTMLElement) {
      const to = parseFloat(el.dataset.to || "0"), dec = +(el.dataset.decimals || 0);
      if (reduceMotion) { el.textContent = to.toLocaleString("ru-RU", { minimumFractionDigits: dec, maximumFractionDigits: dec }); return; }
      const t0 = performance.now(), dur = 900;
      (function tick(t: number) {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toLocaleString("ru-RU", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    const ioCount = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { countUp(e.target as HTMLElement); ioCount.unobserve(e.target); } }); }, { threshold: 0.5 });
    document.querySelectorAll<HTMLElement>(".count").forEach((el) => {
      if (!reduceMotion) el.textContent = (0).toLocaleString("ru-RU", { minimumFractionDigits: +(el.dataset.decimals || 0) });
      ioCount.observe(el);
    });
    cleanups.push(() => ioCount.disconnect());

    /* ---------- hero bar + чипы ---------- */
    const heroBar = $("hero-bar") as HTMLElement | null;
    if (heroBar && !reduceMotion) {
      heroBar.style.transition = "none"; heroBar.style.width = "0";
      heroBar.getBoundingClientRect(); heroBar.style.transition = "";
      const ioBar = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { requestAnimationFrame(() => { heroBar.style.width = "68%"; }); ioBar.disconnect(); } }); }, { threshold: 0.4 });
      ioBar.observe($("hero-bar-wrap")!); cleanups.push(() => ioBar.disconnect());
    }
    document.querySelectorAll(".dc-chips").forEach((group) => {
      on(group, "click", (e: MouseEvent) => {
        const chip = (e.target as HTMLElement).closest(".chip"); if (!chip) return;
        Array.from(group.children).forEach((c) => c.classList.toggle("on", c === chip));
      });
    });

    /* ---------- FAQ ---------- */
    document.querySelectorAll(".qa").forEach((qa, i) => {
      const btn = qa.querySelector("button")!, panel = qa.querySelector(".qa-a")!;
      panel.id = "qa-a-" + i; btn.setAttribute("aria-controls", panel.id);
      on(btn, "click", () => { const open = qa.classList.toggle("open"); btn.setAttribute("aria-expanded", String(open)); });
    });

    /* ---------- билдер ---------- */
    const fName = $("f-name") as HTMLInputElement, fAbout = $("f-about") as HTMLInputElement, fEmail = $("f-email") as HTMLInputElement;
    const amounts = [$("f-a1"), $("f-a2"), $("f-a3")] as HTMLInputElement[];
    const goalOn = $("f-goal-on") as HTMLInputElement, goalTitle = $("f-goal-title") as HTMLInputElement, goalAmount = $("f-goal-amount") as HTMLInputElement;
    const fmt = (n: any) => (+n || 0).toLocaleString("ru-RU");
    function syncPreview() {
      const name = fName.value.trim();
      $("pv-name")!.textContent = name || "Твоя страница";
      $("pv-ava")!.textContent = name ? Array.from(name)[0].toUpperCase() : "?";
      $("pv-about")!.textContent = fAbout.value.trim() || "Пара слов о том, что ты делаешь";
      Array.from($("pv-chips")!.children).forEach((chip, i) => {
        const v = parseInt(amounts[i].value, 10);
        (chip as HTMLElement).style.display = v > 0 ? "" : "none";
        if (v > 0) chip.textContent = fmt(v) + " ₽";
      });
      const g = goalOn.checked;
      $("pv-goal-wrap")!.style.display = g ? "" : "none";
      $("goal-fields")!.classList.toggle("open", g);
      if (g) {
        $("pv-goal-title")!.textContent = goalTitle.value.trim() || "Цель";
        $("pv-goal-amount")!.textContent = fmt(goalAmount.value || 0);
      }
    }
    [fName, fAbout, goalTitle, goalAmount, ...amounts].forEach((el) => on(el, "input", syncPreview));
    on(goalOn, "change", syncPreview);
    syncPreview();

    function buildPayload() {
      return {
        name: fName.value.trim(), about: fAbout.value.trim(),
        amounts: amounts.map((a) => parseInt(a.value, 10)).filter((v) => v > 0),
        goal: { enabled: goalOn.checked, title: goalTitle.value.trim(), amount: parseInt(goalAmount.value, 10) || null },
        email: fEmail.value.trim(),
      };
    }
    function trySave() {
      let firstBad: HTMLElement | null = null;
      const nameOk = !!fName.value.trim();
      fName.classList.toggle("err", !nameOk); $("e-name")!.classList.toggle("show", !nameOk);
      if (!nameOk) firstBad = firstBad || fName;
      const amtOk = amounts.some((a) => parseInt(a.value, 10) >= 10);
      amounts.forEach((a) => a.classList.toggle("err", !amtOk)); $("e-amounts")!.classList.toggle("show", !amtOk);
      if (!amtOk) firstBad = firstBad || amounts[0];
      const goalOk = !goalOn.checked || parseInt(goalAmount.value, 10) > 0;
      goalAmount.classList.toggle("err", !goalOk); $("e-goal")!.classList.toggle("show", !goalOk);
      if (!goalOk) firstBad = firstBad || goalAmount;
      if (firstBad) { firstBad.focus(); return false; }
      $("email-step")!.classList.add("open");
      $("btn-save")!.style.display = "none";
      setTimeout(() => fEmail.focus(), reduceMotion ? 0 : 260);
      return true;
    }
    on($("btn-save")!, "click", trySave);
    on(fName, "input", () => { fName.classList.remove("err"); $("e-name")!.classList.remove("show"); });
    amounts.forEach((a) => on(a, "input", () => { amounts.forEach((x) => x.classList.remove("err")); $("e-amounts")!.classList.remove("show"); }));
    on(goalAmount, "input", () => { goalAmount.classList.remove("err"); $("e-goal")!.classList.remove("show"); });

    let pvCardHome: HTMLElement | null = null, rehearsalPlayed = false;
    function playRehearsal() {
      if (rehearsalPlayed) return; rehearsalPlayed = true;
      const card = $("pv-card")!;
      const t = document.createElement("div");
      t.className = "rehearsal-toast";
      t.innerHTML = '<b>+100 ₽</b><span>«Добро пожаловать. Продолжай!»</span>';
      card.appendChild(t);
      requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("show")));
      $("rehearsal-caption")!.style.display = "";
      const po = $("pv-otter");
      if (po) { po.classList.remove("otter-peek-rise", "otter-pop"); void (po as HTMLElement).offsetWidth; po.classList.add("otter-pop"); }
      const gw = $("pv-goal-wrap");
      if (gw && gw.style.display !== "none") {
        const bar = gw.querySelector(".bar>i") as HTMLElement | null; if (bar) bar.style.width = "9%";
        const bEl = gw.querySelector(".dc-goal b");
        if (bEl && bEl.childNodes[0]) bEl.childNodes[0].textContent = "100 из ";
      }
    }
    on($("builder-form")!, "submit", (ev: Event) => {
      ev.preventDefault();
      if (!$("email-step")!.classList.contains("open")) { trySave(); return; }
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fEmail.value.trim());
      fEmail.classList.toggle("err", !ok); $("e-email")!.classList.toggle("show", !ok);
      if (!ok) { fEmail.focus(); return; }
      const payload = buildPayload();
      /* ДЛЯ ИГОРЯ: сюда — реальный endpoint одношаговой регистрации (magic link).
         Успех показывать только после 2xx; при ошибке сети данные не терять. */
      console.log("uppora register payload:", payload);
      ($("builder-form") as HTMLElement).dataset.payload = JSON.stringify(payload);
      $("success-email")!.textContent = fEmail.value.trim();
      $("builder-live")!.style.display = "none";
      const s = $("builder-success")!;
      s.classList.add("show");
      $("success-otter")!.classList.add("otter-pop");
      if (!reduceMotion) confettiBurst();
      const pvCard = $("pv-card")!;
      if (!pvCardHome) pvCardHome = pvCard.parentElement as HTMLElement;
      $("rehearsal-slot")!.appendChild(pvCard);
      setTimeout(playRehearsal, reduceMotion ? 100 : 1200);
      s.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
    on($("btn-fix-email")!, "click", () => {
      document.querySelectorAll(".rehearsal-toast").forEach((n) => n.remove());
      $("rehearsal-caption")!.style.display = "none";
      rehearsalPlayed = false;
      if (pvCardHome && $("pv-card")!.parentElement !== pvCardHome) pvCardHome.appendChild($("pv-card")!);
      $("builder-success")!.classList.remove("show");
      $("builder-live")!.style.display = "";
      $("email-step")!.classList.add("open");
      $("btn-save")!.style.display = "none";
      fEmail.focus();
    });

    /* ---------- сцена признания ---------- */
    const scText = "Твои треки со мной весь год. Продолжай!";
    let scPlaying = false; const scTimers: any[] = [];
    function scReset() {
      scTimers.forEach(clearTimeout); scTimers.length = 0;
      ["sc-notif", "sc-bubble", "sc-foot"].forEach((id) => $(id)!.classList.remove("show"));
      $("sc-bubble")!.classList.remove("done");
      $("sc-text")!.textContent = "";
      $("sc-plus")!.classList.remove("show");
      $("sc-otter")!.classList.remove("show", "otter-pop");
      $("sc-bal")!.textContent = "12 400";
    }
    function scPlay() {
      if (scPlaying) return; scPlaying = true; scReset();
      if (reduceMotion) {
        ["sc-notif", "sc-bubble", "sc-foot"].forEach((id) => $(id)!.classList.add("show"));
        $("sc-text")!.textContent = scText; $("sc-bubble")!.classList.add("done");
        $("sc-bal")!.textContent = "12 770"; $("sc-plus")!.classList.add("show");
        $("sc-otter")!.classList.add("show"); scPlaying = false; return;
      }
      scTimers.push(setTimeout(() => $("sc-notif")!.classList.add("show"), 350));
      scTimers.push(setTimeout(() => {
        $("sc-bubble")!.classList.add("show");
        let i = 0;
        (function type() {
          if (i <= scText.length) { $("sc-text")!.textContent = scText.slice(0, i); i++; scTimers.push(setTimeout(type, 26)); }
          else {
            $("sc-bubble")!.classList.add("done");
            $("sc-foot")!.classList.add("show");
            const t0 = performance.now(), from = 12400, to = 12770, dur = 700;
            (function tick(t: number) {
              const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
              $("sc-bal")!.textContent = Math.round(from + (to - from) * e).toLocaleString("ru-RU");
              if (p < 1) requestAnimationFrame(tick); else $("sc-plus")!.classList.add("show");
            })(t0);
            $("sc-otter")!.classList.add("show", "otter-pop");
            scTimers.push(setTimeout(() => { scPlaying = false; }, 900));
          }
        })();
      }, 1400));
    }
    const ioScene = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { scPlay(); ioScene.disconnect(); } }); }, { threshold: 0.45 });
    ioScene.observe($("scene")!); cleanups.push(() => ioScene.disconnect());
    on($("sc-replay")!, "click", () => { scPlaying = false; scPlay(); });

    /* ---------- hero live-лента ---------- */
    if (!reduceMotion) {
      const beats = [
        { amt: "+100 ₽", msg: "«спасибо за треки!»", pct: 71 },
        { amt: "+300 ₽", msg: "«продолжай!»", pct: 74 },
        { amt: "+200 ₽", msg: "«жду альбом»", pct: 76 },
      ];
      const pctEl = document.querySelector(".dc-goal .count") as HTMLElement;
      let bi = 0, heroSeen = false;
      const ioLive = new IntersectionObserver((es) => { es.forEach((e) => { heroSeen = e.isIntersecting; }); }, { threshold: 0.3 });
      ioLive.observe(document.querySelector(".hero .demo-card")!); cleanups.push(() => ioLive.disconnect());
      const iv = setInterval(() => {
        if (!heroSeen || document.hidden || !heroBar) return;
        const bt = beats[bi % beats.length];
        $("lt-amt")!.textContent = bt.amt; $("lt-msg")!.textContent = bt.msg;
        $("live-toast")!.classList.add("show");
        heroBar.style.width = bt.pct + "%";
        const from = parseInt(pctEl.textContent || "68", 10) || 68, to = bt.pct, t0 = performance.now();
        (function tick(t: number) {
          const p = Math.min((t - t0) / 600, 1);
          pctEl.textContent = String(Math.round(from + (to - from) * p));
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
        setTimeout(() => $("live-toast")!.classList.remove("show"), 3200);
        bi++;
        if (bi % beats.length === 0) setTimeout(() => { heroBar.style.width = "68%"; pctEl.textContent = "68"; }, 4400);
      }, 5200);
      cleanups.push(() => clearInterval(iv));
    }

    /* ---------- выдра-компаньон ---------- */
    const comp = $("companion")!, compImg = $("companion-img") as HTMLImageElement;
    const POSES: Record<string, string> = { peek: "/assets/otter-peek.png", coin: "/assets/otter-coin.png" };
    let current: string | null = null, swapping = false;
    function setPose(pose: string | null) {
      if (pose === current) return;
      if (swapping) return;
      if (!pose) { comp.classList.add("comp-hidden"); comp.classList.remove("comp-bob"); current = null; return; }
      if (current === null) {
        compImg.src = POSES[pose]; comp.classList.remove("comp-hidden"); comp.classList.add("comp-bob"); current = pose; return;
      }
      swapping = true; comp.classList.add("comp-hidden");
      setTimeout(() => {
        compImg.src = POSES[pose]; comp.classList.remove("comp-hidden");
        comp.classList.add("comp-hop"); setTimeout(() => comp.classList.remove("comp-hop"), 550);
        current = pose; swapping = false;
      }, 380);
    }
    const q = (s: string) => document.querySelector(s);
    const zones: Array<{ el: Element | null; pose: string | null }> = [
      { el: q(".hero"), pose: null },
      { el: q(".pain")?.closest("section") || null, pose: "peek" },
      { el: q("#how"), pose: "peek" },
      { el: q("#builder"), pose: null },
      { el: q(".feats")?.closest("section") || null, pose: "coin" },
      { el: q(".money"), pose: null },
      { el: q("#scene")?.closest("section") || null, pose: null },
      { el: q(".faq")?.closest("section") || null, pose: "peek" },
      { el: q(".final"), pose: null },
    ].filter((z) => z.el);
    const ioComp = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { const z = zones.find((z) => z.el === e.target); if (z) setPose(z.pose); } });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    zones.forEach((z) => ioComp.observe(z.el!)); cleanups.push(() => ioComp.disconnect());
    on(comp, "click", () => {
      comp.classList.remove("comp-hop"); void (comp as HTMLElement).offsetWidth;
      comp.classList.add("comp-hop"); setTimeout(() => comp.classList.remove("comp-hop"), 550);
    });

    /* ---------- страница = сбор ---------- */
    const fill = $("pageGoalFill")!, chipEl = $("pageGoalChip")!, txt = $("pageGoalText")!;
    let done = false, ticking = false;
    function updGoal() {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const p = Math.min(Math.max(window.scrollY / max, 0), 1), pct = Math.round(p * 100);
      (fill as HTMLElement).style.width = p * 100 + "%";
      chipEl.classList.toggle("on", pct >= 4);
      if (!done) {
        txt.textContent = "дочитано " + pct + "%";
        if (pct >= 99) {
          done = true; txt.textContent = "цель закрыта — ты дочитал!";
          chipEl.classList.add("done");
          if (!reduceMotion) confettiBurst();
        }
      }
    }
    on(window, "scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(updGoal); } }, { passive: true });
    updGoal();

    /* ---------- выдра следит за курсором ---------- */
    if (!reduceMotion) {
      const shell = document.querySelector(".builder-shell"), po = $("pv-otter") as HTMLElement | null;
      if (shell && po) {
        po.addEventListener("animationend", () => po.classList.remove("otter-peek-rise"), { once: true });
        on(shell, "mousemove", (e: MouseEvent) => {
          const r = (shell as HTMLElement).getBoundingClientRect();
          const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          po.style.transform = "rotate(" + (dx * 7).toFixed(1) + "deg)";
        });
        on(shell, "mouseleave", () => { po.style.transform = ""; });
      }
    }

    /* ---------- АКТ III: hero-скраб — скролл проигрывает фильм (A2) ---------- */
    const filmCv = $("hero-film") as HTMLCanvasElement | null;
    if (filmCv) {
      const FR = 101;
      const fctx = filmCv.getContext("2d")!;
      const pin = $("hero-pin")!;
      const filmBar = $("film-bar") as HTMLElement | null;
      const pad = (n: number) => String(n).padStart(3, "0");
      const frames: (HTMLImageElement | undefined)[] = new Array(FR);
      let curFrame = -1;
      const drawIm = (im: HTMLImageElement) => {
        if (filmCv.width !== im.naturalWidth || filmCv.height !== im.naturalHeight) {
          filmCv.width = im.naturalWidth; filmCv.height = im.naturalHeight;
        }
        fctx.drawImage(im, 0, 0, filmCv.width, filmCv.height);
      };
      const nearest = (i: number) => {
        for (let d = 0; d < FR; d++) {
          const a = frames[i - d], b = frames[i + d];
          if (a && a.complete && a.naturalWidth) return a;
          if (b && b.complete && b.naturalWidth) return b;
        }
        return undefined;
      };
      const draw = (i: number) => {
        i = Math.max(0, Math.min(FR - 1, i));
        if (i === curFrame) return;
        const im = nearest(i);
        if (im) { drawIm(im); curFrame = i; }
        if (filmBar) filmBar.style.width = ((i / (FR - 1)) * 100).toFixed(1) + "%";
      };
      const loadFrame = (i: number) => {
        if (frames[i]) return frames[i]!;
        const im = new Image();
        im.src = `/frames/hero/f${pad(i + 1)}.webp`;
        frames[i] = im;
        return im;
      };
      /* кадр 1 — сразу (screenshot-safe), остальные — стримом; устойчиво к кэшу */
      const ensure = (im: HTMLImageElement, cb: () => void) => {
        if (im.complete && im.naturalWidth) cb();
        else { im.addEventListener("load", cb, { once: true }); im.addEventListener("error", cb, { once: true }); }
      };
      ensure(loadFrame(0), () => { curFrame = -1; draw(0); });
      let li = 1;
      const streamNext = () => { if (li < FR) { const im = loadFrame(li); li++; ensure(im, streamNext); } };
      setTimeout(streamNext, 250);
      const isDesktop = window.innerWidth >= 861;
      if (reduceMotion) {
        const last = loadFrame(FR - 1);
        last.addEventListener("load", () => drawIm(last));
      } else if (isDesktop) {
        /* скраб: прогресс пина = кадр */
        let tickF = false;
        const onScrollF = () => {
          if (tickF) return; tickF = true;
          requestAnimationFrame(() => {
            tickF = false;
            const total = pin.offsetHeight - window.innerHeight;
            const y = window.scrollY - pin.offsetTop;
            const pr = Math.max(0, Math.min(1, total > 0 ? y / total : 0));
            draw(Math.round(pr * (FR - 1)));
          });
        };
        on(window, "scroll", onScrollF, { passive: true });
        onScrollF();
      } else {
        /* мобайл: проигрываем один раз при появлении; тап — реплей */
        let played = false;
        const playOnce = () => {
          const t0 = performance.now(), dur = 4200;
          (function fstep(t: number) {
            const p = Math.min((t - t0) / dur, 1);
            draw(Math.round(p * (FR - 1)));
            if (p < 1) requestAnimationFrame(fstep);
          })(t0);
        };
        const ioFilm = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting && !played) { played = true; setTimeout(playOnce, 500); } });
        }, { threshold: 0.5 });
        ioFilm.observe(filmCv); cleanups.push(() => ioFilm.disconnect());
        on($("film-plate")!, "click", playOnce);
      }
    }

    /* ---------- АКТ II: частицы признания в hero (интерактив: курсор отталкивает) ---------- */
    const heroCv = $("hero-canvas") as HTMLCanvasElement | null;
    if (heroCv && !reduceMotion) {
      const hctx = heroCv.getContext("2d")!;
      const heroSec = heroCv.parentElement as HTMLElement;
      let W = 0, H = 0, raf = 0;
      const resize = () => { W = heroCv.width = heroSec.offsetWidth; H = heroCv.height = heroSec.offsetHeight; };
      resize(); on(window, "resize", resize);
      const isMobile = window.innerWidth < 861;
      const N = isMobile ? 34 : 90;
      const mouse = { x: -9999, y: -9999 };
      on(heroSec, "mousemove", (e: MouseEvent) => { const r = heroSec.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
      on(heroSec, "mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
      const ps = Array.from({ length: N }, () => ({
        x: Math.random() * (W || 1200), y: Math.random() * (H || 800),
        vy: 0.25 + Math.random() * 0.5, vx: (Math.random() - 0.5) * 0.18,
        s: 2.5 + Math.random() * 4.5, o: 0.12 + Math.random() * 0.3, heart: Math.random() < 0.22,
      }));
      const drawHeart = (x: number, y: number, s: number) => {
        hctx.beginPath(); const t = s / 2;
        hctx.moveTo(x, y + t * 0.8);
        hctx.bezierCurveTo(x - s, y - t * 0.6, x - t * 0.5, y - s * 1.1, x, y - t * 0.3);
        hctx.bezierCurveTo(x + t * 0.5, y - s * 1.1, x + s, y - t * 0.6, x, y + t * 0.8);
        hctx.fill();
      };
      const frame = () => {
        hctx.clearRect(0, 0, W, H);
        for (const p of ps) {
          p.y -= p.vy; p.x += p.vx;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 16000) { const d = Math.sqrt(d2) || 1, f = ((16000 - d2) / 16000) * 2.2; p.x += (dx / d) * f; p.y += (dy / d) * f; }
          if (p.y < -12) { p.y = H + 12; p.x = Math.random() * W; }
          if (p.x < -12) p.x = W + 12; else if (p.x > W + 12) p.x = -12;
          hctx.globalAlpha = p.o; hctx.fillStyle = "#00C147";
          if (p.heart) drawHeart(p.x, p.y, p.s * 1.4);
          else { hctx.beginPath(); hctx.arc(p.x, p.y, p.s / 2, 0, 7); hctx.fill(); }
        }
        hctx.globalAlpha = 1; raf = requestAnimationFrame(frame);
      };
      frame(); /* первый кадр сразу — screenshot-safe */
      const ioHero = new IntersectionObserver((es) => {
        es.forEach((e) => { cancelAnimationFrame(raf); if (e.isIntersecting) frame(); });
      });
      ioHero.observe(heroSec);
      cleanups.push(() => { ioHero.disconnect(); cancelAnimationFrame(raf); });
    }

    /* ---------- АКТ II: клик по hero = жест признания ---------- */
    const heroSection = document.querySelector(".hero");
    if (heroSection && !reduceMotion) {
      on(heroSection, "click", (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a,button,input,label,.chip")) return;
        const el = document.createElement("div");
        el.className = "gesture-heart"; el.textContent = "+100 ₽ ♥";
        el.style.left = e.clientX - 20 + "px"; el.style.top = e.clientY - 10 + "px";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      });
    }

    /* ---------- АКТ II: кастомный курсор (desktop) ---------- */
    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches && !reduceMotion) {
      document.body.classList.add("has-cursor");
      const dot = document.createElement("div"); dot.id = "cursor-dot";
      const ring = document.createElement("div"); ring.id = "cursor-ring";
      document.body.append(dot, ring);
      let mx = -100, my = -100, rx = -100, ry = -100, rafc = 0;
      on(window, "mousemove", (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
        const t = e.target as HTMLElement;
        ring.classList.toggle("grow", !!t.closest("a,button,.chip,input,label,#companion"));
        const dark = !!t.closest(".final,footer.up-footer");
        ring.classList.toggle("on-dark", dark); dot.classList.toggle("on-dark", dark);
      });
      const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; rafc = requestAnimationFrame(loop); };
      loop();
      cleanups.push(() => { cancelAnimationFrame(rafc); dot.remove(); ring.remove(); document.body.classList.remove("has-cursor"); });
    }

    /* ---------- конфетти: ≤50 частиц, автостоп 1.5с ---------- */
    function confettiBurst() {
      const cv = $("confetti") as HTMLCanvasElement, ctx = cv.getContext("2d")!;
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      const colors = ["#00C147", "#7FE0A7", "#262429", "#D9B896"];
      const parts = Array.from({ length: 50 }, () => ({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 260,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 7, vy: -(Math.random() * 7 + 3),
        s: Math.random() * 7 + 4, r: Math.random() * Math.PI,
        c: colors[(Math.random() * colors.length) | 0],
      }));
      const t0 = performance.now();
      (function frame(t: number) {
        const dt = t - t0;
        ctx.clearRect(0, 0, cv.width, cv.height);
        if (dt > 1500) return;
        const fade = 1 - dt / 1500;
        for (const p of parts) {
          p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.r += 0.06;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.globalAlpha = Math.max(fade, 0);
          ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
          ctx.restore();
        }
        requestAnimationFrame(frame);
      })(t0);
    }

    return () => { cleanups.forEach((fn) => fn()); document.body.classList.remove("uppora"); };
  }, []);
}
