/**
 * Reading comprehension exercises
 * Spanish text + German question + 4 answer options
 */

export interface ReadingExercise {
  id: string;
  level: 'A1' | 'A2' | 'B1';
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

  // ─── A2 (mehr) ───
  {
    id: 'r13', level: 'A2', title: 'El mercado',
    text: 'Todos los sábados voy al mercado central con mi madre. Compramos frutas frescas, verduras y pescado. Mi madre siempre habla con los vendedores porque los conoce desde hace años. A veces tomamos un café en un pequeño bar al lado del mercado.',
    question: 'Wie oft gehen sie zum Markt?',
    options: ['Jeden Tag', 'Jeden Samstag', 'Jeden Sonntag', 'Einmal im Monat'],
    correctIndex: 1,
  },
  {
    id: 'r14', level: 'A2', title: 'Mi barrio',
    text: 'Vivo en un barrio tranquilo en las afueras de la ciudad. Hay un parque grande donde paseo con mi perro todas las tardes. Los vecinos son muy amables. La única desventaja es que el supermercado más cercano está a veinte minutos caminando.',
    question: 'Was ist der Nachteil des Viertels?',
    options: ['Es ist laut', 'Die Nachbarn sind unfreundlich', 'Der Supermarkt ist weit weg', 'Es gibt keinen Park'],
    correctIndex: 2,
  },
  {
    id: 'r15', level: 'A2', title: 'Las vacaciones',
    text: 'El año pasado fuimos de vacaciones a Barcelona. Visitamos la Sagrada Familia, el Parque Güell y la playa de la Barceloneta. Lo que más nos gustó fue pasear por Las Ramblas por la noche. La comida era deliciosa, especialmente las tapas y la paella.',
    question: 'Was hat ihnen am besten gefallen?',
    options: ['Die Sagrada Familia', 'Der Strand', 'Abends über Las Ramblas spazieren', 'Das Hotel'],
    correctIndex: 2,
  },
  {
    id: 'r16', level: 'A2', title: 'El teléfono nuevo',
    text: 'Ayer compré un teléfono nuevo porque el viejo ya no funcionaba bien. La pantalla estaba rota y la batería duraba solo dos horas. El nuevo es más rápido y tiene una cámara mejor. Pagué trescientos euros, que es bastante caro, pero estoy muy contento.',
    question: 'Warum hat die Person ein neues Handy gekauft?',
    options: ['Weil es ein Angebot gab', 'Weil das alte kaputt war', 'Weil ein Freund es empfohlen hat', 'Weil sie es geschenkt bekam'],
    correctIndex: 1,
  },

