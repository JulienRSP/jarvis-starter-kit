Sauvegarde le travail en cours avec git en suivant ces étapes :

1. Initialise git si le dépôt n'existe pas encore (`git init`), puis vérifie que `.env` est bien dans `.gitignore` avant tout.
2. Lance `git status` pour voir les fichiers modifiés et non suivis.
3. Lance `git diff` pour voir le contenu des changements.
4. Propose un message de commit clair en français, qui résume CE QUI A CHANGÉ et POURQUOI. Format : type(scope): description courte — ex. `feat(livrables): ajout structure dossiers thématiques`.
5. Demande confirmation avant de committer.
6. Si confirmé : stage les fichiers pertinents (`git add`) en excluant les secrets, puis crée le commit.
7. Affiche un résumé final : nombre de fichiers commités, message utilisé, hash du commit.

Si l'argument $ARGUMENTS est fourni, utilise-le directement comme message de commit sans proposer.
