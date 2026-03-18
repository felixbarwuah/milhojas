/**
 * Grammar lessons with explanations and exercises
 * Organized by topic, each with a lesson text and quiz questions
 */

export interface GrammarLesson {
  id: string;
  level: 'A1' | 'A2';
  topic: GrammarTopic;
  title: string;
  explanation: string;  // German explanation with Spanish examples
  exercises: GrammarExercise[];
}

export interface GrammarExercise {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type GrammarTopic =
  | 'artikel'
  | 'ser-estar'
  | 'presente'
  | 'verneinung'
  | 'fragen'
  | 'por-para'
  | 'preterito'
  | 'reflexiv';

export const topicLabels: Record<GrammarTopic, string> = {
  artikel: 'Artikel (el/la)',
  'ser-estar': 'Ser vs. Estar',
  presente: 'Presente (Gegenwart)',
  verneinung: 'Verneinung',
  fragen: 'Fragen stellen',
  'por-para': 'Por vs. Para',
  preterito: 'Pretérito (Vergangenheit)',
  reflexiv: 'Reflexive Verben',
};

export const topicColors: Record<GrammarTopic, string> = {
  artikel: '#4A4540',
  'ser-estar': '#4A4540',
  presente: '#4A4540',
  verneinung: '#4A4540',
  fragen: '#4A4540',
  'por-para': '#4A4540',
  preterito: '#4A4540',
  reflexiv: '#4A4540',
};

export const grammar: GrammarLesson[] = [
  {
    id: 'g01', level: 'A1', topic: 'artikel', title: 'Der bestimmte Artikel',
    explanation: `Im Spanischen hat jedes Substantiv ein Geschlecht: männlich (masculino) oder weiblich (femenino).

**Der bestimmte Artikel:**
- el (männlich Singular): el libro (das Buch)
- la (weiblich Singular): la mesa (der Tisch)
- los (männlich Plural): los libros (die Bücher)
- las (weiblich Plural): las mesas (die Tische)

**Faustregeln:**
- Wörter auf -o sind meist männlich: el gato, el vino
- Wörter auf -a sind meist weiblich: la casa, la ventana
- Ausnahmen merken: el problema, el día, la mano, la foto`,
    exercises: [
      { question: '__ casa es grande.', options: ['El', 'La', 'Los', 'Las'], correctIndex: 1, explanation: '"Casa" endet auf -a und ist weiblich.' },
      { question: '__ problemas son difíciles.', options: ['El', 'La', 'Los', 'Las'], correctIndex: 2, explanation: '"Problema" ist männlich (Ausnahme!) und hier im Plural.' },
      { question: '__ agua está fría.', options: ['El', 'La', 'Los', 'Las'], correctIndex: 0, explanation: '"Agua" ist weiblich, aber vor betontem a- benutzt man "el" im Singular.' },
      { question: '__ manos están limpias.', options: ['El', 'La', 'Los', 'Las'], correctIndex: 3, explanation: '"Mano" ist weiblich (Ausnahme!), hier im Plural: las manos.' },
    ],
  },
  {
    id: 'g02', level: 'A1', topic: 'ser-estar', title: 'Ser vs. Estar',
    explanation: `Beide Verben bedeuten "sein", aber sie werden unterschiedlich verwendet.

**SER** - für dauerhafte Eigenschaften:
- Identität: Soy Felix. (Ich bin Felix.)
- Herkunft: Soy de Austria. (Ich bin aus Österreich.)
- Beruf: Es profesor. (Er ist Lehrer.)
- Eigenschaften: La casa es grande. (Das Haus ist groß.)
- Material: La mesa es de madera. (Der Tisch ist aus Holz.)

**ESTAR** - für Zustände und Orte:
- Ort: Estoy en casa. (Ich bin zu Hause.)
- Befinden: Estoy bien. (Mir geht es gut.)
- Zustand: La puerta está abierta. (Die Tür ist offen.)
- Gefühle: Estoy contento. (Ich bin zufrieden.)

**Merkhilfe:** LoCo = Location + Condition = ESTAR`,
    exercises: [
      { question: 'María __ de Chile.', options: ['es', 'está', 'son', 'están'], correctIndex: 0, explanation: 'Herkunft = ser. "María es de Chile."' },
      { question: 'Yo __ cansado.', options: ['soy', 'estoy', 'es', 'está'], correctIndex: 1, explanation: 'Müde sein ist ein Zustand = estar.' },
      { question: 'El libro __ en la mesa.', options: ['es', 'está', 'son', 'están'], correctIndex: 1, explanation: 'Ort/Position = estar.' },
      { question: 'Mi hermano __ alto.', options: ['es', 'está', 'soy', 'estoy'], correctIndex: 0, explanation: 'Körperliche Eigenschaft (dauerhaft) = ser.' },
      { question: 'La sopa __ caliente.', options: ['es', 'está', 'son', 'están'], correctIndex: 1, explanation: 'Die Suppe ist (gerade) heiß = temporärer Zustand = estar.' },
    ],
  },
  {
    id: 'g03', level: 'A1', topic: 'presente', title: 'Presente: regelmäßige Verben',
    explanation: `Spanische Verben enden auf -ar, -er oder -ir. Im Presente (Gegenwart) werden sie so konjugiert:

**-ar (hablar = sprechen):**
yo hablo, tú hablas, él habla, nosotros hablamos, ellos hablan

**-er (comer = essen):**
yo como, tú comes, él come, nosotros comemos, ellos comen

**-ir (vivir = leben):**
yo vivo, tú vives, él vive, nosotros vivimos, ellos viven

Das Muster: Stamm + Endung. Die Endungen sind für -er und -ir fast gleich!`,
    exercises: [
      { question: 'Yo __ español. (hablar)', options: ['hablo', 'hablas', 'habla', 'hablamos'], correctIndex: 0, explanation: 'Yo + -ar Verb: -o Endung = hablo.' },
      { question: 'Ella __ en Madrid. (vivir)', options: ['vivo', 'vives', 'vive', 'vivimos'], correctIndex: 2, explanation: 'Ella + -ir Verb: -e Endung = vive.' },
      { question: 'Nosotros __ mucha fruta. (comer)', options: ['como', 'comes', 'come', 'comemos'], correctIndex: 3, explanation: 'Nosotros + -er Verb: -emos Endung = comemos.' },
      { question: 'Tú __ bien. (cocinar)', options: ['cocino', 'cocinas', 'cocina', 'cocinamos'], correctIndex: 1, explanation: 'Tú + -ar Verb: -as Endung = cocinas.' },
    ],
  },
  {
    id: 'g04', level: 'A1', topic: 'verneinung', title: 'Verneinung mit "no"',
    explanation: `Die Verneinung im Spanischen ist einfach: "no" kommt direkt vor das Verb.

**Beispiele:**
- Hablo español → No hablo español. (Ich spreche kein Spanisch.)
- Es difícil → No es difícil. (Es ist nicht schwierig.)
- Tengo hambre → No tengo hambre. (Ich habe keinen Hunger.)

**Doppelte Verneinung** (im Spanischen korrekt!):
- No tengo nada. (Ich habe nichts.) - wörtlich: "Nicht habe ich nichts."
- No conozco a nadie. (Ich kenne niemanden.)
- Nunca he estado en Chile. (Ich war nie in Chile.)`,
    exercises: [
      { question: 'Wie sagt man "Ich verstehe nicht"?', options: ['Entiendo no', 'No entiendo', 'No entender', 'Entiendo nada'], correctIndex: 1, explanation: '"No" steht immer VOR dem konjugierten Verb.' },
      { question: '__ quiero __ . (Ich will nichts.)', options: ['No ... nada', 'No ... algo', 'Nada ... no', 'No ... nunca'], correctIndex: 0, explanation: 'Doppelte Verneinung: "No quiero nada" ist korrekt.' },
      { question: '__ voy __ al cine. (Ich gehe nie ins Kino.)', options: ['No ... nunca', 'No ... nada', 'Nunca ... no', 'No ... nadie'], correctIndex: 0, explanation: '"No voy nunca" oder "Nunca voy" - beides korrekt.' },
    ],
  },
  {
    id: 'g05', level: 'A1', topic: 'fragen', title: 'Fragen stellen',
    explanation: `Im Spanischen stellt man Fragen durch Intonation oder mit Fragewörtern.

**Ja/Nein-Fragen:** Einfach die Satzmelodie heben!
- Hablas español. → ¿Hablas español? (Sprichst du Spanisch?)
- Tienes hambre. → ¿Tienes hambre? (Hast du Hunger?)

**Fragewörter (immer mit Akzent!):**
- ¿Qué? - Was?
- ¿Quién? - Wer?
- ¿Dónde? - Wo?
- ¿Cuándo? - Wann?
- ¿Cómo? - Wie?
- ¿Cuánto/a? - Wie viel?
- ¿Por qué? - Warum?
- ¿Cuál? - Welche/r/s?

Beachte: ¡ und ¿ am Satzanfang!`,
    exercises: [
      { question: '¿__ te llamas?', options: ['Qué', 'Cómo', 'Dónde', 'Cuándo'], correctIndex: 1, explanation: '"¿Cómo te llamas?" = Wie heißt du? "Cómo" = Wie.' },
      { question: '¿__ vives?', options: ['Qué', 'Quién', 'Dónde', 'Cuánto'], correctIndex: 2, explanation: '"¿Dónde vives?" = Wo wohnst du? "Dónde" = Wo.' },
      { question: '¿__ cuesta esto?', options: ['Cómo', 'Dónde', 'Cuánto', 'Qué'], correctIndex: 2, explanation: '"¿Cuánto cuesta?" = Wie viel kostet das? "Cuánto" = Wie viel.' },
      { question: '¿__ es tu cumpleaños?', options: ['Dónde', 'Cómo', 'Cuándo', 'Quién'], correctIndex: 2, explanation: '"¿Cuándo es tu cumpleaños?" = Wann ist dein Geburtstag?' },
    ],
  },
  {
    id: 'g06', level: 'A2', topic: 'por-para', title: 'Por vs. Para',
    explanation: `Beide bedeuten "für", aber mit unterschiedlicher Bedeutung.

**PARA** - Zweck, Ziel, Empfänger:
- Zweck: Estudio para aprender. (Ich lerne, um zu lernen.)
- Empfänger: El regalo es para ti. (Das Geschenk ist für dich.)
- Ziel: Voy para Madrid. (Ich fahre nach Madrid.)
- Frist: Para mañana. (Bis morgen.)

**POR** - Ursache, Dauer, Preis, Mittel:
- Ursache: Gracias por tu ayuda. (Danke für deine Hilfe.)
- Dauer: Estudio por dos horas. (Ich lerne zwei Stunden lang.)
- Preis: Lo compré por diez euros. (Ich kaufte es für 10 Euro.)
- Mittel: Hablo por teléfono. (Ich spreche per Telefon.)

**Merkhilfe:** PARA = Purpose/Destination, POR = Reason/Duration`,
    exercises: [
      { question: 'Este regalo es __ mi madre.', options: ['por', 'para', 'de', 'con'], correctIndex: 1, explanation: 'Empfänger = para. "Das Geschenk ist für meine Mutter."' },
      { question: 'Gracias __ la cena.', options: ['para', 'por', 'de', 'en'], correctIndex: 1, explanation: 'Danken für etwas (Ursache) = por.' },
      { question: 'Estudio español __ tres horas cada día.', options: ['para', 'por', 'de', 'en'], correctIndex: 1, explanation: 'Zeitdauer = por. "Drei Stunden lang."' },
      { question: 'Necesito esto __ mañana.', options: ['por', 'para', 'de', 'en'], correctIndex: 1, explanation: 'Frist/Deadline = para. "Bis morgen."' },
    ],
  },
  {
    id: 'g07', level: 'A2', topic: 'preterito', title: 'Pretérito Indefinido',
    explanation: `Das Pretérito beschreibt abgeschlossene Handlungen in der Vergangenheit.

**-ar (hablar):** hablé, hablaste, habló, hablamos, hablaron
**-er/-ir (comer/vivir):** comí, comiste, comió, comimos, comieron

**Wichtige unregelmäßige Verben:**
- ser/ir: fui, fuiste, fue, fuimos, fueron (gleich!)
- tener: tuve, tuviste, tuvo, tuvimos, tuvieron
- hacer: hice, hiciste, hizo, hicimos, hicieron
- estar: estuve, estuviste, estuvo, estuvimos, estuvieron

**Signalwörter:** ayer (gestern), la semana pasada (letzte Woche), en 2024, una vez (einmal)`,
    exercises: [
      { question: 'Ayer __ al cine. (ir, yo)', options: ['voy', 'fui', 'iba', 'iré'], correctIndex: 1, explanation: 'Ir im Pretérito: yo fui. "Gestern ging ich ins Kino."' },
      { question: 'Ella __ una torta. (hacer)', options: ['hace', 'hacía', 'hizo', 'hará'], correctIndex: 2, explanation: 'Hacer im Pretérito: ella hizo.' },
      { question: '¿__ la película? (ver, tú)', options: ['Ves', 'Viste', 'Veías', 'Verás'], correctIndex: 1, explanation: 'Ver im Pretérito: tú viste. "Hast du den Film gesehen?"' },
      { question: 'Nosotros __ en Chile dos semanas. (estar)', options: ['estamos', 'estábamos', 'estuvimos', 'estaremos'], correctIndex: 2, explanation: 'Estar im Pretérito: nosotros estuvimos.' },
    ],
  },
  {
    id: 'g08', level: 'A2', topic: 'reflexiv', title: 'Reflexive Verben',
    explanation: `Reflexive Verben beschreiben Handlungen, die man an sich selbst ausführt. Sie erkennt man am "-se" am Ende des Infinitivs.

**Konjugation von levantarse (aufstehen):**
yo me levanto, tú te levantas, él se levanta, nosotros nos levantamos, ellos se levantan

**Wichtige reflexive Verben:**
- despertarse - aufwachen
- levantarse - aufstehen
- ducharse - duschen
- vestirse - sich anziehen
- acostarse - sich hinlegen
- sentarse - sich setzen
- llamarse - heißen (wörtlich: sich nennen)

Das Reflexivpronomen steht VOR dem konjugierten Verb!`,
    exercises: [
      { question: 'Yo __ a las siete. (despertarse)', options: ['despierto me', 'me despierto', 'se despierta', 'me despiertas'], correctIndex: 1, explanation: 'Pronomen VOR dem Verb: "me despierto".' },
      { question: '¿Cómo __ ? (llamarse, tú)', options: ['te llamas', 'se llama', 'me llamo', 'te llamo'], correctIndex: 0, explanation: 'Tú + llamarse = "te llamas". "¿Cómo te llamas?"' },
      { question: 'Ella __ temprano. (acostarse)', options: ['me acuesto', 'te acuestas', 'se acuesta', 'nos acostamos'], correctIndex: 2, explanation: 'Ella + acostarse = "se acuesta".' },
    ],
  },
];