  // ─── B1 ───
  {
    id: 'r17', level: 'A2', title: 'La mudanza',
    text: 'El mes que viene me mudo a un piso nuevo. Es más grande que el actual y tiene un balcón con vistas a la montaña. El alquiler es un poco más caro, pero merece la pena porque está más cerca de mi trabajo. Ya he empezado a hacer cajas con mis cosas.',
    question: 'Warum lohnt sich die neue Wohnung trotz höherer Miete?',
    options: ['Sie hat einen Garten', 'Sie ist näher an der Arbeit', 'Sie ist billiger', 'Sie hat mehr Zimmer'],
    correctIndex: 1,
  },
  {
    id: 'r18', level: 'A2', title: 'La entrevista de trabajo',
    text: 'Esta mañana tuve una entrevista de trabajo en una empresa internacional. Me preguntaron sobre mi experiencia, mis idiomas y por qué quiero trabajar allí. Creo que fue bien porque el director sonrió mucho y dijo que me llamará la semana que viene.',
    question: 'Warum glaubt die Person, dass es gut lief?',
    options: ['Sie bekam sofort den Job', 'Der Chef hat viel gelächelt', 'Sie spricht viele Sprachen', 'Die Firma ist sehr groß'],
    correctIndex: 1,
  },
  {
    id: 'r19', level: 'A2', title: 'El concierto',
    text: 'Anoche fui a un concierto de música latina con mis amigos. El cantante era colombiano y cantó salsa, cumbia y reggaetón. El ambiente era increíble y bailamos durante tres horas seguidas. Al final estábamos cansados pero muy felices.',
    question: 'Wie fühlten sie sich am Ende des Konzerts?',
    options: ['Gelangweilt', 'Wütend', 'Müde aber glücklich', 'Enttäuscht'],
    correctIndex: 2,
  },
  {
    id: 'r20', level: 'A2', title: 'Cocinar para amigos',
    text: 'El viernes invité a cuatro amigos a cenar en mi casa. Preparé una paella de mariscos, que es mi especialidad. Tardé dos horas en cocinarla pero al final todos dijeron que estaba riquísima. Después de cenar jugamos a juegos de mesa hasta medianoche.',
    question: 'Was machten sie nach dem Essen?',
    options: ['Sie gingen ins Kino', 'Sie spielten Brettspiele', 'Sie gingen schlafen', 'Sie gingen spazieren'],
    correctIndex: 1,
  },
  {
    id: 'r21', level: 'A2', title: 'El gimnasio',
    text: 'Hace tres meses empecé a ir al gimnasio tres veces por semana. Al principio me costaba mucho y después de cada sesión me dolía todo el cuerpo. Ahora ya me he acostumbrado y me siento con más energía. Mi objetivo es correr una carrera de diez kilómetros este verano.',
    question: 'Was ist das Ziel der Person?',
    options: ['Abnehmen', 'Einen 10km-Lauf machen', 'Muskeln aufbauen', 'Jeden Tag trainieren'],
    correctIndex: 1,
  },
  {
    id: 'r22', level: 'A2', title: 'El perro perdido',
    text: 'Ayer encontré un perro pequeño en el parque. No tenía collar y parecía asustado. Lo llevé a mi casa, le di agua y comida. Puse un anuncio en las redes sociales y esta mañana vino una señora muy contenta a buscarlo. Se llamaba Luna y llevaba dos días perdida.',
    question: 'Wie fand die Besitzerin ihren Hund wieder?',
    options: ['Durch die Polizei', 'Durch eine Anzeige in den sozialen Medien', 'Sie sah ihn auf der Straße', 'Ein Nachbar brachte ihn'],
    correctIndex: 1,
  },
  {
    id: 'r23', level: 'A2', title: 'El clima en Chile',
    text: 'Chile tiene climas muy diferentes porque es un país muy largo. En el norte está el desierto de Atacama, uno de los lugares más secos del mundo. En el centro, donde está Santiago, el clima es mediterráneo con veranos calientes e inviernos suaves. En el sur llueve mucho y hace frío, y en la Patagonia hay glaciares enormes.',
    question: 'Wie ist das Klima in der Mitte Chiles?',
    options: ['Wüstenklima', 'Mediterranes Klima', 'Sehr kalt mit Gletschern', 'Tropisch und feucht'],
    correctIndex: 1,
  },
  {
    id: 'r24', level: 'A2', title: 'Aprender un idioma',
    text: 'Los expertos dicen que la mejor forma de aprender un idioma es usarlo todos los días. No hace falta vivir en el país, puedes escuchar podcasts, ver series con subtítulos, leer noticias o hablar con nativos por internet. Lo importante es la constancia: es mejor estudiar quince minutos cada día que tres horas una vez por semana.',
    question: 'Was ist laut Experten am wichtigsten?',
    options: ['Im Land leben', 'Teure Kurse besuchen', 'Regelmäßigkeit (jeden Tag ein bisschen)', 'Nur Grammatik lernen'],
    correctIndex: 2,
  },

