# 🎟️ LAST SEAT

> *Chaque place vide est un euro parti sans toi.*

**LAST SEAT** est un jeu rétro 8-bit pour apprendre le **Revenue Management ferroviaire** en 15 minutes, sans prérequis. Il est jouable en français et en anglais, sur ordinateur et sur mobile.

👉 **Jouer :** `https://<ton-projet>.vercel.app`

---

## 🕹️ Les 3 niveaux

| Niveau | Mission de l'analyste RM | Ce qu'on apprend |
|---|---|---|
| 🎟️ **1 · Avant l'ouverture** | Répartir 200 places entre 4 niveaux de prix | Classes emboîtées, règle de Littlewood, EMSR-b, spill vs spoilage, Monte-Carlo sur 2 000 trains |
| 🧩 **2 · Le Tetris des tronçons** | Arbitrer les demandes sur Paris → Lyon → Marseille | Origine-destination vs tronçon, coût de déplacement, bid prices |
| 🕹️ **3 · Le Cockpit** | Fixer le prix de J-60 à J-1 face aux imprévus | Pricing dynamique, élasticité, courbe de montée en charge, engagement prix, image |

Les **roues** (12 cases, réparties selon les probabilités) tirent la demande et les imprévus. Le joueur décide **avant** de connaître le résultat, comme dans la vraie vie.

## ✨ Fonctionnalités

- **Comparaison avec trois références :** un algorithme (EMSR-b ou programmation dynamique), un coach (programmation dynamique approchée par Monte-Carlo) et le « Devin », l'optimum calculé a posteriori.
- **Mode guidé au niveau 3 :** plan de vol, alertes sur les prix risqués, couloir conseillé sur la courbe et conseils d'une cheffe de service.
- **Glossaire** de 27 termes du Revenue Management.
- **Journal CSV** de toutes les décisions, à coller dans Excel ou Power BI pour faire un retour d'expérience.
- **Musique chiptune funky et bruitages 8-bit**, générés en direct avec la Web Audio API, sans aucun fichier audio.
- **Interface bilingue FR / EN** et responsive.

## 🧱 Technique

- **Un seul fichier :** `index.html` (HTML, CSS et JavaScript).
- **Aucune dépendance, aucun build, aucune collecte de données.**
- **Police** *Press Start 2P* intégrée en base64.
- **Algorithmes codés à la main :**
  - EMSR-b (Belobaba) ;
  - programmation dynamique sur tronçons ;
  - bid prices estimés par Monte-Carlo ;
  - programmation dynamique de pricing.

## 🚀 Lancer en local

Ouvre simplement `index.html` dans un navigateur. Ou, avec un petit serveur :

```bash
npx serve .
```

## 🔬 Méthodologie & limites

La demande est simulée : lois normales, avec des consentements à payer gaussiens. Les paramètres sont choisis pour la pédagogie. Ce n'est **pas** un moteur de production, mais un démonstrateur pour apprendre à raisonner comme un analyste Revenue Management.

## 📜 Crédits & licences

- **Conception et code :** HYKE © 2026.
- **Police :** [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) par CodeMan38, sous SIL Open Font License 1.1.
- **Statut :** projet personnel et pédagogique, **non affilié à la SNCF**. Les couleurs rendent hommage à l'univers ferroviaire français, sans logo ni marque.
