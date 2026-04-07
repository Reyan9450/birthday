# Design Document: Romantic Birthday App

## Overview

A fully client-side, single-page application (SPA) built with Vite + React + Tailwind CSS. The app presents a linear, multi-step romantic journey through 10 distinct sections. Navigation is one-directional (forward only) and driven by user interaction. All state is held in React component state — no backend, no database, no API calls. Customization (name, date, images) is done via a single config file.

---

## Architecture

The app uses a flat, section-based architecture. A top-level `App` component holds the current active section index in state and renders the appropriate section component. Transitions between sections are handled by a shared `PageTransition` wrapper using CSS animations.

```
App (section index state)
 ├── LoadingScreen
 ├── HeartMiniGame        (section 0)
 ├── RomanticIntro        (section 1)
 ├── FirstMeeting         (section 2)
 ├── FavoriteMemory       (section 3)
 ├── WhyILoveYou          (section 4)
 ├── LoveLetters          (section 5)
 ├── BirthdayWish         (section 6)
 ├── RelationshipTimer    (section 7)
 └── FinalPage            (section 8)
```

Shared/global layers rendered on top of all sections:
- `FloatingHeartsBackground` — persistent animated hearts layer
- `MusicToggle` — fixed-position mute/unmute button
- `PageTransition` — wraps each section for enter/exit animations

---

## Components and Interfaces

### `config.ts`
Central configuration object. All personalizable values live here.

```ts
export const config = {
  recipientName: "My Love",
  relationshipStartDate: "2022-01-01", // ISO date string
  firstMeetingImage: "",               // URL or empty string
  musicSrc: "",                        // URL to audio file or empty string
  firstMeetingText: "It was a moment I'll never forget...",
  favoriteMemoryText: "That day we spent together...",
};
```

---

### `App.tsx`
- Holds `currentSection: number` state (0–8)
- Holds `loading: boolean` state (true until loading animation completes)
- Renders `LoadingScreen` while loading
- Renders the active section component based on `currentSection`
- Passes `onNext: () => void` callback to each section
- Renders `FloatingHeartsBackground` and `MusicToggle` as overlay layers

---

### `LoadingScreen.tsx`
- Displays a pulsing heart or spinner animation
- After ~2 seconds, calls `onComplete` callback to hide itself
- Props: `onComplete: () => void`

---

### `PageTransition.tsx`
- Wraps section content with a fade-in / fade-out CSS transition
- Uses React's key-based re-mount or CSS class toggling
- Props: `children: ReactNode`, `sectionKey: number`

---

### `FloatingHeartsBackground.tsx`
- Renders N absolutely-positioned heart elements
- Each heart has randomized: horizontal start position, animation duration, delay, size
- Uses CSS `@keyframes` for falling/floating motion
- Rendered as a fixed full-screen layer with `pointer-events: none`

---

### `MusicToggle.tsx`
- Renders a fixed-position button (bottom-right corner)
- Controls an `<audio>` element via a ref
- Holds `muted: boolean` state
- Only renders if `config.musicSrc` is non-empty
- Props: none (reads from config directly)

---

### `HeartMiniGame.tsx` (Section 0)
- Holds `collected: number` state (0–5)
- Holds `hearts: Heart[]` state — array of active falling heart objects
- Each `Heart` has: `id`, `x` (% from left), `speed` (animation duration), `delay`
- Spawns new hearts on an interval to maintain ~10 on screen
- WHEN a heart is clicked: removes it from state, increments `collected`
- WHEN `collected >= 5`: shows unlock message and "Start Our Journey" button
- Props: `onNext: () => void`

```ts
interface Heart {
  id: string;
  x: number;       // 0–100 (percent)
  speed: number;   // animation duration in seconds
  delay: number;   // animation delay in seconds
}
```

---

### `RomanticIntro.tsx` (Section 1)
- Uses a `useTypingAnimation` hook
- Holds `displayText: string` state, built up character by character
- WHEN typing completes: shows "Continue" button
- Props: `onNext: () => void`

---

### `FirstMeeting.tsx` (Section 2)
- Fade-in animation on mount using CSS class toggle + `useEffect`
- Displays title, paragraph from config, and image (or placeholder)
- Props: `onNext: () => void`

---

### `FavoriteMemory.tsx` (Section 3)
- Scroll-triggered fade-in using `IntersectionObserver` or simple mount animation
- Displays title and paragraph from config
- Local floating hearts overlay
- Props: `onNext: () => void`

