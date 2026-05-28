# SeniorFit — Prompts Claude Design

> Copie chaque prompt dans Claude Design pour générer les maquettes.
> Commence toujours par mentionner le design system dans chaque prompt.

---

## DESIGN SYSTEM (à inclure en préambule de chaque prompt)

```
Design system de référence :
- Police : Inter
- Couleur primaire : Teal #0d9488 (boutons principaux, accents actifs)
- Fond : Blanc #ffffff
- Surface : Slate-50 #f8fafc
- Texte principal : Slate-900 #0f172a
- Texte secondaire : Slate-600 #475569
- Bordures : Slate-200 #e2e8f0
- Succès : Green-600 #16a34a | Vigilance : Amber-500 #f59e0b | Danger : Red-600 #dc2626
- Border-radius : 8px pour inputs/boutons, 12px pour cartes
- Bouton principal : 48px de hauteur, background teal, texte blanc
- Chips de sélection : pill shape, inactif=slate, actif=teal clair
- Univers : outil médico-professionnel sobre, pas une app fitness grand public
- Mobile-first : 390px de large, touch targets 44px minimum
```

---

## ÉCRAN 1 — Page de connexion

```
Contexte design system ci-dessus.

Crée une page de connexion mobile-first (390px) pour l'application SeniorFit, outil professionnel de coaching sportif pour seniors.

Layout vertical centré sur fond Slate-50 :

[En haut, centré, 32px de padding top]
Logo : icône Activity (ligne de vie ECG) en Teal-600, 32px
Nom app : "SeniorFit" en 24px/700, Slate-900
Sous-titre : "Espace coach" en 14px/400, Slate-500

[Carte blanche centrée, border-radius 16px, shadow légère, padding 24px, margin 32px horizontal]
Titre carte : "Connexion" en 18px/600, Slate-900

Label "Adresse email" Slate-700/14px/500
Input email : hauteur 48px, border Slate-300, border-radius 8px, placeholder "votre@email.com"
Espace 16px

Label "Mot de passe" Slate-700/14px/500
Input password : hauteur 48px, avec icône œil à droite pour show/hide
Espace 24px

Bouton "Se connecter" : pleine largeur, 48px, background Teal-600, texte blanc 15px/600, border-radius 8px

[Sous la carte, centré, 20px margin top]
Disclaimer en 11px/400, Slate-400, centré, italic :
"Accès réservé aux coachs autorisés"

[Bas de page, centré]
Version : "SeniorFit v1.0" en 11px Slate-300

Style global : propre, médical, sobre. Pas de fioriture. Fond légèrement grisé (#f8fafc). Ombre très légère sur la carte.
```

---

## ÉCRAN 2 — Dashboard / Liste des participants

```
Contexte design system ci-dessus.

Crée l'écran principal (dashboard) de l'app SeniorFit, mobile-first 390px.

[Header fixe, blanc, border-bottom Slate-200, height 56px]
Gauche : Logo "SF" en teal dans carré arrondi 32px + "SeniorFit" en 16px/600 Slate-900
Droite : Icône avatar (cercle initiales "J") 36px, teal clair

[Contenu page, fond Slate-50, padding horizontal 16px]

Section haut (padding-top 20px) :
- Titre "Mes participants" en 20px/700 Slate-900
- Sous-titre "15 participants actifs" en 14px/400 Slate-500
- Espace 16px

Barre de recherche :
- Input pleine largeur, height 44px, border-radius 8px, fond blanc, border Slate-200
- Icône loupe Slate-400 à gauche (padding-left 40px)
- Placeholder "Rechercher par nom..."
- Espace 16px

Bouton "+ Nouveau participant" :
- Pleine largeur, height 48px, background Teal-600, texte blanc 15px/600
- Icône UserPlus à gauche du texte
- Border-radius 8px
- Espace 20px

Liste des participants (cartes empilées, gap 10px) :
Affiche 3 cartes visibles.

Carte participant 1 (exemple: Marie Dupont, 72 ans) :
- Fond blanc, border Slate-200, border-radius 12px, padding 14px 16px
- Ligne 1: Nom "Marie Dupont" 15px/600 Slate-900 | Badge profil "P3 Fragile" fond Amber-100 texte Amber-800 border-radius 6px 12px/500
- Ligne 2: "72 ans • Femme" 13px Slate-500
- Ligne 3: "Dernière éval. : 12 mai 2026" 12px Slate-400 | "Voir profil →" texte Teal-600 12px/500
- Chevron droit côté Slate-300

Carte participant 2 (exemple: Robert Martin, 68 ans) :
- Même structure
- Badge "P2 Déconditionné" fond Blue-100 texte Blue-800
- "68 ans • Homme"
- "Dernière éval. : 3 avril 2026"

Carte participant 3 (exemple: Janine Leroy, 81 ans) :
- Badge "P4 Risque chute" fond Red-100 texte Red-800
- "81 ans • Femme"
- "Dernière éval. : 28 mars 2026"

[Barre de navigation du bas, blanc, border-top Slate-200, height 64px, fixed]
3 items : "Participants" (icône Users, teal actif) | "Évaluations" (icône ClipboardList, slate) | "Paramètres" (icône Settings, slate)

Style global : propre, professionnel. Les cartes sont aérées. Le bouton d'action principale est bien visible.
```

