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
