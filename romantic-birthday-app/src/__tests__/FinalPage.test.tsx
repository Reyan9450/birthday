import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FinalPage from '../FinalPage'

describe('FinalPage', () => {
  it('displays the closing message', () => {
    render(<FinalPage />)
    expect(
      screen.getByText(/Thank you for being part of my life/i)
    ).toBeTruthy()
  })

  it('displays the glowing heart emoji', () => {
    render(<FinalPage />)
    expect(screen.getByText('❤️')).toBeTruthy()
  })
})
