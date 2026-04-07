# Implementation Plan: Romantic Birthday App

## Overview

Build a Vite + React + Tailwind CSS single-page romantic birthday app. Tasks are ordered to build incrementally — project scaffold first, then shared infrastructure, then each section in journey order, finishing with wiring and polish.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - Initialize Vite + React + TypeScript project
  - Install and configure Tailwind CSS
  - Install dependencies: `canvas-confetti`, `fast-check`, `vitest`, `@testing-library/react`
  - Add Google Fonts (Poppins, Playfair Display, Dancing Script) to `index.html`
  - Create `src/config.ts` with `AppConfig` interface and default export with placeholder values
  - _Requirements: 1.1, 1.2, 12.4_

- [x] 2. Implement shared infrastructure and global layout
  - [x] 2.1 Create `FloatingHeartsBackground.tsx`
    - Render 15 absolutely-positioned heart elements with randomized x, speed, delay via CSS keyframes
    - Fixed full-screen layer with `pointer-events: none`
    - _Requirements: 1.7_
  - [ ]* 2.2 Write property test for FloatingHeartsBackground
    - **Property 1: Floating hearts are always present**
    - **Validates: Requirements 1.7**
  - [x] 2.3 Create `PageTransition.tsx`
    - Wrap children with fade-in CSS transition keyed on `sectionKey`
    - _Requirements: 1.5_
  - [x] 2.4 Create `LoadingScreen.tsx`
    - Pulsing heart animation, calls `onComplete` after 2 seconds
    - _Requirements: 1.4_
  - [x] 2.5 Create `MusicToggle.tsx`
    - Fixed-position button, `<audio>` ref, muted state toggle
    - Only renders when `config.musicSrc` is non-empty
    - _Requirements: 11.1, 11.2, 11.3_
  - [ ]* 2.6 Write property test for MusicToggle mute toggle
    - **Property 11: Mute toggle is idempotent over two presses**
    - **Validates: Requirements 11.3**

- [x] 3. Implement App shell and section routing
  - Create `App.tsx` with `currentSection` (0–8) and `loading` state
  - Render `LoadingScreen` while loading, then active section based on index
  - Render `FloatingHeartsBackground` and `MusicToggle` as persistent overlays
  - Pass `onNext` callback to each section to advance `currentSection`
  - Apply pastel gradient background via Tailwind classes
  - _Requirements: 1.1, 1.3, 1.4, 1.6_

- [x] 4. Implement HeartMiniGame (Section 0)
  - [x] 4.1 Create `HeartMiniGame.tsx`
    - `hearts: Heart[]` state with spawn interval maintaining ~10 hearts
    - `collected: number` state (0–5)
    - Click handler: remove heart from array, increment collected
    - Show unlock message and "Start Our Journey" button when collected >= 5
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  - [ ]* 4.2 Write property test for heart spawn validity
    - **Property 2: Heart spawn validity**
    - **Validates: Requirements 2.2**
  - [ ]* 4.3 Write property test for heart click behavior
    - **Property 3: Heart click removes and increments**
    - **Validates: Requirements 2.3, 2.4**
  - [ ]* 4.4 Write unit tests for HeartMiniGame threshold behavior
    - Test: at collected=5, unlock message appears
    - Test: at collected=5, "Start Our Journey" button appears
    - _Requirements: 2.5, 2.6_

- [x] 5. Implement useTypingAnimation hook and RomanticIntro (Section 1)
  - [x] 5.1 Create `hooks/useTypingAnimation.ts`
    - Returns displayed string built character by character via setInterval
    - Clears interval when full text is reached
    - _Requirements: 3.1, 3.2_
  - [ ]* 5.2 Write property test for typing animation prefix invariant
    - **Property 4: Typing animation produces valid prefix**
    - **Validates: Requirements 3.1, 3.2**
  - [x] 5.3 Create `RomanticIntro.tsx`
    - Use `useTypingAnimation` with the intro text
    - Show "Continue" button only when typing is complete
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ]* 5.4 Write unit test for RomanticIntro
    - Test: "Continue" button hidden before typing completes
    - Test: "Continue" button visible after typing completes
    - _Requirements: 3.3_

- [x] 6. Implement FirstMeeting (Section 2)
  - [x] 6.1 Create `FirstMeeting.tsx`
    - Fade-in animation on mount via CSS class + useEffect
    - Display title, paragraph from config, image or placeholder
    - _Requirements: 4.1, 4.2, 4.3_
  - [ ]* 6.2 Write property test for image placeholder
    - **Property 5: Image placeholder renders for any config value**
    - **Validates: Requirements 4.3**
  - [ ]* 6.3 Write unit test for FirstMeeting content
    - Test: configured paragraph text appears in rendered output
    - _Requirements: 4.2_

