/**
 * Lückentext (Cloze/Fill-in-the-blank) exercises
 * Spanish sentences with one missing word, 4 options to choose from
 */

export interface ClozeExercise {
  id: string;
  level: 'A1' | 'A2';
  sentence: string;     // Full sentence with ___ as blank
  answer: string;        // The correct word
  options: string[];     // 4 options including the correct one
  correctIndex: number;
  translation: string;   // German translation of full sentence
  topic: string;         // Topic label
  explanation?: string;  // Why this answer is correct
}

export const cloze: ClozeExercise[] = [
  // ─── A1: Artikel ───
  { id: 'cl01', level: 'A1', topic: 'Artikel',
    sentence: '___ casa es muy grande.',
    answer: 'La', options: ['El', 'La', 'Los', 'Las'], correctIndex: 1,
    translation: 'Das Haus ist sehr groß.', explanation: '"Casa" ist weiblich (endet auf -a), Singular = "la".' },
  { id: 'cl02', level: 'A1', topic: 'Artikel',
    sentence: '___ libros están en la mesa.',
    answer: 'Los', options: ['El', 'La', 'Los', 'Las'], correctIndex: 2,
    translation: 'Die Bücher sind auf dem Tisch.', explanation: '"Libros" ist männlich Plural (endet auf -os) = "los".' },
  { id: 'cl03', level: 'A1', topic: 'Artikel',
    sentence: 'Tengo ___ problema.',
    answer: 'un', options: ['un', 'una', 'el', 'la'], correctIndex: 0,
    translation: 'Ich habe ein Problem.', explanation: '"Problema" ist eine Ausnahme: männlich trotz -a Endung = "un problema".' },

  // ─── A1: Ser vs Estar ───
  { id: 'cl04', level: 'A1', topic: 'Ser / Estar',
    sentence: 'María ___ de Chile.',
    answer: 'es', options: ['es', 'está', 'son', 'están'], correctIndex: 0,
    translation: 'María ist aus Chile.', explanation: 'Herkunft = ser. "Es de Chile" = sie kommt aus Chile.' },
  { id: 'cl05', level: 'A1', topic: 'Ser / Estar',
    sentence: 'Yo ___ muy cansado hoy.',
    answer: 'estoy', options: ['soy', 'estoy', 'es', 'está'], correctIndex: 1,
    translation: 'Ich bin heute sehr müde.', explanation: 'Müde sein ist ein vorübergehender Zustand = estar.' },
  { id: 'cl06', level: 'A1', topic: 'Ser / Estar',
    sentence: 'El restaurante ___ cerca del hotel.',
    answer: 'está', options: ['es', 'está', 'son', 'están'], correctIndex: 1,
    translation: 'Das Restaurant ist in der Nähe des Hotels.', explanation: 'Ortangaben = estar. Merke: LoCo (Location, Condition) = estar.' },
  { id: 'cl07', level: 'A1', topic: 'Ser / Estar',
    sentence: 'Mi hermana ___ profesora.',
    answer: 'es', options: ['es', 'está', 'soy', 'estoy'], correctIndex: 0,
    translation: 'Meine Schwester ist Lehrerin.', explanation: 'Beruf = ser (dauerhafte Eigenschaft).' },

  // ─── A1: Presente ───
  { id: 'cl08', level: 'A1', topic: 'Presente',
    sentence: 'Nosotros ___ español en la escuela.',
    answer: 'hablamos', options: ['hablo', 'hablas', 'habla', 'hablamos'], correctIndex: 3,
    translation: 'Wir sprechen Spanisch in der Schule.', explanation: 'Nosotros + hablar (-ar): Endung -amos = hablamos.' },
  { id: 'cl09', level: 'A1', topic: 'Presente',
    sentence: '¿Tú ___ café o té?',
    answer: 'quieres', options: ['quiero', 'quieres', 'quiere', 'queremos'], correctIndex: 1,
    translation: 'Willst du Kaffee oder Tee?', explanation: 'Tú + querer: Stammwechsel e→ie = quieres.' },
  { id: 'cl10', level: 'A1', topic: 'Presente',
    sentence: 'Ellos ___ en un apartamento.',
    answer: 'viven', options: ['vivo', 'vives', 'vive', 'viven'], correctIndex: 3,
    translation: 'Sie wohnen in einer Wohnung.', explanation: 'Ellos + vivir (-ir): Endung -en = viven.' },
  { id: 'cl11', level: 'A1', topic: 'Presente',
    sentence: 'Yo ___ al trabajo en autobús.',
    answer: 'voy', options: ['voy', 'vas', 'va', 'vamos'], correctIndex: 0,
    translation: 'Ich fahre mit dem Bus zur Arbeit.', explanation: 'Ir ist komplett unregelmäßig: yo voy, tú vas, él va...' },

  // ─── A1: Grundwortschatz ───
  { id: 'cl12', level: 'A1', topic: 'Wortschatz',
    sentence: 'Por favor, ¿dónde está el ___?',
    answer: 'baño', options: ['baño', 'libro', 'gato', 'sombrero'], correctIndex: 0,
    translation: 'Bitte, wo ist die Toilette?', explanation: 'Baño = Badezimmer/Toilette. Einer der wichtigsten Sätze auf Reisen!' },
  { id: 'cl13', level: 'A1', topic: 'Wortschatz',
    sentence: 'Hace mucho ___ en verano.',
    answer: 'calor', options: ['frío', 'calor', 'viento', 'lluvia'], correctIndex: 1,
    translation: 'Im Sommer ist es sehr heiß.', explanation: 'Calor = Hitze. "Hace calor" = es ist heiß (wörtlich: es macht Hitze).' },
  { id: 'cl14', level: 'A1', topic: 'Wortschatz',
    sentence: 'Me gusta comer ___ con arroz.',
    answer: 'pollo', options: ['mesa', 'silla', 'pollo', 'libro'], correctIndex: 2,
    translation: 'Ich esse gerne Hähnchen mit Reis.', explanation: 'Pollo = Hähnchen. Mesa (Tisch) und silla (Stuhl) isst man nicht.' },
  { id: 'cl15', level: 'A1', topic: 'Wortschatz',
    sentence: 'Mi ___ se llama Carlos. Es el padre de mi madre.',
    answer: 'abuelo', options: ['hermano', 'primo', 'abuelo', 'hijo'], correctIndex: 2,
    translation: 'Mein Großvater heißt Carlos. Er ist der Vater meiner Mutter.', explanation: 'Abuelo = Großvater. Der Vater deiner Mutter ist dein Großvater.' },

  // ─── A1: Verneinung ───
  { id: 'cl16', level: 'A1', topic: 'Verneinung',
    sentence: '___ entiendo esta palabra.',
    answer: 'No', options: ['No', 'Si', 'Muy', 'Ya'], correctIndex: 0,
    translation: 'Ich verstehe dieses Wort nicht.', explanation: '"No" steht immer direkt vor dem Verb um zu verneinen.' },
  { id: 'cl17', level: 'A1', topic: 'Verneinung',
    sentence: 'No tengo ___ en el bolsillo.',
    answer: 'nada', options: ['algo', 'nada', 'mucho', 'todo'], correctIndex: 1,
    translation: 'Ich habe nichts in der Tasche.', explanation: 'Doppelte Verneinung: "No ... nada" = nichts. Im Spanischen ist das korrekt!' },

  // ─── A2: Por vs Para ───
  { id: 'cl18', level: 'A2', topic: 'Por / Para',
    sentence: 'Este regalo es ___ ti.',
    answer: 'para', options: ['por', 'para', 'de', 'con'], correctIndex: 1,
    translation: 'Dieses Geschenk ist für dich.', explanation: 'Empfänger/Ziel = para. Das Geschenk ist FÜR dich bestimmt.' },
  { id: 'cl19', level: 'A2', topic: 'Por / Para',
    sentence: 'Gracias ___ tu ayuda.',
    answer: 'por', options: ['por', 'para', 'de', 'con'], correctIndex: 0,
    translation: 'Danke für deine Hilfe.', explanation: 'Grund/Ursache = por. Danke WEGEN deiner Hilfe.' },
  { id: 'cl20', level: 'A2', topic: 'Por / Para',
    sentence: 'Estudio español ___ hablar con mi novia.',
    answer: 'para', options: ['por', 'para', 'de', 'en'], correctIndex: 1,
    translation: 'Ich lerne Spanisch, um mit meiner Freundin zu sprechen.', explanation: 'Zweck/Ziel = para. Ich lerne, UM ZU sprechen.' },

  // ─── A2: Pretérito ───
  { id: 'cl21', level: 'A2', topic: 'Pretérito',
    sentence: 'Ayer ___ al cine con mis amigos.',
    answer: 'fui', options: ['voy', 'fui', 'iba', 'iré'], correctIndex: 1,
    translation: 'Gestern ging ich mit meinen Freunden ins Kino.', explanation: '"Ayer" (gestern) = Pretérito. Ir: yo fui (nicht voy = Präsens).' },
  { id: 'cl22', level: 'A2', topic: 'Pretérito',
    sentence: 'Ella ___ una torta de chocolate.',
    answer: 'hizo', options: ['hace', 'hacía', 'hizo', 'hará'], correctIndex: 2,
    translation: 'Sie machte einen Schokoladenkuchen.', explanation: 'Hacer im Pretérito: él/ella hizo. Unregelmäßig (nicht "hació").' },
  { id: 'cl23', level: 'A2', topic: 'Pretérito',
    sentence: '¿___ la película anoche?',
    answer: 'Viste', options: ['Ves', 'Viste', 'Veías', 'Verás'], correctIndex: 1,
    translation: 'Hast du den Film gestern Abend gesehen?', explanation: '"Anoche" (gestern Abend) = Pretérito. Ver: tú viste.' },

  // ─── A2: Reflexive Verben ───
  { id: 'cl24', level: 'A2', topic: 'Reflexiv',
    sentence: 'Yo ___ levanto a las siete.',
    answer: 'me', options: ['me', 'te', 'se', 'nos'], correctIndex: 0,
    translation: 'Ich stehe um sieben Uhr auf.', explanation: 'Yo = me. Reflexivpronomen: yo-me, tú-te, él-se, nosotros-nos.' },
  { id: 'cl25', level: 'A2', topic: 'Reflexiv',
    sentence: '¿Cómo ___ llamas?',
    answer: 'te', options: ['me', 'te', 'se', 'nos'], correctIndex: 1,
    translation: 'Wie heißt du?', explanation: 'Tú = te. "Llamarse" = sich nennen. Du nennst dich = te llamas.' },
  { id: 'cl26', level: 'A2', topic: 'Reflexiv',
    sentence: 'Ella ___ ducha por la mañana.',
    answer: 'se', options: ['me', 'te', 'se', 'nos'], correctIndex: 2,
    translation: 'Sie duscht morgens.', explanation: 'Ella = se. "Ducharse" = sich duschen. Sie duscht sich = se ducha.' },

  // ─── A2: Wortschatz im Kontext ───
  { id: 'cl27', level: 'A2', topic: 'Wortschatz',
    sentence: 'El médico me dijo que tengo que tomar esta ___.',
    answer: 'medicina', options: ['comida', 'medicina', 'maleta', 'camisa'], correctIndex: 1,
    translation: 'Der Arzt sagte mir, dass ich dieses Medikament nehmen muss.', explanation: 'Medicina = Medikament. Vom Arzt (médico) bekommt man Medizin.' },
  { id: 'cl28', level: 'A2', topic: 'Wortschatz',
    sentence: 'Necesito comprar un ___ para el viaje a Chile.',
    answer: 'billete', options: ['billete', 'plato', 'zapato', 'sombrero'], correctIndex: 0,
    translation: 'Ich muss eine Fahrkarte für die Reise nach Chile kaufen.', explanation: 'Billete = Fahrkarte/Ticket. Für eine Reise (viaje) braucht man ein Ticket.' },
  { id: 'cl29', level: 'A2', topic: 'Wortschatz',
    sentence: 'En invierno hace mucho ___ y necesito un abrigo.',
    answer: 'frío', options: ['calor', 'frío', 'sol', 'viento'], correctIndex: 1,
    translation: 'Im Winter ist es sehr kalt und ich brauche einen Mantel.', explanation: 'Frío = Kälte. Im Winter (invierno) braucht man einen Mantel (abrigo).' },
  { id: 'cl30', level: 'A2', topic: 'Wortschatz',
    sentence: 'La ___ de mi abuela tiene un jardín muy bonito.',
    answer: 'casa', options: ['mesa', 'casa', 'calle', 'silla'], correctIndex: 1,
    translation: 'Das Haus meiner Großmutter hat einen sehr schönen Garten.', explanation: 'Casa = Haus. Ein Haus kann einen Garten (jardín) haben.' },
];
