export type Language = 'ru' | 'en';

export const translations = {
    ru: {
        nav: {
            about: "Обо мне",
            projects: "Проекты",
            media: "Медиа",
            mentorship: "Менторство",
            cta: "Связаться",
            // mentorship page nav
            services: "Услуги",
            formats: "Форматы и оплата",
            start: "Как начать",
            backHome: "Главная",
        },
        // ─── HOMEPAGE ────────────────────────────────────
        home: {
            hero: {
                name: "Павел Burg",
                tagline: "Серийный предприниматель • Founder/CEO • Цифровой номад",
                description: "Создаю на пересечении Web3, ReFi, AI и инфраструктуры реального воздействия",
            },
            about: {
                title: "Обо мне",
                name: "Павел Burg",
                p1: "Цифровой номад с 2015 года: жил и работал в России, США, Китае, Таиланде и других странах.",
                p2: "Серийный основатель стартапов с опытом в электронной коммерции, цепочках поставок и международных операциях. По образованию — учёный-эколог.",
                p3: "Более трёх лет глубоко погружён в блокчейн, общественные блага и реальное воздействие на мир — основал студию EcoSynthesisX, ReFi Phangan и GreenPill Phangan, разработал маркетплейс для токенизированных общественных благ Regen Bazaar, сеть DeCleanup и концепцию продуктов воздействия.",
                p4: "Преподавал английский язык в Китае — работал с детьми и взрослыми, с акцентом на разговорных навыках и уверенности в общении.",
            },
            projects: {
                title: "Проекты",
                subtitle: "Стартапы и инициативы, которые я создаю",
            },
            mentorshipTeaser: {
                title: "Менторство",
                description: "Три направления — одна цель: ваша свобода. Капитал, Бизнес, Коммуникация.",
                cta: "Узнать подробнее",
            },
            media: {
                title: "Подкасты и интервью",
                listen: "Слушать",
                watch: "Смотреть",
            },
        },
        // ─── MENTORSHIP PAGE ─────────────────────────────
        mentorship: {
            meta: {
                title: "Менторство | Павел Burg",
                description: "Менторство для жизни и бизнеса в глобальном мире. Капитал, Бизнес, Коммуникация.",
            },
            hero: {
                headline: "Менторство для бизнеса, капитала и AI в современном мире",
                subheadline: "Три направления — одна цель: ваша свобода",
                pills: "Капитал · Бизнес · AI и Автоматизация",
                ctaBook: "Оставить заявку",
                ctaTelegram: "Написать в Telegram",
                ctaWhatsApp: "Написать в WhatsApp",
                ctaCall: "Бесплатный звонок",
                smallText: "Онлайн по всему миру • Оффлайн по договорённости",
            },
            bridge: {
                intro: "Я верю, что современному человеку для успеха нужны три опоры:",
                p1: "умение использовать AI",
                p1_text: "чтобы усилить работу, автоматизировать рутину и масштабировать результат",
                p2: "финансовый фундамент",
                p2_text: "как залог спокойствия и возможности ждать нужного момента",
                p3: "бизнес как инструмент",
                p3_text: "реализации таланта и создания ценности для других",
                outro: "Этим трём опорам — AI и Автоматизации, Капиталу и Бизнесу — я и обучаю в своём менторстве."
            },
            painPoints: {
                title: "Узнаёшь себя?",
                card1: {
                    title: "КАПИТАЛ",
                    points: [
                        "Деньги есть, но лежат мертвым грузом или обесцениваются.",
                        "Криптодоходность кажется сложной и опасной, а обычные банки — невыгодными.",
                        "Хочется стабильного пассивного дохода в твердой валюте."
                    ]
                },
                card2: {
                    title: "БИЗНЕС",
                    points: [
                        "Есть идея, но нет понимания, как превратить её в продукт и вывести на рынок.",
                        "Проект застрял, процессы хаотичны, а мотивация падает.",
                        "Нужен свежий взгляд и стратегия от того, кто сам строит в Web3."
                    ]
                },
                card3: {
                    title: "AI И АВТОМАТИЗАЦИЯ",
                    points: [
                        "Слышишь про AI, но не понимаешь, как применить его в своём бизнесе.",
                        "Рутина съедает время, а команда занята повторяющимися задачами.",
                        "Хочешь использовать AI-инструменты осознанно — для результата, а не ради хайпа."
                    ]
                }
            },
            services: {
                title: "Услуги",
                more: "Узнать больше",
                card1: {
                    title: "DeFi-стратегии пассивного дохода",
                    description: "Стабильная доходность на простаивающий капитал через DeFi-протоколы — дисциплинированно, с открытыми глазами на риски, без трейдинга и иксов.",
                    lists: {
                        howItWorks: [
                            "Стабильная доходность 5–10% годовых в долларах через DeFi-протоколы.",
                            "Staking, lending, liquidity providing на аудированных платформах с историей.",
                            "Реалистично про риски — у DeFi есть реальное exposure (баги в смарт-контрактах, эксплоиты протоколов, depeg'и стейблкоинов; даже у зрелых протоколов вроде Aave были инциденты). Сайзим позиции и диверсифицируем под worst-case.",
                            "Минимизация рисков: due diligence по протоколам, диверсификация по протоколам и чейнам, защита от волатильности через стейблкоины."
                        ],
                        whatYouGet: [
                            "Индивидуальный план под твой капитал и уровень комфорта с рисками.",
                            "Полный контроль над своими средствами 24/7 — non-custodial кошельки, никаких посредников."
                        ],
                        whoIsThisFor: [
                            "Для тех, у кого есть $10k+, которые лежат без дела на банковском счёте, и кто хочет сохранить капитал + получать стабильный пассивный доход через DeFi — с открытыми глазами на риски."
                        ]
                    },
                    prices: [
                        "50$ / час",
                        "Бесплатный 15-минутный intro-call",
                    ],
                    button: "Создать пассивный доход"
                },
                card2: {
                    title: "Упаковка бизнес-идей и разбор блоков",
                    description: "От сырой идеи до go-to-market или вывод существующего проекта на новый уровень.",
                    lists: {
                        howItWorks: [
                            "Анализ рынка, конкурентов, монетизации.",
                            "Простая GTM-стратегия: первые шаги, MVP, каналы.",
                            "Разбор текущих блоков (продажи, продукт, мотивация)."
                        ],
                        whatYouGet: [
                            "Фидбек из опыта Web3-фаундера + инсайты из экосистемы.",
                            "Пошаговый план выхода на новый уровень."
                        ],
                        whoIsThisFor: [
                            "Фаундеры с идеей, застрявшие проекты или те, кому нужен свежий взгляд и стратегия."
                        ]
                    },
                    prices: [
                        "50$ / час",
                        "Бесплатный 15-минутный intro-call",
                    ],
                    button: "Разобрать мою идею"
                },
                card3: {
                    title: "Эффективная работа с AI",
                    description: "Как использовать AI-инструменты осознанно — для бизнеса, рутины и роста.",
                    lists: {
                        howItWorks: [
                            "Разбор твоих процессов: где AI даст максимальный эффект.",
                            "Практика с ChatGPT, Claude, Cursor и AI-ассистентами под твои задачи.",
                            "Подбор стека: от простых промптов до автоматизаций и AI-агентов."
                        ],
                        whatYouGet: [
                            "Понимание, как применять AI в реальной работе без хайпа.",
                            "Готовые шаблоны, промпты и сценарии под твой бизнес или роль."
                        ],
                        whoIsThisFor: [
                            "Предприниматели, фрилансеры и команды, которые хотят перестать тратить часы на то, что AI делает за минуты."
                        ]
                    },
                    prices: [
                        "50$ / час",
                        "Бесплатный 15-минутный intro-call",
                    ],
                    button: "Начать с AI"
                },
                priceTitle: "Цены",
                howTitle: "Как это работает",
                getTitle: "Что вы получите",
                forTitle: "Для кого это",
            },
            formats: {
                title: "Форматы и оплата",
                online: "Онлайн: Google Meet",
                offline: "Оффлайн: по договорённости",
                payment: "Оплата: USDT/USDC или перевод на тайский банк",
            },
            cta: {
                title: "Готов начать?",
                text: "Забронируй бесплатный 15-минутный звонок или напиши напрямую.",
                subtext: "Разберём твою ситуацию, подберём направление и время. Без продаж — просто разговор.",
                ctaBook: "Оставить заявку",
                buttonText: "Написать в Telegram",
                ctaWhatsApp: "Написать в WhatsApp",
                ctaCall: "Бесплатный звонок",
            },
        },
        // ─── SHARED ──────────────────────────────────────
        podcasts: {
            items: {
                item1: {
                    title: "Подкаст Crypto Altruism, эпизод 138 — ReFi Phangan",
                    link: "https://www.cryptoaltruism.org/blog/crypto-altruism-podcast-episode-138-refi-phangan-regenerative-finance-quadratic-funding-and-local-impact"
                },
                item2: {
                    title: "Подкаст Crypto Altruism, эпизод 201 — Web3-локализм для глобального климата",
                    link: "https://www.cryptoaltruists.com/blog/crypto-altruists-episode-201-web3-localism-for-global-climate-action-from-decentralized-cleanups-to-regenerative-local-economies"
                },
                item3: {
                    title: "Продукты воздействия и Рынок воздействия — Пол Бург, Devcon 7 SEA",
                    link: "https://youtu.be/40KkjjSW3C8?si=UyItTaLZgIbQm8YM"
                },
                item4: {
                    title: "Super dApp Builders, эпизод 01 | Пол Бург из DeCleanup Network",
                    link: "https://youtu.be/zVgZX1Nj48E?si=UGF09-fS0DVuJTCb"
                }
            },
        },
        footer: {
            rights: "Paul Burg. All rights reserved.",
        },
    },
    en: {
        nav: {
            about: "About",
            projects: "Projects",
            media: "Media",
            mentorship: "Mentorship",
            cta: "Contact",
            services: "Services",
            formats: "Formats & Payment",
            start: "Get Started",
            backHome: "Home",
        },
        // ─── HOMEPAGE ────────────────────────────────────
        home: {
            hero: {
                name: "Paul Burg",
                tagline: "Building AI tools and Web3 infrastructure for the real world",
                description: "",
            },
            about: {
                title: "About Me",
                name: "Paul Burg",
                p1: "Pioneering entrepreneur and strategy leader with 10+ years in business development, operations, and digital transformation. Expert in AI-driven automation, marketplace platforms, and sustainable impact projects. I build at the intersection of AI, Web3, and real-world impact.",
                p2: "Digital nomad since 2015 — lived and worked across Russia, USA, China, and Thailand. Founded EcoSynthesisX, ReFi Phangan, GreenPill Phangan, DeCleanup Network, and Regen Bazaar. Speaker at Devcon 7 SEA Bangkok. Environmental scientist by education.",
                p3: "Proven in team leadership, fundraising, international partnerships, and delivering measurable results in remote and global environments. Currently based in Koh Phangan, Thailand.",
                p4: "Open to collaborations, partnerships, and building with people who care about real impact.",
            },
            projects: {
                title: "Projects",
                subtitle: "Startups and initiatives I'm building",
            },
            mentorshipTeaser: {
                title: "Mentorship",
                description: "Three Areas — One Goal: Your Freedom. Capital, Business, Communication.",
                cta: "Learn More",
            },
            media: {
                title: "Podcasts & Interviews",
                listen: "Listen",
                watch: "Watch",
            },
        },
        // ─── MENTORSHIP PAGE ─────────────────────────────
        mentorship: {
            meta: {
                title: "Mentorship | Paul Burg",
                description: "Mentorship for life and business in a global world. Capital, Business, Communication.",
            },
            hero: {
                headline: "Mentorship for Business, Capital, and AI in a Modern World",
                subheadline: "Three Areas — One Goal: Your Freedom",
                pills: "Capital · Business · AI & Automation",
                ctaBook: "Drop me a hint",
                ctaTelegram: "Text me on Telegram",
                ctaWhatsApp: "Text me on WhatsApp",
                ctaCall: "Book a free call",
                smallText: "Online worldwide • Offline by agreement",
            },
            bridge: {
                intro: "I believe that a modern person needs three pillars for success:",
                p1: "the ability to leverage AI",
                p1_text: "to amplify your work, automate routine, and scale your impact",
                p2: "a financial foundation",
                p2_text: "as a guarantee of peace of mind and the ability to wait for the right moment",
                p3: "business as a tool",
                p3_text: "for realizing talent and creating value for others",
                outro: "In my mentorship, I teach these three pillars: AI & Automation, Capital, and Business."
            },
            painPoints: {
                title: "Do you recognize yourself?",
                card1: {
                    title: "CAPITAL",
                    points: [
                        "You have money, but it is sitting as dead weight or losing value.",
                        "Crypto yields seem complicated and dangerous, and conventional banks are unprofitable.",
                        "You want a stable passive income in hard currency."
                    ]
                },
                card2: {
                    title: "BUSINESS",
                    points: [
                        "You have an idea, but no understanding of how to turn it into a product and bring it to market.",
                        "The project is stuck, processes are chaotic, and motivation is falling.",
                        "You need a fresh look and a strategy from someone who is building in Web3 themselves."
                    ]
                },
                card3: {
                    title: "AI & AUTOMATION",
                    points: [
                        "You hear about AI everywhere but don't know how to apply it in your business.",
                        "Routine work eats your time, and your team is stuck doing repetitive tasks.",
                        "You want to use AI tools intentionally — for results, not hype."
                    ]
                }
            },
            services: {
                title: "Services",
                more: "Learn more",
                card1: {
                    title: "DeFi Income Strategies",
                    description: "Stable yields on idle capital through DeFi protocols — disciplined, eyes-open about real risks, no trading or pumps.",
                    lists: {
                        howItWorks: [
                            "Stable 5–10% APY in dollars through DeFi protocols.",
                            "Staking, lending, liquidity providing on audited platforms with track record.",
                            "Realistic about risks — DeFi has real exposure (smart-contract bugs, protocol exploits, stablecoin depegs; even mature protocols like Aave have seen incidents). We size positions and diversify around worst-case.",
                            "Risk minimization: protocol due diligence, diversification across protocols and chains, volatility protection via stablecoins."
                        ],
                        whatYouGet: [
                            "Individual plan tailored to your capital and risk comfort level.",
                            "Full control over your funds 24/7 — non-custodial wallets, no intermediaries."
                        ],
                        whoIsThisFor: [
                            "For those with $10k+ sitting idle in a bank account who want to preserve capital and earn stable passive income through DeFi — with eyes open to the risks involved."
                        ]
                    },
                    prices: [
                        "$50 / hour",
                        "Free 15-minute intro call",
                    ],
                    button: "Build Passive Income"
                },
                card2: {
                    title: "Business Idea Packaging & Unblocking",
                    description: "From a raw idea to go-to-market or taking an existing project to a new level.",
                    lists: {
                        howItWorks: [
                            "Market analysis, competitors, monetization.",
                            "Simple GTM strategy: first steps, MVP, channels.",
                            "Breakdown of current blocks (sales, product, motivation)."
                        ],
                        whatYouGet: [
                            "Feedback from Web3 founder experience + ecosystem insights.",
                            "Step-by-step plan to reach next level."
                        ],
                        whoIsThisFor: [
                            "Founders with an idea, stuck projects, or those needing a fresh look and strategy."
                        ]
                    },
                    prices: [
                        "$50 / hour",
                        "Free 15-minute intro call",
                    ],
                    button: "Review My Idea"
                },
                card3: {
                    title: "Working with AI Effectively",
                    description: "How to use AI tools intentionally — for business, daily work, and growth.",
                    lists: {
                        howItWorks: [
                            "Review your processes: where AI gives the biggest leverage.",
                            "Hands-on practice with ChatGPT, Claude, Cursor, and AI assistants for your tasks.",
                            "Pick the right stack: from simple prompts to automations and AI agents."
                        ],
                        whatYouGet: [
                            "A clear understanding of how to apply AI in real work — without the hype.",
                            "Ready-to-use prompts, templates, and workflows tailored to your business or role."
                        ],
                        whoIsThisFor: [
                            "Entrepreneurs, freelancers, and teams who want to stop spending hours on work AI can do in minutes."
                        ]
                    },
                    prices: [
                        "$50 / hour",
                        "Free 15-minute intro call",
                    ],
                    button: "Start with AI"
                },
                priceTitle: "Prices",
                howTitle: "How it works",
                getTitle: "What you get",
                forTitle: "For who is this",
            },
            formats: {
                title: "Formats & Payment",
                online: "Online: Google Meet",
                offline: "Offline: by agreement",
                payment: "Payment: USDT/USDC or transfer to Thai bank",
            },
            cta: {
                title: "Ready to start?",
                text: "Book a free 15-minute call or message me directly.",
                subtext: "We'll map your situation, pick the right direction, and set a time. No sales pitch — just a conversation.",
                ctaBook: "Drop me a hint",
                buttonText: "Text me on Telegram",
                ctaWhatsApp: "Text me on WhatsApp",
                ctaCall: "Book a free call",
            },
        },
        // ─── SHARED ──────────────────────────────────────
        podcasts: {
            items: {
                item1: {
                    title: "Crypto Altruism Podcast Ep. 138 — ReFi Phangan",
                    link: "https://www.cryptoaltruism.org/blog/crypto-altruism-podcast-episode-138-refi-phangan-regenerative-finance-quadratic-funding-and-local-impact"
                },
                item2: {
                    title: "Crypto Altruism Podcast Ep. 201 — Web3 Localism for Global Climate",
                    link: "https://www.cryptoaltruists.com/blog/crypto-altruists-episode-201-web3-localism-for-global-climate-action-from-decentralized-cleanups-to-regenerative-local-economies"
                },
                item3: {
                    title: "Impact Products & Marketplace — Paul Burg @ Regen Hub Devcon 7 SEA",
                    link: "https://youtu.be/40KkjjSW3C8?si=UyItTaLZgIbQm8YM"
                },
                item4: {
                    title: "Super dApp Builders EP01 | Paul Burg from DeCleanup Network",
                    link: "https://youtu.be/zVgZX1Nj48E?si=UGF09-fS0DVuJTCb"
                }
            },
        },
        footer: {
            rights: "Paul Burg. All rights reserved.",
        },
    },
};

