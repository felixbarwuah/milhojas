/**
 * Fun facts about Spanish, Chile, Spain, and Latin America
 * Multiple choice quiz format: fact text + question + 4 options
 */

export interface Fact {
  id: string;
  category: FactCategory;
  text: string;       // The fact/info text shown first
  question: string;   // Question about the fact
  options: string[];   // 4 options
  correctIndex: number;
  explanation: string; // Shown after answering
}

export type FactCategory = 'chile' | 'spanien' | 'sprache' | 'tipps' | 'kultur';

export const factCategoryLabels: Record<FactCategory, string> = {
  chile: 'Chile',
  spanien: 'Spanien & Mallorca',
  sprache: 'Die spanische Sprache',
  tipps: 'Lerntipps',
  kultur: 'Kultur & Alltag',
};

export const factCategoryColors: Record<FactCategory, string> = {
  chile: '#D52B1E',
  spanien: '#D97706',
  sprache: '#0039A6',
  tipps: '#16A34A',
  kultur: '#9333EA',
};

export const facts: Fact[] = [
  // ─── Chile ───
  {
    id: 'f01', category: 'chile',
    text: 'Chile ist das längste Land der Welt. Es erstreckt sich über 4.300 km von Nord nach Süd, ist aber im Durchschnitt nur 177 km breit.',
    question: 'Wie lang ist Chile von Nord nach Süd?',
    options: ['2.100 km', '4.300 km', '6.500 km', '3.200 km'],
    correctIndex: 1,
    explanation: 'Chile erstreckt sich über 4.300 km - das entspricht der Strecke von Lissabon nach Moskau.',
  },
  {
    id: 'f02', category: 'chile',
    text: 'Die Atacama-Wüste in Chile ist die trockenste Wüste der Welt. An manchen Stellen hat es seit Beginn der Aufzeichnungen nie geregnet.',
    question: 'Was ist besonders an der Atacama-Wüste?',
    options: ['Die heißeste der Welt', 'Die trockenste der Welt', 'Die größte der Welt', 'Die höchste der Welt'],
    correctIndex: 1,
    explanation: 'Die Atacama ist so trocken, dass die NASA sie als Testgelände für Mars-Rover nutzt.',
  },
  {
    id: 'f03', category: 'chile',
    text: 'In Chile sagt man "po" am Ende vieler Sätze. "Sí po" bedeutet einfach "Ja" mit chilenischem Flair. Auch "cachai" (verstehst du?) ist typisch chilenisch.',
    question: 'Was bedeutet "sí po" in Chile?',
    options: ['Nein danke', 'Ja (chilenisch)', 'Vielleicht', 'Bitte'],
    correctIndex: 1,
    explanation: '"Po" kommt von "pues" und ist DAS Erkennungszeichen chilenischen Spanischs.',
  },
  {
    id: 'f04', category: 'chile',
    text: 'Empanadas sind das Nationalgericht Chiles. Die "empanada de pino" ist mit Hackfleisch, Ei, Oliven und Rosinen gefüllt.',
    question: 'Was ist in einer traditionellen chilenischen Empanada de Pino?',
    options: ['Käse und Schinken', 'Hackfleisch, Ei, Oliven, Rosinen', 'Nur Gemüse', 'Fisch und Meeresfrüchte'],
    correctIndex: 1,
    explanation: 'Empanadas de pino werden besonders am 18. September (Fiestas Patrias) in Massen gegessen.',
  },
  {
    id: 'f05', category: 'chile',
    text: 'Chile produziert mehr Kupfer als jedes andere Land der Welt - etwa 27% der weltweiten Produktion.',
    question: 'Welchen Rohstoff produziert Chile am meisten weltweit?',
    options: ['Gold', 'Silber', 'Kupfer', 'Lithium'],
    correctIndex: 2,
    explanation: 'Die Chuquicamata-Mine in Chile ist eine der größten offenen Kupferminen der Welt.',
  },

  // ─── Spanien & Mallorca ───
  {
    id: 'f06', category: 'spanien',
    text: 'Auf Mallorca spricht man neben Spanisch auch Katalanisch (Mallorquín). Viele Straßenschilder sind zweisprachig.',
    question: 'Welche zweite Sprache wird auf Mallorca gesprochen?',
    options: ['Baskisch', 'Galicisch', 'Katalanisch', 'Portugiesisch'],
    correctIndex: 2,
    explanation: 'Mallorquín ist ein Dialekt des Katalanischen. Auf der Insel heißt die Sprache "Mallorquí".',
  },
  {
    id: 'f07', category: 'spanien',
    text: 'Spanien hat eine Siesta-Tradition. Zwischen 14 und 17 Uhr schließen viele Geschäfte. In Mallorca ist das besonders im Sommer üblich.',
    question: 'Wann ist typischerweise Siesta in Spanien?',
    options: ['10-12 Uhr', '14-17 Uhr', '18-20 Uhr', '12-13 Uhr'],
    correctIndex: 1,
    explanation: 'Die Siesta wird allerdings in Großstädten immer weniger praktiziert.',
  },
  {
    id: 'f08', category: 'spanien',
    text: 'In Spanien isst man sehr spät. Das Abendessen (la cena) beginnt oft erst um 21 oder 22 Uhr.',
    question: 'Wann essen Spanier typischerweise zu Abend?',
    options: ['18 Uhr', '19 Uhr', '21-22 Uhr', '17 Uhr'],
    correctIndex: 2,
    explanation: 'Auch das Mittagessen ist spät: zwischen 14 und 15 Uhr. Das ist die Hauptmahlzeit.',
  },
  {
    id: 'f09', category: 'spanien',
    text: 'Mallorca hat über 300 Sonnentage pro Jahr. Der höchste Berg ist der Puig Major mit 1.445 Metern.',
    question: 'Wie viele Sonnentage hat Mallorca pro Jahr?',
    options: ['Über 200', 'Über 250', 'Über 300', 'Über 350'],
    correctIndex: 2,
    explanation: 'Deshalb ist Mallorca so beliebt bei Deutschen und Österreichern.',
  },

  // ─── Die spanische Sprache ───
  {
    id: 'f10', category: 'sprache',
    text: 'Spanisch ist die vierthäufigste Sprache der Welt mit über 500 Millionen Muttersprachlern. Nur Mandarin, Hindi und Englisch haben mehr.',
    question: 'Wie viele Menschen sprechen Spanisch als Muttersprache?',
    options: ['200 Millionen', '350 Millionen', '500 Millionen', '700 Millionen'],
    correctIndex: 2,
    explanation: 'In 21 Ländern ist Spanisch Amtssprache.',
  },
  {
    id: 'f11', category: 'sprache',
    text: 'Das "ñ" ist einzigartig für Spanisch. Es entstand im Mittelalter als Abkürzung für "nn". Das Wort "año" (Jahr) war früher "anno".',
    question: 'Woher kommt der Buchstabe ñ?',
    options: ['Aus dem Arabischen', 'Abkürzung für "nn"', 'Aus dem Griechischen', 'Eine Erfindung der Akademie'],
    correctIndex: 1,
    explanation: 'Die Tilde (~) über dem n war ein mittelalterliches Abkürzungszeichen.',
  },
  {
    id: 'f12', category: 'sprache',
    text: 'Im Spanischen gibt es zwei Verben für "sein": ser und estar. Ser ist für dauerhafte Eigenschaften (Soy alto - Ich bin groß), estar für Zustände (Estoy cansado - Ich bin müde).',
    question: 'Welches Verb benutzt man für "Ich bin müde"?',
    options: ['ser', 'estar', 'haber', 'tener'],
    correctIndex: 1,
    explanation: 'Müde sein ist ein temporärer Zustand, daher "estar". Merkhilfe: LoCo (Location, Condition) = estar.',
  },
  {
    id: 'f13', category: 'sprache',
    text: 'Viele spanische Wörter kommen aus dem Arabischen, weil die Mauren 800 Jahre in Spanien herrschten. "Almohada" (Kissen), "azúcar" (Zucker) und "alfombra" (Teppich) sind alle arabischen Ursprungs.',
    question: 'Woher stammen Wörter wie "almohada" und "azúcar"?',
    options: ['Latein', 'Griechisch', 'Arabisch', 'Keltisch'],
    correctIndex: 2,
    explanation: 'Ca. 4.000 spanische Wörter haben arabischen Ursprung. Wörter mit "al-" am Anfang sind oft arabisch.',
  },
  {
    id: 'f14', category: 'sprache',
    text: 'In Lateinamerika benutzt man "ustedes" statt "vosotros" für die 2. Person Plural. In Argentinien und Chile sagt man "vos" statt "tú".',
    question: 'Was benutzt man in Lateinamerika statt "vosotros"?',
    options: ['nosotros', 'ustedes', 'ellos', 'tú'],
    correctIndex: 1,
    explanation: 'Deshalb ist die Konjugation für "vosotros" in Lateinamerika praktisch unnötig.',
  },

  // ─── Lerntipps ───
  {
    id: 'f15', category: 'tipps',
    text: 'Die effektivste Methode zum Sprachenlernen ist "Spaced Repetition": Wörter die du vergisst kommen öfter, Wörter die du kannst seltener. Genau das macht Milhojas!',
    question: 'Was ist das Prinzip von Spaced Repetition?',
    options: ['Jeden Tag alle Wörter wiederholen', 'Schwierige Wörter öfter, leichte seltener', 'Nur neue Wörter lernen', 'Wörter alphabetisch lernen'],
    correctIndex: 1,
    explanation: 'Der FSRS-Algorithmus berechnet den optimalen Zeitpunkt für jede Wiederholung.',
  },
  {
    id: 'f16', category: 'tipps',
    text: 'Kognaten sind Wörter die in beiden Sprachen ähnlich klingen: "Hotel" = hotel, "Telefon" = teléfono, "Musik" = música, "Problem" = problema. Davon gibt es Tausende!',
    question: 'Was sind "Kognaten"?',
    options: ['Grammatikregeln', 'Ähnlich klingende Wörter in verschiedenen Sprachen', 'Spanische Dialekte', 'Unregelmäßige Verben'],
    correctIndex: 1,
    explanation: 'Schätzungen sagen, dass Deutsch und Spanisch über 1.000 Kognaten teilen.',
  },
  {
    id: 'f17', category: 'tipps',
    text: 'Spanische Substantive haben ein Geschlecht: "el" (männlich) und "la" (weiblich). Faustregel: Wörter auf -o sind meist männlich, auf -a meist weiblich. Ausnahmen: el problema, el día, la mano.',
    question: 'Welches Wort ist eine Ausnahme von der -a = weiblich Regel?',
    options: ['la casa', 'la mesa', 'el problema', 'la ventana'],
    correctIndex: 2,
    explanation: '"El problema" ist männlich trotz der Endung -a. Auch: el tema, el sistema, el programa.',
  },
  {
    id: 'f18', category: 'tipps',
    text: 'Spanische Aussprache ist sehr regelmäßig. Jeder Buchstabe wird fast immer gleich ausgesprochen. Kein Vergleich mit Englisch oder Französisch!',
    question: 'Was macht die spanische Aussprache besonders?',
    options: ['Sie ist sehr unregelmäßig', 'Jeder Buchstabe klingt immer gleich', 'Es gibt viele stumme Buchstaben', 'Die Betonung ist immer auf der letzten Silbe'],
    correctIndex: 1,
    explanation: 'Deshalb kann man Spanisch lesen, sobald man die Regeln kennt. "h" ist der einzige stumme Buchstabe.',
  },

  // ─── Kultur & Alltag ───
  {
    id: 'f19', category: 'kultur',
    text: 'In Spanien und Lateinamerika begrüßt man sich mit zwei Küsschen auf die Wangen (in Argentinien nur eines). Unter Männern gibt man sich die Hand oder umarmt sich.',
    question: 'Wie begrüßt man sich typischerweise in Spanien?',
    options: ['Verbeugung', 'Zwei Küsschen auf die Wangen', 'Nur Händeschütteln', 'Winken'],
    correctIndex: 1,
    explanation: 'In Chile begrüßt man sich mit einem Küsschen auf die rechte Wange.',
  },
  {
    id: 'f20', category: 'kultur',
    text: 'Tapas sind kleine Gerichte die man in Spanien teilt. Der Name kommt von "tapa" (Deckel) - früher legte man einen Brotdeckel auf das Glas um Fliegen fernzuhalten.',
    question: 'Woher kommt das Wort "Tapas"?',
    options: ['Von einem Koch namens Tapa', 'Von "tapa" (Deckel)', 'Von einer Stadt in Spanien', 'Vom arabischen Wort für Essen'],
    correctIndex: 1,
    explanation: 'In Granada und einigen anderen Städten bekommt man Tapas noch immer gratis zum Getränk.',
  },
  {
    id: 'f21', category: 'kultur',
    text: 'Fútbol (Fußball) ist die beliebteste Sportart in der spanischsprachigen Welt. Chile gewann 2015 und 2016 die Copa América.',
    question: 'Wann gewann Chile die Copa América?',
    options: ['2010 und 2011', '2013 und 2014', '2015 und 2016', '2018 und 2019'],
    correctIndex: 2,
    explanation: 'Alexis Sánchez und Arturo Vidal waren die Stars der "Generación Dorada" Chiles.',
  },
  {
    id: 'f22', category: 'kultur',
    text: 'Der "Día de los Muertos" (Tag der Toten) wird in Mexiko am 1./2. November gefeiert. Es ist kein trauriger Tag, sondern ein fröhliches Fest zu Ehren der Verstorbenen.',
    question: 'Was ist der Día de los Muertos?',
    options: ['Ein trauriger Trauertag', 'Ein fröhliches Fest zu Ehren der Toten', 'Ein religiöser Fastentag', 'Ein Nationalfeiertag in Spanien'],
    correctIndex: 1,
    explanation: 'Familien bauen bunte Altäre (ofrendas) und bringen Lieblingsessen der Verstorbenen.',
  },

  // ─── Weitere Chile ───
  {
    id: 'f23', category: 'chile',
    text: 'Die Osterinsel (Rapa Nui) gehört zu Chile, obwohl sie 3.700 km von der Küste entfernt im Pazifik liegt. Die berühmten Moai-Statuen wurden zwischen 1250 und 1500 von den Ureinwohnern geschaffen.',
    question: 'Wie weit ist die Osterinsel vom chilenischen Festland entfernt?',
    options: ['500 km', '1.200 km', '3.700 km', '7.000 km'],
    correctIndex: 2,
    explanation: 'Rapa Nui ist einer der abgelegensten bewohnten Orte der Welt.',
  },
  {
    id: 'f24', category: 'chile',
    text: 'Chile hat die längste Küste Südamerikas mit über 6.400 km. Trotzdem essen Chilenen pro Kopf weniger Fisch als der weltweite Durchschnitt.',
    question: 'Wie lang ist Chiles Küste?',
    options: ['2.100 km', '4.300 km', '6.400 km', '8.200 km'],
    correctIndex: 2,
    explanation: 'Chile exportiert viel Lachs und Meeresfrüchte, isst aber selbst überraschend wenig davon.',
  },

  // ─── Weitere Spanien ───
  {
    id: 'f25', category: 'spanien',
    text: 'Spanien hat vier offizielle Sprachen: Kastilisch (Spanisch), Katalanisch, Baskisch (Euskera) und Galicisch. Baskisch ist die einzige europäische Sprache, die mit keiner anderen verwandt ist.',
    question: 'Was ist besonders an der baskischen Sprache?',
    options: ['Sie ist die älteste Europas', 'Sie hat kein Alphabet', 'Sie ist mit keiner anderen verwandt', 'Sie wird nur noch von Alten gesprochen'],
    correctIndex: 2,
    explanation: 'Euskera ist ein Sprachrätsel - Linguisten wissen nicht, woher sie stammt.',
  },
  {
    id: 'f26', category: 'spanien',
    text: 'Der Jakobsweg (Camino de Santiago) ist ein über 1.000 Jahre alter Pilgerweg nach Santiago de Compostela. Jedes Jahr laufen über 300.000 Menschen den Weg, der traditionell von den Pyrenäen aus 800 km durch Nordspanien führt.',
    question: 'Wie lang ist der traditionelle Jakobsweg?',
    options: ['200 km', '500 km', '800 km', '1.200 km'],
    correctIndex: 2,
    explanation: 'Wer den Weg schafft, bekommt die "Compostela" - eine Urkunde auf Latein.',
  },

  // ─── Weitere Sprache ───
  {
    id: 'f27', category: 'sprache',
    text: 'Das längste Wort im Spanischen ist "electroencefalografista" (24 Buchstaben) - jemand der Gehirnströme misst. Im Alltag ist das längste häufig benutzte Wort "desafortunadamente" (leider) mit 20 Buchstaben.',
    question: 'Was bedeutet "desafortunadamente"?',
    options: ['Glücklicherweise', 'Leider', 'Unglaublich', 'Außergewöhnlich'],
    correctIndex: 1,
    explanation: 'Des-a-fortuna-da-mente: des (nicht) + afortuna (Glück) + mente (Adverb-Endung).',
  },
  {
    id: 'f28', category: 'sprache',
    text: 'Spanisch und Portugiesisch sind so ähnlich, dass sich Sprecher beider Sprachen zu etwa 90% verstehen können. Italienisch liegt bei etwa 80%. Französisch teilt zwar viel Vokabular, die Aussprache ist aber so unterschiedlich, dass das Verstehen schwieriger ist.',
    question: 'Wie gut verstehen sich Spanisch- und Portugiesisch-Sprecher?',
    options: ['Gar nicht', 'Zu etwa 50%', 'Zu etwa 70%', 'Zu etwa 90%'],
    correctIndex: 3,
    explanation: 'Diese gegenseitige Verständlichkeit heißt "intercomprehensión".',
  },
  {
    id: 'f29', category: 'sprache',
    text: 'In Argentinien benutzt man "vos" statt "tú" und sagt "¿Cómo estás vos?" Die Konjugation ist anders: "vos hablás" statt "tú hablas", "vos tenés" statt "tú tienes".',
    question: 'Wie sagt man "tú hablas" in Argentinien?',
    options: ['usted habla', 'vos hablás', 'tú hablás', 'vos hablas'],
    correctIndex: 1,
    explanation: 'Dieses "voseo" gibt es auch in Uruguay, Paraguay und Teilen Zentralamerikas.',
  },

  // ─── Weitere Tipps ───
  {
    id: 'f30', category: 'tipps',
    text: 'Falsche Freunde (falsos amigos) sind Wörter die in beiden Sprachen ähnlich klingen, aber verschiedene Bedeutungen haben. "Embarazada" heißt NICHT "peinlich" sondern "schwanger". "Constipado" heißt NICHT "verstopft" sondern "erkältet".',
    question: 'Was bedeutet "embarazada" auf Spanisch?',
    options: ['Peinlich berührt', 'Schwanger', 'Verärgert', 'Verlegen'],
    correctIndex: 1,
    explanation: 'Einer der berühmtesten falschen Freunde! "Avergonzado" heißt peinlich berührt.',
  },
  {
    id: 'f31', category: 'tipps',
    text: 'Um Spanisch schneller zu lernen, hilft es Musik auf Spanisch zu hören. Beliebte Künstler zum Lernen: Juanes (klare Aussprache), Shakira (langsame Balladen), Natalia Lafourcade (mexikanisches Spanisch), Mon Laferte (chilenisches Spanisch).',
    question: 'Warum eignet sich Musik gut zum Spanischlernen?',
    options: ['Weil die Texte kompliziert sind', 'Weil man Aussprache und Vokabeln natürlich aufnimmt', 'Weil man tanzen lernt', 'Weil es Pflicht im Unterricht ist'],
    correctIndex: 1,
    explanation: 'Tipp: Erst ohne Songtext hören, dann mit Lyrics auf Spanisch, dann übersetzen.',
  },
  {
    id: 'f32', category: 'tipps',
    text: 'Die 100 häufigsten Wörter im Spanischen machen etwa 50% aller gesprochenen Texte aus. Die 1.000 häufigsten Wörter decken sogar 85% ab. Das heißt: Mit relativ wenigen Wörtern versteht man schon sehr viel.',
    question: 'Wie viel Prozent decken die 1.000 häufigsten Wörter ab?',
    options: ['50%', '65%', '75%', '85%'],
    correctIndex: 3,
    explanation: 'Deshalb ist Vokabellernen am Anfang so effektiv.',
  },

  // ─── Weitere Kultur ───
  {
    id: 'f33', category: 'kultur',
    text: 'Flamenco kommt aus Andalusien im Süden Spaniens. Er vereint Tanz, Gesang und Gitarrenspiel. Ursprünglich war er die Musik der Gitanos (Roma) und hat Einflüsse aus der arabischen, jüdischen und andalusischen Kultur.',
    question: 'Aus welcher Region Spaniens kommt Flamenco?',
    options: ['Katalonien', 'Andalusien', 'Baskenland', 'Galicien'],
    correctIndex: 1,
    explanation: 'Flamenco ist seit 2010 UNESCO-Kulturerbe der Menschheit.',
  },
  {
    id: 'f34', category: 'kultur',
    text: 'In vielen lateinamerikanischen Ländern feiert man die "Quinceañera" - den 15. Geburtstag eines Mädchens. Es ist ein großes Fest, ähnlich wie eine Hochzeit, mit einem besonderen Kleid, Walzer und einer Feier für die ganze Familie.',
    question: 'Was feiert man bei einer Quinceañera?',
    options: ['Eine Hochzeit', 'Den 15. Geburtstag eines Mädchens', 'Den Schulabschluss', 'Die erste Kommunion'],
    correctIndex: 1,
    explanation: 'Die Quinceañera symbolisiert den Übergang vom Mädchen zur jungen Frau.',
  },
  {
    id: 'f35', category: 'kultur',
    text: 'Gabriel García Márquez aus Kolumbien schrieb "Cien años de soledad" (Hundert Jahre Einsamkeit), eines der wichtigsten Bücher der Weltliteratur. Er erhielt dafür den Nobelpreis für Literatur 1982.',
    question: 'Wofür erhielt García Márquez den Nobelpreis?',
    options: ['Für Frieden', 'Für Literatur', 'Für Physik', 'Für Medizin'],
    correctIndex: 1,
    explanation: 'García Márquez begründete den "Magischen Realismus" in der Literatur.',
  },
  {
    id: 'f36', category: 'kultur',
    text: 'Mate ist das Nationalgetränk Argentiniens, Uruguays und Paraguays. Es wird aus den Blättern des Mate-Strauchs zubereitet und aus einem speziellen Gefäß (calabaza) mit einem Metallstrohhalm (bombilla) getrunken. Mate teilen ist ein Zeichen der Freundschaft.',
    question: 'Wie trinkt man Mate?',
    options: ['Aus einer Tasse', 'Aus einer calabaza mit bombilla', 'Aus einem Glas', 'Aus einer Flasche'],
    correctIndex: 1,
    explanation: 'In Argentinien ist es üblich, den Mate im Kreis herumzugeben.',
  },
  {
    id: 'f37', category: 'chile',
    text: 'Pablo Neruda, einer der berühmtesten Dichter der Welt, kam aus Chile. Er erhielt 1971 den Nobelpreis für Literatur. Seine Häuser in Santiago (La Chascona), Valparaíso (La Sebastiana) und Isla Negra sind heute Museen.',
    question: 'Woher kam der Dichter Pablo Neruda?',
    options: ['Mexiko', 'Argentinien', 'Chile', 'Spanien'],
    correctIndex: 2,
    explanation: 'Neruda schrieb Liebesgedichte, politische Poesie und Oden an alltägliche Dinge.',
  },
  {
    id: 'f38', category: 'spanien',
    text: 'Las Fallas ist ein Fest in Valencia, bei dem riesige Figuren aus Pappmaché gebaut und am letzten Tag verbrannt werden. Das Fest findet jedes Jahr im März statt und wurde 2016 von der UNESCO als Kulturerbe anerkannt.',
    question: 'Was passiert bei Las Fallas mit den Figuren?',
    options: ['Sie werden ausgestellt', 'Sie werden verkauft', 'Sie werden verbrannt', 'Sie werden ins Meer geworfen'],
    correctIndex: 2,
    explanation: 'Die "cremà" (Verbrennung) findet in der Nacht vom 19. auf den 20. März statt.',
  },
];
