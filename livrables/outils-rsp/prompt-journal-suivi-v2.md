# Prompt — Journal de suivi client RSP Training v2
# À envoyer à Claude Design avec les inspirations visuelles

---

Modifie le document existant "Journal de suivi RSP Training" pour intégrer les changements suivants. Recrée le fichier HTML complet en tenant compte de toutes les contraintes ci-dessous.

---

## CHANGEMENTS MAJEURS PAR RAPPORT À LA V1

### 1. SUPPRIMER le bloc "Bilan de la semaine"
Enlève entièrement la section bilan/synthèse du verso. Elle n'est plus nécessaire. Le verso se termine après le Jour 6 + pied de page.

### 2. SUPPRIMER le texte de pied de page droite
Retire "Renvoie ce document par photo WhatsApp en fin de semaine" du footer. Remplace par rien (footer simplifié : juste "RSP Training — Julien — Document confidentiel" à gauche).

---

## STYLE VISUEL — NOUVEAU

**Impression économique : noir sur blanc pur uniquement.**
- Zéro fond coloré ou gris. Pas de `background: #f2f2f2`, pas de `background: #000`.
- Les en-têtes de section (Jour, Alimentation, Indicateurs, etc.) sont identifiés par : texte uppercase bold + bordure inférieure épaisse `2px solid #000`. Pas de fond.
- Les labels de tranches horaires : uppercase bold, bordure gauche `3px solid #000`, padding-left 3mm.
- Police : Inter, taille de base 7.5pt.
- Bordures de grille : `1px solid #ccc` entre colonnes, `1px solid #000` pour les contours principaux.
- Lignes d'écriture : CSS `::after` box-shadow, identique à la v1.
- Checkboxes à cocher au stylo : `□` en texte ou petit span 8×8px border 1px solid #000.
- Options à entourer au stylo : texte séparé par des points médians `·` ou des `/`, police 7pt.

---

## STRUCTURE D'UN BLOC JOUR (identique pour les 6 jours)

### EN-TÊTE DU JOUR
Ligne simple : **JOUR X** (uppercase bold 9pt) · à droite : "Jour _______ Date _______"
Séparé du contenu par une ligne `2px solid #000`. Pas de fond noir.

---

### BLOC INSTRUCTIONS (une seule fois, en haut du RECTO uniquement, avant la grille des jours)
Cadre avec bordure fine `1px solid #000`, fond blanc, padding 2mm.
Texte en 7pt, structuré en 3 points courts :

**Titre :** "MODE D'EMPLOI — LIS ÇA AVANT DE COMMENCER"

**Point 1 — Pourquoi ce journal :**
"Ce document est ton outil de coaching. Plus tu le remplis avec précision, plus je peux t'aider efficacement. Chaque info que tu notes me permet d'adapter ton programme, ta nutrition et ton suivi à ce que tu vis vraiment — pas à des suppositions."

**Point 2 — Comment remplir :**
"Note ce que tu manges dans la tranche horaire correspondante, avec l'heure exacte si possible. Entoure ou coche les options proposées — pas besoin d'écrire un roman. Remplis au fil de la journée, pas le soir en essayant de te souvenir."

**Point 3 — Photos :**
"Si tu peux, prends une photo de ton assiette avant de manger et envoie-la sur WhatsApp. Ce n'est pas obligatoire mais c'est un vrai plus pour l'analyse."

---

### BLOC ALIMENTATION PAR TRANCHES HORAIRES

**Titre de section :** "ALIMENTATION" — uppercase bold, bordure inférieure 2px solid #000.

Remplace les 3 repas + collations par **5 tranches horaires fixes**. Chaque tranche est un bloc identique structuré ainsi :

**Label tranche** (bordure gauche 3px solid #000, uppercase bold 7pt) :
- 6H – 11H
- 11H – 14H
- 14H – 17H
- 17H – 21H
- 21H – 00H

**Contenu de chaque tranche :**

Ligne 1 : `Heure : ___h` (champ court, 10mm) · `Quoi + quantité approximative :`
Zone d'écriture : 2 lignes CSS

Ligne sous l'écriture — **Motivation (à entourer)** en 6.5pt italique :
`Faim réelle · Envie · Habitude · Stress · Plaisir · Pas faim`

Ligne fine de séparation entre tranches.

> Note importante : si le client n'a rien mangé dans une tranche, il laisse vide. Les tranches vides sont normales.

---

### BLOC DIGESTION DU JOUR

**Titre :** "DIGESTION & RESSENTI APRÈS REPAS" — uppercase bold, bordure inférieure 2px solid #000.

**Options à entourer** (une seule ligne, 7pt) :
`Bien · Lourd · Ballonné · Trop mangé · Ventre douloureux · Faim constante · Rien à signaler`

Pas de zone d'écriture ici. Juste les options à entourer.

---

### BLOC INDICATEURS

**Titre :** "INDICATEURS" — uppercase bold, bordure inférieure 2px solid #000.

**Sommeil :**
- `Coucher : ___h` · `Lever : ___h` (sur une ligne)
- `Sieste : □ Non □ Oui → ___min` (checkboxes à cocher)

**Sport :**
- `□ Non □ Oui → ___min` (sur une seule ligne, pas de champ séparé pour la durée)

**Qualité du sommeil — options à entourer (7pt) :**
`Excellent · Bon · Moyen · Mauvais · Très mauvais`

**Énergie dans la journée — options à entourer (7pt) :**
`Très haute · Bonne · Moyenne · Basse · Épuisé`

**Stress ressenti — options à entourer (7pt) :**
`Aucun · Léger · Modéré · Élevé · Débordant`

> Supprimer : eau bue (géré autrement), heures dormies (calculable à partir de coucher/lever).

---

### BLOC RESSENTI DU JOUR

**Titre :** "RESSENTI DU JOUR" — uppercase bold, bordure inférieure 2px solid #000.

Zone d'écriture libre : 2 lignes CSS.

Indication italique 6.5pt sous le titre :
`Humeur, fatigue particulière, événement qui a impacté la journée, douleur, pensée…`

---

## STRUCTURE DES PAGES

**RECTO (Page 1) :**
- En-tête du document (logo triangle SVG + titre + Prénom / Semaine du / Coach : Julien)
- Bloc instructions (pleine largeur, avant la grille)
- Grille 3 colonnes : Jour 1, Jour 2, Jour 3
- Footer gauche uniquement

**VERSO (Page 2) :**
- En-tête répété (sans le bloc instructions)
- Grille 3 colonnes : Jour 4, Jour 5, Jour 6
- Footer gauche uniquement
- Pas de bilan de semaine

---

## CONTRAINTES TECHNIQUES

Format : A4 portrait, 210mm × 297mm. Padding : 8mm tous côtés.

Impression économique : aucun fond coloré imprimé. Tout repose sur les bordures et le texte.

Pas d'inputs HTML. Document imprimable uniquement.

Le document doit tenir exactement en 2 pages A4. Compresse les espaces si nécessaire (réduire lignes d'écriture, espacement entre blocs) mais ne supprime aucune section.

@media print : `html, body { background: #fff }` · `.page:first-child { page-break-after: always }` · `@page { size: A4 portrait; margin: 0 }`.

---

## CE QUE TU NE DOIS PAS FAIRE

- Pas de fond noir sur les en-têtes de jour ou de section
- Pas de fond gris sur aucun élément
- Pas d'emojis
- Pas de bordures arrondies
- Ne pas remettre le bilan de semaine
- Ne pas remettre le texte WhatsApp dans le footer
- Ne pas inventer de sections non mentionnées ici

---