---

## ÉCRAN 3 — Dashboard - État vide (premier lancement)

```
Contexte design system ci-dessus.

Même header que l'écran 2, fond Slate-50.

Section principale centrée verticalement :
- Illustration SVG simple : silhouette d'une personne âgée marchant, contour teal, 120px
- Titre "Aucun participant" 18px/600 Slate-700, centré, margin-top 24px
- Description "Commencez votre première évaluation en ajoutant un participant." 14px/400 Slate-500, centré, padding horizontal 32px
- Espace 32px
- Bouton "+ Ajouter mon premier participant" : background Teal-600, blanc, pleine largeur avec margin 16px horizontal, height 52px, border-radius 8px, 15px/600

Même barre de navigation en bas.
```

---

## ÉCRAN 4 — Créer un nouveau participant

```
Contexte design system ci-dessus.

Page formulaire mobile-first 390px, fond Slate-50.

[Header avec navigation, blanc, height 56px, border-bottom Slate-200]
Gauche : icône chevron gauche (Retour) Slate-600
Centre : "Nouveau participant" 16px/600 Slate-900

[Contenu scrollable, padding 16px]

Section "Identité" :
Label section : "Identité" 12px/600 TEAL-600 uppercase tracking-wide
Espace 8px

Label "Prénom *" → Input texte 48px, placeholder "Marie"
Espace 12px

Label "Nom *" → Input texte 48px, placeholder "Dupont"
Espace 12px

Label "Date de naissance *" → Input date 48px, format JJ/MM/AAAA
Sous-label : "Âge calculé automatiquement" 12px Slate-400
Espace 12px

Label "Sexe *" → 2 boutons radio pills côte à côte :
"Femme" et "Homme", chacun 50% largeur, 44px height, border-radius 8px
Inactif : fond Slate-100 border Slate-200 texte Slate-600
Actif : fond Teal-50 border Teal-300 texte Teal-700
Espace 12px

Label "Email (optionnel)" → Input email 48px, placeholder "marie@example.com"
Sous-label : "Pour lui envoyer sa fiche client" 12px Slate-400

Séparateur Slate-200 margin 20px 0

Section "Mesures" :
Label section : "Mesures" 12px/600 TEAL-600 uppercase tracking-wide
Espace 8px

2 colonnes côte à côte :
Col 1: Label "Taille (cm)" → Input numérique 48px, placeholder "165"
Col 2: Label "Poids (kg)" → Input numérique 48px, placeholder "68"
Espace 12px

Zone de résultat IMC (apparaît après saisie) :
Carte teal-50 border teal-200 border-radius 8px padding 12px :
"IMC calculé : 25.0 kg/m²" 14px/600 Teal-700
"Surpoids" badge Amber-100 Amber-700
"Note : l'IMC est moins fiable après 70 ans" 11px Slate-500 italic

[Footer fixe, blanc, border-top Slate-200, padding 16px]
Bouton "Créer le participant et démarrer l'évaluation" → background Teal-600, blanc, pleine largeur, 52px, border-radius 8px, 15px/600, icône fleche droite à droite
```

---

## ÉCRAN 5 — M1 : Identification & Contexte (Module 1/9)