  // ─── B1 Texte ───
  {
    id: 'r25', level: 'B1', title: 'El teletrabajo',
    text: 'Desde la pandemia, muchas empresas en España han adoptado el teletrabajo. Según un estudio reciente, el 40% de los empleados trabaja desde casa al menos dos días por semana. Los expertos señalan que el teletrabajo mejora la productividad pero puede aumentar la sensación de aislamiento. Las empresas más innovadoras ofrecen un modelo híbrido que combina trabajo presencial y remoto.',
    question: 'Was ist das Problem beim Homeoffice laut Experten?',
    options: ['Geringere Produktivität', 'Höhere Kosten', 'Gefühl der Isolation', 'Schlechtere Internetverbindung'],
    correctIndex: 2,
  },
  {
    id: 'r26', level: 'B1', title: 'La economía circular',
    text: 'La economía circular es un modelo que busca reducir los residuos y aprovechar los recursos al máximo. En lugar de fabricar, usar y tirar, se propone reutilizar, reparar y reciclar. Chile ha sido pionero en Latinoamérica con su ley de responsabilidad extendida del productor, que obliga a las empresas a hacerse cargo de sus envases después del uso.',
    question: 'Was bedeutet "Kreislaufwirtschaft" im Kern?',
    options: ['Mehr produzieren', 'Wiederverwenden statt wegwerfen', 'Nur lokal kaufen', 'Weniger arbeiten'],
    correctIndex: 1,
  },
  {
    id: 'r27', level: 'B1', title: 'La inmigración en Chile',
    text: 'En los últimos diez años, Chile ha recibido un número récord de inmigrantes, principalmente de Venezuela, Haití, Colombia y Perú. Muchos buscan mejores oportunidades laborales y una vida más segura. La integración cultural no siempre es fácil: las diferencias en el acento, las costumbres y la gastronomía pueden crear malentendidos. Sin embargo, la mayoría de los chilenos valora la diversidad cultural que los inmigrantes aportan.',
    question: 'Woher kommen die meisten Einwanderer in Chile?',
    options: ['Europa', 'Asien', 'Venezuela, Haiti, Kolumbien, Peru', 'Argentinien und Brasilien'],
    correctIndex: 2,
  },
  {
    id: 'r28', level: 'B1', title: 'Las redes sociales',
    text: 'Un estudio de la Universidad de Salamanca reveló que los jóvenes españoles pasan una media de tres horas diarias en las redes sociales. Los investigadores advierten que el uso excesivo puede provocar ansiedad, problemas de autoestima y dificultades para concentrarse. No obstante, las redes también tienen aspectos positivos: facilitan la comunicación, permiten acceder a información y pueden ser una herramienta para el activismo social.',
    question: 'Wie viel Zeit verbringen junge Spanier täglich in sozialen Medien?',
    options: ['Eine Stunde', 'Zwei Stunden', 'Drei Stunden', 'Fünf Stunden'],
    correctIndex: 2,
  },
  {
    id: 'r29', level: 'B1', title: 'El vino chileno',
    text: 'Chile es uno de los mayores productores de vino del mundo. Los valles centrales, como el Valle de Colchagua y el Valle del Maipo, son famosos por sus vinos tintos, especialmente el Carménère, una uva que casi desapareció de Francia pero encontró condiciones ideales en Chile. El clima seco y las noches frescas crean un ambiente perfecto para la viticultura. Cada año, miles de turistas visitan las viñas chilenas para hacer degustaciones.',
    question: 'Welche Rebsorte ist typisch für Chile?',
    options: ['Merlot', 'Carménère', 'Tempranillo', 'Riesling'],
    correctIndex: 1,
  },
  {
    id: 'r30', level: 'B1', title: 'La educación bilingüe',
    text: 'En muchos colegios de España se imparten algunas asignaturas en inglés, como ciencias naturales o historia. Este modelo de educación bilingüe tiene defensores y críticos. Los defensores argumentan que mejora el nivel de inglés de los alumnos. Los críticos señalan que algunos estudiantes no comprenden bien los contenidos porque su nivel de inglés no es suficiente. El debate continúa, pero cada vez más familias eligen colegios bilingües para sus hijos.',
    question: 'Was kritisieren die Gegner des bilingualen Unterrichts?',
    options: ['Zu teuer', 'Schüler verstehen den Stoff nicht gut genug', 'Zu wenig Englisch', 'Die Lehrer sind nicht qualifiziert'],
    correctIndex: 1,
  },
  {
    id: 'r31', level: 'B1', title: 'Mallorca más allá del turismo',
    text: 'Mallorca es mucho más que sol y playa. El interior de la isla ofrece pueblos con encanto como Valldemossa y Deià, donde el compositor Chopin pasó un invierno. La Serra de Tramuntana, declarada Patrimonio de la Humanidad por la UNESCO, tiene rutas de senderismo espectaculares. La gastronomía local incluye la ensaimada, la sobrasada y el tumbet. Cada vez más visitantes descubren que la verdadera Mallorca está lejos de las zonas turísticas masificadas.',
    question: 'Was ist die Serra de Tramuntana?',
    options: ['Ein Strand', 'Ein UNESCO-Welterbe Gebirge', 'Eine Stadt', 'Ein Restaurant'],
    correctIndex: 1,
  },
  {
    id: 'r32', level: 'A1', title: 'En la cafetería',
    text: 'Entro en una cafetería y me siento cerca de la ventana. El camarero viene y me pregunta: "¿Qué desea?" Yo pido un café con leche y un croissant. El café está muy caliente y el croissant está delicioso. Pago tres euros con cincuenta.',
    question: 'Wie viel bezahlt die Person?',
    options: ['Zwei Euro', 'Drei Euro', 'Drei Euro fünfzig', 'Vier Euro'],
    correctIndex: 2,
  },
  {
    id: 'r33', level: 'A1', title: 'Mi mascota',
    text: 'Tengo un gato que se llama Michi. Es negro con ojos verdes. Le gusta dormir en el sofá todo el día. Por la noche se vuelve muy activo y juega con una pelota pequeña. Come tres veces al día y bebe mucha agua.',
    question: 'Wann ist die Katze aktiv?',
    options: ['Am Morgen', 'Am Mittag', 'In der Nacht', 'Den ganzen Tag'],
    correctIndex: 2,
  },
  {
    id: 'r34', level: 'A1', title: 'Los colores',
    text: 'Mi color favorito es el azul, como el mar. A mi hermana le gusta el rojo y siempre lleva una bufanda roja. Mi padre prefiere el verde porque le recuerda a la naturaleza. Mi madre dice que todos los colores son bonitos.',
    question: 'Warum mag der Vater Grün?',
    options: ['Weil es seine Lieblingsfarbe ist', 'Weil es ihn an die Natur erinnert', 'Weil seine Frau es mag', 'Weil sein Auto grün ist'],
    correctIndex: 1,
  },
  {
    id: 'r35', level: 'A2', title: 'El cumpleaños sorpresa',
    text: 'La semana pasada organizamos una fiesta sorpresa para mi mejor amiga. Invitamos a veinte personas y decoramos su apartamento mientras ella estaba en el trabajo. Cuando abrió la puerta y nos vio a todos, empezó a llorar de alegría. Bailamos, comimos torta y cantamos karaoke hasta las tres de la mañana.',
    question: 'Wie reagierte die Freundin?',
    options: ['Sie war wütend', 'Sie weinte vor Freude', 'Sie war nicht überrascht', 'Sie ging sofort schlafen'],
    correctIndex: 1,
  },