// Project data (language-independent URLs and colors)
export const projectsData = [
    {
        id: "ecosynthesisx",
        url: "https://ecosynthesisx.com",
        color: "#10B981",
        size: "large" as const,
        group: "impact",
    },
    {
        id: "regenbazaar",
        url: "https://regenbazaar.com",
        color: "#8B5CF6",
        size: "normal" as const,
        group: "impact",
        subTags: [
            { label: "EcoThailand", url: "https://regenbazaar.com" },
            { label: "Clean Phangan", url: "https://regenbazaar.com" },
        ],
    },
    {
        id: "decleanup",
        url: "https://decleanup.net",
        color: "#06B6D4",
        size: "normal" as const,
        group: "impact",
    },
    {
        id: "vitacrypt",
        url: "https://vitacrypt.xyz",
        color: "#EC4899",
        size: "normal" as const,
    },
    {
        id: "helprent",
        url: "https://helprentphangan.com",
        color: "#F59E0B",
        size: "normal" as const,
        group: "phangan",
    },
    {
        id: "guidephangan",
        url: "https://guidephngan.com",
        color: "#EF4444",
        size: "normal" as const,
        group: "phangan",
    },
];

export const projectTranslations = {
    ru: {
        ecosynthesisx: {
            name: "EcoSynthesisX",
            description: "Open-source студия общественных благ, пионер токенизации реального воздействия. Строим инфраструктуру Глобального рынка воздействия — от Impact Products до маркетплейса токенизированных общественных благ.",
        },
        regenbazaar: {
            name: "Regen Bazaar & Impact Products",
            description: "Децентрализованный маркетплейс для токенизированных общественных благ. Хостит Impact Products: EcoThailand и Clean Phangan — финансирование локальных экологических инициатив с криптографической верификацией.",
        },
        decleanup: {
            name: "DeCleanup",
            description: "Web3 dApp, превращающий физические экологические уборки в капитал, стимулируя сообщества к регенеративным действиям.",
        },
        vitacrypt: {
            name: "VitaCrypt",
            description: "Платформа персонального здоровья нового поколения с полностью гомоморфным шифрованием (FHE) для максимальной приватности данных.",
        },
        helprent: {
            name: "HelpRent Phangan",
            description: "Экосистема недвижимости для цифровых номадов: долгосрочная аренда, туры и локальные гиды.",
        },
        guidephangan: {
            name: "Guide Phangan",
            description: "Аутентичный локальный гид для номадов и экспатов — навигация по островной жизни.",
        },
    },
    en: {
        ecosynthesisx: {
            name: "EcoSynthesisX",
            description: "An open-source public good studio pioneering the tokenization of real-world impact. Building infrastructure for a Global Impact Market — from Impact Products and decentralized cleanups to a marketplace for tokenized public goods.",
        },
        regenbazaar: {
            name: "Regen Bazaar & Impact Products",
            description: "A decentralized marketplace for tokenized public goods. Hosts Impact Products like EcoThailand and Clean Phangan — funding local environmental initiatives with on-chain verification.",
        },
        decleanup: {
            name: "DeCleanup",
            description: "A Web3 dApp that converts physical environmental cleanups into capital, incentivizing communities for regenerative actions.",
        },
        vitacrypt: {
            name: "VitaCrypt",
            description: "A next-generation personal health intelligence platform leveraging Fully Homomorphic Encryption (FHE) for ultimate data privacy.",
        },
        helprent: {
            name: "HelpRent Phangan",
            description: "A comprehensive real estate ecosystem for digital nomads, streamlining long-term rentals and integrating local tours and guides.",
        },
        guidephangan: {
            name: "Guide Phangan",
            description: "An authentic, localized travel and community guide designed to help nomads and expats seamlessly navigate island life.",
        },
    },
};