```
Contexte design system ci-dessus.

Page de module d'évaluation mobile-first 390px. C'est le premier des 9 modules.

[Header, fond blanc, border-bottom Slate-200, height 56px]
Gauche : Icône X (fermer) Slate-500
Centre : "Marie Dupont" 13px Slate-500 / "Module 1 — Identification" 15px/600 Slate-900 (deux lignes)
Droite : "1/9" 13px Teal-600/600

[Barre de progression, fond Slate-50, padding 12px 16px]
9 pastilles en ligne, gap 6px, centrées :
- Pastille 1 : cercle 28px fond Teal-600 texte blanc 12px/600 "1" (actif)
- Pastilles 2-9 : cercle 28px fond Slate-200 texte Slate-400 12px "2", "3"... etc.

[Contenu scrollable, padding 16px, fond Slate-50]

Bloc "Contexte de vie" — carte blanche border Slate-200 border-radius 12px padding 16px margin-bottom 12px :

Label "Situation de vie" 14px/500 Slate-700, margin-bottom 8px
4 boutons radio en grille 2x2, chacun 44px height, border-radius 8px :
"Seul(e)" | "En couple" | "Famille proche" | "Maison de retraite"
Inactif : fond Slate-100 border Slate-200. Actif : fond Teal-50 border Teal-300 texte Teal-700
Margin-bottom 16px

Label "Autonomie perçue" 14px/500 Slate-700, margin-bottom 8px
3 boutons radio en colonne, chacun 48px, pleine largeur, texte aligné gauche avec icône :
"Totalement autonome" icône CheckCircle vert | "Aide ponctuelle" icône HelpCircle amber | "Aide régulière" icône AlertCircle rouge

Bloc "Objectif du participant" — carte blanche :
Label "Objectif exprimé par la personne" 14px/500 Slate-700
Description "Notez ses mots exacts — cette phrase apparaîtra dans sa fiche" 12px Slate-400 italic
Textarea 4 lignes, border-radius 8px, placeholder "Ex : Je veux rester capable de monter mes escaliers seul..."
Espace 16px

Label "Motivation principale" 14px/500 Slate-700, margin-bottom 8px
Chips sélection multiple en wrap :
"Santé" | "Autonomie" | "Prévention chute" | "Perte de poids" | "Lien social" | "Bien-être"
Chip pill 36px height, padding 8px 14px, border-radius 20px
Inactif : fond Slate-100, actif : fond Teal-50 border Teal-300 texte Teal-700

Bloc "Disponibilité" :
Label "Séances encadrées/semaine" + select dropdown : 1x / 2x / 3x / + collectif
Label "Durée possible" + 3 boutons pills : "30 min" | "45 min" | "60 min"

[Footer fixe, blanc, border-top Slate-200, padding 12px 16px]
2 boutons côte à côte :
Gauche "Précédent" → bouton outline Slate-300, 48px, 45% largeur (grisé sur M1)
Droite "Suivant →" → bouton Teal-600 blanc, 48px, 55% largeur, icône fleche droite

Style : formulaire clair et aéré. Chaque bloc dans sa carte. Pas de scroll fatiguant.
```

---

## ÉCRAN 6 — M1 : Observations coach (suite Module 1)

```
Contexte design system ci-dessus.

Suite de M1, scroll sur le même écran ou page suivante dans le même module.

[Même header et barre de progression que l'écran 5]

[Contenu, padding 16px]

Bloc "Matériel disponible à domicile" — carte blanche :
Label 14px/500 Slate-700 + description "Sélectionnez tout ce qui est disponible" 12px Slate-400
Chips en grille wrap :
"Aucun" | "Chaise stable" | "Élastiques" | "Tapis" | "Haltères légers" | "Step"
Même style chips que l'écran 5

Bloc "Premières impressions du coach" — carte blanche :
Label "Attitude et posture à l'arrivée" 14px/500 Slate-700
Chips en wrap, sélection multiple :
"Enthousiaste" | "Anxieux/se" | "Réservé(e)" | "Confiant(e)" | "Fatigué(e)"
Espace 12px
Label "Marche observée" 14px/500 Slate-700
Chips : "Normale" | "Boiterie" | "Petits pas" | "Recherche d'appui" | "Déambulateur/canne"

[DRAPEAU AUTOMATIQUE - visible si "Boiterie", "Petits pas" ou "Recherche d'appui" coché]
Alerte amber, border-left 4px Amber-500, fond Amber-50, border-radius 8px, padding 12px 16px :
Icône AlertTriangle Amber-500 à gauche
Texte : "Surveiller le test TUG en M5 avec attention particulière" 13px/500 Amber-800

Bloc "Note libre du coach" — carte blanche :
Label "Observations libres" 14px/500 Slate-700
Textarea 3 lignes, fond Slate-50 dans le champ, placeholder "Contexte particulier, informations complémentaires..."

[Footer fixe - même que l'écran 5]
```

---

## ÉCRAN 7 — M2 : Screening PAR-Q+ (Module 2/9)

