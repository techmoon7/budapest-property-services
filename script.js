(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const storageKey = "bps-lang";
  const supportedLanguages = [
    { code: "hu", label: "Magyar", short: "HU", html: "hu" },
    { code: "en", label: "English", short: "EN", html: "en" },
    { code: "de", label: "Deutsch", short: "DE", html: "de" },
    { code: "uk", label: "Українська", short: "UK", html: "uk" },
    { code: "zh-CN", label: "中文", short: "中", html: "zh-CN" },
  ];
  const fallbackLanguage = "en";
  const languageCodes = new Set(supportedLanguages.map((language) => language.code));
  const uiText = {
    languageLabel: {
      hu: "Nyelv",
      en: "Language",
      de: "Sprache",
      uk: "Мова",
      "zh-CN": "语言",
    },
    openLanguageMenu: {
      hu: "Nyelv kiválasztása",
      en: "Choose language",
      de: "Sprache auswählen",
      uk: "Вибрати мову",
      "zh-CN": "选择语言",
    },
    closeLanguageMenu: {
      hu: "Nyelvválasztó bezárása",
      en: "Close language selector",
      de: "Sprachauswahl schließen",
      uk: "Закрити вибір мови",
      "zh-CN": "关闭语言选择器",
    },
    menuOpen: {
      hu: "Menü megnyitása",
      en: "Open menu",
      de: "Menü öffnen",
      uk: "Відкрити меню",
      "zh-CN": "打开菜单",
    },
    services: {
      hu: "Szolgáltatások",
      en: "Services",
      de: "Dienstleistungen",
      uk: "Послуги",
      "zh-CN": "服务",
    },
    servicesOverview: {
      hu: "Szolgáltatások áttekintése",
      en: "Services overview",
      de: "Leistungen im Überblick",
      uk: "Огляд послуг",
      "zh-CN": "服务概览",
    },
    copyPhone: {
      hu: "Telefonszám másolása",
      en: "Copy phone number",
      de: "Telefonnummer kopieren",
      uk: "Скопіювати номер телефону",
      "zh-CN": "复制电话号码",
    },
    callNow: {
      hu: "Hívás indítása",
      en: "Call now",
      de: "Jetzt anrufen",
      uk: "Зателефонувати",
      "zh-CN": "立即拨打",
    },
    phoneCopied: {
      hu: "Telefonszám másolva.",
      en: "Phone number copied.",
      de: "Telefonnummer kopiert.",
      uk: "Номер телефону скопійовано.",
      "zh-CN": "电话号码已复制。",
    },
    phoneFallback: {
      hu: `Telefonszám: ${phone}`,
      en: `Phone: ${phone}`,
      de: `Telefon: ${phone}`,
      uk: `Телефон: ${phone}`,
      "zh-CN": `电话：${phone}`,
    },
    closeImage: {
      hu: "Kép bezárása",
      en: "Close image",
      de: "Bild schließen",
      uk: "Закрити зображення",
      "zh-CN": "关闭图片",
    },
    closeImageGallery: {
      hu: "Képgaléria bezárása",
      en: "Close image gallery",
      de: "Bildergalerie schließen",
      uk: "Закрити галерею зображень",
      "zh-CN": "关闭图片画廊",
    },
    previousImage: {
      hu: "Előző kép",
      en: "Previous image",
      de: "Vorheriges Bild",
      uk: "Попереднє зображення",
      "zh-CN": "上一张图片",
    },
    nextImage: {
      hu: "Következő kép",
      en: "Next image",
      de: "Nächstes Bild",
      uk: "Наступне зображення",
      "zh-CN": "下一张图片",
    },
  };
  const phraseRows = [
    ["Services", "Dienstleistungen", "Послуги", "服务"],
    ["Services overview", "Leistungen im Überblick", "Огляд послуг", "服务概览"],
    ["Clients", "Kunden", "Клієнти", "客户"],
    ["Work examples", "Arbeitsbeispiele", "Приклади робіт", "工作示例"],
    ["Images", "Bilder", "Зображення", "图片"],
    ["Contact", "Kontakt", "Контакт", "联系"],
    ["Maintenance", "Instandhaltung", "Обслуговування", "维护"],
    ["Painting & Wall Repairs", "Malerarbeiten & Wandreparaturen", "Фарбування та ремонт стін", "粉刷与墙面维修"],
    ["Garden Maintenance", "Gartenpflege", "Догляд за садом", "园艺维护"],
    ["Handyman", "Hausmeisterservice", "Майстер на дрібні роботи", "维修服务"],
    ["Cleaning", "Reinigung", "Прибирання", "清洁"],
    ["What we do", "Leistungen", "Що ми робимо", "服务内容"],
    ["Process", "Ablauf", "Процес", "流程"],
    ["FAQ", "FAQ", "Поширені запитання", "常见问题"],
    ["Request a quote on WhatsApp", "Anfrage per WhatsApp senden", "Надіслати запит у WhatsApp", "通过 WhatsApp 询价"],
    ["Send photos on WhatsApp", "Fotos per WhatsApp senden", "Надіслати фото у WhatsApp", "通过 WhatsApp 发送照片"],
    ["View property maintenance", "Instandhaltung ansehen", "Переглянути обслуговування нерухомості", "查看物业维护"],
    ["Back to homepage", "Zurück zur Startseite", "Повернутися на головну", "返回首页"],
    ["Homepage contact section", "Kontaktbereich der Startseite", "Контактний розділ головної сторінки", "首页联系区域"],
    ["Next step", "Nächster Schritt", "Наступний крок", "下一步"],
    ["First step", "Erster Schritt", "Перший крок", "第一步"],
    ["Why choose Budapest Property Services?", "Warum Budapest Property Services?", "Чому Budapest Property Services?", "为什么选择 Budapest Property Services？"],
    ["Clear communication", "Klare Kommunikation", "Зрозуміла комунікація", "清晰沟通"],
    ["Organised workflow", "Strukturierter Ablauf", "Організований процес", "有序流程"],
    ["Budapest focus", "Fokus auf Budapest", "Фокус на Будапешті", "专注布达佩斯"],
    ["Photo updates", "Foto-Updates", "Фотооновлення", "照片更新"],
    ["Hungarian and English communication", "Kommunikation auf Ungarisch und Englisch", "Комунікація угорською та англійською", "匈牙利语和英语沟通"],
    ["Hungarian and English coordination", "Abstimmung auf Ungarisch und Englisch", "Координація угорською та англійською", "匈牙利语和英语协调"],
    ["Property maintenance in Budapest", "Immobilieninstandhaltung in Budapest", "Обслуговування нерухомості в Будапешті", "布达佩斯物业维护"],
    ["Handyman services in Budapest", "Hausmeister- und Reparaturservice in Budapest", "Послуги майстра в Будапешті", "布达佩斯维修服务"],
    ["Painting and wall repairs in Budapest", "Malerarbeiten und Wandreparaturen in Budapest", "Фарбування та ремонт стін у Будапешті", "布达佩斯粉刷与墙面维修"],
    ["Garden maintenance in Budapest", "Gartenpflege in Budapest", "Догляд за садом у Будапешті", "布达佩斯园艺维护"],
    ["Cleaning services in Budapest", "Reinigungsservice in Budapest", "Послуги прибирання в Будапешті", "布达佩斯清洁服务"],
    ["Property services in Budapest", "Immobiliendienstleistungen in Budapest", "Послуги для нерухомості в Будапешті", "布达佩斯物业服务"],
    ["Professional property maintenance in Budapest you can follow from anywhere.", "Professionelle Immobilieninstandhaltung in Budapest, die Sie von überall mitverfolgen können.", "Професійне обслуговування нерухомості в Будапешті, за яким можна стежити з будь-якого місця.", "可在任何地点跟进的布达佩斯专业物业维护。"],
    ["Reliable Budapest property maintenance you can follow from anywhere.", "Zuverlässige Immobilieninstandhaltung in Budapest, die Sie von überall mitverfolgen können.", "Надійне обслуговування нерухомості в Будапешті, за яким можна стежити дистанційно.", "可靠的布达佩斯物业维护，可远程跟进。"],
    ["Reliable handyman services in Budapest for practical property repairs.", "Zuverlässiger Hausmeisterservice in Budapest für praktische Reparaturen an Immobilien.", "Надійні послуги майстра в Будапешті для практичного ремонту нерухомості.", "布达佩斯可靠维修服务，适用于实用型物业修理。"],
    ["Clean, well-prepared walls before rental, guest arrival or handover.", "Saubere, gut vorbereitete Wände vor Vermietung, Gästeankunft oder Übergabe.", "Чисті, добре підготовлені стіни перед орендою, приїздом гостей або передачею.", "出租、客人入住或交付前，让墙面整洁并准备充分。"],
    ["Well-kept gardens, courtyards and outdoor areas for Budapest properties.", "Gepflegte Gärten, Höfe und Außenbereiche für Immobilien in Budapest.", "Доглянуті сади, двори та зовнішні зони для нерухомості в Будапешті.", "为布达佩斯物业维护整洁的花园、庭院和户外区域。"],
    ["Cleaning Services Budapest for apartments, Airbnb homes and offices.", "Reinigungsservice in Budapest für Wohnungen, Airbnb-Unterkünfte und Büros.", "Послуги прибирання в Будапешті для квартир, Airbnb-житла та офісів.", "布达佩斯清洁服务，适用于公寓、Airbnb 房源和办公室。"],
    ["View visual work processes", "Bildbasierte Arbeitsabläufe ansehen", "Переглянути візуальні робочі процеси", "查看可视化工作流程"],
    ["Examples and process", "Beispiele und Ablauf", "Приклади та процес", "示例与流程"],
    ["One contact, a workflow you can follow", "Ein Ansprechpartner, ein nachvollziehbarer Ablauf", "Один контакт і процес, який можна відстежувати", "一个联系人，可跟进的工作流程"],
    ["Why it works", "Warum es funktioniert", "Чому це працює", "为什么有效"],
    ["Why it helps", "Warum es hilft", "Чим це корисно", "为什么有帮助"],
    ["What matters", "Worauf es ankommt", "Що важливо", "重点关注"],
    ["Photo update", "Foto-Update", "Фотооновлення", "照片更新"],
    ["2-3 photos", "2-3 Fotos", "2-3 фото", "2-3 张照片"],
    ["3-5 photos", "3-5 Fotos", "3-5 фото", "3-5 张照片"],
    ["Budapest address or district", "Adresse oder Bezirk in Budapest", "Адреса або район у Будапешті", "布达佩斯地址或所在区"],
    ["Deadline", "Frist", "Термін", "截止时间"],
    ["Access", "Zugang", "Доступ", "进入方式"],
    ["Timing", "Zeitplanung", "Часові рамки", "时间安排"],
    ["Primary service area: Budapest and nearby locations. Hungarian and English communication.", "Hauptgebiet: Budapest und nahe Umgebung. Kommunikation auf Ungarisch und Englisch.", "Основна зона обслуговування: Будапешт і найближчі райони. Комунікація угорською та англійською.", "主要服务区域：布达佩斯及周边地区。可用匈牙利语和英语沟通。"],
    ["A short message is enough: photos, location and timing. Primary service area: Budapest and nearby locations.", "Eine kurze Nachricht genügt: Fotos, Standort und Zeitrahmen. Hauptgebiet: Budapest und Umgebung.", "Достатньо короткого повідомлення: фото, місце та терміни. Основна зона: Будапешт і околиці.", "简短信息即可：照片、位置和时间。主要服务区域为布达佩斯及周边。"],
    ["Send a few photos and let’s clarify the next practical step.", "Senden Sie ein paar Fotos, dann klären wir den nächsten sinnvollen Schritt.", "Надішліть кілька фото, і ми уточнимо наступний практичний крок.", "发送几张照片，我们会明确下一步实际可行的方案。"],
    ["Send a few photos of the property and let us clarify the right cleaning scope.", "Senden Sie ein paar Fotos der Immobilie, damit wir den passenden Reinigungsumfang klären können.", "Надішліть кілька фото нерухомості, і ми уточнимо потрібний обсяг прибирання.", "发送几张物业照片，我们会明确合适的清洁范围。"],
    ["Send a few photos, and we will clarify what should realistically be done before painting.", "Senden Sie ein paar Fotos, dann klären wir realistisch, was vor dem Streichen zu tun ist.", "Надішліть кілька фото, і ми реалістично уточнимо, що потрібно зробити перед фарбуванням.", "发送几张照片，我们会实际评估粉刷前需要完成的工作。"],
    ["Send a few photos of the outdoor area, and we will clarify the realistic next step.", "Senden Sie ein paar Fotos des Außenbereichs, dann klären wir den realistischen nächsten Schritt.", "Надішліть кілька фото зовнішньої зони, і ми уточнимо реалістичний наступний крок.", "发送几张户外区域照片，我们会明确实际下一步。"],
    ["Send a few photos and let us clarify the right cleaning scope.", "Senden Sie ein paar Fotos, damit wir den passenden Reinigungsumfang klären können.", "Надішліть кілька фото, і ми уточнимо потрібний обсяг прибирання.", "发送几张照片，我们会明确合适的清洁范围。"],
    ["The images on this website are illustrative examples showing typical work processes and expected results.", "Die Bilder auf dieser Website sind illustrative Beispiele für typische Arbeitsabläufe und erwartbare Ergebnisse.", "Зображення на цьому сайті є ілюстративними прикладами типових робочих процесів і очікуваних результатів.", "本网站图片为示意示例，展示典型工作流程和预期效果。"],
    ["What can property maintenance include?", "Was kann die Immobilieninstandhaltung umfassen?", "Що може входити в обслуговування нерухомості?", "物业维护可以包括哪些内容？"],
    ["What handyman tasks can we help with?", "Bei welchen kleineren Reparaturen können wir helfen?", "З якими дрібними ремонтними роботами ми можемо допомогти?", "我们可以协助哪些维修事项？"],
    ["What painting and wall repair work can we help with?", "Bei welchen Maler- und Wandreparaturarbeiten können wir helfen?", "З якими роботами з фарбування та ремонту стін ми можемо допомогти?", "我们可以协助哪些粉刷和墙面维修工作？"],
    ["What garden maintenance work can we help with?", "Bei welcher Gartenpflege können wir helfen?", "З якими роботами з догляду за садом ми можемо допомогти?", "我们可以协助哪些园艺维护工作？"],
    ["What cleaning work can we help with?", "Welche Reinigungsarbeiten können wir übernehmen?", "З яким прибиранням ми можемо допомогти?", "我们可以协助哪些清洁工作？"],
    ["How the process works", "So funktioniert der Ablauf", "Як працює процес", "服务流程"],
    ["Step-by-step process", "Schritt-für-Schritt-Ablauf", "Покроковий процес", "分步流程"],
    ["Photos and short brief", "Fotos und kurze Beschreibung", "Фото та короткий опис", "照片和简要说明"],
    ["Task list and next step", "Aufgabenliste und nächster Schritt", "Список завдань і наступний крок", "任务清单和下一步"],
    ["Scope clarification", "Klärung des Umfangs", "Уточнення обсягу робіт", "明确工作范围"],
    ["Organised work", "Organisierte Ausführung", "Організоване виконання", "有序施工"],
    ["Organised cleaning", "Organisierte Reinigung", "Організоване прибирання", "有序清洁"],
    ["Photo update and handover", "Foto-Update und Übergabe", "Фотооновлення та передача", "照片更新与交付"],
    ["Photos and next step", "Fotos und nächster Schritt", "Фото та наступний крок", "照片和下一步"],
    ["Who we support and when it helps", "Wen wir unterstützen und wann es hilft", "Кому ми допомагаємо і коли це корисно", "我们服务的人群和适用场景"],
    ["Who we help", "Wem wir helfen", "Кому ми допомагаємо", "我们帮助谁"],
    ["Owners living abroad", "Eigentümer im Ausland", "Власники, які живуть за кордоном", "居住在国外的业主"],
    ["Foreign owners", "Ausländische Eigentümer", "Іноземні власники", "外国业主"],
    ["Airbnb hosts and apartment investors", "Airbnb-Gastgeber und Wohnungsinvestoren", "Airbnb-господарі та інвестори в квартири", "Airbnb 房东和公寓投资者"],
    ["Airbnb hosts", "Airbnb-Gastgeber", "Airbnb-господарі", "Airbnb 房东"],
    ["Offices, embassies and commercial properties", "Büros, Botschaften und Gewerbeimmobilien", "Офіси, посольства та комерційна нерухомість", "办公室、使馆和商业物业"],
    ["Private homeowners and apartment owners", "Private Haus- und Wohnungseigentümer", "Власники приватних будинків і квартир", "私人住宅和公寓业主"],
    ["Property managers", "Immobilienverwalter", "Керуючі нерухомістю", "物业经理"],
    ["Office refresh", "Büroauffrischung", "Оновлення офісу", "办公室翻新"],
    ["Apartment upkeep", "Wohnungspflege", "Догляд за квартирою", "公寓维护"],
    ["Courtyard and garden", "Hof und Garten", "Двір і сад", "庭院和花园"],
    ["Regular condition checks", "Regelmäßige Zustandskontrollen", "Регулярні перевірки стану", "定期状况检查"],
    ["Minor repairs and preventive maintenance", "Kleinreparaturen und vorbeugende Instandhaltung", "Дрібний ремонт і профілактичне обслуговування", "小修与预防性维护"],
    ["Painting and wall touch-ups", "Malerarbeiten und Wandausbesserungen", "Фарбування та локальний ремонт стін", "粉刷和墙面修补"],
    ["Drywall and practical repairs", "Trockenbau und praktische Reparaturen", "Гіпсокартон і практичний ремонт", "石膏板和实用维修"],
    ["Garden, courtyard and outdoor care", "Garten-, Hof- und Außenpflege", "Догляд за садом, двором і зовнішніми зонами", "花园、庭院和户外维护"],
    ["Photo updates and reporting", "Foto-Updates und Berichterstattung", "Фотооновлення та звітність", "照片更新和汇报"],
    ["Small apartment repairs", "Kleine Wohnungsreparaturen", "Дрібний ремонт у квартирі", "公寓小修"],
    ["Furniture assembly and adjustment", "Möbelmontage und Anpassung", "Складання та регулювання меблів", "家具组装和调整"],
    ["Shelves, curtain rails and fittings", "Regale, Gardinenstangen und Befestigungen", "Полиці, карнизи та кріплення", "搁板、窗帘杆和固定件"],
    ["Door, handle and lock-area fixes", "Reparaturen an Türen, Griffen und Schlossbereichen", "Ремонт дверей, ручок і зон біля замків", "门、把手和锁具周边维修"],
    ["Wall repairs and touch-ups", "Wandreparaturen und Ausbesserungen", "Ремонт і підфарбування стін", "墙面维修和修补"],
    ["Airbnb and owner support", "Unterstützung für Airbnb und Eigentümer", "Підтримка Airbnb і власників", "Airbnb 和业主支持"],
    ["Interior repainting", "Innenanstrich", "Фарбування інтер’єру", "室内重新粉刷"],
    ["Crack repair and patching", "Rissreparatur und Ausbesserung", "Ремонт тріщин і шпаклювання", "裂缝修补和局部修复"],
    ["Plastering and surface preparation", "Spachteln und Untergrundvorbereitung", "Штукатурка та підготовка поверхонь", "抹灰和表面准备"],
    ["Rental and Airbnb refresh", "Auffrischung für Miet- und Airbnb-Objekte", "Оновлення для оренди та Airbnb", "出租房和 Airbnb 翻新"],
    ["Minor cosmetic repairs", "Kleine kosmetische Reparaturen", "Дрібний косметичний ремонт", "轻微外观修复"],
    ["Clean handover", "Saubere Übergabe", "Чиста передача", "整洁交付"],
    ["Lawn mowing and edging", "Rasenmähen und Kantenschnitt", "Косіння газону та обробка країв", "修剪草坪和边缘"],
    ["Hedge trimming and shrub pruning", "Heckenschnitt und Strauchschnitt", "Стрижка живоплоту та обрізка кущів", "修剪树篱和灌木"],
    ["Weed removal and outdoor tidying", "Unkrautentfernung und Außenordnung", "Видалення бур’янів і прибирання зовнішніх зон", "除草和户外整理"],
    ["Seasonal cleanup", "Saisonale Reinigung", "Сезонне прибирання", "季节性清理"],
    ["Airbnb and rental outdoor presentation", "Außenbereiche für Airbnb und Vermietung", "Зовнішній вигляд для Airbnb та оренди", "Airbnb 和出租物业户外呈现"],
    ["Scheduled visits and photo updates", "Geplante Einsätze und Foto-Updates", "Заплановані візити та фотооновлення", "预约上门和照片更新"],
    ["Regular apartment cleaning", "Regelmäßige Wohnungsreinigung", "Регулярне прибирання квартири", "定期公寓清洁"],
    ["Deep cleaning", "Grundreinigung", "Генеральне прибирання", "深度清洁"],
    ["Move-in and move-out cleaning", "Einzugs- und Auszugsreinigung", "Прибирання перед заселенням і після виїзду", "入住和退房清洁"],
    ["Airbnb turnover cleaning", "Airbnb-Wechselreinigung", "Прибирання між гостями Airbnb", "Airbnb 换客清洁"],
    ["Office cleaning", "Büroreinigung", "Прибирання офісів", "办公室清洁"],
    ["After renovation cleaning", "Reinigung nach Renovierung", "Прибирання після ремонту", "装修后清洁"],
    ["Property preparation before guests", "Vorbereitung der Immobilie vor Gästen", "Підготовка нерухомості перед гостями", "客人到达前的物业准备"],
    ["Cleaning services FAQ", "FAQ zu Reinigungsleistungen", "Поширені запитання про прибирання", "清洁服务常见问题"],
    ["Property maintenance FAQ", "FAQ zur Immobilieninstandhaltung", "Поширені запитання про обслуговування нерухомості", "物业维护常见问题"],
    ["Handyman services FAQ", "FAQ zum Hausmeisterservice", "Поширені запитання про послуги майстра", "维修服务常见问题"],
    ["Painting and wall repair FAQ", "FAQ zu Malerarbeiten und Wandreparaturen", "Поширені запитання про фарбування та ремонт стін", "粉刷与墙面维修常见问题"],
    ["Garden maintenance FAQ", "FAQ zur Gartenpflege", "Поширені запитання про догляд за садом", "园艺维护常见问题"],
    ["Do you work with owners living abroad?", "Arbeiten Sie mit Eigentümern im Ausland?", "Чи працюєте ви з власниками, які живуть за кордоном?", "你们为居住在国外的业主服务吗？"],
    ["Is English communication available?", "Ist Kommunikation auf Englisch möglich?", "Чи доступна комунікація англійською?", "可以用英语沟通吗？"],
    ["Do you send photos of the work?", "Senden Sie Fotos der Arbeiten?", "Чи надсилаєте ви фото виконаних робіт?", "你们会发送工作照片吗？"],
    ["How do I request a quote?", "Wie kann ich ein Angebot anfragen?", "Як запросити пропозицію?", "如何询价？"],
    ["Do you handle urgent work?", "Übernehmen Sie dringende Arbeiten?", "Чи виконуєте ви термінові роботи?", "可以处理紧急工作吗？"],
    ["Can I arrange cleaning while I am abroad?", "Kann ich die Reinigung aus dem Ausland organisieren?", "Чи можу я організувати прибирання, перебуваючи за кордоном?", "我在国外也可以安排清洁吗？"],
    ["Do you offer regular apartment cleaning?", "Bieten Sie regelmäßige Wohnungsreinigung an?", "Чи пропонуєте регулярне прибирання квартир?", "你们提供定期公寓清洁吗？"],
    ["Do you handle Airbnb turnover cleaning?", "Übernehmen Sie Airbnb-Wechselreinigungen?", "Чи виконуєте прибирання між гостями Airbnb?", "你们做 Airbnb 换客清洁吗？"],
    ["Do you clean offices?", "Reinigen Sie auch Büros?", "Чи прибираєте ви офіси?", "你们清洁办公室吗？"],
  ];
  const phraseTranslations = Object.fromEntries(
    phraseRows.map(([en, de, uk, zh]) => [en, { de, uk, "zh-CN": zh }])
  );
  let heroLightbox = null;
  let heroLightboxOpener = null;
  let gardenGalleryModal = null;
  let gardenGalleryIndex = 0;
  let gardenGalleryOpener = null;
  let gardenGalleryTouchStart = 0;
  let cleaningGalleryModal = null;
  let cleaningGalleryIndex = 0;
  let cleaningGalleryOpener = null;
  let cleaningGalleryTouchStart = 0;
  const serviceNavigationItems = [
    {
      key: "maintenance",
      href: "property-maintenance-budapest.html",
      hu: "Karbantartás",
      en: "Maintenance",
      dataset: "maintenanceLink",
    },
    {
      key: "painting",
      href: "painting-wall-repairs-budapest.html",
      hu: "Festés és faljavítás",
      en: "Painting & Wall Repairs",
      dataset: "paintingLink",
    },
    {
      key: "garden",
      href: "garden-maintenance-budapest.html",
      hu: "Kertfenntartás",
      en: "Garden Maintenance",
      dataset: "gardenLink",
    },
    {
      key: "handyman",
      href: "handyman-services-budapest.html",
      hu: "Ezermester",
      en: "Handyman",
      dataset: "handymanLink",
    },
    {
      key: "cleaning",
      href: "cleaning-services-budapest.html",
      hu: "Takarítás",
      en: "Cleaning",
      dataset: "cleaningLink",
    },
  ];

  const normalizeLanguage = (lang = "") => {
    const value = String(lang).trim();
    if (value.toLowerCase() === "zh-cn" || value.toLowerCase().startsWith("zh")) return "zh-CN";
    const short = value.slice(0, 2).toLowerCase();
    if (languageCodes.has(value)) return value;
    if (languageCodes.has(short)) return short;
    return "";
  };
  const storedLanguage = () => {
    try {
      return normalizeLanguage(localStorage.getItem(storageKey));
    } catch {
      return "";
    }
  };
  const browserLanguage = () => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const language of languages) {
      const normalized = normalizeLanguage(language);
      if (normalized) return normalized;
    }
    return fallbackLanguage;
  };
  const persistLanguage = (lang) => {
    try {
      localStorage.setItem(storageKey, lang);
    } catch {
      /* localStorage can be unavailable in hardened browser modes. */
    }
  };
  if (!storedLanguage()) persistLanguage(browserLanguage());

  const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
  const currentLang = () => storedLanguage() || fallbackLanguage;
  const documentLang = () => normalizeLanguage(document.documentElement.lang) || currentLang();
  const languageInfo = (lang = currentLang()) =>
    supportedLanguages.find((language) => language.code === lang) || supportedLanguages.find((language) => language.code === fallbackLanguage);
  const t = (key, lang = currentLang()) => uiText[key]?.[lang] || uiText[key]?.[fallbackLanguage] || "";
  const translatePhrase = (text, lang = currentLang()) => {
    if (!text || lang === "hu" || lang === "en") return text;
    return phraseTranslations[text]?.[lang] || text;
  };
  const translateInlineText = (value, lang = currentLang()) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const translated = translatePhrase(trimmed, lang);
    if (translated === trimmed) return value;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };
  const phoneActionLabel = (lang = currentLang()) =>
    directCallViewport() ? t("callNow", lang) : t("copyPhone", lang);

  const serviceItemForHref = (href = "") => {
    const cleanHref = href.split("#")[0].replace(/^\.\//, "");
    return serviceNavigationItems.find((item) => item.href === cleanHref);
  };

  const isServicesOverviewHref = (href = "") => href === "#services" || href === "index.html#services";

  const closeHeaderNavigation = (header) => {
    if (!header) return;
    header.classList.remove("nav-open");
    header.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
  };

  const closeServicesDropdown = (dropdown) => {
    if (!dropdown) return;
    dropdown.classList.remove("open");
    dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  };

  const syncHeaderNavigationState = () => {
    const isCompact = window.matchMedia("(max-width: 1120px)").matches;
    document.querySelectorAll(".header[data-nav-enhanced='true']").forEach((header) => {
      const dropdown = header.querySelector("[data-services-dropdown]");
      dropdown
        ?.querySelector(".nav-dropdown-toggle")
        ?.setAttribute("aria-expanded", String(isCompact || dropdown.classList.contains("open")));
      if (!isCompact) closeHeaderNavigation(header);
      if (isCompact) dropdown?.classList.remove("open");
    });
  };

  const enhanceHeaderNavigation = () => {
    const header = document.querySelector(".header");
    const nav = header?.querySelector(".nav");
    if (!header || !nav) return;

    const lang = documentLang();
    const navId = nav.id || "primary-navigation";
    nav.id = navId;
    header.dataset.navEnhanced = "true";

    let menuToggle = header.querySelector(".nav-toggle");
    if (!menuToggle) {
      menuToggle = document.createElement("button");
      menuToggle.className = "nav-toggle";
      menuToggle.type = "button";
      menuToggle.setAttribute("aria-controls", navId);
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<span aria-hidden="true"></span><span class="sr-only">Menu</span>';
      header.insertBefore(menuToggle, nav);
    }
    menuToggle.setAttribute("aria-label", t("menuOpen", lang));

    let dropdown = nav.querySelector("[data-services-dropdown]");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";
      dropdown.dataset.servicesDropdown = "true";
      dropdown.innerHTML = `
        <button class="nav-dropdown-toggle" type="button" aria-haspopup="true" aria-expanded="false"></button>
        <div class="nav-dropdown-menu" role="menu"></div>
      `;
      nav.insertBefore(dropdown, nav.firstChild);
    }

    const dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".nav-dropdown-menu");
    const servicesLabel = t("services", lang);
    if (dropdownToggle.textContent !== servicesLabel) dropdownToggle.textContent = servicesLabel;

    const topLevelLinks = [...nav.children].filter((node) => node.matches?.("a"));
    const serviceLinks = new Map();
    let overviewLink = null;

    topLevelLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const item = serviceItemForHref(href);
      if (item) {
        serviceLinks.set(item.key, link);
        link.remove();
      } else if (isServicesOverviewHref(href)) {
        overviewLink = link;
        link.remove();
      }
    });

    const shouldRenderDropdown =
      dropdownMenu.dataset.renderedLang !== lang ||
      serviceLinks.size > 0 ||
      !!overviewLink ||
      dropdownMenu.children.length !== serviceNavigationItems.length + 1;

    if (shouldRenderDropdown) {
      dropdownMenu.textContent = "";

      const overviewHref = document.body?.classList.contains("service-page") ? "index.html#services" : "#services";
      const overview = overviewLink || document.createElement("a");
      overview.href = overviewHref;
      overview.dataset.textHu = uiText.servicesOverview.hu;
      overview.dataset.textEn = uiText.servicesOverview.en;
      overview.textContent = t("servicesOverview", lang);
      overview.setAttribute("role", "menuitem");
      overview.removeAttribute("aria-current");
      dropdownMenu.appendChild(overview);

      const currentFile = window.location.pathname.split("/").pop() || "index.html";
      serviceNavigationItems.forEach((item) => {
        const link =
          serviceLinks.get(item.key) ||
          dropdownMenu.querySelector(`[data-service-nav-item="${item.key}"]`) ||
          document.createElement("a");
        link.href = item.href;
        link.dataset.serviceNavItem = item.key;
        link.dataset.textHu = item.hu;
        link.dataset.textEn = item.en;
        link.dataset[item.dataset] = "true";
        link.textContent = lang === "hu" ? item.hu : lang === "en" ? item.en : translatePhrase(item.en, lang);
        link.setAttribute("role", "menuitem");
        if (currentFile === item.href) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
        dropdownMenu.appendChild(link);
      });
      dropdownMenu.dataset.renderedLang = lang;
    }

    if (header.dataset.navEventsBound !== "true") {
      header.dataset.navEventsBound = "true";

      menuToggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });

      dropdownToggle.addEventListener("click", (event) => {
        if (window.matchMedia("(max-width: 1120px)").matches) return;
        event.preventDefault();
        const isOpen = dropdown.classList.toggle("open");
        dropdownToggle.setAttribute("aria-expanded", String(isOpen));
      });

      nav.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("click", (event) => {
        if (header.contains(event.target)) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });
    }

    syncHeaderNavigationState();
  };

  const closeLanguageSelector = () => {
    document.querySelectorAll(".language-selector.open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("#langBtn")?.setAttribute("aria-expanded", "false");
    });
  };

  const openLanguageSelector = (selector) => {
    if (!selector) return;
    selector.classList.add("open");
    selector.querySelector("#langBtn")?.setAttribute("aria-expanded", "true");
  };

  const renderLanguageSelector = () => {
    const existingButton = document.getElementById("langBtn");
    if (!existingButton) return null;

    const lang = currentLang();
    let selector = existingButton.closest(".language-selector");
    if (!selector) {
      selector = document.createElement("div");
      selector.className = "language-selector";
      selector.dataset.languageSelector = "true";
      existingButton.replaceWith(selector);
      selector.appendChild(existingButton);
      existingButton.classList.add("language-toggle");
      existingButton.setAttribute("aria-haspopup", "true");
      existingButton.setAttribute("aria-expanded", "false");
      existingButton.setAttribute("aria-controls", "languageMenu");

      const menu = document.createElement("div");
      menu.className = "language-menu";
      menu.id = "languageMenu";
      menu.setAttribute("role", "menu");
      selector.appendChild(menu);
    }

    const button = selector.querySelector("#langBtn");
    const menu = selector.querySelector(".language-menu");
    button.type = "button";
    button.classList.add("lang", "language-toggle");
    button.setAttribute("aria-label", t("openLanguageMenu", lang));
    const buttonMarkup = `<span aria-hidden="true">🌐</span><span>${t("languageLabel", lang)}</span><small>${languageInfo(lang).short}</small>`;
    if (button.innerHTML !== buttonMarkup) button.innerHTML = buttonMarkup;

    const menuMarkup = supportedLanguages
      .map(
        (language) => `
          <button type="button" role="menuitemradio" data-language-option="${language.code}" aria-checked="${String(language.code === lang)}">
            <span>${language.label}</span><small>${language.short}</small>
          </button>`
      )
      .join("");
    if (menu.dataset.renderedLang !== lang || menu.children.length !== supportedLanguages.length) {
      menu.innerHTML = menuMarkup;
      menu.dataset.renderedLang = lang;
    } else {
      menu.querySelectorAll("[data-language-option]").forEach((option) => {
        option.setAttribute("aria-checked", String(option.dataset.languageOption === lang));
      });
    }

    if (selector.dataset.languageEventsBound !== "true") {
      selector.dataset.languageEventsBound = "true";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (selector.classList.contains("open")) {
          closeLanguageSelector();
        } else {
          closeLanguageSelector();
          openLanguageSelector(selector);
        }
      });

      menu.addEventListener("click", (event) => {
        const option = event.target.closest("[data-language-option]");
        if (!option) return;
        event.preventDefault();
        setLanguage(option.dataset.languageOption);
      });

      selector.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeLanguageSelector();
          button.focus();
        }
      });
    }

    return selector;
  };

  const restoreOriginalText = (node) => {
    if (node.dataset?.i18nOriginalText !== undefined) node.textContent = node.dataset.i18nOriginalText;
  };

  const translateAttribute = (node, attribute, lang) => {
    const originalKey = `i18nOriginal${attribute.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())}`;
    if (node.dataset && node.dataset[originalKey] === undefined) node.dataset[originalKey] = node.getAttribute(attribute) || "";
    const original = node.dataset?.[originalKey] || "";
    if (!original) return;
    node.setAttribute(attribute, lang === "hu" || lang === "en" ? original : translatePhrase(original, lang));
  };

  const applyTextNodeTranslations = (lang) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script, style, .language-selector, [data-lang-panel]")) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.__bpsOriginalText === undefined) node.__bpsOriginalText = node.nodeValue;
      node.nodeValue = lang === "hu" || lang === "en" ? node.__bpsOriginalText : translateInlineText(node.__bpsOriginalText, lang);
    });
  };

  const applyPageLanguage = () => {
    const lang = currentLang();
    document.documentElement.lang = languageInfo(lang).html;

    document.querySelectorAll("[data-lang-panel]").forEach((panel) => {
      if (panel.dataset.i18nOriginalText === undefined) panel.dataset.i18nOriginalText = panel.textContent;
      const panelLang = panel.dataset.langPanel;
      const showPanel = lang === panelLang || (!["hu", "en"].includes(lang) && panelLang === "en");
      panel.hidden = !showPanel;
      panel.setAttribute("aria-hidden", String(!showPanel));
      if (showPanel) {
        panel.textContent =
          lang === panelLang ? panel.dataset.i18nOriginalText : translatePhrase(panel.dataset.i18nOriginalText, lang);
      } else {
        restoreOriginalText(panel);
      }
    });

    document.querySelectorAll("[data-text-hu]").forEach((node) => {
      const source = lang === "hu" ? node.dataset.textHu : node.dataset.textEn || node.dataset.textHu;
      const value = lang === "hu" || lang === "en" ? source : translatePhrase(node.dataset.textEn || source, lang);
      if (value && node.textContent !== value) node.textContent = value;
    });

    document.querySelectorAll("[data-aria-hu]").forEach((node) => {
      const source = lang === "hu" ? node.dataset.ariaHu : node.dataset.ariaEn || node.dataset.ariaHu;
      const value = lang === "hu" || lang === "en" ? source : translatePhrase(node.dataset.ariaEn || source, lang);
      if (value) node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-phone-label]").forEach((node) => {
      const isHeaderPhone = node.closest(".header");
      const value = isHeaderPhone && !directCallViewport() ? phone : phoneActionLabel(lang);
      if (node.textContent !== value) node.textContent = value;
      node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[aria-label]:not([data-aria-hu])").forEach((node) => translateAttribute(node, "aria-label", lang));
    document.querySelectorAll("img[alt]").forEach((node) => translateAttribute(node, "alt", lang));
    applyTextNodeTranslations(lang);
    enhanceHeaderNavigation();
    renderLanguageSelector();
  };

  const setLanguage = (lang) => {
    const normalized = normalizeLanguage(lang) || fallbackLanguage;
    persistLanguage(normalized);
    closeLanguageSelector();
    window.dispatchEvent(new CustomEvent("bps:languagechange", { detail: { lang: normalized } }));
    applyPageLanguage();
  };

  const showToast = (message) => {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.dataset.toast = "true";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const closeHeroLightbox = () => {
    if (!heroLightbox) return;

    heroLightbox.classList.remove("open");
    heroLightbox.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = heroLightboxOpener;
    heroLightboxOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const ensureHeroLightbox = () => {
    if (heroLightbox?.isConnected) return heroLightbox;

    heroLightbox = document.createElement("div");
    heroLightbox.id = "heroLightbox";
    heroLightbox.className = "modal hero-lightbox";
    heroLightbox.setAttribute("role", "dialog");
    heroLightbox.setAttribute("aria-modal", "true");
    heroLightbox.setAttribute("aria-hidden", "true");
    heroLightbox.innerHTML = `
      <button class="backdrop" type="button" data-hero-lightbox-close aria-label="${t("closeImage")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-hero-lightbox-close aria-label="${t("closeImage")}">&times;</button>
        <img alt="">
      </div>
    `;

    heroLightbox.querySelectorAll("[data-hero-lightbox-close]").forEach((button) => {
      button.addEventListener("click", closeHeroLightbox);
    });

    document.body.appendChild(heroLightbox);
    return heroLightbox;
  };

  const openHeroLightbox = (image, opener) => {
    const modal = ensureHeroLightbox();
    const modalImage = modal.querySelector("img");
    const panel = modal.querySelector(".panel");

    heroLightboxOpener = opener;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => panel?.focus());
  };

  const bindHeroLightbox = () => {
    document.querySelectorAll(".hero-media, .service-hero-visual").forEach((target) => {
      if (target.dataset.heroLightboxBound === "true") return;

      const image = target.querySelector("img");
      if (!image) return;

      target.dataset.heroLightbox = "true";
      target.dataset.heroLightboxBound = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", "Open hero image");

      target.addEventListener("click", () => openHeroLightbox(image, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openHeroLightbox(image, target);
      });
    });
  };

  const getGardenGalleryItems = () =>
    [...document.querySelectorAll(".service-hero-visual, .garden-gallery .showcase-photo")].filter((target) =>
      target.querySelector("img")
    );

  const closeGardenGallery = () => {
    if (!gardenGalleryModal) return;

    gardenGalleryModal.classList.remove("open");
    gardenGalleryModal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = gardenGalleryOpener;
    gardenGalleryOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const setGardenGalleryImage = (index) => {
    const items = getGardenGalleryItems();
    if (!items.length || !gardenGalleryModal) return;

    gardenGalleryIndex = (index + items.length) % items.length;
    const item = items[gardenGalleryIndex];
    const image = item.querySelector("img");
    const modalImage = gardenGalleryModal.querySelector("img");
    const caption = gardenGalleryModal.querySelector("[data-garden-gallery-caption]");
    const counter = gardenGalleryModal.querySelector("[data-garden-gallery-count]");
    const navButtons = gardenGalleryModal.querySelectorAll("[data-garden-gallery-step]");
    const captionText = item.querySelector("figcaption")?.innerText?.trim() || image.alt || "";

    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    caption.textContent = captionText;
    counter.textContent = `${gardenGalleryIndex + 1} / ${items.length}`;
    navButtons.forEach((button) => (button.hidden = items.length < 2));
  };

  const moveGardenGallery = (step) => setGardenGalleryImage(gardenGalleryIndex + step);

  const ensureGardenGalleryModal = () => {
    if (gardenGalleryModal?.isConnected) return gardenGalleryModal;

    gardenGalleryModal = document.createElement("div");
    gardenGalleryModal.id = "gardenImageModal";
    gardenGalleryModal.className = "modal hero-lightbox garden-gallery-modal";
    gardenGalleryModal.setAttribute("role", "dialog");
    gardenGalleryModal.setAttribute("aria-modal", "true");
    gardenGalleryModal.setAttribute("aria-hidden", "true");
    gardenGalleryModal.innerHTML = `
      <button class="backdrop" type="button" data-garden-gallery-close aria-label="${t("closeImageGallery")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-garden-gallery-close aria-label="${t("closeImageGallery")}">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-garden-gallery-step="-1" aria-label="${t("previousImage")}">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-garden-gallery-step="1" aria-label="${t("nextImage")}">&#8250;</button>
        <span class="garden-gallery-count" data-garden-gallery-count></span>
        <img alt="">
        <p class="garden-gallery-caption" data-garden-gallery-caption></p>
      </div>
    `;

    gardenGalleryModal.querySelectorAll("[data-garden-gallery-close]").forEach((button) => {
      button.addEventListener("click", closeGardenGallery);
    });

    gardenGalleryModal.querySelectorAll("[data-garden-gallery-step]").forEach((button) => {
      button.addEventListener("click", () => moveGardenGallery(Number(button.dataset.gardenGalleryStep)));
    });

    gardenGalleryModal.addEventListener(
      "touchstart",
      (event) => {
        gardenGalleryTouchStart = event.changedTouches[0]?.clientX || 0;
      },
      { passive: true }
    );

    gardenGalleryModal.addEventListener(
      "touchend",
      (event) => {
        const end = event.changedTouches[0]?.clientX || 0;
        const delta = end - gardenGalleryTouchStart;
        if (Math.abs(delta) > 48) moveGardenGallery(delta < 0 ? 1 : -1);
      },
      { passive: true }
    );

    document.body.appendChild(gardenGalleryModal);
    return gardenGalleryModal;
  };

  const openGardenGallery = (index, opener) => {
    const modal = ensureGardenGalleryModal();
    const panel = modal.querySelector(".panel");

    gardenGalleryOpener = opener;
    setGardenGalleryImage(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => panel?.focus());
  };

  const bindGardenImageGallery = () => {
    if (document.body?.dataset.page !== "garden-maintenance") return;

    getGardenGalleryItems().forEach((target, index) => {
      if (target.dataset.gardenGalleryBound === "true") return;

      const image = target.querySelector("img");
      target.dataset.gardenGalleryBound = "true";
      target.dataset.gardenGalleryItem = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", image?.alt ? `Open image: ${image.alt}` : "Open garden image");

      target.addEventListener("click", () => openGardenGallery(index, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openGardenGallery(index, target);
      });
    });
  };

  const getCleaningGalleryItems = () =>
    [...document.querySelectorAll(".service-hero-visual, .cleaning-gallery .showcase-photo")].filter((target) =>
      target.querySelector("img")
    );

  const getFocusableModalItems = (modal) =>
    [
      ...modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((node) => !node.hidden && !node.disabled && node.offsetParent !== null);

  const trapCleaningGalleryFocus = (event) => {
    const focusable = getFocusableModalItems(cleaningGalleryModal);
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeCleaningGallery = () => {
    if (!cleaningGalleryModal) return;

    cleaningGalleryModal.classList.remove("open");
    cleaningGalleryModal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = cleaningGalleryOpener;
    cleaningGalleryOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const setCleaningGalleryImage = (index) => {
    const items = getCleaningGalleryItems();
    if (!items.length || !cleaningGalleryModal) return;

    cleaningGalleryIndex = (index + items.length) % items.length;
    const item = items[cleaningGalleryIndex];
    const image = item.querySelector("img");
    const modalImage = cleaningGalleryModal.querySelector("img");
    const caption = cleaningGalleryModal.querySelector("[data-cleaning-gallery-caption]");
    const counter = cleaningGalleryModal.querySelector("[data-cleaning-gallery-count]");
    const navButtons = cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-step]");
    const captionText = item.querySelector("figcaption")?.innerText?.trim() || image.alt || "";

    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    caption.textContent = captionText;
    counter.textContent = `${cleaningGalleryIndex + 1} / ${items.length}`;
    navButtons.forEach((button) => (button.hidden = items.length < 2));
  };

  const moveCleaningGallery = (step) => setCleaningGalleryImage(cleaningGalleryIndex + step);

  const ensureCleaningGalleryModal = () => {
    if (cleaningGalleryModal?.isConnected) return cleaningGalleryModal;

    cleaningGalleryModal = document.createElement("div");
    cleaningGalleryModal.id = "cleaningImageModal";
    cleaningGalleryModal.className = "modal hero-lightbox cleaning-gallery-modal";
    cleaningGalleryModal.setAttribute("role", "dialog");
    cleaningGalleryModal.setAttribute("aria-modal", "true");
    cleaningGalleryModal.setAttribute("aria-hidden", "true");
    cleaningGalleryModal.innerHTML = `
      <button class="backdrop" type="button" data-cleaning-gallery-close aria-label="${t("closeImageGallery")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-cleaning-gallery-close aria-label="${t("closeImageGallery")}">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-cleaning-gallery-step="-1" aria-label="${t("previousImage")}">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-cleaning-gallery-step="1" aria-label="${t("nextImage")}">&#8250;</button>
        <span class="garden-gallery-count" data-cleaning-gallery-count></span>
        <img alt="">
        <p class="garden-gallery-caption" data-cleaning-gallery-caption></p>
      </div>
    `;

    cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-close]").forEach((button) => {
      button.addEventListener("click", closeCleaningGallery);
    });

    cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-step]").forEach((button) => {
      button.addEventListener("click", () => moveCleaningGallery(Number(button.dataset.cleaningGalleryStep)));
    });

    cleaningGalleryModal.addEventListener(
      "touchstart",
      (event) => {
        cleaningGalleryTouchStart = event.changedTouches[0]?.clientX || 0;
      },
      { passive: true }
    );

    cleaningGalleryModal.addEventListener(
      "touchend",
      (event) => {
        const end = event.changedTouches[0]?.clientX || 0;
        const delta = end - cleaningGalleryTouchStart;
        if (Math.abs(delta) > 48) moveCleaningGallery(delta < 0 ? 1 : -1);
      },
      { passive: true }
    );

    document.body.appendChild(cleaningGalleryModal);
    return cleaningGalleryModal;
  };

  const openCleaningGallery = (index, opener) => {
    const modal = ensureCleaningGalleryModal();

    cleaningGalleryOpener = opener;
    setCleaningGalleryImage(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.querySelector(".close")?.focus());
  };

  const bindCleaningImageGallery = () => {
    if (document.body?.dataset.page !== "cleaning-services") return;

    getCleaningGalleryItems().forEach((target, index) => {
      if (target.dataset.cleaningGalleryBound === "true") return;

      const image = target.querySelector("img");
      target.dataset.cleaningGalleryBound = "true";
      target.dataset.cleaningGalleryItem = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", image?.alt ? `Open image: ${image.alt}` : "Open cleaning image");

      target.addEventListener("click", () => openCleaningGallery(index, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openCleaningGallery(index, target);
      });
    });
  };

  const ensureStandaloneCleaningLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const existing = nav.querySelector("[data-cleaning-link]") || nav.querySelector('a[href="cleaning-services-budapest.html"]');
    if (existing) {
      existing.dataset.textHu = "Takarítás";
      existing.dataset.textEn = "Cleaning";
      syncTextNodes(currentLang());
      return;
    }

    const link = document.createElement("a");
    link.href = "cleaning-services-budapest.html";
    link.dataset.cleaningLink = "true";
    link.dataset.textHu = "Takarítás";
    link.dataset.textEn = "Cleaning";
    link.textContent = currentLang() === "hu" ? "Takarítás" : "Cleaning";

    const handymanLink = nav.querySelector('a[href="handyman-services-budapest.html"]');
    const gardenLink = nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink = nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    if (handymanLink) {
      handymanLink.insertAdjacentElement("beforebegin", link);
    } else if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else {
      nav.appendChild(link);
    }
  };

  document.addEventListener("keydown", (event) => {
    if (cleaningGalleryModal?.classList.contains("open")) {
      if (event.key === "Escape") closeCleaningGallery();
      if (event.key === "ArrowRight") moveCleaningGallery(1);
      if (event.key === "ArrowLeft") moveCleaningGallery(-1);
      if (event.key === "Tab") trapCleaningGalleryFocus(event);
      return;
    }

    if (gardenGalleryModal?.classList.contains("open")) {
      if (event.key === "Escape") closeGardenGallery();
      if (event.key === "ArrowRight") moveGardenGallery(1);
      if (event.key === "ArrowLeft") moveGardenGallery(-1);
      return;
    }

    if (event.key === "Escape" && heroLightbox?.classList.contains("open")) {
      closeHeroLightbox();
      return;
    }

    if (event.key === "Escape") {
      closeLanguageSelector();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".language-selector")) return;
    closeLanguageSelector();
  });

  const copyPhoneToClipboard = async (lang = currentLang()) => {
    const success = t("phoneCopied", lang);
    const fallback = t("phoneFallback", lang);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phone);
        showToast(success);
      } else {
        showToast(fallback);
      }
    } catch {
      showToast(fallback);
    }
  };

  const bindPhoneActions = () => {
    document.querySelectorAll("[data-phone-action]").forEach((link) => {
      if (link.dataset.phoneBound === "true") return;
      link.dataset.phoneBound = "true";
      link.href = tel;
      link.addEventListener("click", (event) => {
        if (directCallViewport()) return;
        event.preventDefault();
        copyPhoneToClipboard(currentLang());
      });
    });
  };

  const syncTextNodes = (lang) => {
    applyPageLanguage(lang);
  };

  const applyStandaloneLanguage = () => {
    applyPageLanguage();
  };

  const initStandaloneReveals = () => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
  };

  const initStandalonePage = () => {
    ensureStandaloneCleaningLink();
    applyStandaloneLanguage();
    enhanceHeaderNavigation();
    bindPhoneActions();
    if (document.body?.dataset.page === "garden-maintenance") {
      bindGardenImageGallery();
    } else if (document.body?.dataset.page === "cleaning-services") {
      bindCleaningImageGallery();
    } else {
      bindHeroLightbox();
    }
    initStandaloneReveals();

    window.addEventListener("resize", () => {
      syncTextNodes(currentLang());
      syncHeaderNavigationState();
    }, { passive: true });
  };

  window.BPS_I18N = {
    currentLang,
    setLanguage,
    applyPageLanguage,
    translatePhrase,
    t,
  };

  if (["property-maintenance", "handyman-services", "painting-wall-repairs", "garden-maintenance", "cleaning-services"].includes(document.body?.dataset.page)) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initStandalonePage, { once: true });
    } else {
      initStandalonePage();
    }
    return;
  }

  const situationImages = [
    "assets/budapest-apartment-wall-refresh.jpg",
    "assets/budapest-airbnb-before-turnover-matched.jpg",
    "assets/budapest-painting-before-matched.jpg",
    "assets/budapest-handyman-before-matched.jpg",
    "assets/budapest-garden-before-matched.jpg",
    "assets/budapest-office-before-touchup-matched.jpg",
  ];

  let scheduled = false;

  const homeLang = () => (document.documentElement.lang === "en" ? "en" : "hu");

  const applySituationImages = () => {
    document.querySelectorAll(".situation-grid .problem img").forEach((image, index) => {
      const source = situationImages[index];
      if (!source) return;

      const absolute = new URL(source, document.baseURI).href;
      if (image.src !== absolute) image.src = source;
      image.removeAttribute("srcset");
    });
  };

  const applyMaintenanceLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Karbantartás" : "Maintenance";
    const existing = nav.querySelector("[data-maintenance-link]");

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "property-maintenance-budapest.html";
    link.dataset.maintenanceLink = "true";
    link.textContent = label;

    const servicesLink = nav.querySelector('a[href="#services"]');
    if (servicesLink) {
      servicesLink.insertAdjacentElement("afterend", link);
    } else {
      nav.appendChild(link);
    }
  };

  const applyHandymanLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Ezermester" : "Handyman";
    const existing =
      nav.querySelector("[data-handyman-link]") ||
      nav.querySelector('a[href="handyman-services-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "handyman-services-budapest.html";
    link.dataset.handymanLink = "true";
    link.textContent = label;

    const gardenLink =
      nav.querySelector("[data-garden-link]") ||
      nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyPaintingLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Festés és faljavítás" : "Painting & Wall Repairs";
    const existing = nav.querySelector("[data-painting-link]") || nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "painting-wall-repairs-budapest.html";
    link.dataset.paintingLink = "true";
    link.textContent = label;

    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyGardenLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Kertfenntartás" : "Garden Maintenance";
    const existing = nav.querySelector("[data-garden-link]") || nav.querySelector('a[href="garden-maintenance-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "garden-maintenance-budapest.html";
    link.dataset.gardenLink = "true";
    link.textContent = label;

    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyCleaningLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Takarítás" : "Cleaning";
    const existing =
      nav.querySelector("[data-cleaning-link]") ||
      nav.querySelector('a[href="cleaning-services-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "cleaning-services-budapest.html";
    link.dataset.cleaningLink = "true";
    link.textContent = label;

    const handymanLink =
      nav.querySelector("[data-handyman-link]") ||
      nav.querySelector('a[href="handyman-services-budapest.html"]');
    const gardenLink =
      nav.querySelector("[data-garden-link]") ||
      nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");

    if (handymanLink) {
      handymanLink.insertAdjacentElement("beforebegin", link);
    } else if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyHomeEnhancements = () => {
    applySituationImages();
    applyMaintenanceLink();
    applyPaintingLink();
    applyGardenLink();
    applyCleaningLink();
    applyHandymanLink();
    applyPageLanguage();
    bindHeroLightbox();
  };

  const scheduleHomeEnhancements = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyHomeEnhancements();
    });
  };

  const observeHome = () => {
    applyHomeEnhancements();

    new MutationObserver(scheduleHomeEnhancements).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const loadCoreScript = () => {
    const script = document.createElement("script");
    script.src = "script-core.js";
    script.async = false;
    script.onload = applyHomeEnhancements;
    script.onerror = () => {
      console.error("Budapest Property Services core script could not be loaded.");
    };
    document.head.appendChild(script);
  };

  window.BPS_I18N.afterHomeRender = () => applyHomeEnhancements();

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        observeHome();
        loadCoreScript();
      },
      { once: true }
    );
  } else {
    observeHome();
    loadCoreScript();
  }
})();
