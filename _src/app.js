  /* ============================================================
     からだ つたえる
     どこが いたい？（からだ マップ）→ どんな かんじ → どのくらい → いつから → つたえる カード
     ほけんしつ カード ／ びょういん・はいしゃ・けんしん・ちゅうしゃ の れんしゅう
     ============================================================ */
  const PARTS = { head: 'あたま', eye: 'め', ear: 'みみ', nose: 'はな', mouth: 'くち', tooth: 'は', throat: 'のど', neck: 'くび', shoulder: 'かた', chest: 'むね', belly: 'おなか', back: 'せなか', waist: 'こし', butt: 'おしり', arm: 'うで', hand: 'て', leg: 'あし', knee: 'ひざ', foot: 'あしの さき', whole: 'からだ ぜんたい' };
  // [ばしょ, かたち]（viewBox 0 0 300 520）
  const SH = {
    arms: [['arm', '<rect x="62" y="148" width="28" height="118" rx="14" transform="rotate(8 76 148)"/>'], ['arm', '<rect x="210" y="148" width="28" height="118" rx="14" transform="rotate(-8 224 148)"/>'],
      ['hand', '<circle cx="62" cy="280" r="17"/>'], ['hand', '<circle cx="238" cy="280" r="17"/>']],
    legs: [['leg', '<rect x="106" y="300" width="40" height="98" rx="18"/>'], ['leg', '<rect x="154" y="300" width="40" height="98" rx="18"/>'],
      ['leg', '<rect x="108" y="418" width="36" height="66" rx="16"/>'], ['leg', '<rect x="156" y="418" width="36" height="66" rx="16"/>'],
      ['knee', '<circle cx="126" cy="406" r="18"/>'], ['knee', '<circle cx="174" cy="406" r="18"/>'],
      ['foot', '<ellipse cx="118" cy="496" rx="27" ry="13"/>'], ['foot', '<ellipse cx="182" cy="496" rx="27" ry="13"/>']],
    front: [['belly', '<rect x="100" y="204" width="100" height="104" rx="22"/>'], ['chest', '<rect x="100" y="138" width="100" height="70" rx="22"/>'],
      ['shoulder', '<circle cx="98" cy="152" r="21"/>'], ['shoulder', '<circle cx="202" cy="152" r="21"/>'], ['throat', '<rect x="133" y="112" width="34" height="30" rx="9"/>'],
      ['ear', '<ellipse cx="97" cy="70" rx="11" ry="18"/>'], ['ear', '<ellipse cx="203" cy="70" rx="11" ry="18"/>'], ['head', '<circle cx="150" cy="64" r="52"/>'],
      ['eye', '<ellipse cx="128" cy="58" rx="11" ry="9"/>', 1], ['eye', '<ellipse cx="172" cy="58" rx="11" ry="9"/>', 1], ['nose', '<ellipse cx="150" cy="78" rx="8" ry="10"/>', 1], ['mouth', '<ellipse cx="150" cy="99" rx="19" ry="8"/>', 1]],
    back: [['butt', '<rect x="100" y="270" width="100" height="44" rx="22"/>'], ['waist', '<rect x="100" y="228" width="100" height="46" rx="16"/>'], ['back', '<rect x="100" y="138" width="100" height="94" rx="22"/>'],
      ['shoulder', '<circle cx="98" cy="152" r="21"/>'], ['shoulder', '<circle cx="202" cy="152" r="21"/>'], ['neck', '<rect x="133" y="112" width="34" height="30" rx="9"/>'],
      ['ear', '<ellipse cx="97" cy="70" rx="11" ry="18"/>'], ['ear', '<ellipse cx="203" cy="70" rx="11" ry="18"/>'], ['head', '<circle cx="150" cy="64" r="52"/>']]
  };
  function bodySVG(side, sel) {
    const list = SH.arms.concat(SH.legs, SH[side]);
    return '<svg viewBox="0 0 300 520" xmlns="http://www.w3.org/2000/svg">' + list.map(([p, s, f]) => s.replace(/^<(\w+)/, '<$1 class="pt' + (f ? ' f' : '') + (sel === p ? ' on' : '') + '" data-p="' + p + '"')).join('') +
      (side === 'back' ? '<path d="M104 52 Q150 0 196 52 Q170 34 150 36 Q130 34 104 52Z" fill="#8B5E3C" opacity=".55" pointer-events="none"/>' : '') + '</svg>';
  }
  const FEELS = [
    ['zuki', '💥', 'ずきずき', 'が ずきずき いたい', 'が ずきずき いたいです'],
    ['chiku', '📍', 'ちくちく', 'が ちくちく いたい', 'が ちくちく いたいです'],
    ['hiri', '🔥', 'ひりひり', 'が ひりひり する', 'が ひりひり します'],
    ['zun', '🪨', 'おもい（ずーん）', 'が おもくて いたい', 'が おもくて いたいです'],
    ['guru', '🌀', 'きもちわるい', 'が きもちわるい', 'が きもちわるいです'],
    ['kayu', '🦟', 'かゆい', 'が かゆい', 'が かゆいです'],
    ['butsu', '💢', 'ぶつけた', 'を ぶつけた', 'を ぶつけました'],
    ['chi', '🩸', 'ちが でた', 'から ちが でた', 'から ちが でました'],
    ['hare', '🎈', 'はれて いる', 'が はれて いる', 'が はれて います'],
    ['atsu', '🥵', 'あつい', 'が あつい', 'が あついです']
  ];
  const SCALE = [['😀', 'いたくない', '#40C057'], ['🙂', 'すこし', '#82C91E'], ['😐', 'ちょっと いたい', '#FAB005'], ['😟', 'いたい', '#FD7E14'], ['😣', 'とても いたい', '#F76707'], ['😭', 'がまん できない', '#E03131']];
  const WHEN = [['⚡', 'いま', 'いま きゅうに'], ['⏱️', 'さっき', 'さっきから'], ['🌅', 'あさから', 'あさから'], ['🌙', 'きのうから', 'きのうから'], ['❓', 'わからない', '']];
  const CARDS = [['🤢', 'きもちが わるい'], ['🤮', 'はきそう'], ['🥶', 'さむい'], ['🥵', 'あつい'], ['😪', 'ねむい'], ['😩', 'つかれた'], ['🤕', 'けがを した'], ['🩸', 'ちが でた'], ['🤧', 'はなみずが でる'], ['😷', 'せきが でる'], ['🌡️', 'ねつが ある かも'], ['🚻', 'トイレに いきたい'], ['💧', 'みずを のみたい'], ['🛏️', 'よこに なりたい'], ['🏥', 'ほけんしつに いきたい'], ['☎️', 'おうちに れんらく して'], ['💊', 'くすりの じかん'], ['👍', 'もう だいじょうぶ']].map((c, i) => ({ id: 'c' + i, e: c[0], t: c[1] }));
  // びょういん などの れんしゅう：[え, なにが おこる, どうする, うごき]
  const REH = [
    { id: 'byouin', e: '🏥', n: 'びょういん', steps: [
      ['🏥', 'びょういんに つきました。', 'うけつけで しんさつけんを わたします。'],
      ['🪑', 'まちあいしつで なまえを よばれるまで まちます。', 'すわって まちます。ほんを よんでも いいです。'],
      ['🧑‍⚕️', 'なまえを よばれたら しんさつしつに はいります。おいしゃさんが「どう しましたか？」と ききます。', 'いたい ところを つたえます。', 'tell'],
      ['🩺', 'ちょうしんきで むねの おとを ききます。すこし つめたいです。', 'おおきく いきを すって、はきます。', 'breath'],
      ['👄', 'くちの なかを みます。', '「あーん」と おおきく くちを あけます。', 'mouth'],
      ['💊', 'おいしゃさんが くすりを だして くれます。', '「ありがとう ございました」と いいます。'],
      ['🌈', 'おしまい。よく がんばりました。'] ] },
    { id: 'haisha', e: '🦷', n: 'はいしゃ', steps: [
      ['🦷', 'はいしゃさんに つきました。', 'うけつけを して、まちあいしつで まちます。'],
      ['💺', 'なまえを よばれたら、うごく いすに すわります。いすが うしろに たおれます。', 'からだの ちからを ぬいて ねころびます。'],
      ['💡', 'まぶしい ライトが つきます。', 'めを とじても いいです。'],
      ['👄', 'はを みて もらいます。', '「あーん」と くちを あけて まちます。', 'mouth'],
      ['💦', 'みずが でたり、ウィーンと おとが したり します。', 'うごかないで まちます。いたい ときは ひだりてを あげて しらせます。', 'still'],
      ['🥤', 'くちを ゆすぎます。', 'コップの みずを くちに いれて、ぺっと だします。'],
      ['🌈', 'おしまい。よく がんばりました。'] ] },
    { id: 'kenshin', e: '📏', n: 'けんこう しんだん', steps: [
      ['📏', 'しんちょうを はかります。', 'せなかを まっすぐに して、うごかないで たちます。', 'still'],
      ['⚖️', 'たいじゅうを はかります。', 'はかりに のって、じっと します。', 'still'],
      ['👁️', 'しりょく けんさ。わの あいて いる ほうを こたえます。', 'ゆびで うえ・した・みぎ・ひだりを さします。'],
      ['🎧', 'ちょうりょく けんさ。ヘッドホンから ピーという おとが します。', 'きこえたら てを あげます。', 'beep'],
      ['🩺', 'ないか けんしん。おいしゃさんが ちょうしんきで むねの おとを ききます。', 'ふくを すこし あげて、しずかに いきを します。', 'breath'],
      ['🌈', 'おしまい。よく がんばりました。'] ] },
    { id: 'chusha', e: '💉', n: 'ちゅうしゃ', steps: [
      ['💉', 'よぼうせっしゅ（ちゅうしゃ）を します。', 'うでを だして すわります。'],
      ['🧴', 'アルコールで ふきます。すこし つめたいです。', 'うでを うごかさないで まちます。'],
      ['📍', 'ちくっと します。', 'ゆっくり 5まで かぞえます。かぞえて いる あいだに おわります。', 'count'],
      ['🩹', 'ばんそうこうを はります。', '「ありがとう ございました」と いいます。'],
      ['🌈', 'おしまい。よく がんばりました。'] ] }
  ];
  const LIB = [['からだ', [['🤒', 'ねつ'], ['🤕', 'けが'], ['🤢', 'きもちわるい'], ['🤧', 'はなみず'], ['😷', 'マスク'], ['🦷', 'は'], ['👁️', 'め'], ['👂', 'みみ'], ['🦵', 'あし'], ['✋', 'て']]],
    ['もの', [['💊', 'くすり'], ['🩹', 'ばんそうこう'], ['🧊', 'こおり'], ['🌡️', 'たいおんけい'], ['🧻', 'ティッシュ'], ['🥤', 'のみもの'], ['🛏️', 'ベッド'], ['👓', 'めがね'], ['🎧', 'イヤーマフ'], ['📞', 'でんわ']]]];
  const APP = {
    id: 'karada-tsutaeru', title: 'からだ つたえる', ls: 'karada.v1', db: 'mieel-karada', sw: true, color: '#0CA678',
    defaults: { to: 'せんせい', askFeel: true, askWhen: true },
    newProfile: (name, icon) => ({ id: 'p' + Math.random().toString(36).slice(2, 9), name, icon, log: [], reh: {} }),
    normProfile(p) { p.log = Array.isArray(p.log) ? p.log : []; p.reh = p.reh && typeof p.reh === 'object' ? p.reh : {}; },
    normStore(o) { if (!Array.isArray(o.cards)) o.cards = []; },
    childScreens: ['part', 'feel', 'scale', 'when', 'tell', 'cards', 'card', 'reh', 'rehs'], topScreens: ['home'],
    renderHome: () => renderHome(),
    profileNote: p => 'つたえた きろく ' + p.log.length + 'けん',
    helpNote: 'からだの ふちょうを ことばで いうのが むずかしい 子が、ゆびさしで「どこが」「どんなふうに」「どのくらい」「いつから」を つたえる ための アプリです。いたさの めもりは かおの えで 0〜5。つたえた ことは きろくに のこるので、ほけんしつや おうちとの れんらくに つかえます（プリントも できます）。びょういん・はいしゃ・けんこうしんだん・ちゅうしゃは、いく まえに なんども れんしゅう して みとおしを もたせます。'
  };
