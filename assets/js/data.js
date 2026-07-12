/* ==========================================================================
   ewig.me — данные (моки). Двуязычные строки: { de, ru }.
   Бэкенда нет. Созданные пользователем страницы — в localStorage (app.js).
   ========================================================================== */
window.DATA = {

  /* Примеры страниц памяти (карусель на лендинге) */
  examples: [
    {
      id: "fugger",
      cat: { de: "Berühmte Personen", ru: "Знаменитые люди" },
      name: { de: "Jakob Fugger", ru: "Якоб Фуггер" },
      dates: "1459–1525",
      bio: { de: "Augsburger Kaufmann und einer der reichsten Menschen seiner Zeit.",
             ru: "Аугсбургский купец, один из богатейших людей своего времени." }
    },
    {
      id: "dietrich",
      cat: { de: "Berühmte Personen", ru: "Знаменитые люди" },
      name: { de: "Marlene Dietrich", ru: "Марлен Дитрих" },
      dates: "1901–1992",
      bio: { de: "Weltberühmte Schauspielerin und Sängerin aus Berlin.",
             ru: "Всемирно известная актриса и певица из Берлина." }
    },
    {
      id: "arthur",
      cat: { de: "Interessante Geschichten", ru: "Интересные истории" },
      name: { de: "König Artus", ru: "Король Артур" },
      dates: "5.–6. Jh.",
      bio: { de: "Legendärer König – Symbol für Mut und Zusammenhalt.",
             ru: "Легендарный король — символ мужества и единства." }
    }
  ],

  /* Что можно хранить */
  features: [
    { icon: "video", title: { de: "Videos", ru: "Видео" },
      text: { de: "Füge eigene oder YouTube-Videos hinzu, die Erinnerungen lebendig machen.",
              ru: "Добавляйте свои или YouTube-видео, которые оживляют воспоминания." } },
    { icon: "photo", title: { de: "Foto", ru: "Фото" },
      text: { de: "Lade bis zu 100 kostbare Bilder hoch, die dir am Herzen liegen.",
              ru: "Загрузите до 100 дорогих сердцу фотографий." } },
    { icon: "text", title: { de: "Text", ru: "Текст" },
      text: { de: "Ob Epitaph, Lebensgeschichte oder persönliche Erinnerungen – schreibe, was bleibt.",
              ru: "Эпитафия, история жизни или личные воспоминания — напишите то, что останется." } },
    { icon: "pin", title: { de: "Standort", ru: "Место" },
      text: { de: "Finde die Geburts- und Ruhestätte leicht über den eingetragenen Ort auf der Karte.",
              ru: "Легко найдите место рождения и захоронения по отметке на карте." } }
  ],

  /* Как это работает */
  steps: [
    { text: { de: "Registrieren Sie sich im Dienst", ru: "Зарегистрируйтесь в сервисе" } },
    { text: { de: "Füllen Sie die Seite in wenigen Minuten mit Inhalten", ru: "Наполните страницу данными за несколько минут" } },
    { text: { de: "Teilen Sie die Informationen mit Angehörigen", ru: "Поделитесь информацией с родными" } },
    { text: { de: "Ergänzen und erweitern Sie das Profil", ru: "Добавляйте и расширяйте профиль" } }
  ],

  /* Тарифы */
  plans: {
    short: {
      price: { de: "0 Euro", ru: "0 евро" },
      items: [
        { de: "Grabinschrift", ru: "Эпитафия" },
        { de: "Markierung auf der Karte", ru: "Отметка на карте" },
        { de: "QR-Code zum Ausdrucken", ru: "QR-код для печати" }
      ]
    },
    extended: {
      price: { de: "69 Euro", ru: "69 евро" },
      items: [
        { de: "Biografie mit Foto", ru: "Биография с фото" },
        { de: "Fotogalerie", ru: "Фотогалерея" },
        { de: "Video", ru: "Видео" }
      ]
    }
  },

  /* Статьи (оригинал RU из Figma → перевод DE) */
  articles: [
    { title: { de: "Das Schweigen der Vorfahren: warum wir Familiengeschichten verlieren – und wie wir es aufhalten",
               ru: "Молчание предков: почему мы теряем семейные истории и как это остановить" } },
    { title: { de: "Wie ich ein digitales Porträt meines Großvaters erschuf",
               ru: "Как я создал цифровой портрет своего деда" } },
    { title: { de: "Papieralbum vs. digitales Profil auf ewig.me",
               ru: "Бумажный альбом vs. цифровой профиль ewig.me" } },
    { title: { de: "5 Wege, die Geschichte Ihrer Familie zu bewahren",
               ru: "5 способов сохранить историю вашей семьи" } }
  ],

  /* FAQ */
  faq: [
    { q: { de: "Was passiert in 50 Jahren? Schließen Sie – und alles ist weg?",
           ru: "А что будет через 50 лет? Вы закроетесь, и всё пропадёт?" },
      a: { de: "Wir nutzen verteilte und mehrfach gespiegelte Speichertechnologien, damit die Informationen dauerhaft erhalten bleiben – unabhängig vom Schicksal eines einzelnen Servers.",
           ru: "Мы используем распределённые и многократно дублируемые технологии хранения, чтобы информация сохранялась надолго — независимо от судьбы отдельного сервера." } },
    { q: { de: "Ist das sicher? Werden unsere Informationen öffentlich?",
           ru: "А безопасно ли это? Не станет ли наша информация достоянием общественности?" },
      a: { de: "Sie entscheiden selbst, wer die Seite sehen darf: öffentlich, per Link oder privat. Ohne Ihre Zustimmung wird nichts indexiert.",
           ru: "Вы сами решаете, кто может видеть страницу: публично, по ссылке или приватно. Без вашего согласия ничего не индексируется." } },
    { q: { de: "Ist das nicht pietätlos?",
           ru: "Не кощунственно ли это?" },
      a: { de: "Im Gegenteil: Eine Erinnerungsseite ist ein Zeichen des Respekts – ein würdiger Ort, an dem die Geschichte eines Menschen weiterlebt und geteilt werden kann.",
           ru: "Напротив: страница памяти — это знак уважения, достойное место, где история человека продолжает жить и может быть разделена с другими." } },
    { q: { de: "Wie verwende ich den QR-Code?",
           ru: "Как использовать QR-код?" },
      a: { de: "Den QR-Code können Sie ausdrucken und auf einem Schild oder Grabstein anbringen. Wer ihn scannt, gelangt direkt zur Erinnerungsseite.",
           ru: "QR-код можно распечатать и разместить на табличке или надгробии. Отсканировав его, человек попадёт прямо на страницу памяти." } },
    { q: { de: "Ist der Preis gerechtfertigt?",
           ru: "Оправдана ли цена?" },
      a: { de: "Die Kurzseite ist dauerhaft kostenlos. Die erweiterte Seite kostet einmalig 69 € – ohne Abo, mit dauerhaftem Hosting und einem gedruckten QR-Schild.",
           ru: "Краткая страница бесплатна навсегда. Расширенная — разовые 69 € без подписки, с постоянным хостингом и печатной QR-табличкой." } }
  ],

  /* Пресса (оригинал RU из Figma → перевод DE) */
  press: [
    { label: { de: "Interview", ru: "Интервью" },
      title: { de: "Der Bürgermeister von Augsburg unterstützt die Initiative von ewig.me",
               ru: "Мэр города Аугсбург поддержал инициативу ewig.me" } },
    { label: { de: "Interview", ru: "Интервью" },
      title: { de: "Der Vorsitzende der jüdischen Gemeinde äußert sich zu ewig.me",
               ru: "Глава еврейской общины высказал своё мнение об ewig.me" } },
    { label: { de: "Reportage", ru: "Репортаж" },
      title: { de: "Das Rote Kreuz über ewig.me",
               ru: "Красный Крест об ewig.me" } },
    { label: { de: "Reportage", ru: "Репортаж" },
      title: { de: "Der Ausschuss für Familie und Demografie über ewig.me",
               ru: "Комитет по вопросам семьи и демографии об ewig.me" } }
  ],

  /* Живые истории (немецкий канон из Figma + RU) */
  testimonials: [
    { name: { de: "Maria, 45 Jahre", ru: "Мария, 45 лет" },
      quote: { de: "Jetzt weiß ich, dass die Stimme meiner Mutter für meine Enkel bewahrt ist.",
               ru: "Теперь я знаю, что голос моей мамы сохранён для моих внуков." } },
    { name: { de: "Mark, 28 Jahre", ru: "Марк, 28 лет" },
      quote: { de: "Ein würdevolles Andenken, das unserem Freund entspricht.",
               ru: "Достойная память, под стать нашему другу." } },
    { name: { de: "Thomas, 50 Jahre", ru: "Томас, 50 лет" },
      quote: { de: "Aus einem Karton mit Fotos wurde eine geordnete Biografie.",
               ru: "Из коробки с фотографиями получилась стройная биография." } }
  ],

  /* Демо-персона публичной страницы (биография — черновик на сверку Ольге) */
  demoPerson: {
    id: "peter-weber",
    name: { de: "Peter Weber", ru: "Петер Вебер" },
    born: "1948",
    died: "2021",
    years: 73,
    epitaph: { de: "Ein Leben, das Brücken baute – im Beruf wie im Herzen.",
               ru: "Жизнь, что строила мосты — и в профессии, и в сердце." },
    plan: "extended"
  }
};