---

### `WhyILoveYou.tsx` (Section 4)
- Renders 4 `LoveCard` components
- Holds `selectedCard: string | null` state
- WHEN a card is clicked: sets `selectedCard`, shows message
- Shows "Continue" button when `selectedCard !== null`
- Props: `onNext: () => void`

```ts
interface LoveCardData {
  emoji: string;
  label: string;
  message: string;
}

const cards: LoveCardData[] = [
  { emoji: "❤️", label: "Your Smile", message: "Your smile lights up every room..." },
  { emoji: "💕", label: "Your Kindness", message: "The way you care for others..." },
  { emoji: "✨", label: "Your Care", message: "You always know what I need..." },
  { emoji: "💫", label: "Your Personality", message: "There's no one quite like you..." },
];
```

---

### `LoveCard.tsx`
- Renders a single interactive card
- Holds `clicked: boolean` state for click animation
- Props: `data: LoveCardData`, `onSelect: (label: string) => void`, `isSelected: boolean`

---

### `LoveLetters.tsx` (Section 5)
- Renders 4 `EnvelopeCard` components
- Props: `onNext: () => void`

```ts
interface Letter {
  title: string;
  content: string;
}

const letters: Letter[] = [
  { title: "To My Love", content: "..." },
  { title: "When You Feel Sad", content: "..." },
  { title: "My Promise", content: "..." },
  { title: "Birthday Letter", content: "..." },
];
```

---

### `EnvelopeCard.tsx`
- Holds `isOpen: boolean` state
- WHEN clicked: toggles `isOpen`, applies open animation via CSS class
- Displays letter content when open with paper-style UI and soft glow
- Props: `letter: Letter`

---

### `BirthdayWish.tsx` (Section 6)
- On mount: triggers confetti animation using `canvas-confetti` library
- Displays main heading and romantic paragraph
- Local floating hearts/balloons animation
- Props: `onNext: () => void`

---

### `RelationshipTimer.tsx` (Section 7)
- Uses `useRelationshipTimer` hook
- Hook reads `config.relationshipStartDate`, computes elapsed time
- Updates every second via `setInterval` in `useEffect`
- Displays Years, Months, Days, Hours, Minutes, Seconds
- Props: `onNext: () => void`

