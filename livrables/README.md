# Livrables

Ce dossier contient tout ce que Claude produit pour toi. Ne jamais y mettre des documents sources ou des inputs.

## Règle d'or

| Quoi | Où |
|------|-----|
| Documents que **tu fournis** à Claude (briefs, exports, PDFs, données) | `context/import/` |
| Fichiers que **Claude produit** pour toi | `livrables/<thème>/` |

## Structure

```
livrables/
├── sites-web/      Sites internet, landing pages, maquettes HTML/CSS
├── applications/   Outils, scripts, automatisations, bots
├── youtube/        Briefs vidéos, scripts, hooks, calendrier éditorial
├── cabinet/        Livrables pour le cabinet de conseil Chatflow
└── ecole/          Livrables pour l'Apreneur Académie
```

## Convention de nommage

Format : `AAAA-MM-JJ_nom-du-projet_version`

Exemples :
- `2026-05-27_landing-page-chatflow_v1`
- `2026-06-01_script-youtube-ia-debutants_v2`
- `2026-06-15_automatisation-notion-crm_v1`

**Règles :**
- Dates en ISO 8601 (AAAA-MM-JJ) pour le tri chronologique automatique
- Kebab-case pour les noms (minuscules, tirets)
- Toujours versionner (`_v1`, `_v2`…) plutôt qu'écraser
- Pour les séries (ex : épisodes YouTube), ajouter un numéro : `_ep03`