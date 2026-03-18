export interface Verb {
  infinitive: string;
  de: string;
  regular: boolean;
  group: 'ar' | 'er' | 'ir';
  difficulty: 'easy' | 'medium' | 'hard';
  forms: ConjugationForms;
}

export interface ConjugationForms {
  presente: PersonForms;
  preterito?: PersonForms;
  imperfecto?: PersonForms;
}

export interface PersonForms {
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

export const persons = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'] as const;
export type Person = typeof persons[number];

export const personLabels: Record<Person, string> = {
  yo: 'yo',
  tu: 'tú',
  el: 'él/ella/usted',
  nosotros: 'nosotros',
  vosotros: 'vosotros',
  ellos: 'ellos/ellas/ustedes',
};

export const tenseLabels: Record<string, string> = {
  presente: 'Presente',
  preterito: 'Pretérito Indefinido',
  imperfecto: 'Imperfecto',
};

export const verbs: Verb[] = [
  {
    infinitive: 'hablar', de: 'sprechen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'hablo', tu: 'hablas', el: 'habla', nosotros: 'hablamos', vosotros: 'habláis', ellos: 'hablan' },
      preterito: { yo: 'hablé', tu: 'hablaste', el: 'habló', nosotros: 'hablamos', vosotros: 'hablasteis', ellos: 'hablaron' },
      imperfecto: { yo: 'hablaba', tu: 'hablabas', el: 'hablaba', nosotros: 'hablábamos', vosotros: 'hablabais', ellos: 'hablaban' },
    },
  },
  {
    infinitive: 'comer', de: 'essen', regular: true, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'como', tu: 'comes', el: 'come', nosotros: 'comemos', vosotros: 'coméis', ellos: 'comen' },
      preterito: { yo: 'comí', tu: 'comiste', el: 'comió', nosotros: 'comimos', vosotros: 'comisteis', ellos: 'comieron' },
      imperfecto: { yo: 'comía', tu: 'comías', el: 'comía', nosotros: 'comíamos', vosotros: 'comíais', ellos: 'comían' },
    },
  },
  {
    infinitive: 'vivir', de: 'leben', regular: true, group: 'ir', difficulty: 'easy',
    forms: {
      presente: { yo: 'vivo', tu: 'vives', el: 'vive', nosotros: 'vivimos', vosotros: 'vivís', ellos: 'viven' },
      preterito: { yo: 'viví', tu: 'viviste', el: 'vivió', nosotros: 'vivimos', vosotros: 'vivisteis', ellos: 'vivieron' },
      imperfecto: { yo: 'vivía', tu: 'vivías', el: 'vivía', nosotros: 'vivíamos', vosotros: 'vivíais', ellos: 'vivían' },
    },
  },
  {
    infinitive: 'ser', de: 'sein', regular: false, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' },
      preterito: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
      imperfecto: { yo: 'era', tu: 'eras', el: 'era', nosotros: 'éramos', vosotros: 'erais', ellos: 'eran' },
    },
  },
  {
    infinitive: 'estar', de: 'sein (Zustand)', regular: false, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', vosotros: 'estáis', ellos: 'están' },
      preterito: { yo: 'estuve', tu: 'estuviste', el: 'estuvo', nosotros: 'estuvimos', vosotros: 'estuvisteis', ellos: 'estuvieron' },
      imperfecto: { yo: 'estaba', tu: 'estabas', el: 'estaba', nosotros: 'estábamos', vosotros: 'estabais', ellos: 'estaban' },
    },
  },
  {
    infinitive: 'tener', de: 'haben', regular: false, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', vosotros: 'tenéis', ellos: 'tienen' },
      preterito: { yo: 'tuve', tu: 'tuviste', el: 'tuvo', nosotros: 'tuvimos', vosotros: 'tuvisteis', ellos: 'tuvieron' },
      imperfecto: { yo: 'tenía', tu: 'tenías', el: 'tenía', nosotros: 'teníamos', vosotros: 'teníais', ellos: 'tenían' },
    },
  },
  {
    infinitive: 'ir', de: 'gehen', regular: false, group: 'ir', difficulty: 'easy',
    forms: {
      presente: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van' },
      preterito: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
      imperfecto: { yo: 'iba', tu: 'ibas', el: 'iba', nosotros: 'íbamos', vosotros: 'ibais', ellos: 'iban' },
    },
  },
  {
    infinitive: 'hacer', de: 'machen', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', vosotros: 'hacéis', ellos: 'hacen' },
      preterito: { yo: 'hice', tu: 'hiciste', el: 'hizo', nosotros: 'hicimos', vosotros: 'hicisteis', ellos: 'hicieron' },
      imperfecto: { yo: 'hacía', tu: 'hacías', el: 'hacía', nosotros: 'hacíamos', vosotros: 'hacíais', ellos: 'hacían' },
    },
  },
  {
    infinitive: 'poder', de: 'können', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'puedo', tu: 'puedes', el: 'puede', nosotros: 'podemos', vosotros: 'podéis', ellos: 'pueden' },
      preterito: { yo: 'pude', tu: 'pudiste', el: 'pudo', nosotros: 'pudimos', vosotros: 'pudisteis', ellos: 'pudieron' },
      imperfecto: { yo: 'podía', tu: 'podías', el: 'podía', nosotros: 'podíamos', vosotros: 'podíais', ellos: 'podían' },
    },
  },
  {
    infinitive: 'querer', de: 'wollen', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'quiero', tu: 'quieres', el: 'quiere', nosotros: 'queremos', vosotros: 'queréis', ellos: 'quieren' },
      preterito: { yo: 'quise', tu: 'quisiste', el: 'quiso', nosotros: 'quisimos', vosotros: 'quisisteis', ellos: 'quisieron' },
      imperfecto: { yo: 'quería', tu: 'querías', el: 'quería', nosotros: 'queríamos', vosotros: 'queríais', ellos: 'querían' },
    },
  },
  {
    infinitive: 'decir', de: 'sagen', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', vosotros: 'decís', ellos: 'dicen' },
      preterito: { yo: 'dije', tu: 'dijiste', el: 'dijo', nosotros: 'dijimos', vosotros: 'dijisteis', ellos: 'dijeron' },
      imperfecto: { yo: 'decía', tu: 'decías', el: 'decía', nosotros: 'decíamos', vosotros: 'decíais', ellos: 'decían' },
    },
  },
  {
    infinitive: 'saber', de: 'wissen', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'sé', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', vosotros: 'sabéis', ellos: 'saben' },
      preterito: { yo: 'supe', tu: 'supiste', el: 'supo', nosotros: 'supimos', vosotros: 'supisteis', ellos: 'supieron' },
      imperfecto: { yo: 'sabía', tu: 'sabías', el: 'sabía', nosotros: 'sabíamos', vosotros: 'sabíais', ellos: 'sabían' },
    },
  },
  {
    infinitive: 'dar', de: 'geben', regular: false, group: 'ar', difficulty: 'medium',
    forms: {
      presente: { yo: 'doy', tu: 'das', el: 'da', nosotros: 'damos', vosotros: 'dais', ellos: 'dan' },
      preterito: { yo: 'di', tu: 'diste', el: 'dio', nosotros: 'dimos', vosotros: 'disteis', ellos: 'dieron' },
      imperfecto: { yo: 'daba', tu: 'dabas', el: 'daba', nosotros: 'dábamos', vosotros: 'dabais', ellos: 'daban' },
    },
  },
  {
    infinitive: 'poner', de: 'setzen/stellen', regular: false, group: 'er', difficulty: 'hard',
    forms: {
      presente: { yo: 'pongo', tu: 'pones', el: 'pone', nosotros: 'ponemos', vosotros: 'ponéis', ellos: 'ponen' },
      preterito: { yo: 'puse', tu: 'pusiste', el: 'puso', nosotros: 'pusimos', vosotros: 'pusisteis', ellos: 'pusieron' },
      imperfecto: { yo: 'ponía', tu: 'ponías', el: 'ponía', nosotros: 'poníamos', vosotros: 'poníais', ellos: 'ponían' },
    },
  },
  {
    infinitive: 'venir', de: 'kommen', regular: false, group: 'ir', difficulty: 'hard',
    forms: {
      presente: { yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', vosotros: 'venís', ellos: 'vienen' },
      preterito: { yo: 'vine', tu: 'viniste', el: 'vino', nosotros: 'vinimos', vosotros: 'vinisteis', ellos: 'vinieron' },
      imperfecto: { yo: 'venía', tu: 'venías', el: 'venía', nosotros: 'veníamos', vosotros: 'veníais', ellos: 'venían' },
    },
  },
  {
    infinitive: 'dormir', de: 'schlafen', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'duermo', tu: 'duermes', el: 'duerme', nosotros: 'dormimos', vosotros: 'dormís', ellos: 'duermen' },
      preterito: { yo: 'dormí', tu: 'dormiste', el: 'durmió', nosotros: 'dormimos', vosotros: 'dormisteis', ellos: 'durmieron' },
      imperfecto: { yo: 'dormía', tu: 'dormías', el: 'dormía', nosotros: 'dormíamos', vosotros: 'dormíais', ellos: 'dormían' },
    },
  },
  {
    infinitive: 'pensar', de: 'denken', regular: false, group: 'ar', difficulty: 'medium',
    forms: {
      presente: { yo: 'pienso', tu: 'piensas', el: 'piensa', nosotros: 'pensamos', vosotros: 'pensáis', ellos: 'piensan' },
      preterito: { yo: 'pensé', tu: 'pensaste', el: 'pensó', nosotros: 'pensamos', vosotros: 'pensasteis', ellos: 'pensaron' },
      imperfecto: { yo: 'pensaba', tu: 'pensabas', el: 'pensaba', nosotros: 'pensábamos', vosotros: 'pensabais', ellos: 'pensaban' },
    },
  },
  {
    infinitive: 'escribir', de: 'schreiben', regular: true, group: 'ir', difficulty: 'easy',
    forms: {
      presente: { yo: 'escribo', tu: 'escribes', el: 'escribe', nosotros: 'escribimos', vosotros: 'escribís', ellos: 'escriben' },
      preterito: { yo: 'escribí', tu: 'escribiste', el: 'escribió', nosotros: 'escribimos', vosotros: 'escribisteis', ellos: 'escribieron' },
      imperfecto: { yo: 'escribía', tu: 'escribías', el: 'escribía', nosotros: 'escribíamos', vosotros: 'escribíais', ellos: 'escribían' },
    },
  },
  {
    infinitive: 'conocer', de: 'kennen', regular: false, group: 'er', difficulty: 'hard',
    forms: {
      presente: { yo: 'conozco', tu: 'conoces', el: 'conoce', nosotros: 'conocemos', vosotros: 'conocéis', ellos: 'conocen' },
      preterito: { yo: 'conocí', tu: 'conociste', el: 'conoció', nosotros: 'conocimos', vosotros: 'conocisteis', ellos: 'conocieron' },
      imperfecto: { yo: 'conocía', tu: 'conocías', el: 'conocía', nosotros: 'conocíamos', vosotros: 'conocíais', ellos: 'conocían' },
    },
  },
  {
    infinitive: 'trabajar', de: 'arbeiten', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'trabajo', tu: 'trabajas', el: 'trabaja', nosotros: 'trabajamos', vosotros: 'trabajáis', ellos: 'trabajan' },
      preterito: { yo: 'trabajé', tu: 'trabajaste', el: 'trabajó', nosotros: 'trabajamos', vosotros: 'trabajasteis', ellos: 'trabajaron' },
      imperfecto: { yo: 'trabajaba', tu: 'trabajabas', el: 'trabajaba', nosotros: 'trabajábamos', vosotros: 'trabajabais', ellos: 'trabajaban' },
    },
  },
  {
    infinitive: 'comprar', de: 'kaufen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'compro', tu: 'compras', el: 'compra', nosotros: 'compramos', vosotros: 'compráis', ellos: 'compran' },
      preterito: { yo: 'compré', tu: 'compraste', el: 'compró', nosotros: 'compramos', vosotros: 'comprasteis', ellos: 'compraron' },
      imperfecto: { yo: 'compraba', tu: 'comprabas', el: 'compraba', nosotros: 'comprábamos', vosotros: 'comprabais', ellos: 'compraban' },
    },
  },
  {
    infinitive: 'beber', de: 'trinken', regular: true, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'bebo', tu: 'bebes', el: 'bebe', nosotros: 'bebemos', vosotros: 'bebéis', ellos: 'beben' },
      preterito: { yo: 'bebí', tu: 'bebiste', el: 'bebió', nosotros: 'bebimos', vosotros: 'bebisteis', ellos: 'bebieron' },
      imperfecto: { yo: 'bebía', tu: 'bebías', el: 'bebía', nosotros: 'bebíamos', vosotros: 'bebíais', ellos: 'bebían' },
    },
  },
  {
    infinitive: 'abrir', de: 'öffnen', regular: true, group: 'ir', difficulty: 'easy',
    forms: {
      presente: { yo: 'abro', tu: 'abres', el: 'abre', nosotros: 'abrimos', vosotros: 'abrís', ellos: 'abren' },
      preterito: { yo: 'abrí', tu: 'abriste', el: 'abrió', nosotros: 'abrimos', vosotros: 'abristeis', ellos: 'abrieron' },
      imperfecto: { yo: 'abría', tu: 'abrías', el: 'abría', nosotros: 'abríamos', vosotros: 'abríais', ellos: 'abrían' },
    },
  },
  {
    infinitive: 'jugar', de: 'spielen', regular: false, group: 'ar', difficulty: 'medium',
    forms: {
      presente: { yo: 'juego', tu: 'juegas', el: 'juega', nosotros: 'jugamos', vosotros: 'jugáis', ellos: 'juegan' },
      preterito: { yo: 'jugué', tu: 'jugaste', el: 'jugó', nosotros: 'jugamos', vosotros: 'jugasteis', ellos: 'jugaron' },
      imperfecto: { yo: 'jugaba', tu: 'jugabas', el: 'jugaba', nosotros: 'jugábamos', vosotros: 'jugabais', ellos: 'jugaban' },
    },
  },
  {
    infinitive: 'sentir', de: 'fühlen', regular: false, group: 'ir', difficulty: 'hard',
    forms: {
      presente: { yo: 'siento', tu: 'sientes', el: 'siente', nosotros: 'sentimos', vosotros: 'sentís', ellos: 'sienten' },
      preterito: { yo: 'sentí', tu: 'sentiste', el: 'sintió', nosotros: 'sentimos', vosotros: 'sentisteis', ellos: 'sintieron' },
      imperfecto: { yo: 'sentía', tu: 'sentías', el: 'sentía', nosotros: 'sentíamos', vosotros: 'sentíais', ellos: 'sentían' },
    },
  },
  {
    infinitive: 'pedir', de: 'bitten/bestellen', regular: false, group: 'ir', difficulty: 'hard',
    forms: {
      presente: { yo: 'pido', tu: 'pides', el: 'pide', nosotros: 'pedimos', vosotros: 'pedís', ellos: 'piden' },
      preterito: { yo: 'pedí', tu: 'pediste', el: 'pidió', nosotros: 'pedimos', vosotros: 'pedisteis', ellos: 'pidieron' },
      imperfecto: { yo: 'pedía', tu: 'pedías', el: 'pedía', nosotros: 'pedíamos', vosotros: 'pedíais', ellos: 'pedían' },
    },
  },
  {
    infinitive: 'encontrar', de: 'finden', regular: false, group: 'ar', difficulty: 'medium',
    forms: {
      presente: { yo: 'encuentro', tu: 'encuentras', el: 'encuentra', nosotros: 'encontramos', vosotros: 'encontráis', ellos: 'encuentran' },
      preterito: { yo: 'encontré', tu: 'encontraste', el: 'encontró', nosotros: 'encontramos', vosotros: 'encontrasteis', ellos: 'encontraron' },
      imperfecto: { yo: 'encontraba', tu: 'encontrabas', el: 'encontraba', nosotros: 'encontrábamos', vosotros: 'encontrabais', ellos: 'encontraban' },
    },
  },
  {
    infinitive: 'salir', de: 'ausgehen', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'salgo', tu: 'sales', el: 'sale', nosotros: 'salimos', vosotros: 'salís', ellos: 'salen' },
      preterito: { yo: 'salí', tu: 'saliste', el: 'salió', nosotros: 'salimos', vosotros: 'salisteis', ellos: 'salieron' },
      imperfecto: { yo: 'salía', tu: 'salías', el: 'salía', nosotros: 'salíamos', vosotros: 'salíais', ellos: 'salían' },
    },
  },
  {
    infinitive: 'llegar', de: 'ankommen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'llego', tu: 'llegas', el: 'llega', nosotros: 'llegamos', vosotros: 'llegáis', ellos: 'llegan' },
      preterito: { yo: 'llegué', tu: 'llegaste', el: 'llegó', nosotros: 'llegamos', vosotros: 'llegasteis', ellos: 'llegaron' },
      imperfecto: { yo: 'llegaba', tu: 'llegabas', el: 'llegaba', nosotros: 'llegábamos', vosotros: 'llegabais', ellos: 'llegaban' },
    },
  },
  {
    infinitive: 'traer', de: 'bringen', regular: false, group: 'er', difficulty: 'hard',
    forms: {
      presente: { yo: 'traigo', tu: 'traes', el: 'trae', nosotros: 'traemos', vosotros: 'traéis', ellos: 'traen' },
      preterito: { yo: 'traje', tu: 'trajiste', el: 'trajo', nosotros: 'trajimos', vosotros: 'trajisteis', ellos: 'trajeron' },
      imperfecto: { yo: 'traía', tu: 'traías', el: 'traía', nosotros: 'traíamos', vosotros: 'traíais', ellos: 'traían' },
    },
  },
  {
    infinitive: 'ver', de: 'sehen', regular: false, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'veo', tu: 'ves', el: 've', nosotros: 'vemos', vosotros: 'veis', ellos: 'ven' },
      preterito: { yo: 'vi', tu: 'viste', el: 'vio', nosotros: 'vimos', vosotros: 'visteis', ellos: 'vieron' },
      imperfecto: { yo: 'veía', tu: 'veías', el: 'veía', nosotros: 'veíamos', vosotros: 'veíais', ellos: 'veían' },
    },
  },
  {
    infinitive: 'leer', de: 'lesen', regular: true, group: 'er', difficulty: 'easy',
    forms: {
      presente: { yo: 'leo', tu: 'lees', el: 'lee', nosotros: 'leemos', vosotros: 'leéis', ellos: 'leen' },
      preterito: { yo: 'leí', tu: 'leíste', el: 'leyó', nosotros: 'leímos', vosotros: 'leísteis', ellos: 'leyeron' },
      imperfecto: { yo: 'leía', tu: 'leías', el: 'leía', nosotros: 'leíamos', vosotros: 'leíais', ellos: 'leían' },
    },
  },
  {
    infinitive: 'creer', de: 'glauben', regular: true, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'creo', tu: 'crees', el: 'cree', nosotros: 'creemos', vosotros: 'creéis', ellos: 'creen' },
      preterito: { yo: 'creí', tu: 'creíste', el: 'creyó', nosotros: 'creímos', vosotros: 'creísteis', ellos: 'creyeron' },
      imperfecto: { yo: 'creía', tu: 'creías', el: 'creía', nosotros: 'creíamos', vosotros: 'creíais', ellos: 'creían' },
    },
  },
  {
    infinitive: 'empezar', de: 'anfangen', regular: false, group: 'ar', difficulty: 'medium',
    forms: {
      presente: { yo: 'empiezo', tu: 'empiezas', el: 'empieza', nosotros: 'empezamos', vosotros: 'empezáis', ellos: 'empiezan' },
      preterito: { yo: 'empecé', tu: 'empezaste', el: 'empezó', nosotros: 'empezamos', vosotros: 'empezasteis', ellos: 'empezaron' },
      imperfecto: { yo: 'empezaba', tu: 'empezabas', el: 'empezaba', nosotros: 'empezábamos', vosotros: 'empezabais', ellos: 'empezaban' },
    },
  },
  {
    infinitive: 'oír', de: 'hören', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'oigo', tu: 'oyes', el: 'oye', nosotros: 'oímos', vosotros: 'oís', ellos: 'oyen' },
      preterito: { yo: 'oí', tu: 'oíste', el: 'oyó', nosotros: 'oímos', vosotros: 'oísteis', ellos: 'oyeron' },
      imperfecto: { yo: 'oía', tu: 'oías', el: 'oía', nosotros: 'oíamos', vosotros: 'oíais', ellos: 'oían' },
    },
  },
  {
    infinitive: 'seguir', de: 'folgen/weitermachen', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'sigo', tu: 'sigues', el: 'sigue', nosotros: 'seguimos', vosotros: 'seguís', ellos: 'siguen' },
      preterito: { yo: 'seguí', tu: 'seguiste', el: 'siguió', nosotros: 'seguimos', vosotros: 'seguisteis', ellos: 'siguieron' },
      imperfecto: { yo: 'seguía', tu: 'seguías', el: 'seguía', nosotros: 'seguíamos', vosotros: 'seguíais', ellos: 'seguían' },
    },
  },
  {
    infinitive: 'elegir', de: 'wählen', regular: false, group: 'ir', difficulty: 'hard',
    forms: {
      presente: { yo: 'elijo', tu: 'eliges', el: 'elige', nosotros: 'elegimos', vosotros: 'elegís', ellos: 'eligen' },
      preterito: { yo: 'elegí', tu: 'elegiste', el: 'eligió', nosotros: 'elegimos', vosotros: 'elegisteis', ellos: 'eligieron' },
      imperfecto: { yo: 'elegía', tu: 'elegías', el: 'elegía', nosotros: 'elegíamos', vosotros: 'elegíais', ellos: 'elegían' },
    },
  },
  {
    infinitive: 'conducir', de: 'fahren/führen', regular: false, group: 'ir', difficulty: 'hard',
    forms: {
      presente: { yo: 'conduzco', tu: 'conduces', el: 'conduce', nosotros: 'conducimos', vosotros: 'conducís', ellos: 'conducen' },
      preterito: { yo: 'conduje', tu: 'condujiste', el: 'condujo', nosotros: 'condujimos', vosotros: 'condujisteis', ellos: 'condujeron' },
      imperfecto: { yo: 'conducía', tu: 'conducías', el: 'conducía', nosotros: 'conducíamos', vosotros: 'conducíais', ellos: 'conducían' },
    },
  },
  {
    infinitive: 'morir', de: 'sterben', regular: false, group: 'ir', difficulty: 'medium',
    forms: {
      presente: { yo: 'muero', tu: 'mueres', el: 'muere', nosotros: 'morimos', vosotros: 'morís', ellos: 'mueren' },
      preterito: { yo: 'morí', tu: 'moriste', el: 'murió', nosotros: 'morimos', vosotros: 'moristeis', ellos: 'murieron' },
      imperfecto: { yo: 'moría', tu: 'morías', el: 'moría', nosotros: 'moríamos', vosotros: 'moríais', ellos: 'morían' },
    },
  },
  {
    infinitive: 'volver', de: 'zurückkehren', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'vuelvo', tu: 'vuelves', el: 'vuelve', nosotros: 'volvemos', vosotros: 'volvéis', ellos: 'vuelven' },
      preterito: { yo: 'volví', tu: 'volviste', el: 'volvió', nosotros: 'volvimos', vosotros: 'volvisteis', ellos: 'volvieron' },
      imperfecto: { yo: 'volvía', tu: 'volvías', el: 'volvía', nosotros: 'volvíamos', vosotros: 'volvíais', ellos: 'volvían' },
    },
  },
  {
    infinitive: 'parecer', de: 'scheinen/aussehen', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'parezco', tu: 'pareces', el: 'parece', nosotros: 'parecemos', vosotros: 'parecéis', ellos: 'parecen' },
      preterito: { yo: 'parecí', tu: 'pareciste', el: 'pareció', nosotros: 'parecimos', vosotros: 'parecisteis', ellos: 'parecieron' },
      imperfecto: { yo: 'parecía', tu: 'parecías', el: 'parecía', nosotros: 'parecíamos', vosotros: 'parecíais', ellos: 'parecían' },
    },
  },
  {
    infinitive: 'nacer', de: 'geboren werden', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'nazco', tu: 'naces', el: 'nace', nosotros: 'nacemos', vosotros: 'nacéis', ellos: 'nacen' },
      preterito: { yo: 'nací', tu: 'naciste', el: 'nació', nosotros: 'nacimos', vosotros: 'nacisteis', ellos: 'nacieron' },
      imperfecto: { yo: 'nacía', tu: 'nacías', el: 'nacía', nosotros: 'nacíamos', vosotros: 'nacíais', ellos: 'nacían' },
    },
  },
  {
    infinitive: 'caer', de: 'fallen', regular: false, group: 'er', difficulty: 'hard',
    forms: {
      presente: { yo: 'caigo', tu: 'caes', el: 'cae', nosotros: 'caemos', vosotros: 'caéis', ellos: 'caen' },
      preterito: { yo: 'caí', tu: 'caíste', el: 'cayó', nosotros: 'caímos', vosotros: 'caísteis', ellos: 'cayeron' },
      imperfecto: { yo: 'caía', tu: 'caías', el: 'caía', nosotros: 'caíamos', vosotros: 'caíais', ellos: 'caían' },
    },
  },
  {
    infinitive: 'pagar', de: 'bezahlen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'pago', tu: 'pagas', el: 'paga', nosotros: 'pagamos', vosotros: 'pagáis', ellos: 'pagan' },
      preterito: { yo: 'pagué', tu: 'pagaste', el: 'pagó', nosotros: 'pagamos', vosotros: 'pagasteis', ellos: 'pagaron' },
      imperfecto: { yo: 'pagaba', tu: 'pagabas', el: 'pagaba', nosotros: 'pagábamos', vosotros: 'pagabais', ellos: 'pagaban' },
    },
  },
  {
    infinitive: 'buscar', de: 'suchen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'busco', tu: 'buscas', el: 'busca', nosotros: 'buscamos', vosotros: 'buscáis', ellos: 'buscan' },
      preterito: { yo: 'busqué', tu: 'buscaste', el: 'buscó', nosotros: 'buscamos', vosotros: 'buscasteis', ellos: 'buscaron' },
      imperfecto: { yo: 'buscaba', tu: 'buscabas', el: 'buscaba', nosotros: 'buscábamos', vosotros: 'buscabais', ellos: 'buscaban' },
    },
  },
  {
    infinitive: 'esperar', de: 'warten/hoffen', regular: true, group: 'ar', difficulty: 'easy',
    forms: {
      presente: { yo: 'espero', tu: 'esperas', el: 'espera', nosotros: 'esperamos', vosotros: 'esperáis', ellos: 'esperan' },
      preterito: { yo: 'esperé', tu: 'esperaste', el: 'esperó', nosotros: 'esperamos', vosotros: 'esperasteis', ellos: 'esperaron' },
      imperfecto: { yo: 'esperaba', tu: 'esperabas', el: 'esperaba', nosotros: 'esperábamos', vosotros: 'esperabais', ellos: 'esperaban' },
    },
  },
  {
    infinitive: 'entender', de: 'verstehen', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'entiendo', tu: 'entiendes', el: 'entiende', nosotros: 'entendemos', vosotros: 'entendéis', ellos: 'entienden' },
      preterito: { yo: 'entendí', tu: 'entendiste', el: 'entendió', nosotros: 'entendimos', vosotros: 'entendisteis', ellos: 'entendieron' },
      imperfecto: { yo: 'entendía', tu: 'entendías', el: 'entendía', nosotros: 'entendíamos', vosotros: 'entendíais', ellos: 'entendían' },
    },
  },
  {
    infinitive: 'perder', de: 'verlieren', regular: false, group: 'er', difficulty: 'medium',
    forms: {
      presente: { yo: 'pierdo', tu: 'pierdes', el: 'pierde', nosotros: 'perdemos', vosotros: 'perdéis', ellos: 'pierden' },
      preterito: { yo: 'perdí', tu: 'perdiste', el: 'perdió', nosotros: 'perdimos', vosotros: 'perdisteis', ellos: 'perdieron' },
      imperfecto: { yo: 'perdía', tu: 'perdías', el: 'perdía', nosotros: 'perdíamos', vosotros: 'perdíais', ellos: 'perdían' },
    },
  },
];
