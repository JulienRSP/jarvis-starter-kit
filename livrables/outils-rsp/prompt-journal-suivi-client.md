# Prompt — Journal de suivi client RSP Training
# À envoyer à Claude Design avec tes inspirations visuelles

---

Crée un document imprimable A4 portrait, recto-verso (2 pages), pour le suivi hebdomadaire des clients d'un coach sportif (RSP Training). Ce document est rempli à la main par le client chaque jour pendant 6 jours consécutifs.

---

## STYLE VISUEL — À respecter strictement

Police : **Inter** (ou Arial/Helvetica en fallback). Taille de base : 8pt.

Palette : **noir et blanc uniquement**. Pas de couleur. Fond blanc (#fff), texte noir (#000), remplissages gris léger (#f2f2f2) pour les en-têtes de section, bordures fines (#999) et bordures fortes (#333 ou #000).

Ambiance : document professionnel, clinique, dense mais lisible. Pas de décoratif. Chaque millimètre doit servir.

En-têtes de section : fond gris clair (#f2f2f2), texte uppercase bold, bordure 1px solid #333, même traitement que la fiche testing RSP Training existante.

Logo RSP Training en haut à gauche : triangle SVG noir (balise `<svg>`) identique à celui de la fiche testing.

Bordure de titre principal : ligne noire 2px solid sous l'en-tête du document.

Lignes d'écriture dans les cases : générées en CSS via `::after` avec `box-shadow` répété (technique déjà utilisée dans les fiches RSP existantes). Pas d'inputs HTML, c'est un document imprimable.

Checkboxes : petits carrés `<span class="cb">` 9×9px, bordure 1px solid #333, à cocher au stylo.

---

## STRUCTURE DU DOCUMENT

### RECTO (Page 1) — Jours 1, 2, 3

**En-tête commun au document (en haut de page) :**
- Logo triangle + "RSP Training — Journal de suivi" en uppercase bold 13pt
- Sous-titre : "Note ce que tu manges et ressens chaque jour — plus c'est précis, meilleurs sont tes résultats."
- Champs : Prénom / Semaine du / Coach : Julien

**Grille 3 colonnes** (une colonne = un jour), séparées par des bordures fines.

---

### STRUCTURE D'UN JOUR (identique pour les 6 jours)

**En-tête de colonne — fond noir, texte blanc :**
- "JOUR X" en uppercase bold
- Champ : Jour _______ Date _______

**BLOC REPAS PRINCIPAUX**
Titre de section : "ALIMENTATION" (fond gris, uppercase, bold)

Trois sous-blocs identiques pour : Petit-déjeuner / Déjeuner / Dîner
Chaque sous-bloc contient :
- Label du repas (uppercase bold, fond gris très léger)
- Indication en italique minuscule : "Quoi + quantité si possible (poignée / gr / portion)"
- Zone d'écriture avec 3 lignes CSS

**BLOC COLLATIONS & GRIGNOTAGES**
Titre de section : "COLLATIONS / GRIGNOTAGES" (fond gris, uppercase, bold)
- Zone d'écriture unique avec 2 lignes CSS
- Indication : "Tout ce qui est mangé en dehors des 3 repas"

**BLOC INDICATEURS JOURNALIERS**
Titre de section : "INDICATEURS" (fond gris, uppercase, bold)
Grille compacte de champs avec ligne à remplir et unité :
- Coucher : ___ h   Lever : ___ h   Heures dormies : ___ h
- Qualité sommeil : ___ /10
- Énergie dans la journée : ___ /10
- Niveau de stress : ___ /10
- Faim ressentie : ___ /10
- Eau bue : ___ L
- Sport : _________________   Durée : ___ min

**BLOC RESSENTI LIBRE**
Titre : "RESSENTI DU JOUR" (fond gris léger)
Zone d'écriture avec 2 lignes CSS
Indication en italique : "En une phrase : comment tu t'es senti aujourd'hui ?"

---

### VERSO (Page 2) — Jours 4, 5, 6 + Bilan semaine

**En-tête identique au recto** (répétition du titre + prénom / semaine)

**Jours 4 et 5** : même structure exacte que les jours du recto, en 2 colonnes.

**Jour 6** : même structure, en colonne 3.

**BLOC BILAN DE LA SEMAINE** (en bas de page, pleine largeur, fond gris léger)
Titre : "BILAN DE LA SEMAINE" (uppercase bold, fond noir, texte blanc)

Deux colonnes :
Colonne gauche :
- Moyennes hebdomadaires (champs à remplir) : Sommeil moyen /10 / Énergie moyenne /10 / Stress moyen /10 / Séances sport : ___
- Poids début de semaine : ___ kg   Poids fin de semaine : ___ kg *(facultatif)*

Colonne droite :
- "Ce qui a bien marché :" — zone 3 lignes
- "Ce qui a été difficile :" — zone 3 lignes
- "Ce que je veux améliorer la semaine prochaine :" — zone 3 lignes

**Pied de page (recto et verso) :**
- Gauche : "RSP Training — Julien — Document confidentiel"
- Droite : "Renvoie ce document par photo WhatsApp en fin de semaine"

---

## CONTRAINTES TECHNIQUES

Format : A4 portrait, 210mm × 297mm. Padding : 8mm sides, 8mm top/bottom.

Pas d'inputs HTML (formulaire imprimable, pas digital). Toutes les zones d'écriture sont des divs avec lignes générées en CSS.

Impression : media print propre, pas de couleur de fond imprimée sauf les noirs (#000) et gris (#f2f2f2). La feuille doit être lisible en noir et blanc sur n'importe quelle imprimante.

Densité : le document doit tenir en 2 pages A4 exactement. Optimise la taille des blocs pour que tout rentre sans overflow.

---

## CE QUE TU NE DOIS PAS FAIRE

- Pas de couleurs autres que noir/blanc/gris
- Pas d'emojis dans les labels (sauf si demandé)
- Pas de bordures arrondies (design orthogonal uniquement)
- Pas d'espace vide non justifié
- Pas de sections répétées inutilement
- Ne pas mettre d'instructions sur quoi écrire dans les cases — laisser vide pour que le client écrive librement

---
