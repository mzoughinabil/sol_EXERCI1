export interface Slide {
  id: number;
  section: string;
  sectionColor: string;
  title: string;
  content: SlideBlock[];
}

export type SlideBlock =
  | { type: "text"; value: string }
  | { type: "math"; value: string; display?: boolean }
  | { type: "step"; label: string; items: StepItem[] }
  | { type: "highlight"; color: string; items: string[] }
  | { type: "equation-row"; items: EqRow[] }
  | { type: "columns"; left: SlideBlock[]; right: SlideBlock[] }
  | { type: "conclusion"; icon: string; value: string }
  | { type: "alert"; value: string; icon: string }
  | { type: "divider" }
  | { type: "bullet"; items: BulletItem[] }
  | { type: "badge-row"; items: Badge[] };

export interface StepItem {
  label?: string;
  content: string; // katex or plain
  isMath?: boolean;
}

export interface EqRow {
  label?: string;
  eq: string;
  comment?: string;
}

export interface BulletItem {
  icon?: string;
  text: string;
  isMath?: boolean;
  sub?: string;
}

export interface Badge {
  color: string;
  text: string;
  isMath?: boolean;
}

const BLUE = "#1e3a8a";
const INDIGO = "#312e81";
const VIOLET = "#4c1d95";
const TEAL = "#134e4a";
const EMERALD = "#064e3b";