```ts
interface TimerValue {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

---

### `FinalPage.tsx` (Section 8)
- Fade-in on mount, fade-out animation after a delay
- Glowing heart CSS animation
- Displays closing message
- No `onNext` (last section)

---

## Custom Hooks

### `useTypingAnimation(text: string, speed?: number): string`
- Returns the currently displayed portion of `text`
- Adds one character per `speed` ms (default 50ms) using `setInterval`
- Clears interval when full text is displayed

### `useRelationshipTimer(startDate: string): TimerValue`
- Parses `startDate` as ISO date
- Computes elapsed years, months, days, hours, minutes, seconds
- Updates every 1000ms via `setInterval`
- Cleans up interval on unmount

---

## Data Models

### Section Index
```ts
type SectionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
```

### Heart (Mini Game)
```ts
interface Heart {
  id: string;
  x: number;
  speed: number;
  delay: number;
}
```

### LoveCardData
```ts
interface LoveCardData {
  emoji: string;
  label: string;
  message: string;
}
```

### Letter
```ts
interface Letter {
  title: string;
  content: string;
}
```

### TimerValue
```ts
interface TimerValue {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

### AppConfig
```ts
interface AppConfig {
  recipientName: string;
  relationshipStartDate: string; // ISO 8601 date string
  firstMeetingImage: string;
  musicSrc: string;
  firstMeetingText: string;
  favoriteMemoryText: string;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Floating hearts are always present

*For any* active section index (0–8), the `FloatingHeartsBackground` component should be rendered in the component tree.
**Validates: Requirements 1.7**

---

### Property 2: Heart spawn validity

*For any* generated set of falling hearts in the mini game, every heart should have an `x` value between 0 and 100 (inclusive), a positive `speed` value, and a non-negative `delay` value.
**Validates: Requirements 2.2**

---

### Property 3: Heart click removes and increments

*For any* list of hearts and any heart in that list, clicking that heart should result in: (a) the heart no longer appearing in the hearts array, and (b) the `collected` count increasing by exactly 1.
**Validates: Requirements 2.3, 2.4**

---

### Property 4: Typing animation produces valid prefix

*For any* input text string, at every tick of the typing animation, the currently displayed string should be a prefix of the full input text (i.e., `fullText.startsWith(displayedText)` is always true).
**Validates: Requirements 3.1, 3.2**

---

### Property 5: Image placeholder renders for any config value

*For any* value of `config.firstMeetingImage` (non-empty URL or empty string), the `FirstMeeting` component should render either an `<img>` element (when URL is provided) or a placeholder element (when empty) — never nothing.
**Validates: Requirements 4.3**

---

### Property 6: Each love card shows a unique message

*For any* two distinct love cards, clicking each should display a different message string — no two cards share the same message.
**Validates: Requirements 6.2**

---

### Property 7: Each envelope contains unique content

*For any* two distinct `Letter` objects in the letters array, their `content` fields should be different strings.
**Validates: Requirements 7.3**

---

### Property 8: Envelope open state toggles correctly

*For any* `EnvelopeCard`, clicking it when closed should set `isOpen` to `true` and make the letter content visible; clicking it again should set `isOpen` to `false`.
**Validates: Requirements 7.2**

---

### Property 9: Relationship timer returns valid values for any past date

*For any* valid ISO 8601 date string that is in the past, `useRelationshipTimer` should return a `TimerValue` where all six fields (years, months, days, hours, minutes, seconds) are non-negative integers.
**Validates: Requirements 9.1, 9.4**

---

### Property 10: Timer seconds increment over time

*For any* relationship start date, after waiting 1 second, the `seconds` field returned by `useRelationshipTimer` should differ from its previous value.
**Validates: Requirements 9.2**

---

### Property 11: Mute toggle is idempotent over two presses

*For any* initial mute state, toggling the mute button twice should return the audio element to its original muted/unmuted state.
**Validates: Requirements 11.3**

---

## Error Handling

- **Invalid `relationshipStartDate`**: If the config date cannot be parsed, `useRelationshipTimer` should return all zeros and log a console warning. The app should not crash.
- **Missing `musicSrc`**: If `config.musicSrc` is empty, `MusicToggle` should not render at all. No audio errors should be thrown.
- **Missing `firstMeetingImage`**: If `config.firstMeetingImage` is empty, a styled placeholder div is shown instead of a broken `<img>` tag.
- **Heart spawn edge cases**: If the hearts array is empty (all clicked), the spawn interval continues to add new hearts so the game remains playable.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used together for comprehensive coverage.

**Unit tests** cover:
- Specific rendering examples (section content, button visibility at thresholds)
- Edge cases (empty config values, invalid dates)
- Integration points (section navigation, config consumption)

**Property-based tests** cover:
- Universal properties that hold across all valid inputs (timer values, heart validity, typing prefix invariant, card message uniqueness)

### Property-Based Testing Library

Use **fast-check** (TypeScript-compatible, works with Vitest).

```
npm install --save-dev fast-check
```

Each property test should run a minimum of **100 iterations**.

Each property test must be tagged with a comment:
```
// Feature: romantic-birthday-app, Property N: <property text>
```

### Test File Structure

```
src/
  __tests__/
    HeartMiniGame.test.tsx       — unit + property tests for mini game
    useTypingAnimation.test.ts   — property test for typing hook
    useRelationshipTimer.test.ts — property tests for timer hook
    WhyILoveYou.test.tsx         — property test for card message uniqueness
    LoveLetters.test.tsx         — property tests for envelope state + content
    MusicToggle.test.tsx         — property test for mute toggle idempotence
    FirstMeeting.test.tsx        — property test for image placeholder
    App.test.tsx                 — unit tests for section navigation and loading
```

### Property Test Configuration (Vitest + fast-check)

```ts
import fc from "fast-check";
import { describe, it, expect } from "vitest";

describe("Property N: <title>", () => {
  it("holds for all inputs", () => {
    // Feature: romantic-birthday-app, Property N: <property text>
    fc.assert(
      fc.property(fc.string(), (input) => {
        // assertion
      }),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Focus Areas

- `App.tsx`: initial render shows loading screen; after loading, section 0 is shown
- `HeartMiniGame.tsx`: at collected=5, unlock message and button appear
- `RomanticIntro.tsx`: "Continue" button hidden until typing completes
- `WhyILoveYou.tsx`: "Continue" button hidden until a card is selected
- `BirthdayWish.tsx`: heading text is present in rendered output
- `FinalPage.tsx`: closing message text is present in rendered output