```
Contexte design system ci-dessus.

Module de sécurité, le plus critique de l'application. Mobile-first 390px.

[Header]
"Marie Dupont" 13px Slate-500 / "Module 2 — Sécurité PAR-Q+" 15px/600 Slate-900
"2/9" teal droite

[Barre progression : pastille 1 complétée (check blanc sur teal), pastille 2 active teal, 3-9 slate vides]

[Contenu, padding 16px]

Banner d'instruction — carte Teal-50 border Teal-200 border-radius 8px padding 12px 16px margin-bottom 16px :
Icône Mic teal à gauche
Texte "Posez ces questions oralement à votre participant. Saisissez les réponses." 13px/400 Teal-700

Questions (cartes individuelles, fond blanc, border Slate-200, border-radius 10px, padding 14px, gap 10px) :

Carte Q1 :
Numéro "Q1" fond Slate-100 texte Slate-500 10px/600 border-radius 4px padding 2px 6px inline
Texte question : "Votre médecin vous a-t-il déjà dit que vous aviez un problème cardiaque ?" 14px/400 Slate-800
Espace 10px
2 boutons côte à côte :
"Oui" : fond Red-50 border Red-300 texte Red-700 / "Non" : fond Green-50 border Green-300 texte Green-700
Height 40px, 50% width chacun, border-radius 8px
État sélectionné "Non" : fond Green-600 texte blanc border Green-600

Carte Q2 (identique) : "Ressentez-vous des douleurs thoraciques au repos ou à l'effort ?"
Carte Q3 : "Avez-vous des vertiges, pertes d'équilibre ou pertes de connaissance ?"
Carte Q4 : "Prenez-vous des médicaments pour la tension artérielle ou le cœur ?"
Carte Q5 : "Avez-vous un problème osseux ou articulaire qui pourrait s'aggraver avec l'exercice ?"
Carte Q6 : "Y a-t-il une autre raison médicale pour laquelle vous ne devriez pas faire d'exercice ?"
Carte Q7 : "Avez-vous chuté dans les 6 derniers mois ?"
   - Si "Oui" sélectionné : apparition de 2 champs en dessous :
     "Combien de fois ?" Input numérique 40px
     "Dans quel contexte ?" Input texte 40px placeholder "Escaliers, sol mouillé..."
Carte Q8 : "Avez-vous eu une hospitalisation ou opération dans les 12 derniers mois ?"

[Zone notes coach, carte blanche]
Label "Notes sécurité" 14px/500 Slate-700
Textarea 3 lignes, placeholder "Informations complémentaires sur l'état de santé..."

[Footer fixe] Même structure
```

---

## ÉCRAN 8 — M2 : Résultat ROUGE (évaluation bloquée)

```
Contexte design system ci-dessus.

État spécial du Module 2 quand la sécurité est compromise. Mobile-first 390px.

[Header identique M2]
[Barre progression identique]

[Contenu, padding 16px]

[GRANDE ALERTE ROUGE, prominence maximale]
Carte fond Red-50, border 2px Red-400, border-radius 12px, padding 20px :
En haut : icône ShieldX 32px Red-600 centré
Espace 12px
Titre "Évaluation physique suspendue" 17px/700 Red-800 centré
Espace 8px
Texte "Ce participant présente des facteurs de risque nécessitant un avis médical avant toute évaluation physique." 14px/400 Red-700 centré
Espace 16px
Séparateur Red-200
Espace 12px
Label "Raison(s) identifiée(s) :" 13px/600 Red-700
Liste à puces Red-600 13px/400 :
• Q1 — Problème cardiaque déclaré
• Q2 — Douleurs thoraciques signalées

Espace 16px
Carte blanche border Red-200 border-radius 8px padding 12px :
Texte "Recommandation : Orienter vers le médecin traitant avant de reprendre. Remettre la fiche d'orientation si disponible." 13px/400 Red-800

Espace 24px

Section "Modules accessibles malgré tout" — carte blanche border Slate-200 :
Label "Vous pouvez continuer avec :" 13px/600 Slate-700
Deux items avec icône check teal :
✓ Module 3 — Habitudes de vie (sans risque)
✓ Module 4 — Questionnaire fonctionnel (sans risque)
× Module 5 — Tests physiques (bloqué)

[Footer fixe]
Gauche : "Précédent" outline
Droite : "Continuer vers M3 →" bouton Amber-500 fond, blanc texte (pas teal, car situation dégradée)
```

---

## ÉCRAN 9 — M4 : Questionnaire Fonctionnel (Module 4/9)