/*BASE_HERE*/

  const cardsAll = () => CARDS.concat(store.cards);
  async function cleanMedia() { const used = new Set(store.cards.map(c => c.media).filter(Boolean)); try { for (const m of await DB.all()) if (!used.has(m.id) && Date.now() - m.at > 60000) await DB.del(m.id); } catch (e) { /* 無視 */ } }

  /* ============================================================
     ホーム
     ============================================================ */
  function renderHome() {
    screen = 'home'; T = null;
    const mk = (c, e, b, s, fn) => h('button', { type: 'button', class: 'mcard', style: '--c:' + c, onclick: () => { if (tapOk()) { sfx.tap(); fn(); } } }, E(e), h('b', null, b), h('small', null, s));
    setView('home', [
      h('h1', { class: 'title' }, '🩺 からだ つたえる', h('small', null, 'いたい ところや からだの ようすを つたえよう')),
      h('div', { class: 'menu' },
        mk('#E03131', '🩹', 'どこが いたい？', 'からだの えで つたえる', () => startTell()),
        mk('#0CA678', '🏥', 'からだの カード', 'さむい・はきそう・やすみたい', renderCards),
        mk('#1C7ED6', '🎒', 'びょういん れんしゅう', 'はいしゃ・けんしん・ちゅうしゃ も', renderRehList)),
      h('div', { class: 'note-box' }, '🔒 きろく・しゃしんは この たんまつの なかだけに ほぞん します。インターネットには おくりません。')
    ]);
  }

  /* ============================================================
     どこが いたい？
     ============================================================ */
  let T = null;
  const stepsOf = () => ['part'].concat(S().askFeel ? ['feel'] : [], ['scale'], S().askWhen ? ['when'] : [], ['tell']);
  function startTell(ret) { T = { part: null, feel: null, scale: null, when: null, ret: ret || null }; keepAwake(); goStep('part'); }
  function goStep(s) { ({ part: renderPart, feel: renderFeel, scale: renderScale, when: renderWhen, tell: renderTell })[s](); }
  function nextStep() { const L = stepsOf(); goStep(L[L.indexOf(screen) + 1]); }
  function prevStep() { const L = stepsOf(), i = L.indexOf(screen); if (i <= 0) { if (T.ret) T.ret(); else renderHome(); } else goStep(L[i - 1]); }
  function shead(ask) {
    const L = stepsOf();
    return [h('div', { class: 'sdots' }, L.map((s, i) => h('i', { class: i <= L.indexOf(screen) ? 'on' : '' }))),
      h('div', { class: 'shead' }, h('button', { type: 'button', class: 'mid-btn back', onclick: () => { if (tapOk()) prevStep(); } }, '◀ もどる'), h('div', { class: 'ask' }, ask), h('span', { style: 'width:90px' }))];
  }
  function renderPart() {
    screen = 'part';
    const bodies = h('div', { class: 'bodies' }, ['front', 'back'].map(sd => h('div', { class: 'bd' }, h('b', null, sd === 'front' ? 'まえ' : 'うしろ'), h('div', { style: 'flex:1;min-height:0;width:100%;display:flex', html: bodySVG(sd, T.part) }))));
    const choose = p => { if (!tapOk(300)) return; T.part = p; sfx.tap(); speak(PARTS[p]); renderPart(); after(900, nextStep); };
    bodies.addEventListener('click', e => { const t = e.target.closest('[data-p]'); if (t) choose(t.getAttribute('data-p')); });
    setView('step', [shead('どこが いたい？'), h('div', { class: 'mapwrap' }, bodies,
      h('div', { class: 'plist' }, Object.keys(PARTS).map(p => h('button', { type: 'button', class: T.part === p ? 'on' : '', onclick: () => choose(p) }, PARTS[p]))))]);
    if (!T.part) speak('どこが いたい？ からだの えを さわってね');
  }
  function optsScreen(name, ask, list, onPick, cls) {
    screen = name;
    setView('step', [shead(ask), h('div', { class: cls || 'opts' }, list)]);
    speak(ask);
  }
  function renderFeel() {
    optsScreen('feel', PARTS[T.part] + 'は どんな かんじ？', FEELS.map(f => h('button', { type: 'button', onclick: () => { if (!tapOk(400)) return; T.feel = f[0]; sfx.tap(); speak(f[2]); after(700, nextStep); } }, E(f[1]), f[2])));
  }
  function renderScale() {
    screen = 'scale';
    setView('step', [shead('どのくらい？'),
      h('div', { class: 'scale' }, SCALE.map((s, i) => h('button', { type: 'button', style: '--sc:' + s[2], onclick: () => { if (!tapOk(400)) return; T.scale = i; sfx.tap(); speak(i + '、' + s[1]); after(800, nextStep); } }, E(s[0]), h('b', null, String(i)), s[1]))),
      h('div', { class: 'scalebar' })]);
    speak('どのくらい いたい？ かおを えらんでね');
  }
  function renderWhen() {
    optsScreen('when', 'いつから？', WHEN.map((w, i) => h('button', { type: 'button', onclick: () => { if (!tapOk(400)) return; T.when = i; sfx.tap(); speak(w[1]); after(700, nextStep); } }, E(w[0]), w[1])));
  }
  function sentence(polite) {
    const f = FEELS.find(x => x[0] === T.feel), p = PARTS[T.part] || 'からだ';
    const body = f ? p + (polite ? f[4] : f[3]) : p + (polite ? 'が いたいです' : 'が いたい');
    return body;
  }
  function renderTell() {
    screen = 'tell';
    const sc = T.scale == null ? null : SCALE[T.scale], w = T.when == null ? null : WHEN[T.when];
    const say = () => {
      const to = S().to ? S().to + '、' : '';
      speak(to + sentence(true) + '。' + (sc ? 'いたさは ' + T.scale + '、' + sc[1] + '。' : '') + (w && w[2] ? w[2] + ' です。' : ''));
    };
    setView('step', [shead('これを みせて つたえよう'),
      h('div', { class: 'tell' }, h('div', { class: 'tcard', style: sc ? 'border-color:' + sc[2] : '' },
        h('div', { html: bodySVG(['back', 'waist', 'butt', 'neck'].indexOf(T.part) >= 0 ? 'back' : 'front', T.part) }),
        h('div', null, h('div', { class: 'msg' }, S().to ? [S().to + '、', h('br')] : null, sentence(false) + '。'),
          h('div', { class: 'meta' }, sc ? h('span', null, sc[0] + ' ' + T.scale + '：' + sc[1]) : null, w && T.when < 4 ? h('span', null, w[0] + ' ' + w[1]) : null)))),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'big-btn blue', onclick: () => { if (tapOk()) say(); } }, '🔊 こえで つたえる'),
        h('button', { type: 'button', class: 'big-btn go', onclick: () => { if (!tapOk()) return; logTell(); sfx.ok(); praise('つたえられたね！'); after(1200, () => { if (T.ret) T.ret(true); else renderHome(); }); } }, '✓ つたえた'))]);
    say();
  }
  function logTell() {
    const p = cur();
    p.log.push({ t: Date.now(), part: T.part, feel: T.feel, scale: T.scale, when: T.when });
    if (p.log.length > 1000) p.log.splice(0, p.log.length - 1000);
    persist();
  }

  /* ============================================================
     からだの カード
     ============================================================ */
  function renderCards() {
    screen = 'cards';
    setView('step', [h('div', { class: 'shead' }, h('div', { class: 'ask' }, 'からだの ようすを つたえよう')),
      h('div', { class: 'cards' }, cardsAll().map(c => h('button', { type: 'button', onclick: () => { if (tapOk()) showCard(c); } }, pic(c.media ? c : { emoji: c.e }), c.t))),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'big-btn white', onclick: () => { if (tapOk()) startTell(renderCards); } }, '🩹 いたい ところを つたえる'))]);
  }
  function showCard(c) {
    screen = 'card'; sfx.tap();
    const to = S().to ? S().to + '、' : '';
    const say = () => speak(to + c.t + '。');
    setView('step', [h('div', { class: 'bigcard' }, pic(c.media ? c : { emoji: c.e }), h('div', { class: 't' }, c.t)),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'big-btn blue', onclick: () => { if (tapOk()) say(); } }, '🔊 もういちど'),
        h('button', { type: 'button', class: 'big-btn go', onclick: () => { if (!tapOk()) return; const p = cur(); p.log.push({ t: Date.now(), card: c.t }); persist(); renderCards(); } }, '✓ つたえた'),
        h('button', { type: 'button', class: 'mid-btn', onclick: () => { if (tapOk()) renderCards(); } }, '◀ もどる'))]);
    say();
  }

  /* ============================================================
     びょういん れんしゅう
     ============================================================ */
  function renderRehList() {
    screen = 'rehs'; const p = cur();
    setView('home', [h('h1', { class: 'title' }, '🎒 どこに いく れんしゅう？'),
      h('div', { class: 'menu' }, REH.map(r => h('button', { type: 'button', class: 'mcard', style: '--c:#1C7ED6', onclick: () => { if (tapOk()) { sfx.tap(); startReh(r.id); } } }, E(r.e), h('b', null, r.n), h('small', null, p.reh[r.id] ? '⭐ ' + p.reh[r.id] + 'かい れんしゅう した' : r.steps.length + 'つの ばめん')))),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'mid-btn', onclick: () => { if (tapOk()) renderHome(); } }, '◀ もどる'))]);
  }
  let RH = null;
  function startReh(id) { RH = { r: REH.find(x => x.id === id), i: 0 }; keepAwake(); renderReh(); }
  function renderReh(back) {
    screen = 'reh';
    const st = RH.r.steps[RH.i], last = RH.i === RH.r.steps.length - 1;
    const act = h('div', { class: 'act' });
    const nextB = h('button', { type: 'button', class: 'big-btn go', onclick: () => { if (!tapOk(500)) return; if (last) finishReh(); else { RH.i++; sfx.step(); renderReh(); } } }, last ? '⭐ できた！' : 'つぎ ▶');
    setView('step', [
      h('div', { class: 'sdots' }, RH.r.steps.map((_, k) => h('i', { class: k <= RH.i ? 'on' : '' }))),
      h('div', { class: 'rh' }, pic({ emoji: st[0] }), h('div', null, h('div', { class: 't' }, st[1]), st[2] ? h('div', { class: 'do' }, '👉 ' + st[2]) : null, act)),
      h('div', { class: 'actions' }, h('button', { type: 'button', class: 'mid-btn', disabled: RH.i === 0, onclick: () => { if (tapOk() && RH.i > 0) { RH.i--; renderReh(); } } }, '◀ まえ'), nextB)]);
    speak(st[1] + (st[2] ? '。' + st[2] : ''), { end: () => after(300, () => runAct(st[3], act)) });
    if (!S().voice) after(400, () => runAct(st[3], act));
    if (last) { sfx.clear(); FX.small($('.rh .pic')); }
  }
  let actRun = 0;
  function runAct(kind, box) {
    if (!kind || !box.isConnected || box.childElementCount) return;
    const id = ++actRun;
    const btn = (t, fn) => h('button', { type: 'button', class: 'mid-btn', onclick: fn }, t);
    if (kind === 'tell') { box.append(btn('🩹 いたい ところを つたえて みる', () => { const keep = RH; startTell(() => { RH = keep; renderReh(); }); })); return; }
    if (kind === 'breath') {
      const c = h('div', { class: 'breath' }, 'すって'); box.append(c, btn('🔁 もういちど', () => { box.innerHTML = ''; runAct(kind, box); }));
      let n = 0; const cyc = () => { if (id !== actRun || !c.isConnected) return; if (n >= 6) { c.textContent = 'できた！'; return; } const inn = n % 2 === 0; c.classList.toggle('in', inn); c.textContent = inn ? 'すって' : 'はいて'; speak(inn ? 'すって' : 'はいて'); n++; after(3000, cyc); };
      after(100, cyc); return;
    }
    if (kind === 'mouth' || kind === 'still' || kind === 'count') {
      const N = kind === 'still' ? 5 : kind === 'count' ? 5 : 3, up = kind === 'count';
      const lab = h('div', { style: 'font-size:clamp(20px,2.6vw,28px);font-weight:700' }, kind === 'mouth' ? '👄 あーん' : kind === 'still' ? '🧍 じっと…' : 'いっしょに かぞえよう');
      const c = h('div', { class: 'cnt' }, up ? '' : String(N));
      box.append(lab, c, btn('▶ もういちど', () => { box.innerHTML = ''; runAct(kind, box); }));
      let k = 0; const tick = () => { if (id !== actRun || !c.isConnected) return; k++; if (k > N) { c.textContent = '⭐'; lab.textContent = 'おしまい！'; sfx.ok(); speak('おしまい'); return; } c.textContent = String(up ? k : N - k + 1); tone(600 + k * 50, 0, .12, 'sine', .3); if (up) speak(String(k)); after(1000, tick); };
      after(400, tick); return;
    }
    if (kind === 'beep') {
      const lab = h('div', { style: 'font-size:22px;font-weight:700' }, '🎧 ピーが きこえたら ✋');
      let on = false, t0 = 0;
      const hb = h('button', { type: 'button', class: 'big-btn blue', onclick: () => { if (on) { on = false; sfx.ok(); lab.textContent = 'きこえたね！ ⭐'; } else lab.textContent = 'まだ だよ。よく きいてね'; } }, '✋ きこえた');
      box.append(lab, hb, btn('🔁 もういちど', () => { box.innerHTML = ''; runAct(kind, box); }));
      after(1500 + Math.random() * 2500, () => { if (id !== actRun) return; on = true; t0 = Date.now(); tone(1000, 0, .6, 'sine', .35); lab.textContent = '🎧 …'; });
    }
  }
  function finishReh() {
    const p = cur(); p.reh[RH.r.id] = (p.reh[RH.r.id] || 0) + 1; persist();
    sfx.clear(); FX.big(); praise('よく がんばったね！');
    after(1500, renderRehList);
  }

  /* ============================================================
     せんせい：カードを ふやす
     ============================================================ */
  function openLib(onPick) {
    const m = $('#libModal'), PN = $('#libPanel'); PN.innerHTML = '';
    const close = () => m.classList.remove('open');
    PN.append(h('div', { class: 'panel-head' }, h('h2', null, '🖼️ えを えらぶ'), h('button', { type: 'button', class: 'btn', onclick: close }, 'とじる')),
      h('div', { class: 'btns' },
        h('button', { type: 'button', class: 'btn primary', onclick: async () => { const fs = await pickFile('image/*', 'environment'); if (!fs) return; const id = await savePhoto(fs[0], 600); close(); onPick({ media: id }); } }, '📷 カメラで とる'),
        h('button', { type: 'button', class: 'btn primary', onclick: async () => { const fs = await pickFile('image/*'); if (!fs) return; const id = await savePhoto(fs[0], 600); close(); onPick({ media: id }); } }, '🖼️ しゃしんを えらぶ')),
      h('div', { class: 'lib' }, LIB.map(([g, list]) => [h('h4', null, g), list.map(([e, n]) => h('button', { type: 'button', onclick: () => { close(); onPick({ emoji: e, name: n }); } }, E(e), n))])));
    m.classList.add('open'); m.scrollTop = 0;
  }
  $('#libModal').addEventListener('click', e => { if (e.target.id === 'libModal') $('#libModal').classList.remove('open'); });

  /* ============================================================
     プリント
       cards … からだの カード（きって つかう）／ map … どこが いたい？ シート ／ log … つたえた きろく
     ============================================================ */
  const PF = '<div class="pf">© MieeL　からだ つたえる　www.mieel-support-school.com</div>';
  const HD = (t, s, nm) => '<div class="phd"><h1>' + t + '</h1><small>' + (s || '') + '</small>' + (nm === false ? '' : '<div class="nm">なまえ ＿＿＿＿＿＿＿＿</div>') + '</div>';
  const fmt = t => { const d = new Date(t); return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); };
  async function buildPages(type, o) {
    o = o || {};
    if (type === 'cards') {
      const list = o.set === 'mine' ? store.cards : cardsAll(), out = [];
      for (let i = 0; i < Math.max(1, list.length); i += 6) {
        let cells = '';
        for (const c of list.slice(i, i + 6)) cells += '<div class="pc"><span class="ph">' + await picHTML(c.media ? c : { emoji: c.e }) + '</span><div class="t">' + esc(c.t) + '</div></div>';
        out.push('<div class="ppage">' + HD('🏥 からだの カード', 'てんせんで きって つかいます', false) + '<div class="pcards">' + (cells || '<div class="pc"><div class="t">カードが ありません</div></div>') + '</div>' + PF + '</div>');
      }
      return out;
    }
    if (type === 'map') {
      return ['<div class="ppage">' + HD('🩹 どこが いたい？', 'あてはまる ものに ○') +
        '<div style="display:flex;justify-content:space-around;font-size:4.5mm;margin-top:2mm"><span>まえ</span><span>うしろ</span></div>' +
        '<div class="pmap"><div>' + bodySVG('front') + '</div><div>' + bodySVG('back') + '</div></div>' +
        '<div style="font-size:5mm;margin-top:3mm;font-weight:700">どんな かんじ？</div><div class="pmw">' + FEELS.map(f => '<span>' + f[1] + ' ' + f[2] + '</span>').join('') + '</div>' +
        '<div style="font-size:5mm;margin-top:3mm;font-weight:700">どのくらい？</div><div class="psc">' + SCALE.map((s, i) => '<div><span class="pe">' + s[0] + '</span>' + i + ' ' + s[1] + '</div>').join('') + '</div>' +
        '<div class="pmw" style="margin-top:3mm"><b style="font-size:5mm">いつから？</b>' + WHEN.map(w => '<span>' + w[1] + '</span>').join('') + '</div>' + PF + '</div>'];
    }
    // きろく
    const p = store.profiles.find(x => x.id === o.pid) || cur();
    const rows = p.log.slice().reverse().slice(0, Number(o.n) || 20);
    const tr = rows.map(r => '<tr><td>' + fmt(r.t) + '</td><td>' + (r.card ? '🏥 ' + esc(r.card) : esc(PARTS[r.part] || '') + ((FEELS.find(f => f[0] === r.feel) || [])[2] ? '・' + FEELS.find(f => f[0] === r.feel)[2] : '')) + '</td><td>' + (r.scale == null ? '' : SCALE[r.scale][0] + ' ' + r.scale) + '</td><td>' + (r.when == null ? '' : WHEN[r.when][1]) + '</td><td style="width:40mm"></td></tr>').join('');
    const trs = tr ? tr.split('</tr>').filter(Boolean).map(x => x + '</tr>') : ['<tr><td colspan="5">まだ きろくが ありません</td></tr>'], out = [];
    for (let i = 0; i < trs.length; i += 20) out.push('<div class="ppage">' + HD('📋 からだの きろく（' + esc(p.name) + '）', 'さいきんの ' + rows.length + 'けん' + (trs.length > 20 ? '　' + (i / 20 + 1) + '/' + Math.ceil(trs.length / 20) : ''), false) +
      '<table class="plog"><tr><th style="width:28mm">にちじ</th><th>つたえた こと</th><th style="width:18mm">いたさ</th><th style="width:25mm">いつから</th><th style="width:48mm">メモ（たいおん など）</th></tr>' + trs.slice(i, i + 20).join('') + '</table>' + PF + '</div>');
    return out;
  }
  window.MieelPrintAPI = {
    version: 1, fixed: true,
    app: { id: 'karada-tsutaeru', title: 'からだ つたえる', icon: '🩺' },
    list() {
      return [
        { id: 'map', name: 'どこが いたい？ シート', icon: '🩹', params: [] },
        { id: 'cards', name: 'からだの カード', icon: '🏥', params: store.cards.length ? [{ key: 'set', label: 'カード', opts: [['all', 'ぜんぶ'], ['mine', 'ふやした カード']], def: 'all' }] : [] },
        { id: 'log', name: 'からだの きろく', icon: '📋', params: [{ key: 'pid', label: '子ども', opts: store.profiles.map(p => [p.id, p.name]), def: cur().id }, { key: 'n', label: 'けんすう', opts: [[20, '20けん'], [40, '40けん（2まい）']], def: 20 }] }
      ];
    },
    build(id, params) { return buildPages(id, params).then(pages => ({ pages, css: document.querySelector('style').textContent })); }
  };

  /* ============================================================
     先生用せってい
     ============================================================ */
  APP.renderSettings = function (add, st, vp, pidSel) {
    add(h('h3', null, '🩹 つたえかた'),
      srow('よびかけ', seg(st.to, [['せんせい', 'せんせい'], ['おかあさん', 'おかあさん'], ['', 'なし']], v => setS('to', v)), 'つたえる カードの はじめの ことば'),
      chk('「どんな かんじ？」を きく', 'askFeel'),
      chk('「いつから？」を きく', 'askWhen'));
    add(h('h3', null, '🏥 カードを ふやす'),
      store.cards.length ? store.cards.map((c, i) => h('div', { class: 'prow' }, h('button', { type: 'button', class: 'mini-btn', onclick: () => openLib(r => { if (r.media) { c.media = r.media; } else { c.e = r.emoji; c.media = null; } persist(); refreshSettings(); }) }, c.media ? '📷' : E(c.e)),
        h('input', { type: 'text', value: c.t, style: 'flex:1;min-width:140px', oninput: e => { c.t = e.target.value; persistSoon(); } }),
        h('button', { type: 'button', class: 'mini-btn warn', onclick: () => { store.cards.splice(i, 1); persist(); cleanMedia(); refreshSettings(); } }, 'けす'))) : h('p', { class: 'note' }, 'その 子に あわせた カード（「めがねが いたい」「イヤーマフが ほしい」など）を ふやせます。しゃしんも つかえます。'),
      h('div', { class: 'btns' }, h('button', { type: 'button', class: 'btn primary', onclick: () => openLib(r => { store.cards.push({ id: 'u' + uid(), e: r.emoji || '📷', media: r.media || null, t: r.name || 'あたらしい カード' }); persist(); refreshSettings(); }) }, '＋ カードを ふやす')));
    add(h('h3', null, '📋 つたえた きろく'), pidSel());
    const log = vp.log.slice().reverse().slice(0, 40);
    add(log.length ? h('table', { class: 'rec-table' }, h('tr', null, ['日時', 'つたえた こと', 'いたさ', 'いつから'].map(x => h('th', null, x))),
      log.map(r => h('tr', null, h('td', null, fmt(r.t)), h('td', null, r.card ? '🏥 ' + r.card : (PARTS[r.part] || '') + ((FEELS.find(f => f[0] === r.feel) || [])[2] ? '・' + FEELS.find(f => f[0] === r.feel)[2] : '')), h('td', null, r.scale == null ? '' : SCALE[r.scale][0] + ' ' + r.scale), h('td', null, r.when == null ? '' : WHEN[r.when][1])))) : h('p', { class: 'note' }, 'まだ きろくが ありません。'),
      h('p', { class: 'note' }, 'プリント（🖨️）の「からだの きろく」で いんさつ できます。'));
  };
  if (TEST) window.__kd = { store: () => store, startTell, startReh, T: () => T, persist, renderCards };
  startApp();
  cleanMedia();
