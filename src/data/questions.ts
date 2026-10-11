import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // 16 Core Questions from User Prompt
  {
    id: 'q1',
    question: 'Pada bidang koordinat Kartesius, garis mendatar (horizontal) disebut ....',
    correctAnswer: 'sumbu X',
    distractors: ['sumbu Y', 'absis', 'kuadran'],
    explanation: 'Sumbu X adalah garis horizontal (mendatar) pada bidang Kartesius, sedangkan sumbu Y adalah garis vertikal (tegak).',
    category: 'Konsep Dasar'
  },
  {
    id: 'q2',
    question: 'Pada bidang koordinat Kartesius, garis tegak lurus (vertikal) disebut ....',
    correctAnswer: 'sumbu Y',
    distractors: ['sumbu X', 'kuadran', 'absis'],
    explanation: 'Sumbu Y adalah garis vertikal (tegak) pada bidang Kartesius, yang tegak lurus terhadap sumbu horizontal (sumbu X).',
    category: 'Konsep Dasar'
  },
  {
    id: 'q3',
    question: "Titik A (3,2) direfleksikan terhadap sumbu X, maka A' adalah ...",
    correctAnswer: '(3,-2)',
    distractors: ['(-3,-2)', '(-3,2)', '(2,-3)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka A(3, 2) → A'(3, -2).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q4',
    question: "Titik B (4,6) direfleksikan terhadap sumbu Y, maka B' adalah ...",
    correctAnswer: '(-4,6)',
    distractors: ['(4,-6)', '(6,-4)', '(-6,4)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Maka B(4, 6) → B'(-4, 6).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q5',
    question: "Titik C (1,-3) direfleksikan terhadap sumbu X, maka C' adalah ...",
    correctAnswer: '(1,3)',
    distractors: ['(-1,-3)', '(3,-1)', '(-3,-1)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai y = -3 menjadi -(-3) = 3. Maka C'(1, 3).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q6',
    question: "Titik D (2,-5) direfleksikan terhadap sumbu Y, maka D' adalah ...",
    correctAnswer: '(-2,-5)',
    distractors: ['(-2,5)', '(-5,2)', '(-5,-2)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = 2 menjadi -2. Nilai y tetap -5. Maka D'(-2, -5).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q7',
    question: "Titik E (-2,4) direfleksikan terhadap sumbu Y, maka E' adalah ...",
    correctAnswer: '(2,4)',
    distractors: ['(2,-4)', '(4,-2)', '(-4,2)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = -2 menjadi -(-2) = 2. Nilai y tetap 4. Maka E'(2, 4).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q8',
    question: "Titik F (-3,5) direfleksikan terhadap sumbu X, maka F' adalah ...",
    correctAnswer: '(-3,-5)',
    distractors: ['(3,-5)', '(5,-3)', '(-5,-3)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai x tetap -3. Nilai y = 5 menjadi -5. Maka F'(-3, -5).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q9',
    question: "Titik G (-1,-5) direfleksikan terhadap sumbu Y, maka G' adalah ...",
    correctAnswer: '(1,-5)',
    distractors: ['(-1,5)', '(-5,1)', '(-5,-1)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = -1 menjadi -(-1) = 1. Nilai y tetap -5. Maka G'(1, -5).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q10',
    question: "Titik H (-3,-4) direfleksikan terhadap sumbu X, maka H' adalah ...",
    correctAnswer: '(-3,4)',
    distractors: ['(3,-4)', '(-4,3)', '(-4,-3)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai x tetap -3. Nilai y = -4 menjadi -(-4) = 4. Maka H'(-3, 4).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q11',
    question: "Titik A (8,11) direfleksikan terhadap sumbu X, maka A' adalah ...",
    correctAnswer: '(8,-11)',
    distractors: ['(-8,-11)', '(-8,11)', '(11,-8)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka A(8, 11) → A'(8, -11).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q12',
    question: "Titik B (13,5) direfleksikan terhadap sumbu Y, maka B' adalah ...",
    correctAnswer: '(-13,5)',
    distractors: ['(13,-5)', '(5,-13)', '(-5,13)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = 13 menjadi -13. Nilai y tetap 5. Maka B'(-13, 5).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q13',
    question: "Titik C (11,-29) direfleksikan terhadap sumbu X, maka C' adalah ...",
    correctAnswer: '(11,29)',
    distractors: ['(-11,-29)', '(29,-11)', '(-29,-11)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai y = -29 menjadi -(-29) = 29. Nilai x tetap 11. Maka C'(11, 29).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q14',
    question: "Titik D (22,-15) direfleksikan terhadap sumbu Y, maka D' adalah ...",
    correctAnswer: '(-22,-15)',
    distractors: ['(-22,15)', '(-15,22)', '(-15,-22)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = 22 menjadi -22. Nilai y tetap -15. Maka D'(-22, -15).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q15',
    question: "Titik E (-17,8) direfleksikan terhadap sumbu Y, maka E' adalah ...",
    correctAnswer: '(17,8)',
    distractors: ['(17,-8)', '(8,-17)', '(-8,17)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = -17 menjadi 17. Nilai y tetap 8. Maka E'(17, 8).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q16',
    question: "Titik F (-10,26) direfleksikan terhadap sumbu X, maka F' adalah ...",
    correctAnswer: '(-10,-26)',
    distractors: ['(10,-26)', '(26,-10)', '(-26,-10)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai x tetap -10. Nilai y = 26 menjadi -26. Maka F'(-10, -26).",
    category: 'Refleksi Sumbu X'
  },
  // Additional high quality coordinate & reflection questions to ensure an enriched question bank
  {
    id: 'q17',
    question: 'Nilai pada sumbu X dalam pasangan koordinat (x, y) dinamakan ....',
    correctAnswer: 'absis',
    distractors: ['ordinat', 'kuadran', 'gradien'],
    explanation: 'Dalam koordinat Kartesius (x, y), nilai x disebut absis dan nilai y disebut ordinat.',
    category: 'Konsep Dasar'
  },
  {
    id: 'q18',
    question: 'Nilai pada sumbu Y dalam pasangan koordinat (x, y) dinamakan ....',
    correctAnswer: 'ordinat',
    distractors: ['absis', 'kuadran', 'vektor'],
    explanation: 'Nilai y dalam koordinat titik (x, y) disebut sebagai ordinat.',
    category: 'Konsep Dasar'
  },
  {
    id: 'q19',
    question: "Titik P (7,9) direfleksikan terhadap sumbu X, bayangannya P' adalah ...",
    correctAnswer: '(7,-9)',
    distractors: ['(-7,9)', '(-7,-9)', '(9,7)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka P(7, 9) → P'(7, -9).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q20',
    question: "Titik Q (-6,12) direfleksikan terhadap sumbu Y, bayangannya Q' adalah ...",
    correctAnswer: '(6,12)',
    distractors: ['(-6,-12)', '(6,-12)', '(12,-6)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Maka Q(-6, 12) → Q'(6, 12).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q21',
    question: "Titik R (-15,-20) direfleksikan terhadap sumbu X, bayangannya R' adalah ...",
    correctAnswer: '(-15,20)',
    distractors: ['(15,-20)', '(15,20)', '(-20,-15)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Nilai x tetap -15, nilai y = -20 menjadi 20. Maka R'(-15, 20).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q22',
    question: "Titik S (14,-8) direfleksikan terhadap sumbu Y, bayangannya S' adalah ...",
    correctAnswer: '(-14,-8)',
    distractors: ['(14,8)', '(-14,8)', '(-8,14)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Nilai x = 14 menjadi -14, nilai y tetap -8. Maka S'(-14, -8).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q23',
    question: "Titik K (0,5) terletak pada sumbu Y. Jika direfleksikan terhadap sumbu Y, maka K' adalah ...",
    correctAnswer: '(0,5)',
    distractors: ['(0,-5)', '(5,0)', '(-5,0)'],
    explanation: "Karena titik K terletak tepat di sumbu Y (cerminnya), maka posisi bayangan tidak berubah: (0, 5).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q24',
    question: "Titik M (6,0) terletak pada sumbu X. Jika direfleksikan terhadap sumbu X, maka M' adalah ...",
    correctAnswer: '(6,0)',
    distractors: ['(-6,0)', '(0,6)', '(0,-6)'],
    explanation: "Karena titik M terletak tepat pada sumbu X (cerminnya), bayangannya tetap di (6, 0).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q25',
    question: "Titik T (5,-12) direfleksikan terhadap sumbu X, bayangan titik T' adalah ...",
    correctAnswer: '(5,12)',
    distractors: ['(-5,-12)', '(-5,12)', '(12,5)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka T(5, -12) → T'(5, 12).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q26',
    question: "Titik U (-9,-7) direfleksikan terhadap sumbu Y, bayangan titik U' adalah ...",
    correctAnswer: '(9,-7)',
    distractors: ['(-9,7)', '(9,7)', '(-7,-9)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Maka U(-9, -7) → U'(9, -7).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q27',
    question: "Titik V (18,25) direfleksikan terhadap sumbu X, bayangannya V' adalah ...",
    correctAnswer: '(18,-25)',
    distractors: ['(-18,25)', '(-18,-25)', '(25,18)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka V(18, 25) → V'(18, -25).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q28',
    question: "Titik W (-30,40) direfleksikan terhadap sumbu Y, bayangannya W' adalah ...",
    correctAnswer: '(30,40)',
    distractors: ['(-30,-40)', '(30,-40)', '(40,-30)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Maka W(-30, 40) → W'(30, 40).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q29',
    question: "Titik N (4,-14) direfleksikan terhadap sumbu X, koordinat N' adalah ...",
    correctAnswer: '(4,14)',
    distractors: ['(-4,-14)', '(-4,14)', '(14,4)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka N(4, -14) → N'(4, 14).",
    category: 'Refleksi Sumbu X'
  },
  {
    id: 'q30',
    question: "Titik Z (-16,19) direfleksikan terhadap sumbu Y, koordinat Z' adalah ...",
    correctAnswer: '(16,19)',
    distractors: ['(-16,-19)', '(16,-19)', '(19,-16)'],
    explanation: "Refleksi terhadap sumbu Y: (x, y) → (-x, y). Maka Z(-16, 19) → Z'(16, 19).",
    category: 'Refleksi Sumbu Y'
  },
  {
    id: 'q31',
    question: 'Titik potong antara sumbu X dan sumbu Y pada bidang koordinat dinamakan ....',
    correctAnswer: 'titik asal O(0,0)',
    distractors: ['titik puncak', 'kuadran I', 'garis normal'],
    explanation: 'Pertemuan sumbu mendatar X dan sumbu tegak Y adalah titik pangkal / titik asal O dengan koordinat (0, 0).',
    category: 'Konsep Dasar'
  },
  {
    id: 'q32',
    question: "Titik L (25,-35) direfleksikan terhadap sumbu X, bayangan L' adalah ...",
    correctAnswer: '(25,35)',
    distractors: ['(-25,-35)', '(-25,35)', '(35,25)'],
    explanation: "Refleksi terhadap sumbu X: (x, y) → (x, -y). Maka L(25, -35) → L'(25, 35).",
    category: 'Refleksi Sumbu X'
  }
];

/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Select exactly N random questions without duplicates
 */
export function getNonRepeatingQuestions(pool: Question[], count: number = 16): Question[] {
  // If pool has fewer questions than count, we make sure not to crash
  const shuffledPool = shuffleArray(pool);
  return shuffledPool.slice(0, Math.min(count, shuffledPool.length));
}

/**
 * Get options for a question with the correct answer randomly placed
 */
export function getShuffledOptions(question: Question): string[] {
  const allOptions = [question.correctAnswer, ...question.distractors];
  return shuffleArray(allOptions);
}
