# SeniorFit — Design System

## Identité visuelle

**Positionnement** : Outil médico-professionnel sobre, pas une app fitness grand public. Inspire confiance, lisibilité et efficacité pour un usage terrain en séance.

---

## Palette de couleurs

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Primary | Teal-600 | `#0d9488` | Boutons principaux, liens, accents actifs |
| Primary light | Teal-50 | `#f0fdfa` | Fond de chips sélectionnées, badges légers |
| Primary dark | Teal-700 | `#0f766e` | Hover des boutons primaires |
| Background | Blanc | `#ffffff` | Fond de page, cartes |
| Surface | Slate-50 | `#f8fafc` | Fond global, zones de contenu secondaire |
| Text principal | Slate-900 | `#0f172a` | Titres, labels |
| Text secondaire | Slate-600 | `#475569` | Corps de texte, descriptions |
| Text tertiaire | Slate-400 | `#94a3b8` | Placeholder, metadata |
| Border | Slate-200 | `#e2e8f0` | Bordures de cartes, inputs |
| Border input focus | Teal-500 | `#14b8a6` | Contour actif sur les champs |
| Success | Green-600 | `#16a34a` | Niveau VERT, scores bons |
| Warning | Amber-500 | `#f59e0b` | Niveau ORANGE, vigilance |
| Danger | Red-600 | `#dc2626` | Niveau ROUGE, alertes |
| Danger light | Red-50 | `#fef2f2` | Fond des zones d'alerte rouge |

---

## Typographie

- **Font family** : Inter (Google Fonts), fallback system-ui
- **Titres page (H1)** : 20px / 700 / Slate-900
- **Titres section (H2)** : 16px / 600 / Slate-800
- **Labels** : 14px / 500 / Slate-700
- **Corps** : 14px / 400 / Slate-600
- **Aide/Description** : 12px / 400 / Slate-400
- **Badge/Chip** : 12px / 500
- **Bouton principal** : 15px / 600

---

## Espacement

Base unit = 4px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

Padding de page : 16px horizontal (mobile), 24px (tablette)

---

## Composants

### Bouton Principal (Primary)
- Background: Teal-600 `#0d9488`
- Text: Blanc
- Border-radius: 8px
- Height: 48px (touch-friendly)
- Padding: 0 24px
- Font: 15px/600
- Hover: Teal-700 `#0f766e`
- Disabled: Slate-300, texte Slate-400

### Bouton Secondaire (Outline)
- Background: Blanc
- Border: 1px Slate-300
- Text: Slate-700
- Hover: fond Slate-50
- Même dimensions que Primary

### Bouton Fantôme (Ghost)
- Pas de border ni background
- Text: Teal-600
- Hover: fond Teal-50
- Utilisé pour "Retour" ou liens

### Input / Champ texte
- Height: 48px
- Border: 1px Slate-300
- Border-radius: 8px
- Focus: border Teal-500 + ring teal léger
- Font: 15px
- Placeholder: Slate-400

### Chip (sélection multiple)
- État inactif: fond Slate-100, texte Slate-600, border Slate-200
- État actif: fond Teal-50, texte Teal-700, border Teal-300
- Height: 36px, padding 12px, border-radius: 20px (pill)
- Utilisé pour les sélections multiples (motivations, équipement, etc.)

### Card (carte)
- Background: Blanc
- Border: 1px Slate-200
- Border-radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`
- Padding: 16px

### Badge de niveau (score)
- VERT: fond Green-50, texte Green-700, border Green-200
- ORANGE: fond Amber-50, texte Amber-700, border Amber-200
- ROUGE: fond Red-50, texte Red-700, border Red-200
- Border-radius: 6px, padding: 4px 10px, font: 12px/600

### Badge profil (P1-P5)
- P1 (Actif maintenu): fond Green-100, texte Green-800
- P2 (Déconditionné): fond Blue-100, texte Blue-800
- P3 (Fragile fonctionnel): fond Amber-100, texte Amber-800
- P4 (Risque chute): fond Red-100, texte Red-800
- P5 (Vigilance médicale): fond Purple-100, texte Purple-800
- Pill shape, 12px/600

### Alert / Drapeau
- ROUGE: fond Red-50, border-left 4px Red-600, icône AlertCircle rouge
- ORANGE: fond Amber-50, border-left 4px Amber-500, icône AlertTriangle amber
- VERT: fond Green-50, border-left 4px Green-600, icône CheckCircle vert
- Border-radius: 8px, padding: 12px 16px

### Slider
- Track: Slate-200, actif: Teal-500
- Thumb: Teal-600, 20x20px, shadow
- Labels min/max en Slate-400/12px

### Barre de progression module
- Background: Slate-200
- Actif: Teal-500
- Height: 4px
- Steps numérotés 1-9
- Step actif: cercle teal plein
- Step complété: cercle teal avec check
- Step futur: cercle slate vide

---

## Contraintes mobiles

- **Largeur cible** : 390px (iPhone 14) - design en 390px de large
- **Hauteur viewport** : 844px (iPhone 14)
- **Touch targets** : minimum 44x44px pour tout élément interactif
- **Navigation** : les boutons de validation sont en bas de page (zone pouce)
- **Formulaires** : 1 section / 1 bloc d'information par écran - pas de scroll infini
- **Keyboard** : prévoir l'espace quand le clavier virtuel est ouvert (bouton "Suivant" visible)

---

## Navigation de l'évaluation

Tous les modules M1-M9 ont la même structure de navigation :

```
[Header fixe]
  Nom du participant (14px, Slate-500)
  Titre du module (18px/600, Slate-900)

[Barre de progression]
  Pastilles 1-9 avec état complété/actif/futur

[Contenu scrollable]
  Sections du formulaire

[Footer fixe]
  [Précédent]    [Valider et continuer]
```

Le bouton "Valider et continuer" est toujours visible en bas, même si le contenu est scrollable.
