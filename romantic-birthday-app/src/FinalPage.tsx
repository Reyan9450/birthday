import { useEffect, useRef, useState } from 'react'

export default function FinalPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [fadeOut, setFadeOut] = useState(false)

  // Fade-in on mount
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.classList.remove('page-fade-init')
    el.classList.add('page-fade-in')
  }, [])

  // Fade-out after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 px-6">
      <div
        ref={contentRef}
        className={`page-fade-init text-center max-w-lg mx-auto${fadeOut ? ' page-fade-out' : ''}`}
      >
        <div className="glow-heart text-8xl mb-8 select-none">❤️</div>
        <p className="font-['Dancing_Script'] text-2xl sm:text-3xl text-pink-700 leading-relaxed">
          Thank you for being part of my life. Happy Birthday once again my love ❤️
        </p>
      </div>
    </div>
  )
}
