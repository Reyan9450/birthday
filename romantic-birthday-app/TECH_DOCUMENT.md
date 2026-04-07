# Romantic Birthday App — Technical Documentation

## Project Overview

A fully client-side, single-page romantic birthday web application. It guides the recipient through a linear, multi-step emotional journey — from a heart-catching mini game to love letters, a birthday wish, a live relationship timer, and a closing message. No backend, no database, no API calls.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Build Tool | Vite | ^8.0.4 |
| UI Library | React | ^19.2.4 |
| Language | TypeScript | ~6.0.2 |
| Styling | Tailwind CSS | ^3.4.19 |
| Confetti | canvas-confetti | ^1.9.4 |
| Testing Framework | Vitest | ^4.1.3 |
| DOM Testing | @testing-library/react | ^16.3.2 |
| User Events | @testing-library/user-event | ^14.6.1 |
| DOM Matchers | @testing-library/jest-dom | ^6.9.1 |
| Property Testing | fast-check | ^4.6.0 |
| Test Environment | jsdom | ^29.0.2 |
| CSS Processing | PostCSS + Autoprefixer | ^8.5.8 / ^10.4.27 |

---

## Project Structure

```
romantic-birthday-app/
├── index.html                        # Entry HTML, Google Fonts links
├── vite.config.ts                    # Vite + Vitest config
├── tailwind.config.js                # Tailwind font families, content paths
├── postcss.config.js                 # PostCSS with Tailwind + Autoprefixer
├── tsconfig.json / tsconfig.app.json # TypeScript config with Vitest types
├── package.json
└── src/
    ├── main.tsx                      # React DOM root mount
    ├── App.tsx                       # Root component, section routing
    ├── config.ts                     # Central config (names, dates, images, music)
    ├── index.css                     # Tailwind directives + global CSS keyframes
    ├── test-setup.ts                 # @testing-library/jest-dom setup
    │
    ├── hooks/
    │   ├── useTypingAnimation.ts     # Character-by-character typing hook
    │   └── useRelationshipTimer.ts   # Live elapsed-time timer hook
    │
    ├── FloatingHeartsBackground.tsx  # Persistent animated hearts layer
    ├── LoadingScreen.tsx             # 2-second pulsing heart intro
    ├── MusicToggle.tsx               # Fixed mute/unmute button
    ├── PageTransition.tsx            # Fade-in wrapper on section change
    │
    ├── HeartMiniGame.tsx             # Section 0 — heart catching game
    ├── RomanticIntro.tsx             # Section 1 — typing animation intro
    ├── FirstMeeting.tsx              # Section 2 — first meeting memory
    ├── FavoriteMemory.tsx            # Section 3 — favorite memory
    ├── WhyILoveYou.tsx               # Section 4 — interactive love cards
    ├── LoveCard.tsx                  # Reusable card component
    ├── LoveLetters.tsx               # Section 5 — envelope letters
    ├── EnvelopeCard.tsx              # Reusable envelope component
    ├── BirthdayWish.tsx              # Section 6 — confetti birthday page
    ├── RelationshipTimer.tsx         # Section 7 — live timer display
    └── FinalPage.tsx                 # Section 8 — closing message
    │
    └── __tests__/
        ├── App.test.tsx
        ├── RomanticIntro.test.tsx
        ├── BirthdayWish.test.tsx
        └── FinalPage.test.tsx
```

---

## Architecture

### Section Routing

`App.tsx` holds two pieces of state:
- `loading: boolean` — shows `LoadingScreen` until the 2-second animation completes
- `currentSection: number` (0–8) — determines which section component to render

Navigation is one-directional (forward only). Each section receives an `onNext` callback that increments `currentSection`. `FinalPage` (section 8) is the last section and receives no `onNext`.

```
App
 ├── LoadingScreen (while loading)
 └── (after loading)
     ├── FloatingHeartsBackground  ← persistent overlay
     ├── MusicToggle               ← persistent overlay
     └── PageTransition
         └── [active section component]
```

### Configuration

All personalizable values live in `src/config.ts`:

```ts
export interface AppConfig {
  recipientName: string;
  relationshipStartDate: string; // ISO 8601
  firstMeetingImage: string;     // URL or empty string
  musicSrc: string;              // URL or empty string
  firstMeetingText: string;
  favoriteMemoryText: string;
}
```

---

## Components

### `FloatingHeartsBackground`
- Renders 15 ❤️ elements with randomized `left`, `animation-duration`, `delay`, and `font-size`
- Fixed full-screen layer, `pointer-events: none`, `z-index: 0`
- Uses `floatHeart` CSS keyframe (defined in `index.css`)

### `LoadingScreen`
- Props: `onComplete: () => void`
- Displays a pulsing ❤️ using `.pulse-heart` CSS class
- Calls `onComplete` after 2000ms via `setTimeout` (cleaned up on unmount)

### `PageTransition`
- Props: `children`, `sectionKey: number`
- Inner `FadeIn` component re-mounts on `sectionKey` change via React `key` prop
- Applies `.page-fade-in` CSS class on mount via `requestAnimationFrame`

### `MusicToggle`
- Returns `null` if `config.musicSrc` is empty
- Uses `useRef<HTMLAudioElement>` to control a hidden `<audio>` element
- Attempts autoplay on mount; toggles `audio.muted` on click
- Fixed bottom-right position, shows 🔊 / 🔇

