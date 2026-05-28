// PDF HTML templates — rendered by Puppeteer

const CSS_VARS = `
  :root {
    --accent-600: #0d9488; --accent-700: #0f766e; --accent-800: #115e59;
    --accent-200: #99f6e4; --accent-50: #f0fdfa;
    --slate-900: #0f172a; --slate-800: #1e293b; --slate-700: #334155;
    --slate-600: #475569; --slate-500: #64748b; --slate-400: #94a3b8;
    --slate-200: #e2e8f0; --slate-100: #f1f5f9; --slate-50: #f8fafc;
    --green-50: #f0fdf4; --green-200: #bbf7d0; --green-600: #16a34a;
    --green-700: #15803d; --green-800: #166534;
    --amber-50: #fffbeb; --amber-200: #fde68a; --amber-600: #d97706;
    --amber-700: #b45309; --amber-800: #92400e;
    --red-50: #fef2f2; --red-200: #fecaca; --red-600: #dc2626; --red-700: #b91c1c;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; font-family: 'Inter', system-ui, sans-serif; color: var(--slate-900); -webkit-font-smoothing: antialiased; }
  @page { size: A4 portrait; margin: 0; }
`;

const INTER_FONT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;

export interface CoachPDFData {
  participantName: string;
  age: number;
  sex: string;
  evalDate: string;
  profile: string;
  profileLabel: string;
  safetyLevel: string;
  m4Score: number | null;
  fesScore: number | null;
  m5Results: { test: string; result: string; norm: string; level: 'normal' | 'vigilance' | 'alert' }[];
  strengths: string[];
  vigilancePoints: string[];
  redFlags: string[];
  programContent: string;
  safetyPoints: string;
  homeAdvice: string;
  coachName: string;
  evalId: string;
}

