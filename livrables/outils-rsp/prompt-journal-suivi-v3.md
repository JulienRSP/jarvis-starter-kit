# Prompt — Journal de suivi RSP Training v3
# À envoyer à Claude Design

---

Recrée le document "Journal de suivi RSP Training" en intégrant les modifications suivantes sur la base de la v2. Recrée le fichier HTML complet.

---

## CHANGEMENT PRINCIPAL — TIMELINE ALIMENTAIRE

Remplace les tranches horaires avec champs "heure" par une **timeline verticale continue** qui va de **6h à 00h**, affichée dans le bloc Alimentation de chaque jour.

### Structure visuelle de la timeline

La timeline est une colonne divisée en 3 parties :

**Colonne gauche — L'axe temps (10mm de large) :**
Une ligne verticale fine `1px solid #000` qui descend de 6h à 00h.
Sur cette ligne, 4 repères d'heures fixes espacés uniformément : **6h · 12h · 18h · 00h**
Chaque repère est une petite encoche horizontale + le label en 6pt bold à gauche.
Entre chaque repère, 2 repères intermédiaires sans label (juste une encoche plus courte) pour les heures 9h, 15h, 21h — pour guider visuellement.

**Colonne centrale — Zone d'écriture (largeur principale) :**
À côté de chaque zone entre deux repères, prévoir des lignes d'écriture continues (box-shadow CSS). Le client écrit le nom de ce qu'il a mangé et la quantité à hauteur de l'heure correspondante sur l'axe.
Pas de champ "heure à remplir" — le client se positionne visuellement sur l'axe.
2 lignes d'écriture par zone entre repères (soit 3 zones × 2 lignes = 6 lignes au total de 6h à 00h).

**Colonne droite — Faim (8mm de large) :**
Titre de colonne en haut : "FAIM" en 6pt uppercase bold.
Pour chaque zone entre repères, une petite case de 7×7px à remplir d'un chiffre (le client écrit 0, 1, 2, 3, 4 ou 5 au stylo).
Pas de ligne d'écriture ici — juste un espace vide centré pour noter le chiffre.

### Légende de l'échelle de faim
Placée en pleine largeur **au-dessus de la timeline**, avant les repères :
`Faim : 0 = aucune · 1-2 = légère · 3 = normale · 4 = forte · 5 = très intense`
Taille 6pt, italique, alignée à gauche.

---

## CHANGEMENT — EN-TÊTE DU JOUR

Juste sous le titre "JOUR X / Jour ___ Date ___", ajouter immédiatement sur la ligne suivante (avant tout autre contenu) :

`Réveil : ___h     Coucher : ___h`

En 7pt, champs courts avec ligne à remplir. Le client remplit le réveil le matin dès qu'il se lève, et le coucher le lendemain matin.
Ce sont les premières informations du jour, placées en tout premier.

---

## CE QUI RESTE INCHANGÉ DE LA V2

- Suppression du bilan de semaine
- Suppression du texte footer WhatsApp (footer gauche uniquement)
- Bloc instructions pleine largeur en haut du recto uniquement
- Bloc digestion à entourer : `Bien · Lourd · Ballonné · Trop mangé · Ventre douloureux · Faim constante · Rien à signaler`
- Sport : `□ Non □ Oui → ___min`
- Sieste : `□ Non □ Oui → ___min`
- Qualité sommeil à entourer : `Excellent · Bon · Moyen · Mauvais · Très mauvais`
- Énergie à entourer : `Très haute · Bonne · Moyenne · Basse · Épuisé`
- Stress à entourer : `Aucun · Léger · Modéré · Élevé · Débordant`
- Ressenti du jour : zone d'écriture libre 2 lignes + indication italique
- Impression économique : zéro fond coloré, noir sur blanc pur, bordures uniquement

---

## CONTRAINTES TECHNIQUES

Format A4 portrait, 210mm × 297mm, padding 8mm.
3 colonnes par page, 6 jours au total sur 2 pages.
Chaque colonne fait environ 58mm de large — la timeline doit être compacte mais lisible.
Pas d'inputs HTML. Document imprimable.
@media print propre, page-break-after sur le recto, @page A4 portrait margin 0.
Le tout doit tenir exactement en 2 pages — compresse verticalement si nécessaire sans supprimer de section.

---

## CE QUE TU NE DOIS PAS FAIRE

- Ne pas remettre de champ "heure" à remplir dans l'alimentation
- Ne pas remettre les options "Faim réelle / Envie / Habitude..." — remplacé par l'échelle 0-5
- Ne pas remettre le bilan de semaine
- Ne pas remettre de fond noir ou gris
- Ne pas mettre de bordures arrondies
- Ne pas inventer de sections non mentionnées

---
