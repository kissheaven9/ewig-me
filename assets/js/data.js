/* ==========================================================================
   ewig.me — данные (моки). Двуязычные строки { de, ru }.
   Примеры — реальные усопшие знаменитости, фото/факты из открытых источников
   (Wikimedia Commons, public domain: Beethoven 1820, Goethe 1828, Einstein 1921).
   ========================================================================== */
window.DATA = {

  examples: [
    {
      id: "beethoven",
      photo: "assets/img/person-beethoven.jpg",
      cat: { de: "Berühmte Personen", ru: "Знаменитые люди" },
      name: { de: "Ludwig van Beethoven", ru: "Людвиг ван Бетховен" },
      dates: "1770–1827",
      born: { de: "17. Dezember 1770", ru: "17 декабря 1770" },
      died: { de: "26. März 1827", ru: "26 марта 1827" },
      years: 56,
      quote: { de: "Musik ist höhere Offenbarung als alle Weisheit und Philosophie.",
               ru: "Музыка — откровение более высокое, чем вся мудрость и философия." },
      bio: { de: "Komponist aus Bonn – einer der einflussreichsten Musiker der Geschichte.",
             ru: "Композитор из Бонна — один из самых влиятельных музыкантов в истории." }
    },
    {
      id: "goethe",
      photo: "assets/img/person-goethe.jpg",
      cat: { de: "Berühmte Personen", ru: "Знаменитые люди" },
      name: { de: "Johann Wolfgang von Goethe", ru: "Иоганн Вольфганг фон Гёте" },
      dates: "1749–1832",
      born: { de: "28. August 1749", ru: "28 августа 1749" },
      died: { de: "22. März 1832", ru: "22 марта 1832" },
      years: 82,
      quote: { de: "Man sieht nur das, was man weiß.",
               ru: "Мы видим лишь то, что знаем." },
      bio: { de: "Dichter und Universalgelehrter – Symbol der deutschen Klassik.",
             ru: "Поэт и мыслитель — символ немецкой классики." }
    },
    {
      id: "einstein",
      photo: "assets/img/person-einstein.jpg",
      cat: { de: "Interessante Geschichten", ru: "Интересные истории" },
      name: { de: "Albert Einstein", ru: "Альберт Эйнштейн" },
      dates: "1879–1955",
      born: { de: "14. März 1879", ru: "14 марта 1879" },
      died: { de: "18. April 1955", ru: "18 апреля 1955" },
      years: 76,
      quote: { de: "Die Fantasie ist wichtiger als das Wissen.",
               ru: "Воображение важнее знания." },
      bio: { de: "Physiker aus Ulm – veränderte unser Verständnis von Raum und Zeit.",
             ru: "Физик из Ульма — изменил наше понимание пространства и времени." }
    }
  ],

  features: [
    { icon: "play",  title: { de: "Videos", ru: "Видео" },
      text: { de: "Füge eigene oder YouTube-Videos hinzu, die Erinnerungen lebendig machen.",
              ru: "Добавляйте свои или YouTube-видео, которые оживляют воспоминания." } },
    { icon: "photo", title: { de: "Foto", ru: "Фото" },
      text: { de: "Lade bis zu 100 kostbare Bilder hoch, die dir am Herzen liegen.",
              ru: "Загрузите до 100 дорогих сердцу фотографий." } },
    { icon: "t",     title: { de: "Text", ru: "Текст" },
      text: { de: "Ob Epitaph, Lebensgeschichte oder persönliche Erinnerungen – schreibe, was bleibt.",
              ru: "Эпитафия, история жизни или личные воспоминания — напишите то, что останется." } },
    { icon: "pin",   title: { de: "Standort", ru: "Место" },
      text: { de: "Finde die Geburts- und Ruhestätte leicht über den eingetragenen Ort auf der Karte.",
              ru: "Легко найдите место рождения и захоронения по отметке на карте." } }
  ],

  steps: [
    { img: "assets/img/step-1.png", text: { de: "Registrieren Sie sich im Dienst", ru: "Зарегистрируйтесь в сервисе" } },
    { img: "assets/img/step-2.png", text: { de: "Füllen Sie die Seite in wenigen Minuten mit Inhalten", ru: "Наполните страницу данными за несколько минут" } },
    { img: "assets/img/step-3.png", text: { de: "Teilen Sie die Informationen mit Angehörigen", ru: "Поделитесь информацией с родными" } },
    { img: "assets/img/step-4.png", text: { de: "Ergänzen und erweitern Sie das Profil", ru: "Добавляйте и расширяйте профиль" } }
  ],

  share: [
    { img: "assets/img/share-qr.png",
      text: { de: "Bringe ein Schild mit dem Link zur Erinnerungsseite an.",
              ru: "Разместите табличку со ссылкой на страницу памяти." } },
    { img: "assets/img/article-photo.png",
      text: { de: "Bewahre die Verbindung zwischen den Generationen.",
              ru: "Сохраните связь между поколениями." } },
    { img: null,
      text: { de: "Erinnere dich an gemeinsame Familienmomente.",
              ru: "Вспомните семейные моменты." } },
    { img: null,
      text: { de: "Bring deinem Kind bei, das Andenken der Vorfahren zu bewahren.",
              ru: "Научите ребёнка хранить память предков и смотреть страницу." } }
  ],

  plans: {
    short: {
      price: { de: "0 Euro", ru: "0 евро" },
      opts: [
        { icon: "bubble", t: { de: "Grabinschrift", ru: "Эпитафия" } },
        { icon: "pin",    t: { de: "Markierung auf der Karte", ru: "Отметка на карте" } },
        { icon: "qr",     t: { de: "QR-Code zum Ausdrucken", ru: "QR-код для печати" } }
      ]
    },
    extended: {
      price: { de: "69 Euro", ru: "69 евро" },
      opts: [
        { icon: "user",  t: { de: "Biografie mit Foto", ru: "Биография с фото" } },
        { icon: "photo", t: { de: "Fotogalerie", ru: "Фотогалерея" } },
        { icon: "play",  t: { de: "Video", ru: "Видео" } }
      ]
    }
  },

  articles: [
    { title: { de: "Das Schweigen der Vorfahren: warum wir Familiengeschichten verlieren – und wie wir es aufhalten",
               ru: "Молчание предков: почему мы теряем семейные истории и как это остановить" } },
    { title: { de: "Wie ich ein digitales Porträt meines Großvaters erschuf: von der Fotokiste zur interaktiven Biografie",
               ru: "Как я создал цифровой портрет своего деда: от коробки с фото до интерактивной биографии" } },
    { title: { de: "Papieralbum vs. digitales Profil auf ewig.me",
               ru: "Бумажный альбом vs. цифровой профиль ewig.me" } },
    { title: { de: "5 Wege, die Geschichte Ihrer Familie zu bewahren",
               ru: "5 способов сохранить историю вашей семьи" } }
  ],

  faq: [
    { q: { de: "Was passiert in 50 Jahren? Schließen Sie – und alles ist weg?",
           ru: "А что будет через 50 лет? Вы закроетесь, и всё пропадёт?" },
      a: { de: "Wir nutzen verteilte und mehrfach gespiegelte Speichertechnologien – ähnlich denen von Nationalbibliotheken und Archiven.",
           ru: "Мы используем распределённые и многократно дублируемые технологии хранения — аналогичные тем, что применяют национальные библиотеки и архивы." } },
    { q: { de: "Ist das sicher? Werden unsere Informationen öffentlich?",
           ru: "А безопасно ли это? Не станет ли наша информация достоянием общественности?" },
      a: { de: "Sie entscheiden selbst, wer die Seite sehen darf: öffentlich, per Link oder privat. Ohne Ihre Zustimmung wird nichts indexiert.",
           ru: "Вы сами решаете, кто может видеть страницу: публично, по ссылке или приватно. Без вашего согласия ничего не индексируется." } },
    { q: { de: "Ist das nicht pietätlos?",
           ru: "Не кощунственно ли это?" },
      a: { de: "Im Gegenteil: Eine Erinnerungsseite ist ein Zeichen des Respekts – ein würdiger Ort, an dem die Geschichte eines Menschen weiterlebt.",
           ru: "Напротив: страница памяти — это знак уважения, достойное место, где история человека продолжает жить." } },
    { q: { de: "Wie verwende ich den QR-Code?",
           ru: "Как использовать QR-код?" },
      a: { de: "Den QR-Code können Sie ausdrucken und auf einem Schild oder Grabstein anbringen. Wer ihn scannt, gelangt direkt zur Erinnerungsseite.",
           ru: "QR-код можно распечатать и разместить на табличке или надгробии. Отсканировав его, человек попадёт прямо на страницу памяти." } }
  ],

  press: [
    { label: { de: "Interview", ru: "Интервью" },
      title: { de: "Der Bürgermeister von Augsburg unterstützt die Initiative des Unternehmens",
               ru: "Мэр города Аугсбург поддержал инициативу немецкого предпринимателя" } },
    { label: { de: "Interview", ru: "Интервью" },
      title: { de: "Der Vorsitzende der jüdischen Gemeinde äußert sich zu ewig.me",
               ru: "Глава еврейской общины высказал своё мнение об ewig.me" } },
    { label: { de: "Reportage", ru: "Репортаж" },
      title: { de: "Das Rote Kreuz über ewig.me",
               ru: "Красный Крест об ewig.me" } },
    { label: { de: "Reportage", ru: "Репортаж" },
      title: { de: "Der Ausschuss für Familie und Demografie formulierte die Vorteile digitaler Erinnerung",
               ru: "Глава комитета по вопросам «Семьи и демографии» сформулировала преимущества цифрового хранения памяти" } }
  ],

  /* Полные мемориалы для публичной страницы (факты из открытых источников) */
  memorials: {
    beethoven: {
      wiki: "https://de.wikipedia.org/wiki/Ludwig_van_Beethoven",
      info: [
        { k: { de: "Geburtsort", ru: "Место рождения" }, v: { de: "Bonn, Deutschland", ru: "Бонн, Германия" } },
        { k: { de: "Sterbeort", ru: "Место смерти" }, v: { de: "Wien, Österreich", ru: "Вена, Австрия" } },
        { k: { de: "Beruf", ru: "Род деятельности" }, v: { de: "Komponist, Pianist", ru: "Композитор, пианист" } },
        { k: { de: "Ausbildung", ru: "Образование" }, v: { de: "Schüler von Joseph Haydn", ru: "Ученик Йозефа Гайдна" } },
        { k: { de: "Staatsangehörigkeit", ru: "Гражданство" }, v: { de: "Deutschland", ru: "Германия" } },
        { k: { de: "Auszeichnungen", ru: "Награды" }, v: { de: "Ehrenbürger der Stadt Wien", ru: "Почётный гражданин Вены" } }
      ],
      bio: {
        de: [
          "Ludwig van Beethoven wurde im Dezember 1770 in Bonn geboren und in der dortigen Remigiuskirche getauft. Er stammte aus einer Musikerfamilie: Sein Vater, Sänger an der kurfürstlichen Hofkapelle, erkannte früh das Talent des Jungen und unterrichtete ihn – oft mit großer Strenge – am Klavier und auf der Violine. Bereits mit sieben Jahren trat Beethoven öffentlich auf, mit elf wurde er Organist am Bonner Hof.",
          "1792 ging Beethoven nach Wien, dem musikalischen Zentrum Europas, um bei Joseph Haydn zu studieren. Rasch machte er sich als brillanter Klaviervirtuose und kühner Improvisator einen Namen. In den folgenden Jahren entstanden Werke, die seinen Ruhm begründeten – Klaviersonaten wie die „Pathétique“ und die „Mondscheinsonate“ sowie seine ersten Sinfonien.",
          "Um 1798 bemerkte Beethoven die ersten Anzeichen seiner Ertaubung – für einen Musiker ein vernichtender Schlag. Im „Heiligenstädter Testament“ von 1802 rang er mit Verzweiflung, fand aber die Kraft weiterzuleben: „Es schien mir unmöglich, die Welt eher zu verlassen, bis ich alles das hervorgebracht, wozu ich mich aufgelegt fühlte.“",
          "Trotz des zunehmenden Gehörverlusts folgte seine schöpferisch reichste Zeit. Es entstanden die „Eroica“, die 5. und 6. Sinfonie, das Violinkonzert, die Oper „Fidelio“ und zahlreiche Kammermusikwerke. Beethoven sprengte die Formen der Klassik und ebnete den Weg in die Romantik – Musik wurde bei ihm zum Ausdruck von Freiheit und Menschlichkeit.",
          "Als völlig tauber Komponist schuf er sein visionärstes Werk: die 9. Sinfonie mit dem Chorfinale über Schillers „Ode an die Freude“, heute die Europahymne. Beethoven starb am 26. März 1827 in Wien; zu seinem Begräbnis kamen Zehntausende. Er ruht auf dem Wiener Zentralfriedhof, unweit von Franz Schubert."
        ],
        ru: [
          "Людвиг ван Бетховен родился в декабре 1770 года в Бонне и был крещён в церкви Святого Ремигия. Он происходил из семьи музыкантов: его отец, певец придворной капеллы курфюрста, рано разглядел талант мальчика и — нередко с большой строгостью — обучал его игре на фортепиано и скрипке. Уже в семь лет Бетховен выступал публично, а в одиннадцать стал органистом боннского двора.",
          "В 1792 году Бетховен переехал в Вену — музыкальный центр Европы, — чтобы учиться у Йозефа Гайдна. Он быстро прославился как блестящий пианист-виртуоз и смелый импровизатор. В последующие годы появились произведения, принёсшие ему славу, — фортепианные сонаты «Патетическая» и «Лунная», а также первые симфонии.",
          "Около 1798 года Бетховен заметил первые признаки глухоты — для музыканта это был сокрушительный удар. В «Хайлигенштадтском завещании» 1802 года он боролся с отчаянием, но нашёл силы жить дальше: «Мне казалось немыслимым покинуть мир прежде, чем я создам всё, к чему чувствовал себя призванным».",
          "Несмотря на усиливавшуюся глухоту, наступил самый плодотворный период его творчества. Появились «Героическая», Пятая и Шестая симфонии, скрипичный концерт, опера «Фиделио» и множество камерных сочинений. Бетховен раздвинул рамки классицизма и проложил путь к романтизму — музыка стала у него выражением свободы и человечности.",
          "Уже совершенно глухим он создал самое визионерское своё произведение — Девятую симфонию с хоровым финалом на слова «Оды к радости» Шиллера, ныне гимн Европы. Бетховен умер 26 марта 1827 года в Вене; на его похороны пришли десятки тысяч людей. Он покоится на Центральном кладбище Вены, недалеко от Франца Шуберта."
        ]
      },
      grave: { de: "Zentralfriedhof, Wien (Ehrengrab)", ru: "Центральное кладбище, Вена (почётная могила)" }, coords: "48.1516, 16.4415",
      video: "7KKs8_znA2Y",
      gallery: ["assets/img/person-beethoven.jpg", "assets/img/beethoven-g1.jpg", "assets/img/beethoven-g3.jpg", "assets/img/beethoven-g4.jpg"]
    },
    goethe: {
      wiki: "https://de.wikipedia.org/wiki/Johann_Wolfgang_von_Goethe",
      info: [
        { k: { de: "Geburtsort", ru: "Место рождения" }, v: { de: "Frankfurt am Main", ru: "Франкфурт-на-Майне" } },
        { k: { de: "Sterbeort", ru: "Место смерти" }, v: { de: "Weimar, Deutschland", ru: "Веймар, Германия" } },
        { k: { de: "Beruf", ru: "Род деятельности" }, v: { de: "Dichter, Naturforscher, Staatsmann", ru: "Поэт, натуралист, государственный деятель" } },
        { k: { de: "Ausbildung", ru: "Образование" }, v: { de: "Rechtswissenschaften, Leipzig & Straßburg", ru: "Право, Лейпциг и Страсбург" } },
        { k: { de: "Staatsangehörigkeit", ru: "Гражданство" }, v: { de: "Deutschland", ru: "Германия" } },
        { k: { de: "Auszeichnungen", ru: "Награды" }, v: { de: "Geheimrat des Herzogtums Weimar", ru: "Тайный советник герцогства Веймар" } }
      ],
      bio: {
        de: [
          "Johann Wolfgang von Goethe wurde am 28. August 1749 in Frankfurt am Main in eine wohlhabende Bürgerfamilie geboren. Er erhielt eine umfassende Ausbildung in Sprachen, Naturwissenschaften und Kunst. Auf Wunsch des Vaters studierte er Rechtswissenschaften in Leipzig und Straßburg, doch seine wahre Leidenschaft galt von Anfang an der Dichtung.",
          "Mit dem Briefroman „Die Leiden des jungen Werthers“ (1774) wurde Goethe über Nacht in ganz Europa berühmt. Das Buch löste ein regelrechtes „Werther-Fieber“ aus und machte ihn zum Wortführer des Sturm und Drang – einer Bewegung, die Gefühl, Natur und Individualität über die Regeln der Vernunft stellte.",
          "1775 folgte Goethe einer Einladung des jungen Herzogs Carl August nach Weimar, das für den Rest seines Lebens sein Mittelpunkt blieb. Er wurde Minister, leitete Bergbau, Finanzen und das Hoftheater und wurde geadelt. Eine prägende Reise nach Italien (1786–1788) vertiefte seine Hinwendung zur klassischen Antike.",
          "Gemeinsam mit Friedrich Schiller begründete Goethe die „Weimarer Klassik“, eine Blütezeit der deutschen Literatur. Er schrieb Dramen, Romane und Gedichte von zeitloser Kraft und forschte zugleich als Naturwissenschaftler – über Pflanzen, Farben und Anatomie.",
          "Sein Lebenswerk aber ist der „Faust“, an dem er über sechzig Jahre arbeitete und den er erst kurz vor seinem Tod vollendete. Goethe starb am 22. März 1832 in Weimar. Er ruht in der Fürstengruft neben Schiller. Bis heute gilt er als der bedeutendste Dichter deutscher Sprache."
        ],
        ru: [
          "Иоганн Вольфганг фон Гёте родился 28 августа 1749 года во Франкфурте-на-Майне в состоятельной бюргерской семье. Он получил разностороннее образование — языки, естественные науки, искусство. По желанию отца изучал право в Лейпциге и Страсбурге, но истинной его страстью с самого начала была поэзия.",
          "Роман в письмах «Страдания юного Вертера» (1774) в одночасье прославил Гёте на всю Европу. Книга вызвала настоящую «вертеровскую лихорадку» и сделала его знаменем движения «Буря и натиск», ставившего чувство, природу и личность выше правил рассудка.",
          "В 1775 году Гёте принял приглашение молодого герцога Карла Августа в Веймар, который до конца жизни оставался его центром. Он стал министром, ведал горным делом, финансами и придворным театром, был возведён в дворянство. Определяющее путешествие в Италию (1786–1788) углубило его увлечение классической античностью.",
          "Вместе с Фридрихом Шиллером Гёте основал «веймарскую классику» — период расцвета немецкой литературы. Он писал драмы, романы и стихи вневременной силы и одновременно занимался естественными науками — растениями, теорией цвета, анатомией.",
          "Но делом всей его жизни стал «Фауст», над которым он работал более шестидесяти лет и завершил незадолго до смерти. Гёте умер 22 марта 1832 года в Веймаре. Он покоится в Княжеской усыпальнице рядом с Шиллером. По сей день он считается величайшим поэтом на немецком языке."
        ]
      },
      grave: { de: "Fürstengruft, Weimar", ru: "Княжеская усыпальница, Веймар" }, coords: "50.9757, 11.3255",
      video: "skJHH2zmdOs",
      gallery: ["assets/img/person-goethe.jpg", "assets/img/goethe-g3.jpg", "assets/img/goethe-g2.jpg", "assets/img/goethe-g4.jpg"]
    },
    einstein: {
      wiki: "https://de.wikipedia.org/wiki/Albert_Einstein",
      info: [
        { k: { de: "Geburtsort", ru: "Место рождения" }, v: { de: "Ulm, Deutschland", ru: "Ульм, Германия" } },
        { k: { de: "Sterbeort", ru: "Место смерти" }, v: { de: "Princeton, USA", ru: "Принстон, США" } },
        { k: { de: "Beruf", ru: "Род деятельности" }, v: { de: "Physiker", ru: "Физик" } },
        { k: { de: "Ausbildung", ru: "Образование" }, v: { de: "ETH Zürich", ru: "Политехникум, Цюрих" } },
        { k: { de: "Staatsangehörigkeit", ru: "Гражданство" }, v: { de: "Deutschland, Schweiz, USA", ru: "Германия, Швейцария, США" } },
        { k: { de: "Auszeichnungen", ru: "Награды" }, v: { de: "Nobelpreis für Physik (1921)", ru: "Нобелевская премия по физике (1921)" } }
      ],
      bio: {
        de: [
          "Albert Einstein wurde am 14. März 1879 in Ulm geboren und wuchs in München auf. Als Kind galt er keineswegs als Wunderkind, entwickelte aber früh eine tiefe Neugier für Mathematik und Physik. Er studierte am Polytechnikum in Zürich und nahm die Schweizer Staatsbürgerschaft an.",
          "Da er zunächst keine Anstellung als Wissenschaftler fand, arbeitete Einstein am Patentamt in Bern. In seiner Freizeit entwickelte er dort seine revolutionären Ideen. 1905, in seinem „Wunderjahr“, veröffentlichte er vier Aufsätze, die die Physik für immer veränderten – darunter die spezielle Relativitätstheorie und die berühmte Formel E = mc².",
          "1915 vollendete Einstein die allgemeine Relativitätstheorie, die Gravitation als Krümmung von Raum und Zeit beschreibt. Als 1919 eine Sonnenfinsternis seine Vorhersagen bestätigte, wurde er weltberühmt. 1921 erhielt er den Nobelpreis für Physik.",
          "Als überzeugter Pazifist, Humanist und Jude musste Einstein nach der Machtübernahme der Nationalsozialisten 1933 Deutschland verlassen. Er emigrierte in die USA und wirkte fortan am Institute for Advanced Study in Princeton. Zeitlebens setzte er sich für Frieden und Völkerverständigung ein.",
          "Einstein blieb bis zuletzt ein Suchender, der nach einer einheitlichen Theorie der Naturkräfte strebte. Er starb am 18. April 1955 in Princeton. Seinem Wunsch entsprechend wurde er eingeäschert und die Asche an einem unbekannten Ort verstreut. Sein Name ist bis heute ein Synonym für Genie."
        ],
        ru: [
          "Альберт Эйнштейн родился 14 марта 1879 года в Ульме и вырос в Мюнхене. В детстве он вовсе не считался вундеркиндом, но рано проявил глубокую любознательность к математике и физике. Он учился в Политехникуме в Цюрихе и принял швейцарское гражданство.",
          "Не найдя поначалу места учёного, Эйнштейн работал в патентном бюро в Берне. В свободное время он развивал там свои революционные идеи. В 1905 году, в свой «год чудес», он опубликовал четыре статьи, навсегда изменившие физику, — в том числе специальную теорию относительности и знаменитую формулу E = mc².",
          "В 1915 году Эйнштейн завершил общую теорию относительности, описывающую гравитацию как искривление пространства и времени. Когда в 1919 году солнечное затмение подтвердило его предсказания, он стал всемирно знаменит. В 1921 году он получил Нобелевскую премию по физике.",
          "Убеждённый пацифист, гуманист и еврей, Эйнштейн после прихода к власти нацистов в 1933 году был вынужден покинуть Германию. Он эмигрировал в США и работал в Институте перспективных исследований в Принстоне. Всю жизнь он выступал за мир и взаимопонимание народов.",
          "Эйнштейн до конца оставался ищущим, стремившимся к единой теории сил природы. Он умер 18 апреля 1955 года в Принстоне. По его желанию он был кремирован, а прах развеян в неизвестном месте. Его имя и сегодня — синоним гения."
        ]
      },
      grave: { de: "Eingeäschert, Princeton, USA", ru: "Кремирован, Принстон, США" }, coords: "40.3487, -74.6590",
      video: "d6tJNfK4Tlw",
      gallery: ["assets/img/person-einstein.jpg", "assets/img/einstein-g1.jpg", "assets/img/einstein-g2.jpg", "assets/img/einstein-g3.jpg"]
    }
  },

  testimonials: [
    { name: { de: "Maria, 45 Jahre", ru: "Мария, 45 лет" },
      quote: { de: "Jetzt weiß ich, dass die Stimme meiner Mutter für meine Enkel bewahrt ist",
               ru: "Теперь я знаю, что голос моей мамы сохранён для моих внуков" } },
    { name: { de: "Mark, 28 Jahre", ru: "Марк, 28 лет" },
      quote: { de: "Ein würdevolles Andenken, das unserem Freund entspricht",
               ru: "Достойная память, под стать нашему другу" } },
    { name: { de: "Thomas, 50 Jahre", ru: "Томас, 50 лет" },
      quote: { de: "Aus einem Karton mit Fotos wurde eine geordnete Biografie",
               ru: "Из коробки с фотографиями получилась стройная биография" } }
  ]
};