```
Contexte design system ci-dessus.

Module d'évaluation fonctionnelle perçue. 10 questions. Mobile-first 390px.

[Header] "Marie Dupont" / "Module 4 — Fonctionnel" / "4/9"
[Barre progression : pastilles 1,2,3 complétées, 4 active, 5-9 vides]

[Contenu, padding 16px]

Instruction — carte Slate-50 border Slate-200 border-radius 8px padding 12px margin-bottom 16px :
"Demandez à la personne d'évaluer sa capacité pour chaque activité. Lisez à voix haute." 13px Slate-600
Échelle de référence en 5 petites pills en ligne :
"0 Impossible" slate | "1 Très difficile" rouge | "2 Difficile" orange | "3 Avec effort" amber | "4 Facile" vert

Questions (8 visibles à l'écran, scroll pour les 2 dernières) :

Chaque item = ligne avec :
Numéro "1." Slate-400 12px/600
Question "Se lever d'une chaise sans les mains" 14px/400 Slate-800
Score sélectionner : 5 cercles numérotés 0-4 en ligne, taille 36px chacun
0=red-100 rouge texte, 1=orange-100, 2=amber-100, 3=blue-100, 4=green-100
Cercle actif = rempli de sa couleur pleine, texte blanc, légère ombre

Items (un par groupe) :
1. Se lever d'une chaise sans les mains
2. Monter un escalier d'un étage
3. Marcher 10 minutes sans s'arrêter
4. Porter un sac de courses de 5 kg
5. S'habiller seul(e) sans aide
6. Sortir de baignoire ou de douche
7. Se retourner dans son lit
8. Ramasser quelque chose par terre
9. Tenir debout sur un pied quelques secondes
10. Faire demi-tour rapidement sans perdre l'équilibre
Chaque item séparé par un thin border Slate-100

[Score total en temps réel - sticky au bas du contenu avant footer]
Carte Teal-50 border Teal-200 border-radius 8px padding 10px 16px :
"Score : 28 / 40" 16px/700 Teal-700
"Niveau fonctionnel modéré" 13px Teal-600

[Champ note libre]
Textarea 2 lignes, placeholder "Observations particulières..."

[Footer fixe]
```

---

## ÉCRAN 10 — M5 : Tests Physiques (Module 5/9)

```
Contexte design system ci-dessus.

Module des tests physiques. Le plus dense de l'app. Mobile-first 390px.

[Header] "Marie Dupont" / "Module 5 — Tests physiques" / "5/9"
[Barre progression : 1,2,3,4 complétés (check), 5 actif, 6-9 vides]

[Sélecteur de test - tabs horizontal scrollable, fond Slate-100, border-radius 20px, height 36px]
"Chair Stand" | "TUG" | "Équilibre" | "Step Test" | "Flexibilité" | "Dos" | "Marche"
Tab actif : fond Blanc, texte Teal-600 600, shadow légère. Tab inactif : Slate-500.

[Contenu du test actif : "Chair Stand 30s"]
Carte principale, fond blanc, border Slate-200, border-radius 12px, padding 16px :

En-tête test :
"Chair Stand 30 secondes" 16px/600 Slate-900
"Force des membres inférieurs" 12px Slate-500

Section "Protocole" — fond Slate-50 border-radius 8px padding 10px 12px margin 12px 0 :
Icône Info Slate-400
"Assis au bord d'une chaise, les bras croisés sur la poitrine. Se lever et s'asseoir le plus de fois possible en 30 secondes." 12px/400 Slate-600

[Zone de saisie]
Label "Nombre de levers en 30 s" 14px/500 Slate-700
Gros input numérique centré : 64px height, border-radius 12px, font 24px/700 Teal-700, width 120px centré
Sous-label "répétitions" 12px Slate-400

[Résultat automatique - apparaît après saisie]
Bannière résultat (si score = 12 reps, femme 72 ans) :
"Dans la norme" — badge Green-600 fond Green-50, 14px/600
Valeur de référence : "Normes : 10-15 reps pour 70-74 ans (F)" 12px Slate-500

[Champs secondaires]
Toggle "Douleur observée ?" : switch ON/OFF, teal quand actif
Textarea 2 lignes "Commentaire" placeholder "Observations, asymétrie, compensation..."

Carte "Tests suivants" (sous le test actif) — fond Slate-50, liste 3 prochains tests avec icône check vide gris :
□ TUG — En attente
□ Équilibre — En attente
□ Step Test — En attente

[Footer fixe]
"Précédent" + "Test suivant →"
```

---

## ÉCRAN 11 — M5 : Test TUG avec alerte risque chute

```
Contexte design system ci-dessus.

Même structure que l'écran 10, tab "TUG" actif. Résultat qui déclenche une alerte.

[Zone de saisie TUG]
Label "Temps en secondes" 14px/500 Slate-700
Gros input numérique : 64px height, font 24px/700, affiche "15.4" (valeur exemple)

[RÉSULTAT ROUGE — déclenché car > 14s]
Bannière danger, fond Red-50, border Red-300, border-radius 8px, padding 12px 16px :
Icône AlertTriangle Red-600 à gauche
"ALERTE — Risque de chute élevé" 14px/700 Red-700
"15.4 s > seuil d'alerte (14 s)" 13px/400 Red-600
"Ce résultat est un critère fort pour le profil P4 — Risque chute prioritaire" 12px Red-500

Valeur de référence : "Norme : < 10 s normal / 10-14 s vigilance / > 14 s alerte" 12px Slate-500

[Drapeau automatique dans la zone dossier]
Petit badge sticky en bas à droite du contenu (avant footer) :
Icône Flag Red-500 + "Drapeau M5-TUG ajouté au profil" 12px Red-600

[Footer] identique
```

