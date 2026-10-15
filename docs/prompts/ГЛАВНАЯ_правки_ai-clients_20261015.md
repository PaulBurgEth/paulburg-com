# Главная paulburg.com: правки под /ai-clients (предложение, не применено)

15.10.2026. Сверено с `components/home/HomePageClient.tsx` на `main` (871131a). Код не трогали, ждём слова Paul. Каждая правка в EN и RU одновременно.

## Задача

На главной две услуги: «Клиенты» (/outbound) и «Системы» (/services). Новая страница /ai-clients нигде не видна. Человек, пришедший на главную из письма GEO, не найдёт то, о чём письмо.

## Правки: было → станет

| # | место | было | станет |
|---|---|---|---|
| 1 | `hero-desc`, ~стр. 704 | «Две отдельные услуги для B2B. Первая: нахожу вам клиентов… Вторая: строю системы…» / «Two separate services for B2B. First… Second…» | «Три услуги для B2B. Нахожу вам клиентов письмами. Делаю так, чтобы вас называли ChatGPT и Google AI Mode, а заявки с сайта получали ответ за минуту. Строю системы, на которых держится бизнес.» / «Three services for B2B. I find you clients by letter. I get you named by ChatGPT and Google AI Mode, and make sure inquiries on your site are answered in a minute. I build the systems a business runs on.» |
| 2 | `tags`, ~стр. 711 | 5 тегов | добавить gold-тег «AI-ответы и AI-продавец» / «AI answers & AI Sales Manager» вторым |
| 3 | `hero-lines`, после карточки /outbound, ~стр. 731 | две `line-card` | третья `line-card` на /ai-clients: k «Услуга вторая» / «Service two» (остальные сдвигаются на «третья»), t «AI-ответы и AI-продавец» / «AI answers & AI Sales Manager», d «Вас называют в ChatGPT и Google AI Mode, а каждая заявка на сайте получает ответ за минуту, днём и ночью.» / «Named in ChatGPT and Google AI Mode answers, and every inquiry on your site answered in a minute, day and night.», m «Замеры на 30-й и 60-й день» / «Measured on day 30 and day 60» |
| 4 | `.hero-lines` CSS (шаблонная строка в том же файле) | сетка на 2 колонки | 3 колонки от `lg`, 1 колонка на телефоне; проверить RU на 375px |
| 5 | Карточка «AI-боты» в сетке услуг, ~стр. 765 | «Чат-боты и агенты: квалификация лидов, ответы 24/7…» | без изменения текста; добавить ссылку «Подробнее: AI-продавец →» на /ai-clients |

## Что не менять

| место | почему |
|---|---|
| карточка /outbound и блок OUTBOUND (~стр. 896) | канон SDR, отдельная услуга |
| «Работает человек, а не рассылка.» | про аутбаунд, остаётся |
| Navbar, Footer | ссылка в навигации только с отдельного согласия Paul (промпт §3) |

## Вопрос к Paul

Навигация: добавлять ли пункт «AI-ответы» / «AI answers» в шапку (Navbar сейчас: Services, Outbound, Mentorship, Blog)?
