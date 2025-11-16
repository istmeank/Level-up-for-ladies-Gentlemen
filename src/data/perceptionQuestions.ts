export type QuestionType =
  | "short"
  | "paragraph"
  | "radio"
  | "checkbox"
  | "scale";

export type QuestionOption = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  helperText?: string;
  placeholder?: string;
};

export type Section = {
  id: number;
  title: string;
  description?: string;
  questions: Question[];
};

// Perception – 7 sections, 30 questions
export const perceptionSections: Section[] = [
  {
    id: 1,
    title: "Informations générales",
    questions: [
      { id: "fullName", label: "Nom complet", type: "short", required: true, placeholder: "Ex: Abdenacer Maredj" },
      { id: "age", label: "Âge", type: "short", required: true, placeholder: "Ex: 28" },
      {
        id: "gender",
        label: "Genre",
        type: "radio",
        required: true,
        options: [
          { value: "homme", label: "Homme" },
          { value: "femme", label: "Femme" },
          { value: "autre", label: "Autre" },
        ],
      },
      {
        id: "email",
        label: "Email",
        type: "short",
        required: true,
        placeholder: "exemple@domaine.com",
        helperText: "Utilise un email valide.",
      },
      {
        id: "whatsapp",
        label: "Numéro WhatsApp",
        type: "short",
        required: true,
        placeholder: "+213XXXXXXXXX",
        helperText: "Format requis: +213 suivi de 9 chiffres.",
      },
      { id: "location", label: "Localisation (ville, pays)", type: "short", required: true, placeholder: "Ex: Alger, Algérie" },
    ],
  },
  {
    id: 2,
    title: "Ton état actuel",
    questions: [
      {
        id: "selfDescription",
        label: "Décris-toi en 3-4 phrases : qui es-tu aujourd'hui ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "frequentEmotions",
        label: "Quelles émotions ressens-tu le plus souvent dans ta vie quotidienne ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "topStressSources",
        label: "Quelles sont les 3 principales sources de stress ou de frustration dans ta vie actuellement ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "alignmentScale",
        label: "Sur une échelle de 1 à 10, à quel point te sens-tu aligné(e) avec qui tu es vraiment ?",
        type: "scale",
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: "alignmentWhy",
        label: "Pourquoi ce chiffre ? Explique.",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
    ],
  },
  {
    id: 3,
    title: "Tes relations",
    questions: [
      {
        id: "relationshipsQuality",
        label: "Comment décrirais-tu tes relations actuelles (famille, amis, partenaire) ?",
        type: "checkbox",
        required: true,
        options: [
          { value: "epanouissantes", label: "Épanouissantes" },
          { value: "compliquees", label: "Compliquées" },
          { value: "superficielles", label: "Superficielles" },
          { value: "toxiques", label: "Toxiques" },
          { value: "inexistantes", label: "Inexistantes" },
        ],
      },
      {
        id: "relationshipsWhy",
        label: "Pourquoi penses-tu que tes relations sont ainsi ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "conflictReaction",
        label: "Comment réagis-tu face aux conflits ?",
        type: "radio",
        required: true,
        options: [
          { value: "confrontation", label: "Confrontation directe" },
          { value: "evitement", label: "Évitement" },
          { value: "soumission", label: "Soumission" },
          { value: "detachement", label: "Détachement émotionnel" },
          { value: "autre", label: "Autre" },
        ],
      },
      {
        id: "intimateRelationships",
        label: "Comment décrirais-tu tes relations amoureuses/intimes (actuelles ou passées) ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
    ],
  },
  {
    id: 4,
    title: "Tes valeurs et ta direction",
    questions: [
      {
        id: "topGoals",
        label: "Quels sont tes 3 objectifs de vie les plus importants actuellement ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "mission",
        label:
          "Quelle est selon toi ta mission ou ton rôle dans cette vie ? (Si tu ne sais pas, écris \"Je ne sais pas\" et explique pourquoi.)",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "knowsValuesSystem",
        label: "Sais-tu ce qu'est un système de valeurs ?",
        type: "radio",
        required: true,
        options: [
          { value: "oui", label: "Oui" },
          { value: "non", label: "Non" },
        ],
      },
      {
        id: "valuesSystemExplanation",
        label:
          "Si oui, explique-le avec tes propres mots. Si non, écris ce que tu imagines.",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "topValues",
        label:
          "Quelles sont les 3 valeurs les plus importantes pour toi dans la vie ? (Ex : famille, liberté, justice, ambition, foi, loyauté, etc.)",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
    ],
  },
  {
    id: 5,
    title: "Ta discipline et tes décisions",
    questions: [
      {
        id: "dailyOrganization",
        label:
          "Comment organises-tu tes journées actuellement ? Décris brièvement ta routine ou ton absence de routine.",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "decisionMaking",
        label: "Comment prends-tu tes décisions importantes ?",
        type: "radio",
        required: true,
        options: [
          { value: "intuition", label: "Par intuition/instinct" },
          { value: "analyse", label: "Par analyse rationnelle" },
          { value: "avis-autres", label: "En fonction de l'avis des autres" },
          { value: "valeurs", label: "Par volonté consciente ancrée dans mes valeurs" },
          { value: "autre", label: "Autre" },
        ],
      },
      {
        id: "futureSelf5Years",
        label:
          "Quel type d'homme/femme veux-tu devenir dans 5 ans ? Décris-le en détail. (Personnalité, valeurs, impact, relations, discipline.)",
        type: "paragraph",
        required: true,
        minLength: 150,
        helperText: "Minimum 150 caractères.",
      },
    ],
  },
  {
    id: 6,
    title: "Ton engagement",
    questions: [
      {
        id: "pastCoaching",
        label: "As-tu déjà investi dans un accompagnement psychologique, thérapeutique ou de coaching ?",
        type: "radio",
        required: true,
        options: [
          { value: "oui", label: "Oui" },
          { value: "non", label: "Non" },
        ],
      },
      {
        id: "pastCoachingExperience",
        label: "Si oui, quelle a été ton expérience ? Si non, pourquoi maintenant ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
      {
        id: "budgetAbility",
        label:
          "Peux-tu investir 40 000 DA par mois pendant 8 mois dans ta transformation ?",
        type: "radio",
        required: true,
        options: [
          { value: "yes-easy", label: "Oui, sans problème" },
          { value: "yes-effort", label: "Oui, mais ce sera un effort financier" },
          { value: "no", label: "Non, je n'ai pas ce budget actuellement" },
        ],
      },
      {
        id: "timeAvailability",
        label:
          "Es-tu disponible pour 2 séances par semaine (environ 2h30/semaine) + répondre quotidiennement aux exercices pendant 8 mois ?",
        type: "radio",
        required: true,
        options: [
          { value: "yes-full", label: "Oui, totalement" },
          { value: "yes-some", label: "Oui, mais avec quelques contraintes" },
          { value: "no", label: "Non, ce n'est pas possible pour moi actuellement" },
        ],
      },
      {
        id: "whyPerception",
        label:
          "Pourquoi veux-tu rejoindre PERCEPTION ? Qu'attends-tu de ce programme ? Réponds avec sincérité et profondeur.",
        type: "paragraph",
        required: true,
        minLength: 150,
        helperText: "Minimum 150 caractères.",
      },
    ],
  },
  {
    id: 7,
    title: "Engagement final",
    questions: [
      {
        id: "selfChallengeScale",
        label:
          "Sur une échelle de 1 à 10, à quel point es-tu prêt(e) à te remettre en question profondément ?",
        type: "scale",
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: "anythingToKnow",
        label:
          "Y a-t-il quelque chose d'important que tu veux que je sache sur toi ou ta situation ?",
        type: "paragraph",
        required: true,
        minLength: 120,
        helperText: "Minimum 120 caractères.",
      },
    ],
  },
];

export const TOTAL_SECTIONS = perceptionSections.length;

export const ALL_QUESTION_IDS = perceptionSections.flatMap((s) =>
  s.questions.map((q) => q.id)
);