---

## ÉCRAN 12 — M7 : Synthèse & Profil (Module 7/9)

```
Contexte design system ci-dessus.

Module de synthèse — l'écran le plus important de l'évaluation. Mobile-first 390px.

[Header] "Marie Dupont" / "Module 7 — Synthèse & Profil" / "7/9"
[Barre progression : 1-6 complétés, 7 actif, 8-9 vides]

[Contenu, padding 16px]

[PROFIL AUTO-CALCULÉ — prominente, première section]
Carte avec fond gradient léger Amber-50 to Amber-100, border Amber-300, border-radius 16px, padding 20px :

En haut : label "Profil calculé automatiquement" 11px/600 Amber-600 uppercase
Espace 8px
"P3" grand badge pill 32px, fond Amber-600 texte blanc, 20px/700 inline
Espace 8px après badge
Titre "Fragile Fonctionnel" 18px/700 Amber-800
Description "Force et/ou équilibre faibles, priorité sécurité et confiance" 13px/400 Amber-700
Espace 16px

"Les 3 indicateurs décisifs :" label 12px/600 Amber-700
3 items avec icône flèche :
→ TUG : 15.4 s (alerte risque chute)
→ Score fonctionnel M4 : 22/40 (faible)
→ FES total M3 : 12/16 (peur élevée)

Section "Valider le profil" — carte blanche border Slate-200 border-radius 12px padding 16px margin-top 12px :

Label "Le coach valide ou ajuste le profil" 13px/500 Slate-700
5 options profil en colonne, chacune 48px, border-radius 8px, border 1px :
P1 — Actif maintenu (fond Slate-50 texte Slate-600) | P2 — Déconditionné | P3 — Fragile (actif sélectionné, fond Amber-50 border Amber-300 texte Amber-700 avec check) | P4 — Risque chute | P5 — Vigilance médicale

Si autre que P3 sélectionné : input texte 40px apparaît "Justification de la modification..."

Section "Points forts identifiés" — carte blanche :
3 badges verts pill : "Endurance correcte" | "Flexibilité hanches normale" | "Motivation élevée"

Section "Points de vigilance" — carte blanche :
3 badges amber pill : "Équilibre fragile" | "Peur de tomber élevée" | "Force MI insuffisante"

Section "Drapeaux rouges actifs" — carte fond Red-50 border Red-200 :
2 items icône Flag rouge :
🚩 M5 TUG > 14s — risque chute
🚩 M3 FES > 10 — peur de tomber élevée

Textarea "Commentaire de synthèse coach" — 3 lignes

[Footer fixe]
"Précédent" + "Valider le profil →" bouton Teal-600
```

---

## ÉCRAN 13 — M8 : Recommandations (Module 8/9)

```
Contexte design system ci-dessus.

Module de planification. Le coach lit et modifie les recommandations auto-générées. Mobile-first 390px.

[Header] "Marie Dupont" / "Module 8 — Recommandations" / "8/9"

[Badge profil rappel en haut du contenu]
"P3 Fragile Fonctionnel" badge Amber-600 fond Amber-50 avec icône info à droite

[Carte principale : Recommandations auto-générées - entièrement éditable]

Section "Fréquence recommandée" :
Label 14px/500 Slate-700
3 boutons pills : "1×/semaine" | "2×/semaine (recommandé)" | "3×/semaine"
Le bouton recommandé = pré-sélectionné en Teal-50

Section "Axes prioritaires" :
Label 14px/500 Slate-700
Chips multiples (pré-coché selon le profil P3) :
✓ Équilibre (fond Teal-50 sélectionné) | ✓ Force MI | ✓ Confiance | Endurance | Mobilité | Coordination

Section "Planification 12 semaines" — grande zone texte éditable :
Label "Programme recommandé — modifiable" 13px/500 Slate-700 + icône Edit2 Slate-400
Fond Slate-50 border Slate-200, border-radius 8px, padding 12px, font 13px/400 Slate-700, height 180px, textarea :
[Contenu pré-rempli automatiquement pour P3] :
"Semaines 1-4 — Adaptation et confiance
Objectif : Créer un environnement sécurisant, prendre confiance, évaluer les compensations réelles.
Exercices : Équilibre assis-debout guidé, marche encadrée, renfo léger membres inférieurs.
Intensité : RPE 3-4/10. Progression douce.

Semaines 5-12 — Développement progressif  
Objectif : Renforcement des membres inférieurs, amélioration de l'équilibre dynamique.
Exercices : Squat partiel, marche tandem, step-up bas, exercices proprioception.
Intensité : RPE 5-6/10."

Section "Points de sécurité spécifiques" :
Textarea 3 lignes pré-remplie : "Toujours travailler avec appui disponible. Éviter les exercices en déséquilibre non contrôlé. Surveiller la fatigue..."

Section "Conseils autonomie domicile" :
Textarea 3 lignes pré-remplie : "Marche quotidienne 20 min si possible. Exercices de levé de chaise 2×/semaine à domicile..."

[Footer fixe]
"Précédent" + "Générer les fiches →"
```

