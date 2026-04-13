# Paul Burg Personal Website

A modern, bilingual (RU/EN) personal website for Paul Burg, built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ established
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PaulBurg.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌍 Bilingual Support
The site supports Russian (RU) and English (EN).
- **Default Language**: Russian.
- **Switching**: Use the global `LanguageProvider` context. Translations are stored in `lib/translations.ts`.
- **Toggle**: Click the RU/EN button in the top navigation bar.

## 🖼️ Content Management

### Hero Photo Replacement
To change the main background photo in the Hero section:
1. Place your high-quality photo (centered portrait) in the `public/` directory (e.g., `public/hero.png`).
2. Ensure the filename matches usage in `components/Hero.tsx` (current `src="/hero.png"`).
3. Optimized using `next/image` for performance.

### Text Edits
All text content is located in `lib/translations.ts`. To update text:
1. Open `lib/translations.ts`.
2. Edit the strings for `ru` or `en` objects.
3. Changes reflect instantly.

## 🛠️ Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State**: React Context API (LanguageContext)
- **Fonts**: Inter (Body), Playfair Display (Headings) via `next/font/google`
- **Icons**: Lucide React

## 🔮 Future Improvements
- **Blog**: Add a blog section using Next.js MDX or a headless CMS.
- **Testimonials**: Add a carousel section for client reviews.