export const slides: Slide[] = [
  // ──────────────────────────────────────────────
  // SLIDE 0 – TITRE
  // ──────────────────────────────────────────────
  {
    id: 0,
    section: "Introduction",
    sectionColor: BLUE,
    title: "Étude d'une suite récurrente",
    content: [
      {
        type: "text",
        value: "Terminale – Suites numériques | Exercice 1",
      },
      { type: "divider" },
      {
        type: "bullet",
        items: [
          {
            icon: "📌",
            text: "Suite définie par :",
          },
        ],
      },
      {
        type: "math",
        display: true,
        value:
          "u_0 = \\dfrac{3}{2} \\quad \\text{et} \\quad u_{n+1} = \\dfrac{4u_n - 2}{u_n + 1}",
      },
      { type: "divider" },
      {
        type: "badge-row",
        items: [
          { color: "#1e40af", text: "1) Encadrement & Monotonie", isMath: false },
          { color: "#5b21b6", text: "2) Suite géométrique \\(v_n\\)", isMath: true },
          { color: "#065f46", text: "3) Somme \\(S_n\\)", isMath: true },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 1 – 1a) Initialisation
  // ──────────────────────────────────────────────
  {
    id: 1,
    section: "Question 1a",
    sectionColor: BLUE,
    title: "1a) Récurrence – Initialisation",
    content: [
      {
        type: "highlight",
        color: "#1e3a8a",
        items: [
          "Objectif : Montrer par récurrence que \\(\\forall n \\in \\mathbb{N},\\; 1 < u_n < 2\\)",
        ],
      },
      {
        type: "alert",
        icon: "🪤",
        value:
          "Piège classique : Ne jamais encadrer un quotient directement ! On étudie le signe des différences \\(u_{n+1}-1\\) et \\(2-u_{n+1}\\).",
      },
      { type: "divider" },
      {
        type: "step",
        label: "Étape 1 — Initialisation (n = 0)",
        items: [
          {
            content: "u_0 = \\dfrac{3}{2} = 1{,}5",
            isMath: true,
          },
          {
            label: "Vérification :",
            content: "1 < 1{,}5 < 2 \\quad \\checkmark",
            isMath: true,
          },
        ],
      },
      {
        type: "conclusion",
        icon: "✔️",
        value: "La propriété est vraie au rang \\(n = 0\\).",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 2 – 1a) Hérédité – u_{n+1} - 1
  // ──────────────────────────────────────────────
  {
    id: 2,
    section: "Question 1a",
    sectionColor: BLUE,
    title: "1a) Hérédité — Calcul de \\(u_{n+1} - 1\\)",
    content: [
      {
        type: "highlight",
        color: "#1e40af",
        items: [
          "Hypothèse de récurrence (HR) : \\(1 < u_n < 2\\) pour un certain \\(n\\).",
          "Montrons : \\(1 < u_{n+1} < 2\\).",
        ],
      },
      {
        type: "equation-row",
        items: [
          {
            label: "Départ",
            eq: "u_{n+1} - 1 = \\dfrac{4u_n - 2}{u_n + 1} - 1",
          },
          {
            label: "Dénominateur commun",
            eq: "= \\dfrac{4u_n - 2}{u_n + 1} - \\dfrac{u_n + 1}{u_n + 1}",
          },
          {
            label: "⚠️ Signe du − distribué",
            eq: "= \\dfrac{4u_n - 2 - u_n - 1}{u_n + 1} = \\dfrac{3u_n - 3}{u_n + 1}",
          },
          {
            label: "Factorisation",
            eq: "= \\dfrac{3(u_n - 1)}{u_n + 1}",
          },
        ],
      },
      {
        type: "bullet",
        items: [
          {
            icon: "✅",
            text: "Par HR : \\(u_n > 1 \\Rightarrow u_n - 1 > 0\\)",
            isMath: true,
          },
          {
            icon: "✅",
            text: "\\(u_n > 0 \\Rightarrow u_n + 1 > 0\\)",
            isMath: true,
          },
        ],
      },
      {
        type: "conclusion",
        icon: "🌟",
        value: "Quotient positif \\(\\Rightarrow u_{n+1} - 1 > 0 \\Rightarrow u_{n+1} > 1\\)",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 3 – 1a) Hérédité – 2 - u_{n+1}
  // ──────────────────────────────────────────────
  {
    id: 3,
    section: "Question 1a",
    sectionColor: BLUE,
    title: "1a) Hérédité — Calcul de \\(2 - u_{n+1}\\)",
    content: [
      {
        type: "equation-row",
        items: [
          {
            label: "Départ",
            eq: "2 - u_{n+1} = 2 - \\dfrac{4u_n - 2}{u_n + 1}",
          },
          {
            label: "Dénominateur commun",
            eq: "= \\dfrac{2(u_n + 1)}{u_n + 1} - \\dfrac{4u_n - 2}{u_n + 1}",
          },
          {
            label: "⚠️ Signe du − distribué",
            eq: "= \\dfrac{2u_n + 2 - 4u_n + 2}{u_n + 1} = \\dfrac{-2u_n + 4}{u_n + 1}",
          },
          {
            label: "Factorisation",
            eq: "= \\dfrac{2(2 - u_n)}{u_n + 1}",
          },
        ],
      },
      {
        type: "bullet",
        items: [
          {
            icon: "✅",
            text: "Par HR : \\(u_n < 2 \\Rightarrow 2 - u_n > 0\\)",
            isMath: true,
          },
          {
            icon: "✅",
            text: "\\(u_n + 1 > 0\\)",
            isMath: true,
          },
        ],
      },
      {
        type: "conclusion",
        icon: "🌟",
        value: "Quotient positif \\(\\Rightarrow 2 - u_{n+1} > 0 \\Rightarrow u_{n+1} < 2\\)",
      },
      { type: "divider" },
      {
        type: "highlight",
        color: "#15803d",
        items: [
          "Conclusion : Par récurrence, \\(\\forall n \\in \\mathbb{N},\\; 1 < u_n < 2\\). ✔️",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 4 – 1b) Monotonie
  // ──────────────────────────────────────────────
  {
    id: 4,
    section: "Question 1b",
    sectionColor: INDIGO,
    title: "1b) Monotonie de la suite \\((u_n)\\)",
    content: [
      {
        type: "highlight",
        color: "#4338ca",
        items: ["Méthode : On étudie le signe de \\(u_{n+1} - u_n\\)."],
      },
      {
        type: "equation-row",
        items: [
          {
            label: "Calcul",
            eq: "u_{n+1} - u_n = \\dfrac{4u_n - 2}{u_n + 1} - u_n = \\dfrac{4u_n - 2 - u_n(u_n+1)}{u_n + 1}",
          },
          {
            label: "Développement",
            eq: "= \\dfrac{4u_n - 2 - u_n^2 - u_n}{u_n + 1} = \\dfrac{-u_n^2 + 3u_n - 2}{u_n + 1}",
          },
          {
            label: "Racines : \\(x_1=1,\\; x_2=2\\) ⟹ Factorisation",
            eq: "= \\dfrac{-(u_n - 1)(u_n - 2)}{u_n + 1} = \\dfrac{(u_n - 1)(2 - u_n)}{u_n + 1}",
          },
        ],
      },
      {
        type: "bullet",
        items: [
          {
            icon: "✅",
            text: "\\(1 < u_n < 2 \\Rightarrow u_n - 1 > 0\\)",
            isMath: true,
          },
          {
            icon: "✅",
            text: "\\(1 < u_n < 2 \\Rightarrow 2 - u_n > 0\\)",
            isMath: true,
          },
          {
            icon: "✅",
            text: "\\(u_n + 1 > 0\\)",
            isMath: true,
          },
        ],
      },
      {
        type: "conclusion",
        icon: "📈",
        value:
          "\\(u_{n+1} - u_n > 0\\) pour tout \\(n\\) : la suite \\((u_n)\\) est strictement croissante.",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 5 – 2a) Suite géométrique
  // ──────────────────────────────────────────────
  {
    id: 5,
    section: "Question 2a",
    sectionColor: VIOLET,
    title: "2a) La suite \\((v_n)\\) est géométrique",
    content: [
      {
        type: "highlight",
        color: "#6d28d9",
        items: [
          "On pose : \\(\\displaystyle v_n = \\frac{u_n - 2}{u_n - 1}\\)",
        ],
      },
      {
        type: "alert",
        icon: "💡",
        value:
          "Astuce : On réutilise les blocs déjà calculés en 1a) ! \\(u_{n+1} - 1 = \\frac{3(u_n-1)}{u_n+1}\\) et \\(u_{n+1} - 2 = \\frac{2(u_n-2)}{u_n+1}\\)",
      },
      {
        type: "equation-row",
        items: [
          {
            label: "Calcul de \\(v_{n+1}\\)",
            eq: "v_{n+1} = \\dfrac{u_{n+1} - 2}{u_{n+1} - 1} = \\dfrac{\\dfrac{2(u_n-2)}{u_n+1}}{\\dfrac{3(u_n-1)}{u_n+1}}",
          },
          {
            label: "Division = multiplication par l'inverse",
            eq: "= \\dfrac{2(u_n-2)}{u_n+1} \\times \\dfrac{u_n+1}{3(u_n-1)}",
          },
          {
            label: "Simplification des \\((u_n+1)\\)",
            eq: "= \\dfrac{2}{3} \\cdot \\dfrac{u_n - 2}{u_n - 1} = \\dfrac{2}{3}\\, v_n",
          },
        ],
      },
      {
        type: "conclusion",
        icon: "🎯",
        value:
          "\\((v_n)\\) est une suite géométrique de raison \\(q = \\dfrac{2}{3}\\).",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 6 – 2b) Expression de v_n puis u_n
  // ──────────────────────────────────────────────
  {
    id: 6,
    section: "Question 2b",
    sectionColor: VIOLET,
    title: "2b) Expression de \\(v_n\\) et \\(u_n\\) en fonction de \\(n\\)",
    content: [
      {
        type: "equation-row",
        items: [
          {
            label: "Terme initial",
            eq: "v_0 = \\dfrac{u_0 - 2}{u_0 - 1} = \\dfrac{\\frac{3}{2} - 2}{\\frac{3}{2} - 1} = \\dfrac{-\\frac{1}{2}}{\\frac{1}{2}} = -1",
          },
          {
            label: "Formule de la suite géométrique",
            eq: "v_n = v_0 \\cdot q^n = -1 \\times \\left(\\dfrac{2}{3}\\right)^n = -\\left(\\dfrac{2}{3}\\right)^n",
          },
        ],
      },
      { type: "divider" },
      {
        type: "highlight",
        color: "#5b21b6",
        items: ["Inversion de \\(v_n = \\dfrac{u_n-2}{u_n-1}\\) pour trouver \\(u_n\\) :"],
      },
      {
        type: "equation-row",
        items: [
          {
            label: "Produit en croix",
            eq: "v_n(u_n - 1) = u_n - 2",
          },
          {
            label: "Isolation de \\(u_n\\)",
            eq: "v_n u_n - u_n = v_n - 2 \\implies u_n(v_n - 1) = v_n - 2",
          },
          {
            label: "Résultat",
            eq: "u_n = \\dfrac{v_n - 2}{v_n - 1} = \\dfrac{-\\left(\\frac{2}{3}\\right)^n - 2}{-\\left(\\frac{2}{3}\\right)^n - 1}",
          },
          {
            label: "Simplification (facteur \\(-1\\))",
            eq: "\\boxed{u_n = \\dfrac{\\left(\\dfrac{2}{3}\\right)^n + 2}{\\left(\\dfrac{2}{3}\\right)^n + 1}}",
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 7 – Limite de u_n
  // ──────────────────────────────────────────────
  {
    id: 7,
    section: "Question 2b",
    sectionColor: VIOLET,
    title: "Limite de la suite \\((u_n)\\)",
    content: [
      {
        type: "highlight",
        color: "#6d28d9",
        items: [
          "On rappelle : \\(u_n = \\dfrac{\\left(\\frac{2}{3}\\right)^n + 2}{\\left(\\frac{2}{3}\\right)^n + 1}\\)",
        ],
      },
      { type: "divider" },
      {
        type: "step",
        label: "Calcul de la limite",
        items: [
          {
            label: "Clé :",
            content:
              "-1 < \\dfrac{2}{3} < 1 \\implies \\lim_{n \\to +\\infty} \\left(\\dfrac{2}{3}\\right)^n = 0",
            isMath: true,
          },
          {
            label: "Par somme et quotient :",
            content:
              "\\lim_{n \\to +\\infty} u_n = \\dfrac{0 + 2}{0 + 1} = 2",
            isMath: true,
          },
        ],
      },
      { type: "divider" },
      {
        type: "bullet",
        items: [
          {
            icon: "📈",
            text: "Suite croissante bornée supérieurement par \\(2\\)",
            isMath: true,
          },
          {
            icon: "🎯",
            text: "Elle converge vers sa borne supérieure : cohérent !",
          },
        ],
      },
      {
        type: "conclusion",
        icon: "🏁",
        value:
          "\\(\\displaystyle\\lim_{n \\to +\\infty} u_n = 2\\)",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 8 – 3) Somme S_n — Astuce
  // ──────────────────────────────────────────────
  {
    id: 8,
    section: "Question 3",
    sectionColor: TEAL,
    title: "3) Calcul de \\(S_n\\) — L'astuce clé",
    content: [
      {
        type: "highlight",
        color: "#0f766e",
        items: [
          "On cherche : \\(\\displaystyle S_n = \\sum_{k=0}^{n} \\dfrac{1}{u_k - 1}\\)",
        ],
      },
      {
        type: "alert",
        icon: "💡",
        value:
          "Idée : Relier \\(\\dfrac{1}{u_k-1}\\) à la suite géométrique \\(v_k\\) !",
      },
      {
        type: "equation-row",
        items: [
          {
            label: "On part de",
            eq: "v_k = \\dfrac{u_k - 2}{u_k - 1}",
          },
          {
            label: "On calcule \\(v_k - 1\\)",
            eq: "v_k - 1 = \\dfrac{u_k - 2}{u_k - 1} - 1 = \\dfrac{u_k - 2 - (u_k - 1)}{u_k - 1} = \\dfrac{-1}{u_k - 1}",
          },
          {
            label: "En multipliant par \\(-1\\)",
            eq: "\\dfrac{1}{u_k - 1} = 1 - v_k",
          },
        ],
      },
      {
        type: "conclusion",
        icon: "🔑",
        value:
          "Chaque terme de la somme vaut \\(1 - v_k\\) !",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 9 – 3) Calcul de S_n
  // ──────────────────────────────────────────────
  {
    id: 9,
    section: "Question 3",
    sectionColor: TEAL,
    title: "3) Calcul complet de \\(S_n\\)",
    content: [
      {
        type: "equation-row",
        items: [
          {
            label: "Réécriture",
            eq: "S_n = \\sum_{k=0}^{n}(1 - v_k) = \\underbrace{(n+1)}_{\\text{n+1 fois le }1} - \\sum_{k=0}^{n} v_k",
          },
          {
            label: "Somme géométrique (\\(v_0=-1,\\; q=\\frac{2}{3}\\))",
            eq: "\\sum_{k=0}^{n} v_k = (-1) \\cdot \\dfrac{1 - \\left(\\frac{2}{3}\\right)^{n+1}}{1 - \\frac{2}{3}} = -3\\left[1 - \\left(\\frac{2}{3}\\right)^{n+1}\\right]",
          },
          {
            label: "Assemblage",
            eq: "S_n = (n+1) - \\left(-3\\left[1 - \\left(\\dfrac{2}{3}\\right)^{n+1}\\right]\\right)",
          },
          {
            label: "Résultat final",
            eq: "\\boxed{S_n = n + 4 - 3\\left(\\dfrac{2}{3}\\right)^{n+1}}",
          },
        ],
      },
      { type: "divider" },
      {
        type: "highlight",
        color: "#0f766e",
        items: [
          "Limite : \\(\\left(\\frac{2}{3}\\right)^{n+1} \\to 0\\) et \\((n+4) \\to +\\infty\\)",
          "Donc \\(\\displaystyle\\lim_{n\\to+\\infty} S_n = +\\infty\\)",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // SLIDE 10 – Bilan / Récapitulatif
  // ──────────────────────────────────────────────
  {
    id: 10,
    section: "Bilan",
    sectionColor: EMERALD,
    title: "Récapitulatif complet",
    content: [
      {
        type: "bullet",
        items: [
          {
            icon: "1️⃣",
            text: "Encadrement par récurrence : \\(\\forall n \\in \\mathbb{N},\\; 1 < u_n < 2\\)",
            isMath: true,
            sub: "Méthode : signe des différences \\(u_{n+1}-1\\) et \\(2-u_{n+1}\\)",
          },
          {
            icon: "2️⃣",
            text: "Monotonie : \\(u_{n+1} - u_n = \\dfrac{(u_n-1)(2-u_n)}{u_n+1} > 0\\) ⟹ croissante 📈",
            isMath: true,
          },
          {
            icon: "3️⃣",
            text: "Suite géométrique : \\(v_n = \\dfrac{u_n-2}{u_n-1}\\), raison \\(q=\\dfrac{2}{3}\\), \\(v_0=-1\\)",
            isMath: true,
          },
          {
            icon: "4️⃣",
            text: "Formule explicite : \\(u_n = \\dfrac{\\left(\\frac{2}{3}\\right)^n + 2}{\\left(\\frac{2}{3}\\right)^n + 1}\\)",
            isMath: true,
          },
          {
            icon: "5️⃣",
            text: "Limite : \\(\\lim u_n = 2\\)",
            isMath: true,
          },
          {
            icon: "6️⃣",
            text: "Somme : \\(S_n = n + 4 - 3\\left(\\dfrac{2}{3}\\right)^{n+1} \\to +\\infty\\)",
            isMath: true,
          },
        ],
      },
      { type: "divider" },
      {
        type: "conclusion",
        icon: "🎓",
        value: "Bravo ! Vous maîtrisez la démonstration complète.",
      },
    ],
  },
];