---

## ÉCRAN 14 — M9 : Génération des fiches (Module 9/9)

```
Contexte design system ci-dessus.

Dernier module, écran de génération et téléchargement des PDF. Mobile-first 390px.

[Header] "Marie Dupont" / "Module 9 — Génération" / "9/9"
[Barre progression : 1-8 complétés avec check, 9 actif teal]

[Contenu, padding 16px]

[RÉSUMÉ ÉVALUATION - carte récapitulatif]
Carte fond Teal-50 border Teal-200 border-radius 16px padding 20px margin-bottom 16px :
Icône Award Teal-600 24px
Titre "Évaluation complète" 16px/600 Teal-800
"Marie Dupont — 72 ans — 28 mai 2026" 13px Teal-600
Espace 12px
3 items avec icône check vert :
✓ Screening sécurité : ORANGE
✓ Profil attribué : P3 — Fragile Fonctionnel
✓ Programme 12 semaines : généré

Séparateur
"Score fonctionnel : 22/40 | TUG : 15.4s | Équilibre : 7s semi-tandem" 12px Slate-600

[Section fiches à générer]
Label "Fiches à générer" 14px/600 Slate-700 margin-bottom 12px

Carte fiche coach — fond blanc border Slate-200 border-radius 12px padding 16px margin-bottom 10px :
Icône FileText Slate-600 à gauche
"Fiche Coach — Technique" 15px/600 Slate-800
"Scores bruts, normes, profil, programme complet, notes coach" 12px Slate-500
Bouton "Générer et télécharger" Teal-600 fond teal texte blanc height 40px width 100% border-radius 8px margin-top 12px

Carte fiche client — fond blanc border Slate-200 border-radius 12px padding 16px :
Icône FileHeart Teal-500 à gauche
"Fiche Client — Simplifiée" 15px/600 Slate-800
"Langage accessible, points forts, programme simplifié" 12px Slate-500
"Destinée à être remise au participant" 11px Teal-600 italic
Bouton "Générer et télécharger" outline Teal-600 height 40px width 100% border-radius 8px margin-top 12px

[Disclaimer médico-légal]
Zone fond Slate-50 border Slate-200 border-radius 8px padding 12px margin-top 16px :
Icône Shield Slate-400 small à gauche
Texte italic 11px Slate-500 : "Cet outil est une aide à la décision pour un professionnel diplômé. Il ne remplace pas un avis médical. SeniorFit n'est pas un outil de diagnostic."

[Footer fixe]
"Précédent" outline + "Terminer l'évaluation" Teal-600 avec icône Check

[État après génération]
Le bouton "Générer" devient : icône Check Green-600 + "Fiche générée — Téléchargée" green
```

---

## ÉCRAN 15 — PDF Coach (format A4 imprimable)

```
Contexte design system ci-dessus.

Design d'un document PDF A4 (210×297mm). Style médical professionnel, dense mais lisible. Prévu pour impression ou lecture écran.

[En-tête document]
Bandeau teal-600 pleine largeur, height 60px :
Gauche : "SeniorFit" 20px/700 blanc + "Fiche d'Évaluation Coach" 13px blanc
Droite : Logo icône Activity blanc 24px
Sous-bandeau : 2 colonnes :
Gauche : "Marie Dupont • 72 ans • Femme" | "Évaluation du 28 mai 2026"
Droite : Badge profil P3 Amber-600 avec icône + disclaimer italic 10px Slate-500 "Outil professionnel, ne remplace pas l'avis médical"

[Section 1 : Profil & Synthèse]
Titre section barre gauche 3px teal : "PROFIL ATTRIBUÉ" 11px/700 Teal-600 uppercase
Grande zone : "P3 — Fragile Fonctionnel" 20px/700 Amber-800 | Description 13px Amber-700
3 colonnes : Points forts (Green) | Points de vigilance (Amber) | Drapeaux rouges (Red)

[Section 2 : Résultats Tests Physiques M5]
Tableau 2 colonnes :
Test | Résultat | Norme | Niveau
Chair Stand 30s | 11 reps | 10-15 (F 70-74) | Normal ✓ Green badge
TUG | 15.4 s | <10 normal | Alerte 🔴 Red badge
Équilibre semi-tandem | 7 s | >10 normal | Vigilance 🟡
Step Test | 78 pas | 68-101 | Normal ✓
Sit & Reach | +3 cm | -1 à 14 | Normal ✓
Back Scratch | -8 cm | -9 à 4 (F) | Normal ✓
Vitesse marche 4m | 0.86 m/s | >0.8 m/s | Normal ✓

[Section 3 : Scores M4 + M3]
Score fonctionnel : 22/40 — Faible | Score FES : 12/16 — Peur élevée
PAR-Q : ORANGE — adapter intensité

[Section 4 : Programme 12 semaines]
Le texte du M8 structuré en 2 colonnes

[Pied de page]
"Généré par SeniorFit le 28/05/2026 | Coach : Julien | ID éval : SF-2026-0015" 9px Slate-400
"Ne pas diffuser sans accord du participant. Données personnelles confidentielles." 9px italic Slate-400
```

