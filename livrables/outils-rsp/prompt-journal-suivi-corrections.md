# Prompt — Corrections v4 → v5
# À envoyer à Claude Design

---

Corrige le fichier "Journal de suivi RSP Training v4.html" sur les 3 points suivants uniquement. Ne touche à rien d'autre.

---

## CORRECTION 1 — Délimitation visuelle de la colonne FAIM

**Problème :** La colonne "FAIM" à droite de la timeline n'est pas délimitée visuellement. Le client ne sait pas où écrire le chiffre de faim.

**Correction :**
- Ajoute une bordure gauche `1px solid #000` sur la colonne faim (`.tl-faim-h` et la zone faim dans `.tl-plot`)
- La zone d'écriture principale (`tl-lines`) doit s'arrêter à `right: 10mm` pour laisser place à la colonne faim de `10mm` de large
- Dans la colonne faim, ajoute une petite ligne horizontale à chaque repère horaire principal (6h, 12h, 18h, 0h) pour guider l'œil — juste un tiret `—` ou une ligne de 6mm en `border-top: 1px solid #ccc`
- Le label "FAIM" en haut de la colonne doit être centré dans ces 10mm et séparé du reste par la bordure gauche

---

## CORRECTION 2 — Espace d'écriture alimentation insuffisant

**Problème :** Les journées chargées (4+ prises alimentaires entre 18h et 21h par exemple) débordent.

**Correction :**
- Sur le **recto** (jours 1-2-3), passe de 18 lignes à **14 lignes** espacées de `--g: 7mm` — soit une hauteur totale de 98mm pour la timeline. Recalcule tous les `box-shadow` en conséquence (multiples de 7mm).
- Sur le **verso** (jours 4-5-6), garde le même `--g: 7mm` pour être cohérent avec le recto. Recalcule les `box-shadow` de la même façon.
- Les repères horaires restent aux mêmes positions relatives (6h, 9h, 12h, 15h, 18h, 21h, 0h) — recalcule leur `top: calc(var(--g) * N)` pour correspondre à la nouvelle valeur de `--g`.

---

## CORRECTION 3 — Étiquette sommeil ambiguë

**Problème :** "Réveil" et "Coucher" sont ambigus — le client ne sait pas s'il doit noter la nuit en cours ou la nuit précédente.

**Correction :**
Remplace la ligne `.wake` actuelle par :

```
Coucher (hier soir) : ___h     Réveil ce matin : ___h
```

Dans cet ordre : coucher en premier (nuit passée), réveil en second. Cela crée une séquence logique de lecture. Garde exactement le même format CSS que l'actuel `.wake`.

---

## CE QUI NE CHANGE PAS

- Tout le reste du document reste identique à la v4
- Ne touche pas aux instructions, digestion, indicateurs, ressenti du jour, footer
- Ne touche pas au style général, aux polices, aux couleurs, aux marges
- La légende faim (`faim-legend`) reste en place sous le titre "ALIMENTATION" sur chaque jour
- Le nombre de jours (6), la structure recto/verso, tout le reste est conservé

---
