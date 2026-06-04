# Prompt — Fiche Testing RSP Training (à envoyer à Claude.ai)

Copie tout ce qui est entre les deux lignes === et envoie-le tel quel à Claude.ai.

===

Crée un document HTML complet, optimisé pour l'impression en A4 recto-verso, en noir et blanc uniquement.

Ce document est une fiche de notation pour un coach sportif indépendant (RSP Training). Il l'utilise pendant une séance de testing physique avec un client. Il doit pouvoir noter les résultats à la main, cocher les observations, écrire de courts commentaires. Le document doit être fonctionnel avant d'être beau.

---

## CONTRAINTES DE MISE EN PAGE

- Format A4 strict. Page 1 = recto. Page 2 = verso. Chaque page tient dans une seule feuille A4 imprimée. Rien ne déborde.
- Noir et blanc uniquement. Les séparations visuelles utilisent des bordures fines (1px solid #999), des fonds très légers (#f2f2f2 uniquement pour les en-têtes de section), et du texte en gras.
- Police : Arial ou Inter. Taille de base : 8pt pour le contenu, 9pt pour les titres de test, 11pt pour les titres de section, 13pt pour le titre principal.
- Pas d'icônes, pas de couleurs, pas de décorations. Grille propre.
- Les cases à cocher sont des carrés de 9x9px avec border: 1px solid #333, display: inline-block, margin-right: 3px, vertical-align: middle.
- Les champs à remplir à la main = ligne avec border-bottom: 1px solid #333 uniquement, pas de bordure sur les côtés.
- CSS : @media print et @page { size: A4; margin: 8mm 10mm; }
- page-break-after: always après la page 1.
- overflow: hidden sur tous les blocs pour éviter les débordements.

---

## STRUCTURE D'UN BLOC TEST

Chaque test suit exactement ce format visuel :

```
[NOM DU TEST] — [OBJECTIF EN 5 MOTS MAX]   (fond gris très léger, gras, 9pt)
Description courte en italique 8pt — 1 ligne maximum
Instructions / position — 1-2 lignes, 8pt normal

Observations :  □ Texte  □ Texte  □ Texte  □ Texte  (sur une ou deux lignes)

Résultat : _______ unité       G : ______ / D : ______  (si applicable)
                                Hommes : ___________  Femmes : ___________  (si norme H/F différente)

Coach : _________________________________
```

---

## PAGE 1 — RECTO

### EN-TÊTE

Logo RSP Training : un triangle équilatéral dessiné en SVG inline (noir, rempli), hauteur 20px, à gauche du titre. Proportions du triangle : équilatéral, pointe vers le haut.

```
▲ RSP TRAINING — BILAN PHYSIQUE INITIAL
Prénom : _____________________ | Date : _______________ | Âge : ______
Lieu : ______________________ | Objectif : ______________________________
FC repos : ______ bpm | Taille : ______ cm | Poids déclaré : ______ kg
```

Séparateur ligne pleine sous l'en-tête.

---

### SECTION A — OBSERVATION STATIQUE ET MARCHE

**OBSERVATION STATIQUE + MARCHE — Posture et déplacement**
*Client debout naturellement. Observer de face, profil G, profil D (30s chaque). Puis marche 5-6 mètres A/R.*
*Ne rien noter devant le client pendant cette phase. Mémoriser, noter après.*

Observations :
□ Antépulsion tête   □ Asymétrie épaules   □ Hypercyphose (dos arrondi)   □ Hyperlordose (creux lombaire)
□ Valgus genoux   □ Varus genoux   □ Pieds en rotation interne   □ Pieds en rotation externe
□ Marche asymétrique   □ Oscillation bras réduite   □ Longueur de pas inégale

Coach : _____________________________________________

---

### SECTION B — MOBILITÉ

**OVERHEAD SQUAT — Mobilité globale**
*Pieds largeur d'épaules, bâton bras tendus au-dessus. 5 répétitions lentes, observer face et profil.*

Observations :
□ Talons qui décollent (cheville)   □ Genoux en dedans (hanche/fessiers)   □ Tronc trop incliné avant (hanche/thoracique)
□ Bras tombent vers l'avant (épaule/thoracique)   □ Dos qui s'arrondit (core/chaîne post)   □ Bonne exécution globale

Coach : _____________________________________________

---

**WEIGHT BEARING LUNGE TEST — Mobilité cheville**
*Pied avant à Xcm du mur. Faire toucher le genou au mur sans décoller le talon. Augmenter la distance progressivement.*

Résultat   G : ______ cm   /   D : ______ cm

□ < 8 cm — restriction significative   □ 8-10 cm — mobilité limitée   □ 10-12 cm — normal   □ > 12 cm — bonne mobilité
□ Asymétrie G/D > 1.5 cm (à noter)

Coach : _____________________________________________

---

**90-90 HIP ROTATION TEST — Mobilité hanche**
*Assis au sol, jambe avant à 90° devant (genou fléchi), jambe arrière à 90° sur le côté (genou fléchi). Effectuer le switch : faire basculer les deux jambes simultanément de l'autre côté SANS se lever, en rotation des hanches. La jambe avant passe derrière, la jambe arrière passe devant. Observer la fluidité, les compensations et les douleurs.*

Observations :
□ Switch fluide et sans douleur   □ Rotation interne limitée G   □ Rotation interne limitée D
□ Rotation externe limitée G   □ Rotation externe limitée D   □ Bassin qui décolle du sol
□ Compensation tronc   □ Douleur signalée (zone : ___________ )

Coach : _____________________________________________

---

**BACK SCRATCH TEST — Mobilité épaule**
*Main droite par-dessus l'épaule vers le bas du dos. Main gauche par en dessous vers le haut du dos. Mesurer l'écart entre les deux mains. + = chevauchement, - = espace restant.*

Résultat   G : ______ cm   /   D : ______ cm

Hommes :   □ < -8 cm (limitation)   □ -8 à -3 cm (correct)   □ > -3 cm (bien)
Femmes :   □ < -3 cm (limitation)   □ -3 à 0 cm (correct)   □ > 0 cm (bien)
□ Asymétrie notable G/D   □ Douleur signalée

Coach : _____________________________________________

---

**ROTATION THORACIQUE — Mobilité colonne**
*Assis sur chaise, bras croisés sur la poitrine. Rotation maximale G puis D. Observer amplitude et symétrie.*

□ < 30° (restriction)   □ 30-45° (limite)   □ > 45° (fonctionnel)   □ Asymétrie G/D

Coach : _____________________________________________

---

### SECTION C — STABILITÉ

**PLANCHE ISOMÉTRIQUE — Stabilité du core**
*Position planche avant (ou genoux). Tenir jusqu'à rupture de forme ou 60s max.*

Version : □ Standard   □ Genoux          Durée : ______ s

□ < 20s (faiblesse)   □ 20-40s (base)   □ 40-60s (satisfaisant)   □ > 60s (bien)
□ Hanche monte   □ Hanche descend   □ Compensation cervicale   □ Forme stable

Coach : _____________________________________________

---

**ÉQUILIBRE UNIPODAL — Proprioception**
*Debout sur une jambe, mains sur les hanches, yeux ouverts. Chronométrer jusqu'à perte d'équilibre. Max 30s.*

G : ______ s   /   D : ______ s

□ < 10s (faiblesse)   □ 10-20s (limité)   □ 20-30s (bien)   □ 30s (excellent)   □ Asymétrie G/D > 5s

Coach : _____________________________________________

---

## PAGE 2 — VERSO

### SECTION D — FORCE ET PUISSANCE

**PUSH-UP TEST — Force poussée membres supérieurs**
*Corps aligné ou version genoux. Descendre à 1 cm du sol, remonter complet. Compter jusqu'à rupture de forme.*
*Annoncer la version genoux positivement dès le départ si profil déconditionnné : "On fait la version sur les genoux, ça donne exactement la même information."*

Version : □ Standard   □ Genoux          Résultat : ______ reps

**Standards :**   Hommes : □ < 5 (faible)   □ 5-12 (base)   □ 12-20 (bien)   □ > 20 (excellent)
**Genoux :**       Hommes : □ < 8 (faible)   □ 8-15 (base)   □ 15-25 (bien)   □ > 25 (excellent)
**Standards :**   Femmes :  □ < 2 (faible)   □ 2-6 (base)   □ 6-10 (bien)    □ > 10 (excellent)
**Genoux :**       Femmes :  □ < 4 (faible)   □ 4-10 (base)  □ 10-18 (bien)  □ > 18 (excellent)

□ Hanche qui monte   □ Coudes trop écartés   □ Descente incomplète   □ Bonne forme

Coach : _____________________________________________

---

**DEAD HANG — Endurance membres supérieurs et longévité**
*Barre de traction. Prise pronation largeur d'épaules. Bras entièrement tendus, épaules engagées (pas relâchées). Tenir jusqu'au lâcher involontaire. Stopper si douleur épaule ou poignet.*
*Contexte à partager avec le client : "La force de préhension est un des meilleurs prédicteurs de santé et d'autonomie à long terme."*

Durée : ______ s

Hommes : □ < 15s (faible)   □ 15-30s (base)   □ 30-60s (bien)   □ > 60s (excellent)
Femmes :  □ < 8s (faible)    □ 8-20s (base)    □ 20-40s (bien)   □ > 40s (excellent)

□ Épaules relâchées (mauvaise forme)   □ Balancement du corps   □ Douleur signalée

Coach : _____________________________________________

---

**SAUT HORIZONTAL SANS ÉLAN — Puissance explosive membres inférieurs**
*Pieds joints ou légèrement écartés, orteils derrière la ligne. Flexion genoux + balancement bras + saut horizontal max. 2 essais, garder le meilleur. Mesurer depuis la ligne jusqu'au talon le plus proche.*

Essai 1 : ______ cm   /   Essai 2 : ______ cm   →   Meilleur : ______ cm

Hommes : □ < 140 cm (faible)   □ 140-180 cm (base)   □ 180-220 cm (bien)   □ > 220 cm (excellent)
Femmes :  □ < 110 cm (faible)   □ 110-145 cm (base)   □ 145-175 cm (bien)   □ > 175 cm (excellent)

□ Déséquilibre à l'atterrissage   □ Genoux en dedans à l'atterrissage   □ Hésitation au départ

Coach : _____________________________________________

---

**SQUAT 30 SECONDES — Endurance force membres inférieurs**
*Debout devant une chaise, bras croisés. Se lever et s'asseoir le plus de fois en 30 secondes. La chaise sert de repère.*

Résultat : ______ reps

Hommes : □ < 12 (faible)   □ 12-16 (base)   □ 16-20 (bien)   □ > 20 (excellent)
Femmes :  □ < 10 (faible)   □ 10-14 (base)   □ 14-18 (bien)   □ > 18 (excellent)

□ Appui sur les mains pour se lever   □ Valgus genoux   □ Bonne exécution

Coach : _____________________________________________

---

### SECTION E — CARDIO

**YMCA 3 MINUTE STEP TEST — Capacité cardiovasculaire**
*Step 30 cm. Cadence : 24 montées/min — métronome réglé à 96 BPM (rythme up-up-down-down). Durée : 3 minutes continues. À l'arrêt : client s'assoit immédiatement. Compter les battements cardiaques pendant 60 secondes complètes.*

FC récupération (60s après arrêt) : ______ bpm

Intégrer ici un tableau compact des normes YMCA par âge et sexe. Le tableau doit tenir en moins de 4 lignes de hauteur. Format : deux mini-tableaux côte à côte (Hommes | Femmes), avec colonnes Âge / Excellent / Bien / Moyen / Faible. Utiliser les valeurs suivantes :

HOMMES (FC récup en bpm) :
18-25 : Exc < 79 / Bien 79-89 / Moy 90-99 / Faible > 100
26-35 : Exc < 81 / Bien 81-89 / Moy 90-99 / Faible > 100
36-45 : Exc < 83 / Bien 83-90 / Moy 91-100 / Faible > 101
46-55 : Exc < 87 / Bien 87-97 / Moy 98-105 / Faible > 106
56-65 : Exc < 86 / Bien 86-97 / Moy 98-103 / Faible > 104
65+   : Exc < 88 / Bien 88-96 / Moy 97-103 / Faible > 104

FEMMES (FC récup en bpm) :
18-25 : Exc < 85 / Bien 85-93 / Moy 94-102 / Faible > 103
26-35 : Exc < 88 / Bien 88-96 / Moy 97-103 / Faible > 104
36-45 : Exc < 90 / Bien 90-98 / Moy 99-107 / Faible > 108
46-55 : Exc < 94 / Bien 94-101 / Moy 102-110 / Faible > 111
56-65 : Exc < 95 / Bien 95-103 / Moy 104-111 / Faible > 112
65+   : Exc < 90 / Bien 90-101 / Moy 102-109 / Faible > 110

□ Essoufflement excessif avant la fin   □ Récupération rapide   □ Récupération lente

Coach : _____________________________________________

---

### SYNTHÈSE COACH

**POINTS FORTS** (2-3 max)

— ___________________________________________________________________
— ___________________________________________________________________
— ___________________________________________________________________

**LEVIERS À TRAVAILLER** (3 max)

— ___________________________________________________________________
— ___________________________________________________________________
— ___________________________________________________________________

**PLAN D'ACTION**

Action 1 (résultat rapide) : __________________________________________________
Action 2 (priorité principale) : ________________________________________________
Action 3 (objectif long terme) : _______________________________________________

---

**OFFRE RECOMMANDÉE**

□ Séances PT à la carte   □ Suivi mensuel RSP   □ Méthode RSP Hybride 8 semaines

Prix annoncé : ______ €   □ Paiement en 2 fois proposé

— ___________________________________________________________________

---

**PHOTOS**   □ Consentement reçu avant séance   □ Photos prises : □ Face  □ Profil G  □ Dos

Tenue notée : _______________________

---

*RSP Training — Julien — Document confidentiel — Bilan conservé par le coach*

===