- [x] 7. Implement FavoriteMemory (Section 3)
  - Create `FavoriteMemory.tsx`
  - Mount animation, paragraph from config, local floating hearts overlay
  - "Continue" button navigates to next section
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 8. Implement WhyILoveYou and LoveCard (Section 4)
  - [x] 8.1 Create `LoveCard.tsx`
    - Click animation via state + CSS class
    - Hover animation via Tailwind hover utilities
    - Props: `data: LoveCardData`, `onSelect`, `isSelected`
    - _Requirements: 6.1, 6.3, 6.4_
  - [x] 8.2 Create `WhyILoveYou.tsx`
    - Render 4 `LoveCard` components with hardcoded card data
    - `selectedCard` state; show message when a card is selected
    - Show "Continue" button when `selectedCard !== null`
    - _Requirements: 6.1, 6.2, 6.5, 6.6_
  - [ ]* 8.3 Write property test for card message uniqueness
    - **Property 6: Each love card shows a unique message**
    - **Validates: Requirements 6.2**
  - [ ]* 8.4 Write unit test for WhyILoveYou
    - Test: "Continue" button hidden before any card is selected
    - Test: "Continue" button visible after a card is selected
    - _Requirements: 6.5_

- [x] 9. Implement LoveLetters and EnvelopeCard (Section 5)
  - [x] 9.1 Create `EnvelopeCard.tsx`
    - `isOpen` boolean state
    - Click toggles open/close with CSS animation
    - Paper-style UI and soft glow when open
    - Props: `letter: Letter`
    - _Requirements: 7.1, 7.2, 7.4_
  - [x] 9.2 Create `LoveLetters.tsx`
    - Render 4 `EnvelopeCard` components with hardcoded letter data
    - "Continue" button navigates to next section
    - _Requirements: 7.1, 7.3, 7.5_
  - [ ]* 9.3 Write property test for envelope open toggle
    - **Property 8: Envelope open state toggles correctly**
    - **Validates: Requirements 7.2**
  - [ ]* 9.4 Write property test for unique letter content
    - **Property 7: Each envelope contains unique content**
    - **Validates: Requirements 7.3**

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement BirthdayWish (Section 6)
  - Create `BirthdayWish.tsx`
  - On mount, call `canvas-confetti` to trigger confetti burst
  - Display "Happy Birthday My Love ❤️" heading and romantic paragraph
  - Local floating hearts/balloons animation
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 12. Implement useRelationshipTimer hook and RelationshipTimer (Section 7)
  - [x] 12.1 Create `hooks/useRelationshipTimer.ts`
    - Parse `config.relationshipStartDate` as ISO date
    - Compute elapsed years, months, days, hours, minutes, seconds
    - Update every 1000ms via setInterval; clean up on unmount
    - Return all zeros and log warning if date is invalid
    - _Requirements: 9.1, 9.2, 9.4_
  - [ ]* 12.2 Write property test for timer valid values
    - **Property 9: Relationship timer returns valid values for any past date**
    - **Validates: Requirements 9.1, 9.4**
  - [ ]* 12.3 Write property test for timer seconds increment
    - **Property 10: Timer seconds increment over time**
    - **Validates: Requirements 9.2**
  - [x] 12.4 Create `RelationshipTimer.tsx`
    - Use `useRelationshipTimer` hook
    - Display all 6 time units in styled cards
    - Display romantic line: "And every second with you is my favorite."
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 13. Implement FinalPage (Section 8)
  - Create `FinalPage.tsx`
  - Fade-in on mount, fade-out animation after delay
  - Glowing heart CSS animation
  - Display closing message
  - _Requirements: 10.1, 10.2, 10.3_

- [x] 14. Wire all sections into App and apply global polish
  - Import and register all section components in `App.tsx`
  - Verify `onNext` callbacks advance section index correctly through all 9 sections
  - Apply mobile-responsive Tailwind classes across all components (min-width 375px)
  - Add hover animations to all interactive buttons
  - Verify pastel gradient background is consistent across all sections
  - _Requirements: 1.1, 1.3, 1.5, 1.6, 12.1, 12.2, 12.3_

- [x] 15. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All configurable values (name, date, images, music) live in `src/config.ts`
- Property tests use fast-check with `{ numRuns: 100 }` minimum
- Each property test references its design document property number in a comment
- Checkpoints at tasks 10 and 15 ensure incremental validation
