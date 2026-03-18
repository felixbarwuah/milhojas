/**
 * Reading comprehension exercises
 * Spanish text + German question + 4 answer options
 */

export interface ReadingExercise {
  id: string;
  level: 'A1' | 'A2';
  title: string;
  text: string;       // Spanish text to read
  question: string;   // German question about the text
  options: string[];   // 4 German answer options
  correctIndex: number;
  hint?: string;       // Optional translation hint
}

export const readings: ReadingExercise[] = [
  // ─── A1 ───
  {
    id: 'r01', level: 'A1', title: 'En el restaurante',
    text: 'María entra en el restaurante. El camarero dice: "Buenas tardes, ¿mesa para una persona?" María responde: "No, somos dos. Mi amigo llega en cinco minutos." El camarero le da una mesa cerca de la ventana.',
    question: 'Für wie viele Personen braucht María einen Tisch?',
    options: ['Für eine Person', 'Für zwei Personen', 'Für drei Personen', 'Für fünf Personen'],
    correctIndex: 1,
  },
  {
    id: 'r02', level: 'A1', title: 'Mi familia',
    text: 'Me llamo Pablo. Tengo treinta años. Vivo en Santiago con mi esposa Ana y nuestros dos hijos. Mi hijo mayor se llama Diego y tiene cinco años. Mi hija pequeña se llama Sofía y tiene dos años.',
    question: 'Wie alt ist Pablos Tochter?',
    options: ['Fünf Jahre', 'Drei Jahre', 'Zwei Jahre', 'Dreißig Jahre'],
    correctIndex: 2,
  },
  {
    id: 'r03', level: 'A1', title: 'El supermercado',
    text: 'Hoy voy al supermercado. Necesito comprar leche, pan, huevos y fruta. Las manzanas cuestan dos euros el kilo. Compro un kilo de manzanas y medio kilo de plátanos. En total pago seis euros.',
    question: 'Was kostet ein Kilo Äpfel?',
    options: ['Ein Euro', 'Zwei Euro', 'Drei Euro', 'Sechs Euro'],
    correctIndex: 1,
  },
  {
    id: 'r04', level: 'A1', title: 'El tiempo',
    text: 'Hoy hace mucho calor en Mallorca. La temperatura es de treinta y cinco grados. Vamos a la playa porque el mar está muy azul y tranquilo. Mi hermana prefiere quedarse en casa con el aire acondicionado.',
    question: 'Warum bleibt die Schwester zu Hause?',
    options: ['Sie ist krank', 'Sie muss arbeiten', 'Wegen der Klimaanlage (es ist zu heiß)', 'Sie mag den Strand nicht'],
    correctIndex: 2,
  },
  {
    id: 'r05', level: 'A1', title: 'Mi día',
    text: 'Me despierto a las siete de la mañana. Desayuno café con leche y tostadas. A las ocho y media voy al trabajo en autobús. Trabajo de nueve a cinco. Después del trabajo, voy al gimnasio.',
    question: 'Wie kommt die Person zur Arbeit?',
    options: ['Mit dem Auto', 'Mit dem Zug', 'Mit dem Bus', 'Zu Fuß'],
    correctIndex: 2,
  },
  {
    id: 'r06', level: 'A1', title: 'La fiesta',
    text: 'El sábado es el cumpleaños de Carmen. Ella cumple veinticinco años. La fiesta es en su casa a las ocho de la noche. Yo llevo una torta de chocolate. Mi amigo Luis lleva la música.',
    question: 'Wann findet die Party statt?',
    options: ['Freitag um 20 Uhr', 'Samstag um 20 Uhr', 'Samstag um 18 Uhr', 'Sonntag um 20 Uhr'],
    correctIndex: 1,
  },
  {
    id: 'r07', level: 'A1', title: 'En la estación',
    text: 'Quiero ir de Madrid a Barcelona. El tren sale a las diez de la mañana y llega a las doce y media. El billete cuesta cuarenta y cinco euros. Prefiero el tren porque es más rápido que el autobús.',
    question: 'Wie lange dauert die Zugfahrt?',
    options: ['Eine Stunde', 'Zwei Stunden', 'Zweieinhalb Stunden', 'Drei Stunden'],
    correctIndex: 2,
  },

  // ─── A2 ───
  {
    id: 'r08', level: 'A2', title: 'Vacaciones en Chile',
    text: 'El verano pasado viajé a Chile con mi novia. Visitamos Santiago, Valparaíso y el desierto de Atacama. Lo que más me gustó fue Valparaíso, una ciudad llena de colores y arte callejero. Comimos muchos mariscos frescos y bebimos vino chileno. El viaje duró tres semanas y ya quiero volver.',
    question: 'Was hat der Person am besten gefallen?',
    options: ['Santiago', 'Valparaíso', 'Die Atacama-Wüste', 'Das Essen'],
    correctIndex: 1,
  },
  {
    id: 'r09', level: 'A2', title: 'El nuevo trabajo',
    text: 'Ayer tuve mi primera entrevista de trabajo en español. Estaba muy nervioso porque mi español no es perfecto. Pero el jefe fue muy amable y habló despacio. Me hizo preguntas sobre mi experiencia y mis estudios. Al final me dijo: "Le llamamos la semana que viene." Espero tener buenas noticias.',
    question: 'Wie reagierte der Chef?',
    options: ['Er war ungeduldig', 'Er war freundlich und sprach langsam', 'Er sprach auf Englisch', 'Er beendete das Gespräch sofort'],
    correctIndex: 1,
  },
  {
    id: 'r10', level: 'A2', title: 'La receta de la abuela',
    text: 'Mi abuela hace la mejor cazuela de Chile. Primero, cocina la carne de pollo con cebolla y ajo. Después añade papas, zapallo, choclo y arroz. Todo se cocina a fuego lento durante una hora. El secreto, dice mi abuela, es usar ingredientes frescos del mercado.',
    question: 'Was ist laut der Großmutter das Geheimnis?',
    options: ['Viel Salz', 'Lange kochen lassen', 'Frische Zutaten vom Markt', 'Ein spezielles Gewürz'],
    correctIndex: 2,
  },
  {
    id: 'r11', level: 'A2', title: 'El metro de Santiago',
    text: 'El metro de Santiago es el mejor de Latinoamérica. Tiene siete líneas y más de cien estaciones. Un viaje cuesta 800 pesos chilenos, que son menos de un euro. En hora punta está muy lleno, pero es la forma más rápida de moverse por la ciudad.',
    question: 'Was kostet eine Fahrt mit der Metro in Santiago ungefähr?',
    options: ['Weniger als einen Euro', 'Etwa zwei Euro', 'Fünf Euro', 'Es ist gratis'],
    correctIndex: 0,
  },
  {
    id: 'r12', level: 'A2', title: 'Aprender español',
    text: 'Empecé a aprender español hace seis meses. Al principio era difícil, especialmente la diferencia entre ser y estar. Ahora puedo tener conversaciones básicas y entender canciones en español. Mi profesor dice que tengo buena pronunciación porque escucho muchos podcasts en español.',
    question: 'Was war am Anfang besonders schwierig?',
    options: ['Die Aussprache', 'Der Unterschied zwischen ser und estar', 'Das Vokabellernen', 'Das Lesen'],
    correctIndex: 1,
  },
];