export function generateCoachPDF(d: CoachPDFData): string {
  const levelClass: Record<string, string> = { normal: '#dcfce7|#15803d', vigilance: '#fffbeb|#b45309', alert: '#fef2f2|#b91c1c' };
  const m5Rows = d.m5Results.map(r => {
    const [bg, color] = (levelClass[r.level] || levelClass.normal).split('|');
    return `<tr>
      <td>${r.test}</td><td>${r.result}</td><td>${r.norm}</td>
      <td><span style="display:inline-flex;padding:2px 8px;border-radius:5px;font-size:11px;font-weight:600;background:${bg};color:${color};">${r.level === 'normal' ? 'Normal' : r.level === 'vigilance' ? 'Vigilance' : 'Alerte'}</span></td>
    </tr>`;
  }).join('');

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<style>${INTER_FONT}${CSS_VARS}
.page { width:210mm;min-height:297mm;background:#fff;display:flex;flex-direction:column; }
.band { background:var(--accent-600);color:#fff;padding:14px 20px;display:flex;align-items:center;justify-content:space-between; }
.band .ttl { font-size:20px;font-weight:700; }
.band .sub { font-size:12px;opacity:0.9;margin-top:1px; }
.subband { display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:12px 20px;border-bottom:1px solid var(--slate-200); }
.body { padding:18px 20px;flex:1; }
.sec-title { font-size:11px;font-weight:700;color:var(--accent-600);text-transform:uppercase;letter-spacing:0.06em;border-left:3px solid var(--accent-600);padding-left:8px;margin:18px 0 10px; }
.sec-title:first-child { margin-top:0; }
.three-col { display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:12px; }
.col-box { border-radius:8px;padding:10px 12px; }
.col-box h4 { margin:0 0 6px;font-size:12px;font-weight:600; }
.col-box ul { margin:0;padding-left:16px; }
.col-box li { font-size:12px;line-height:1.5; }
.box-green { background:var(--green-50);border:1px solid var(--green-200); }
.box-green h4,.box-green li { color:var(--green-700); }
.box-amber { background:var(--amber-50);border:1px solid var(--amber-200); }
.box-amber h4,.box-amber li { color:var(--amber-700); }
.box-red { background:var(--red-50);border:1px solid var(--red-200); }
.box-red h4,.box-red li { color:var(--red-700); }
table { width:100%;border-collapse:collapse;margin-top:8px; }
th { font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:var(--slate-500);text-align:left;padding:6px 10px;border-bottom:2px solid var(--slate-200); }
td { font-size:12.5px;color:var(--slate-700);padding:7px 10px;border-bottom:1px solid var(--slate-100); }
.scores-row { display:flex;gap:12px;margin-top:8px; }
.score-card { flex:1;background:var(--slate-50);border:1px solid var(--slate-200);border-radius:8px;padding:10px 12px; }
.score-card .lbl { font-size:11px;color:var(--slate-500); }
.score-card .val { font-size:16px;font-weight:700;color:var(--slate-900);margin-top:2px; }
.score-card .note { font-size:11px;color:var(--slate-500);margin-top:1px; }
.program { font-size:12px;line-height:1.6;color:var(--slate-700);margin-top:8px;white-space:pre-wrap; }
.foot { padding:10px 20px 16px;border-top:1px solid var(--slate-200); }
.foot div { font-size:9px;color:var(--slate-400);line-height:1.5; }
</style></head><body>
<div class="page">
  <div class="band">
    <div><div class="ttl">SeniorFit</div><div class="sub">Fiche d'Évaluation Coach</div></div>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  </div>
  <div class="subband">
    <div>
      <div style="font-size:13px;color:var(--slate-700);font-weight:600;">${d.participantName} • ${d.age} ans • ${d.sex === 'F' ? 'Femme' : 'Homme'}</div>
      <div style="font-size:12px;color:var(--slate-500);margin-top:2px;">Évaluation du ${d.evalDate}</div>
    </div>
    <div style="text-align:right;">
      <span style="display:inline-flex;align-items:center;padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:600;background:var(--amber-600);color:#fff;">${d.profile} — ${d.profileLabel}</span>
      <div style="font-size:10px;color:var(--slate-500);font-style:italic;margin-top:6px;max-width:240px;text-align:right;">Outil professionnel, ne remplace pas l'avis médical</div>
    </div>
  </div>

  <div class="body">
    <div class="sec-title">Profil attribué</div>
    <div style="font-size:20px;font-weight:700;color:var(--amber-800);">${d.profile} — ${d.profileLabel}</div>
    <div class="three-col">
      <div class="col-box box-green"><h4>Points forts</h4><ul>${d.strengths.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="col-box box-amber"><h4>Points de vigilance</h4><ul>${d.vigilancePoints.map(v => `<li>${v}</li>`).join('')}</ul></div>
      <div class="col-box box-red"><h4>Drapeaux rouges</h4><ul>${d.redFlags.map(r => `<li>${r}</li>`).join('')}</ul></div>
    </div>

    <div class="sec-title">Résultats tests physiques (M5)</div>
    <table><thead><tr><th>Test</th><th>Résultat</th><th>Norme</th><th>Niveau</th></tr></thead>
    <tbody>${m5Rows}</tbody></table>

    <div class="sec-title">Scores fonctionnels (M4) &amp; peur de tomber (M3)</div>
    <div class="scores-row">
      <div class="score-card"><div class="lbl">Score fonctionnel M4</div><div class="val">${d.m4Score ?? '—'} / 40</div></div>
      <div class="score-card"><div class="lbl">Score FES M3</div><div class="val">${d.fesScore ?? '—'} / 16</div></div>
      <div class="score-card"><div class="lbl">Screening PAR-Q+</div><div class="val">${d.safetyLevel}</div></div>
    </div>

    <div class="sec-title">Programme</div>
    <div class="program">${d.programContent}</div>
    <div style="margin-top:10px;font-size:12px;color:var(--slate-700);"><strong>Sécurité :</strong> ${d.safetyPoints}</div>
    <div style="margin-top:6px;font-size:12px;color:var(--slate-700);"><strong>Domicile :</strong> ${d.homeAdvice}</div>
  </div>

  <div class="foot">
    <div>Généré par SeniorFit le ${d.evalDate} | Coach : ${d.coachName} | ID éval : ${d.evalId.slice(0, 8).toUpperCase()}</div>
    <div style="font-style:italic;">Ne pas diffuser sans accord du participant. Données personnelles confidentielles.</div>
  </div>
</div>
</body></html>`;
}

export interface ClientPDFData {
  participantFirstName: string;
  coachName: string;
  coachEmail: string;
  evalDate: string;
  clientGoal: string;
  strengths: string[];
  frequency: string;
  programSummary: string;
  homeAdvice: string;
}

export function generateClientPDF(d: ClientPDFData): string {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<style>${INTER_FONT}${CSS_VARS}
.page { width:210mm;min-height:297mm;background:#fff;display:flex;flex-direction:column; }
.hero { background:var(--accent-600);color:#fff;padding:26px 30px 30px;text-align:center; }
.hero h1 { margin:0;font-size:24px;font-weight:700; }
.hero .sub { font-size:13px;opacity:0.85;margin-top:6px; }
.content { padding:24px 30px 12px;flex:1; }
.welcome { background:var(--accent-50);border:1px solid var(--accent-200);border-radius:12px;padding:18px 20px; }
.welcome .hi { font-size:18px;font-weight:600;color:var(--accent-800); }
.welcome .lead { font-size:14px;color:var(--slate-600);margin-top:6px; }
.quote { font-size:15px;font-weight:500;color:var(--slate-800);font-style:italic;margin-top:10px;padding-left:14px;border-left:3px solid var(--accent-200); }
.block { border-radius:12px;padding:18px 20px;margin-top:18px; }
.block h2 { margin:0 0 12px;font-size:15px;font-weight:600; }
.block-green { background:var(--green-50);border:1px solid var(--green-200); }
.block-green h2 { color:var(--green-800); }
.check-item { display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--slate-700);line-height:1.5;margin-bottom:8px; }
.block-white { background:#fff;border:1px solid var(--slate-200); }
.block-white h2 { color:var(--slate-900); }
.block-amber { background:var(--amber-50);border:1px solid var(--amber-200); }
.block-amber h2 { color:var(--amber-800); }
.tip { font-size:13.5px;color:var(--amber-800);line-height:1.5;margin-bottom:8px;display:flex;gap:10px; }
.program-text { font-size:13px;color:var(--slate-600);line-height:1.6;white-space:pre-wrap; }
.closing { text-align:center;padding:22px 30px 6px; }
</style></head><body>
<div class="page">
  <div class="hero">
    <h1>Votre programme personnalisé</h1>
    <div class="sub">Établi par votre coach le ${d.evalDate}</div>
  </div>

  <div class="content">
    <div class="welcome">
      <div class="hi">Bonjour ${d.participantFirstName},</div>
      <div class="lead">Vous m'avez dit que votre objectif était :</div>
      <div class="quote">« ${d.clientGoal || 'Rester actif(ve) et en bonne santé'} »</div>
    </div>

    <div class="block block-green">
      <h2>Ce que vous faites déjà bien</h2>
      ${d.strengths.map(s => `<div class="check-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>${s}</span>
      </div>`).join('')}
    </div>

    <div class="block block-white">
      <h2>Votre programme sur 12 semaines</h2>
      <p style="font-size:13px;color:var(--slate-600);margin:0 0 14px;">${d.frequency} avec moi, adaptées à votre rythme.</p>
      <div class="program-text">${d.programSummary}</div>
    </div>

    <div class="block block-amber">
      <h2>À faire à la maison</h2>
      ${d.homeAdvice.split('.').filter(t => t.trim()).map(t =>
        `<div class="tip">• <span>${t.trim()}.</span></div>`
      ).join('')}
    </div>
  </div>

  <div class="closing">
    <div style="font-size:14px;font-weight:600;color:var(--accent-700);font-style:italic;">${d.participantFirstName}, chaque effort compte. Votre progression sera suivie à chaque séance.</div>
    <div style="font-size:11px;color:var(--slate-500);margin-top:10px;">Coach : ${d.coachName} | SeniorFit | ${d.coachEmail}</div>
    <div style="font-size:9px;color:var(--slate-400);font-style:italic;margin-top:6px;">Ce programme a été élaboré par un coach sportif diplômé. Il ne constitue pas un avis médical.</div>
  </div>
</div>
</body></html>`;
}