---

## ÉCRAN 16 — PDF Client (format A4 visuel)

```
Contexte design system ci-dessus.

Document PDF A4 destiné à être remis au participant. Style chaleureux mais professionnel. Pas de termes techniques, pas de scores bruts. Langage positif et encourageant.

[En-tête avec couleur]
Bandeau Teal-600, height 80px, avec wave bottom légère :
"Votre programme personnalisé" 22px/700 blanc centré
"Établi par votre coach le 28 mai 2026" 13px blanc/80% centré

[Zone personnalisée, padding 30px]

Bloc accueil encadré Teal-50 border-radius 12px border Teal-200 :
"Bonjour Marie," 18px/600 Teal-800
"Vous m'avez dit que votre objectif était :" 14px Slate-600
[Encadré italic] "Je veux rester capable de monter mes escaliers seule" 15px/500 Slate-800 italic

[Section Vos points forts] — fond Green-50 border-radius 12px border Green-200 padding 16px :
Titre "Ce que vous faites déjà bien 💪" 15px/600 Green-800 (emoji autorisé ici car destiné au client)
3 items avec icône check Green-600 :
✓ Votre endurance cardiovasculaire est dans la norme pour votre âge
✓ Votre souplesse des épaules est bonne
✓ Votre motivation est un vrai atout pour progresser

[Section Programme simplifié] — carte blanche border Slate-200 border-radius 12px padding 16px :
Titre "Votre programme sur 12 semaines" 15px/600 Slate-900
Description 13px Slate-600 : "2 séances par semaine avec moi, adaptées à votre rythme"
3 axes avec icône coloré :
⚖️ Équilibre et stabilité — priorité principale
💪 Force des jambes — progressivement
🧘 Confiance dans vos mouvements

Section semaines 1-4 (fond Slate-50 border-radius 8px padding 12px) :
"Les 4 premières semaines : prise en main" 13px/600 Slate-800
Texte 13px Slate-600 : "Exercices doux et guidés pour vous remettre en confiance. Vous décidez du rythme."

[Section conseils maison] fond Amber-50 border-radius 8px padding 12px :
"À faire à la maison" icône Home Amber-600
3 tips 13px Amber-800

[Pied de page]
"Marie, chaque effort compte. Votre progression sera suivie à chaque séance." 14px/600 Teal-700 italic centré
[Ligne coach] "Coach : Julien | SeniorFit | julien@rsp-coaching.be" 11px Slate-500 centré
Disclaimer 9px italic Slate-400 : "Ce programme a été élaboré par un coach sportif diplômé. Il ne constitue pas un avis médical."
```

---

## NOTES D'UTILISATION CLAUDE DESIGN

1. **Commence par l'écran 1** (Login) pour valider le style global avant de générer les autres
2. **Inclus toujours le design system** en préambule de chaque prompt
3. **Pour les écrans longs** (M1, M4, M5, M8) : demande une version scrollée montrant la partie haute et une version montrant la partie basse
4. **Pour le PDF** : demande le format A4 portrait explicitement
5. **Feedback couleurs** : si le teal semble trop vif ou trop terne, ajuste en demandant "plus sobre" ou "plus lumineux"
6. **Version tablette** : une fois les mobiles validés, tu peux demander les versions 768px pour les modules les plus denses (M5, M7)

---

## ORDRE DE GÉNÉRATION RECOMMANDÉ

1. Écran 1 — Login (validation du style)
2. Écran 2 — Dashboard (validation de la structure globale)
3. Écran 7 — M2 PAR-Q+ (formulaire critique)
4. Écran 12 — M7 Synthèse (écran le plus complexe)
5. Écran 15 — PDF Coach
6. Tous les autres dans l'ordre
