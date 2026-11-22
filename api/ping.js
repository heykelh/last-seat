// LAST SEAT — reçoit les stats anonymes du jeu et envoie une notif ntfy.
// Variables d'environnement Vercel : NTFY_TOPIC (obligatoire), NTFY_SERVER (option, défaut https://ntfy.sh), NTFY_TOKEN (option).
// Rien n'est stocké : l'IP n'est ni lue ni conservée, seule la ville estimée par Vercel est transmise.
const clip = (v, n = 60) => String(v ?? '').replace(/[\r\n]+/g, ' ').slice(0, n);
const fmt = s => { s = +s || 0; return s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`; };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return res.status(204).end();

  // N'accepte que les appels venant du site lui-même
  const origin = req.headers.origin || req.headers.referer || '';
  if (origin && !origin.includes(req.headers.host)) return res.status(403).end();

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};

  const h = req.headers;
  let city = '';
  try { city = decodeURIComponent(h['x-vercel-ip-city'] || ''); } catch { city = h['x-vercel-ip-city'] || ''; }
  const where = [city, h['x-vercel-ip-country'] || ''].filter(Boolean).join(', ') || 'lieu inconnu';
  const device = b.mob ? '📱 mobile' : '💻 ordinateur';
  const from = clip(b.src || b.ref || 'accès direct', 40);
  const id = clip(b.sid, 8);

  let title, msg, tags, priority = 3;
  if (b.ev === 'open') {
    title = `🎮 Nouveau visiteur · ${where}`;
    msg = `${device} · ${clip(b.lang, 2).toUpperCase()} · mode ${clip(b.mode, 4)}\nVenu de : ${from}\nSession ${id}`;
    tags = ['video_game']; priority = 3;
  } else if (b.ev === 'end') {
    const st = Math.max(0, Math.min(3, +b.stars || 0));
    title = `🏁 ${clip(b.lvl, 12)} terminé · ${'★'.repeat(st)}${'☆'.repeat(3 - st)} · ${where}`;
    msg = `Durée du niveau : ${fmt(b.lt)} · session ${fmt(b.dur)}\nDétail : ${clip(b.detail, 160)}\nParcours : ${clip(b.done, 200)}\nSession ${id}`;
    tags = ['trophy']; priority = st >= 3 ? 4 : 3;
  } else if (b.ev === 'quit') {
    if (b.lvl) {
      title = `🚪 Abandon en ${clip(b.lvl, 12)} · ${where}`;
      msg = `Après ${fmt(b.lt)} dans le niveau (dernière action : ${clip(b.step, 30)})\nSession ${fmt(b.dur)} · ${device}\nDéjà fini : ${clip(b.done, 200) || 'rien'}\nSession ${id}`;
      tags = ['door'];
    } else {
      title = `👋 Fin de visite · ${where}`;
      msg = `Session ${fmt(b.dur)} · ${device}\nNiveaux finis : ${clip(b.done, 200) || 'aucun'}\nSession ${id}`;
      tags = ['wave']; priority = 2;
    }
  } else return res.status(400).end();

  try {
    await fetch(process.env.NTFY_SERVER || 'https://ntfy.sh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.NTFY_TOKEN ? { Authorization: `Bearer ${process.env.NTFY_TOKEN}` } : {}) },
      body: JSON.stringify({ topic, title, message: msg, tags, priority, click: 'https://last-seat-game.vercel.app' }),
    });
  } catch (e) { /* une notif ratée ne doit jamais casser le jeu */ }
  return res.status(204).end();
}
