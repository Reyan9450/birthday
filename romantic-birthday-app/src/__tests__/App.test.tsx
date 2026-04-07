import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

vi.mock('../LoadingScreen', () => ({
  default: ({ onComplete }: { onComplete: () => void }) => (
    <div data-testid="loading-screen">
      <button onClick={onComplete}>Complete Loading</button>
    </div>
  ),
}))

vi.mock('../FloatingHeartsBackground', () => ({
  default: () => <div data-testid="floating-hearts" />,
}))

vi.mock('../MusicToggle', () => ({
  default: () => <div data-testid="music-toggle" />,
}))

vi.mock('../PageTransition', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-transition">{children}</div>
  ),
}))

vi.mock('../HeartMiniGame', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-0">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../RomanticIntro', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-1">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../FirstMeeting', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-2">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../FavoriteMemory', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-3">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../WhyILoveYou', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-4">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../LoveLetters', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-5">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../BirthdayWish', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-6">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../RelationshipTimer', () => ({
  default: ({ onNext }: { onNext: () => void }) => (
    <div data-testid="section-7">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}))

vi.mock('../FinalPage', () => ({
  default: () => <div data-testid="section-8" />,
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading screen on initial render', () => {
    render(<App />)
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('does not show section content while loading', () => {
    render(<App />)
    expect(screen.queryByTestId('floating-hearts')).not.toBeInTheDocument()
    expect(screen.queryByTestId('music-toggle')).not.toBeInTheDocument()
  })

  it('shows section 0 after loading completes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Complete Loading'))

    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument()
    expect(screen.getByTestId('floating-hearts')).toBeInTheDocument()
    expect(screen.getByTestId('music-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('section-0')).toBeInTheDocument()
  })

  it('renders FloatingHeartsBackground and MusicToggle as persistent overlays', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Complete Loading'))

    expect(screen.getByTestId('floating-hearts')).toBeInTheDocument()
    expect(screen.getByTestId('music-toggle')).toBeInTheDocument()
  })

  it('advances to next section when Next is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Complete Loading'))

    expect(screen.getByTestId('section-0')).toBeInTheDocument()
    await user.click(screen.getByText('Next'))
    expect(screen.getByTestId('section-1')).toBeInTheDocument()
  })

  it('wraps active section in PageTransition', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Complete Loading'))

    expect(screen.getByTestId('page-transition')).toBeInTheDocument()
  })

  it('does not advance past section 8', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Complete Loading'))

    // Advance through sections 0–7 (each has a Next button)
    for (let i = 0; i < 8; i++) {
      await user.click(screen.getByText('Next'))
    }

    // Section 8 (FinalPage) has no Next button
    expect(screen.getByTestId('section-8')).toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('advances through all 9 sections in order', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Complete Loading'))

    for (let i = 0; i < 8; i++) {
      expect(screen.getByTestId(`section-${i}`)).toBeInTheDocument()
      await user.click(screen.getByText('Next'))
    }
    expect(screen.getByTestId('section-8')).toBeInTheDocument()
  })
})