### `HeartMiniGame` (Section 0)
- Spawns 20 hearts on mount; interval adds more every 400ms up to a cap of 20
- Each `Heart`: `{ id, x: 0–100%, speed: 3–7s, delay: 0 }`
- Click removes heart from state and increments `collected`
- At `collected >= 5`: shows unlock message and "Start Our Journey" button

### `RomanticIntro` (Section 1)
- Uses `useTypingAnimation` hook at 50ms/char
- Shows a blinking cursor while typing
- "Continue" button only appears when `displayedText === fullText`

### `FirstMeeting` (Section 2)
- Fade-in on mount via `useEffect` + CSS class swap
- Renders `<img>` if `config.firstMeetingImage` is set, otherwise a styled placeholder div

### `FavoriteMemory` (Section 3)
- Same fade-in pattern as `FirstMeeting`
- 6 absolutely-positioned local floating hearts (not fixed) using `floatHeart` keyframe

### `WhyILoveYou` (Section 4)
- Renders 4 `LoveCard` components in a 2-column grid
- `selectedCard: string | null` state; "Continue" only shown when a card is selected

### `LoveCard`
- Props: `data: LoveCardData`, `onSelect`, `isSelected`
- `clicked` state triggers `scale(0.95)` for 300ms on click
- Tailwind `hover:scale-105 hover:shadow-xl transition-all` for hover

### `LoveLetters` (Section 5)
- Renders 4 `EnvelopeCard` components in a responsive 1-col/2-col grid

### `EnvelopeCard`
- `isOpen: boolean` state toggled on click
- Closed: shows ✉️ + title; Open: paper-style white card with pink glow + `envelopeOpen` CSS animation

### `BirthdayWish` (Section 6)
- Calls `confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })` on mount
- 8 local floating ❤️ and 🎈 emojis using `floatHeart` keyframe

### `RelationshipTimer` (Section 7)
- Uses `useRelationshipTimer(config.relationshipStartDate)`
- Displays Years, Months, Days, Hours, Minutes, Seconds in a 3-column grid
- Shows: "And every second with you is my favorite."

### `FinalPage` (Section 8)
- Fade-in on mount; fade-out after 4 seconds via `.page-fade-out` class
- Glowing ❤️ using `.glow-heart` CSS animation
- Closing message in Dancing Script font

---

## Custom Hooks

### `useTypingAnimation(text, speed?): string`
- Starts with `""`, adds one character per `speed` ms (default 50ms) via `setInterval`
- Resets when `text` changes; clears interval when complete; cleans up on unmount

### `useRelationshipTimer(startDate): TimerValue`
- Parses `startDate` as ISO date; returns all zeros + `console.warn` if invalid
- Computes elapsed years/months/days/hours/minutes/seconds from `Date.now() - start`
- Updates every 1000ms; cleans up interval on unmount

```ts
interface TimerValue {
  years: number; months: number; days: number;
  hours: number; minutes: number; seconds: number;
}
```

---

## Styling

### Tailwind CSS
- Utility-first CSS framework, configured in `tailwind.config.js`
- Content paths: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Custom font families registered: `font-poppins`, `font-playfair`, `font-dancing`
- Used inline via `font-['Poppins']`, `font-['Playfair_Display']`, `font-['Dancing_Script']` arbitrary values

### Google Fonts
Loaded via `<link>` tags in `index.html`:
- **Poppins** (300, 400, 500, 600) — body text, labels, counters
- **Playfair Display** (400, 600, italic) — headings, buttons
- **Dancing Script** (400, 600, 700) — romantic quotes, final message

### Global CSS Keyframes (`index.css`)

| Keyframe | Class | Used In |
|---|---|---|
| `fadeIn` | `.page-fade-in` / `.page-fade-init` | PageTransition, FirstMeeting, FavoriteMemory, FinalPage |
| `fadeOut` | `.page-fade-out` | FinalPage |
| `pulseHeart` | `.pulse-heart` | LoadingScreen |
| `floatHeart` | inline style | FloatingHeartsBackground, FavoriteMemory, BirthdayWish |
| `envelopeOpen` | `.envelope-open` | EnvelopeCard |
| `glowHeart` | `.glow-heart` | FinalPage |

### Color Palette
All sections use a consistent pastel gradient: `from-pink-100 via-purple-100 to-pink-50` (Tailwind). Interactive elements use `from-pink-400 to-purple-400` gradients.

---

## Testing

### Setup
- Vitest configured in `vite.config.ts` with `environment: 'jsdom'` and `globals: true`
- `src/test-setup.ts` imports `@testing-library/jest-dom` for DOM matchers

### Test Files

| File | Coverage |
|---|---|
| `App.test.tsx` | Loading screen, section routing, overlay persistence, section advancement |
| `RomanticIntro.test.tsx` | Typing animation timing, Continue button visibility, onNext callback |
| `BirthdayWish.test.tsx` | Heading text, paragraph, Continue button, confetti mock |
| `FinalPage.test.tsx` | Closing message text, glowing heart emoji |

### Running Tests
```bash
cd romantic-birthday-app
npm test          # single run
npm run test:watch  # watch mode
```

---

## Running the App

```bash
cd romantic-birthday-app
npm install
npm run dev       # starts dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

---

## Customization

Edit `src/config.ts` to personalize:

```ts
const config: AppConfig = {
  recipientName: "Her Name",
  relationshipStartDate: "2023-06-15",   // ISO date — used by the live timer
  firstMeetingImage: "https://...",       // leave empty for placeholder
  musicSrc: "https://.../song.mp3",       // leave empty to hide music toggle
  firstMeetingText: "It was a moment I'll never forget...",
  favoriteMemoryText: "That day we spent together...",
};
```
