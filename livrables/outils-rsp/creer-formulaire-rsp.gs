/**
 * RSP Training — Formulaire approfondi clients signés
 * Colle ce code dans script.google.com et clique sur Exécuter.
 * Le formulaire se crée automatiquement dans ton Google Drive.
 */

function creerFormulaireRSP() {

  // ── Créer le formulaire ──────────────────────────────────────────────────
  var form = FormApp.create('Ton bilan de départ — RSP Training');

  form.setDescription(
    "Ce formulaire est le point de départ de ton accompagnement personnalisé avec moi.\n\n" +
    "Il me permet de vraiment te connaître avant qu'on construise ton programme — pas juste tes objectifs, " +
    "mais toi : comment tu vis, comment tu manges, comment tu récupères, d'où tu viens et où tu veux aller.\n\n" +
    "Il n'y a pas de bonne ou mauvaise réponse. Plus tu es honnête, plus je peux construire quelque chose " +
    "qui te correspond vraiment. Tout ce que tu écris reste strictement confidentiel entre nous.\n\n" +
    "Temps estimé : 20 à 25 minutes. Tu peux le remplir en plusieurs fois si besoin — tes réponses sont sauvegardées automatiquement."
  );

  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setAllowResponseEdits(true);
  form.setCollectEmail(true);
  form.setConfirmationMessage(
    "Merci. J'ai bien reçu tes réponses. Je les lis en détail et on en parle lors de notre premier appel. À très vite — Julien"
  );


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 1 — TON QUOTIDIEN
  // ════════════════════════════════════════════════════════════════════════
  form.addSectionHeaderItem()
    .setTitle('1 — TON QUOTIDIEN')
    .setHelpText('Quelques questions sur ta vie de tous les jours pour que je comprenne ton contexte réel.');

  form.addTextItem()
    .setTitle('Quel est ton métier ou ton activité principale en ce moment ?')
    .setHelpText('ex. employé de bureau, infirmière, étudiant, freelance, en reconversion...')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Décris-moi une journée normale pour toi — du réveil au coucher. Horaires, repas, travail, moments libres.')
    .setHelpText("Pas besoin d'être exhaustif. L'idée c'est juste que j'aie une image de comment ta journée se passe réellement.")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Quelle est ta situation de vie actuellement ?')
    .setChoiceValues([
      'Seul(e)',
      'En couple, sans enfant',
      'En couple, avec enfant(s)',
      'Parent seul',
      'En famille (parents, colocataires)',
      'Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Dans ta vie telle qu'elle est maintenant — pas idéalement, mais vraiment — combien d'heures par semaine tu peux réalistement dédier à prendre soin de ton corps ?")
    .setHelpText("Inclus l'entraînement, la préparation de tes repas, le temps de récupération — tout ce qui est pour toi.")
    .setChoiceValues([
      'Moins de 2 heures',
      'Entre 2 et 4 heures',
      'Entre 4 et 6 heures',
      'Entre 6 et 8 heures',
      'Plus de 8 heures'
    ])
    .setRequired(true);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 2 — LE SPORT ET L'ACTIVITÉ PHYSIQUE
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle("2 — LE SPORT ET L'ACTIVITÉ PHYSIQUE")
    .setHelpText("Ton histoire avec le mouvement. C'est la base de ce qu'on va construire ensemble.");

  form.addParagraphTextItem()
    .setTitle("Raconte-moi ton histoire avec le sport — depuis l'enfance jusqu'à aujourd'hui. Qu'est-ce que tu as pratiqué, laissé tomber, repris ?")
    .setHelpText("Pas de longueur imposée. Si c'est \"pas grand-chose\", c'est déjà une réponse importante.")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Il y a des sports, des mouvements ou des activités physiques que tu aimes vraiment — ou que tu as toujours voulu essayer sans jamais l'avoir fait ?")
    .setHelpText("Peu importe si c'est du padel, de la natation, du vélo, de la danse, de la randonnée — tout compte.")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Quand tu t'entraînes ou que tu bouges, comment tu te sens en général — avant la séance, pendant, et après ?")
    .setHelpText("Honnêteté totale bienvenue — \"je déteste avant et j'adore après\" c'est une réponse valable.")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Dans ta vie de maintenant, combien de fois par semaine tu pourrais réalistement t'entraîner ?")
    .setChoiceValues([
      '1 fois par semaine',
      '2 fois par semaine',
      '3 fois par semaine',
      '4 fois ou plus par semaine'
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("Dans le passé, qu'est-ce qui t'a empêché d'être régulier(e) dans ton activité physique ? Plusieurs réponses possibles.")
    .setChoiceValues([
      'Manque de temps',
      "Manque de motivation ou d'envie",
      'Blessure ou douleur physique',
      'Je ne savais pas quoi faire ni comment',
      'Les résultats venaient trop lentement',
      'Accès à une salle ou à un équipement compliqué',
      'Un événement de vie (déménagement, enfant, travail, maladie)',
      "La fatigue ou le manque d'énergie",
      'Autre'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Est-ce qu'il y a des exercices ou des mouvements que tu n'aimes vraiment pas faire, ou que tu refuses ? Si oui, lesquels — et si tu sais pourquoi, dis-le moi.")
    .setHelpText("Aucun jugement. Si tu détestes courir ou les abdos, je préfère le savoir maintenant.")
    .setRequired(false);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 3 — LE SOMMEIL
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle('3 — LE SOMMEIL')
    .setHelpText("Le sommeil est un des facteurs les plus importants pour tes résultats — souvent plus que l'entraînement lui-même. Pas de bonne ou mauvaise réponse.");

  form.addTextItem()
    .setTitle("À quelle heure tu te couches en général ? Et à quelle heure tu te lèves ?")
    .setHelpText("Format libre — ex. coucher : 23h30 / lever : 7h00")
    .setRequired(true);

  form.addScaleItem()
    .setTitle("Comment tu évalues la qualité de ton sommeil en ce moment ?")
    .setBounds(1, 10)
    .setLabels('Très mauvais, je dors très mal', 'Excellent, je récupère vraiment bien')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Comment tu te sens au réveil la plupart du temps ?")
    .setChoiceValues([
      "Reposé(e) et en forme",
      "Correct(e), pas exceptionnel",
      "Fatigué(e) même après avoir dormi",
      "Épuisé(e) systématiquement"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Tu te réveilles souvent la nuit ?")
    .setChoiceValues([
      'Rarement ou jamais',
      'Parfois (1 à 2 fois par semaine)',
      'Souvent (plusieurs fois par nuit)',
      'Presque chaque nuit'
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("Qu'est-ce qui perturbe ton sommeil le plus souvent ? Plusieurs réponses possibles.")
    .setChoiceValues([
      "Stress ou pensées qui ne s'arrêtent pas",
      'Écrans avant de dormir',
      'Bruit ou lumière',
      'Douleurs physiques',
      'Horaires irréguliers (travail, sorties)',
      'Mon rythme naturel (je suis du soir / du matin)',
      'Rien de particulier, je dors bien',
      'Autre'
    ])
    .setRequired(true);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 4 — LA NUTRITION
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle('4 — LA NUTRITION')
    .setHelpText("Ton alimentation et ta relation à la nourriture. Sois aussi honnête que possible — c'est ce qui me permettra de construire une approche qui te correspond vraiment.");

  form.addParagraphTextItem()
    .setTitle("Décris ce que tu manges sur une journée normale — du matin au soir. Sois aussi précis que tu peux, sans te juger.")
    .setHelpText("Petits-déjeuners, déjeuners, dîners, grignotages, boissons — tout compte. Pas de bonne ou mauvaise réponse.")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Tu manges à des horaires fixes ou c'est plutôt variable selon les jours ?")
    .setChoiceValues([
      'Horaires assez fixes, je mange aux mêmes heures',
      'Plutôt régulier mais parfois décalé',
      'Variable selon les jours',
      "Je n'ai pas vraiment d'horaires de repas"
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Est-ce que tu cuisines ? Si oui, combien de fois par semaine environ ?")
    .setChoiceValues([
      'Non, presque jamais',
      'Parfois (1 à 2 fois par semaine)',
      'Régulièrement (3 à 4 fois par semaine)',
      'Presque tous les jours'
    ])
    .setRequired(true);

  form.addScaleItem()
    .setTitle("Sur 10, comment tu évalues ta relation à la nourriture en ce moment ?")
    .setBounds(1, 10)
    .setLabels('Très compliquée, pleine de culpabilité ou de frustration', 'Totalement sereine et naturelle')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Beaucoup de personnes traversent des moments où elles mangent de façon désorganisée — pour gérer le stress, l'ennui, la tristesse, ou comme récompense. Est-ce que ça t'arrive ? Si oui, dans quelles circonstances ?")
    .setHelpText("C'est très courant et ça ne dit rien de ta volonté. Je te pose la question pour pouvoir t'aider à mieux gérer ces moments, pas pour te juger.")
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle("Est-ce que tu as déjà suivi un régime ou un plan alimentaire strict dans ta vie ? Si oui, raconte-moi ce qui s'est passé.")
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle("Pour toi, \"bien manger\" ça ressemble à quoi ? Qu'est-ce que ça veut dire dans ta tête ?")
    .setRequired(true);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 5 — LE STRESS ET LA CHARGE MENTALE
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle('5 — LE STRESS ET LA CHARGE MENTALE')
    .setHelpText("Le stress a un impact direct sur tes résultats sportifs et alimentaires. Ces questions m'aident à adapter le programme à ta réalité.");

  form.addScaleItem()
    .setTitle("Sur 10, comment tu évalues ton niveau de stress habituel dans ta vie ?")
    .setBounds(1, 10)
    .setLabels('Très calme, je gère bien', "Sous pression constante, c'est épuisant")
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("D'où vient principalement ton stress ? Plusieurs réponses possibles.")
    .setChoiceValues([
      'Travail ou études',
      'Vie de couple ou relations',
      'Famille (parents, enfants)',
      'Finances',
      "Ma santé ou celle d'un proche",
      'Manque de temps',
      "Incertitudes sur l'avenir",
      "Je ne me sens pas vraiment stressé(e)",
      'Autre'
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("Quand tu traverses une période difficile, comment tu réagis en général ? Plusieurs réponses possibles.")
    .setChoiceValues([
      'Je fais du sport ou je bouge plus',
      'Je mange plus, ou différemment',
      'Je mange moins',
      "Je m'isole",
      'Je parle à des proches',
      "Je travaille encore plus pour m'occuper",
      'Je dors mal',
      "Je fais autre chose pour décrocher (séries, jeux, sorties)",
      'Autre'
    ])
    .setRequired(true);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 6 — TON PASSÉ
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle('6 — TON PASSÉ ET TES TENTATIVES PRÉCÉDENTES')
    .setHelpText("Comprendre ce qui a marché et ce qui n'a pas marché avant, c'est ce qui m'évite de reproduire les mêmes erreurs.");

  form.addParagraphTextItem()
    .setTitle("Est-ce que tu as déjà essayé de changer ton alimentation, ton rapport au sport, ou ta santé de façon globale ? Si oui, qu'est-ce qui n'a pas marché — honnêtement ?")
    .setHelpText("Les raisons d'échec passées sont les informations les plus utiles que tu puisses me donner. Je préfère les connaître maintenant pour ne pas reproduire les mêmes erreurs.")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Est-ce qu'il y a quelque chose dans ton histoire — par rapport à ton corps, ta santé, ou ta relation à l'alimentation et au sport — que tu penses important que je sache pour t'accompagner correctement ?")
    .setHelpText("Tu choisis ce que tu partages. Pas d'obligation. Mais si quelque chose te semble important, c'est probablement parce que ça l'est.")
    .setRequired(false);


  // ════════════════════════════════════════════════════════════════════════
  // SECTION 7 — LE FUTUR ET TES ATTENTES
  // ════════════════════════════════════════════════════════════════════════
  form.addPageBreakItem()
    .setTitle('7 — LE FUTUR ET TES ATTENTES')
    .setHelpText("La dernière section. Ces questions m'aident à construire un programme qui correspond à ta vision, pas à une vision générique.");

  form.addParagraphTextItem()
    .setTitle("Dans 6 mois, si l'accompagnement se passe vraiment bien, comment tu te vois ? Qu'est-ce qui aurait changé — dans ton corps, ton énergie, ta vie au quotidien ?")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Qu'est-ce que tu veux absolument ne plus ressentir dans 6 mois ?")
    .setHelpText("Fatigue chronique, culpabilité après les repas, douleur, honte, essoufflement, manque de confiance... tout ce dont tu veux te débarrasser.")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Sur quoi tu es prêt(e) à vraiment faire des efforts, même si c'est difficile ? Et sur quoi tu refuses de faire des compromis ?")
    .setHelpText("Par exemple : \"Je veux bien changer mes habitudes alimentaires mais je refuse de supprimer le repas du dimanche en famille\" — c'est une vraie réponse et elle est utile.")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("Comment tu préfères qu'on communique au quotidien pendant le suivi ?")
    .setChoiceValues([
      'Messages WhatsApp',
      'Email',
      "Peu importe, je m'adapte"
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Y a-t-il autre chose que tu voudrais me dire — quelque chose que je ne t'ai pas demandé mais que tu trouves important que je sache avant qu'on commence ?")
    .setHelpText("Cette question est intentionnelle. Certaines choses importantes ne rentrent dans aucune case. Cet espace est pour elles.")
    .setRequired(false);


  // ── Résultat ─────────────────────────────────────────────────────────────
  var editUrl = form.getEditUrl();
  var publishedUrl = form.getPublishedUrl();

  Logger.log('✅ Formulaire créé avec succès !');
  Logger.log('🔧 Lien édition (pour toi) : ' + editUrl);
  Logger.log('📋 Lien client (à envoyer) : ' + publishedUrl);
}