  // ─── B1 Nachrichten-Style ───
  {
    id: 'r36', level: 'B1', title: 'Terremoto en Chile',
    text: 'Chile es uno de los países con mayor actividad sísmica del mundo. En 2010, un terremoto de magnitud 8,8 sacudió la zona central del país, causando graves daños y un tsunami que afectó a varias ciudades costeras. Desde entonces, el gobierno ha invertido millones en sistemas de alerta temprana y construcciones antisísmicas. Los expertos aseguran que Chile es hoy el país mejor preparado de Latinoamérica para enfrentar desastres naturales, aunque el riesgo sigue siendo alto.',
    question: 'Was hat Chile seit 2010 verbessert?',
    options: ['Die Wirtschaft', 'Frühwarnsysteme und erdbebensichere Gebäude', 'Das Bildungssystem', 'Die Tourismusbranche'],
    correctIndex: 1,
  },
  {
    id: 'r37', level: 'B1', title: 'La gentrificación en Barcelona',
    text: 'Barcelona enfrenta un serio problema de gentrificación. El turismo masivo y las plataformas de alquiler vacacional han provocado que los precios de la vivienda se disparen, expulsando a los residentes locales de barrios tradicionales como el Gótico y la Barceloneta. El ayuntamiento ha tomado medidas como limitar las licencias turísticas y crear más vivienda social, pero muchos vecinos consideran que estas acciones llegan demasiado tarde. El debate entre el beneficio económico del turismo y el derecho a una vivienda asequible continúa.',
    question: 'Was ist die Hauptursache der Gentrifizierung in Barcelona?',
    options: ['Neue Fabriken', 'Massentourismus und Ferienwohnungen', 'Immigration', 'Universitäten'],
    correctIndex: 1,
  },
  {
    id: 'r38', level: 'B1', title: 'El boom del litio en Sudamérica',
    text: 'Argentina, Bolivia y Chile forman el llamado "triángulo del litio", que concentra más del 50% de las reservas mundiales de este mineral. El litio es esencial para fabricar baterías de coches eléctricos y dispositivos electrónicos. Mientras que la demanda global crece exponencialmente, las comunidades indígenas de la zona denuncian que la extracción consume enormes cantidades de agua en regiones ya desérticas. Los gobiernos buscan un equilibrio entre el desarrollo económico y la protección del medio ambiente.',
    question: 'Warum protestieren indigene Gemeinschaften?',
    options: ['Wegen niedrigen Löhnen', 'Wegen des enormen Wasserverbrauchs', 'Wegen Lärm', 'Wegen der Tourismusbeschränkungen'],
    correctIndex: 1,
  },
  {
    id: 'r39', level: 'B1', title: 'Salud mental en jóvenes',
    text: 'Según la Organización Mundial de la Salud, los problemas de salud mental entre los jóvenes han aumentado un 25% desde la pandemia. En España, la ansiedad y la depresión son los diagnósticos más frecuentes entre personas de 18 a 30 años. Los psicólogos señalan el uso excesivo de redes sociales, la precariedad laboral y la incertidumbre sobre el futuro como factores principales. El gobierno español ha ampliado los servicios de atención psicológica gratuita, pero las listas de espera siguen siendo de varios meses.',
    question: 'Um wie viel Prozent sind psychische Probleme bei Jungen gestiegen?',
    options: ['10%', '15%', '25%', '40%'],
    correctIndex: 2,
  },
  {
    id: 'r40', level: 'B1', title: 'El español en Estados Unidos',
    text: 'Con más de 41 millones de hispanohablantes nativos, Estados Unidos es el segundo país con más hablantes de español del mundo, solo detrás de México. En estados como California, Texas y Florida, el español es prácticamente una segunda lengua oficial. Las empresas buscan cada vez más empleados bilingües y los colegios ofrecen programas de inmersión en español. Algunos lingüistas predicen que para 2050, Estados Unidos podría convertirse en el país con mayor número de hispanohablantes del planeta.',
    question: 'Welches Land hat die meisten Spanischsprecher?',
    options: ['USA', 'Spanien', 'Mexiko', 'Kolumbien'],
    correctIndex: 2,
  },
  {
    id: 'r41', level: 'B1', title: 'La gastronomía peruana',
    text: 'Perú se ha convertido en uno de los destinos gastronómicos más importantes del mundo. Lima tiene tres restaurantes entre los 50 mejores del mundo. La cocina peruana fusiona tradiciones indígenas, españolas, africanas, chinas y japonesas. Platos como el ceviche, el lomo saltado y la causa limeña son conocidos internacionalmente. El éxito gastronómico ha impulsado el turismo y ha creado miles de empleos en el sector de la hostelería.',
    question: 'Welche Kulturen beeinflussten die peruanische Küche?',
    options: ['Nur spanische', 'Indigene, spanische, afrikanische, chinesische und japanische', 'Nur indigene und spanische', 'Französische und italienische'],
    correctIndex: 1,
  },
  {
    id: 'r42', level: 'B1', title: 'Inteligencia artificial y empleo',
    text: 'Un informe de la consultora McKinsey estima que la inteligencia artificial podría automatizar el 30% de las tareas laborales actuales en España para 2030. Los sectores más afectados serían la banca, la administración y el comercio. Sin embargo, los expertos también destacan que la IA creará nuevos puestos de trabajo en áreas como la programación, el análisis de datos y la ciberseguridad. La clave, según los analistas, será la formación continua y la capacidad de adaptarse a los cambios tecnológicos.',
    question: 'Wie viel Prozent der Arbeit könnte bis 2030 automatisiert werden?',
    options: ['10%', '20%', '30%', '50%'],
    correctIndex: 2,
  },
  {
    id: 'r43', level: 'B1', title: 'El feminismo en Latinoamérica',
    text: 'En los últimos años, los movimientos feministas han cobrado una fuerza sin precedentes en Latinoamérica. El movimiento "Ni Una Menos", que nació en Argentina en 2015 contra la violencia de género, se extendió rápidamente por todo el continente. En Chile, las protestas feministas de 2018 en las universidades marcaron un antes y un después. Hoy, varios países de la región han aprobado leyes más estrictas contra el acoso y la violencia machista, aunque los activistas insisten en que queda mucho por hacer.',
    question: 'Wo entstand die Bewegung "Ni Una Menos"?',
    options: ['Chile', 'Mexiko', 'Argentinien', 'Kolumbien'],
    correctIndex: 2,
  },
];
