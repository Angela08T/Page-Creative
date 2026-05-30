import { useState } from 'react'
import './LetterScreen.css'

export default function LetterScreen({ onContinue }) {
  const [status, setStatus] = useState('idle') // idle | vibrating | opening | opened

  function handleTap() {
    if (status === 'opened') { onContinue?.(); return }
    if (status !== 'idle') return
    setStatus('vibrating')
    setTimeout(() => setStatus('opening'), 430)
    setTimeout(() => setStatus('opened'), 1300)
  }

  const isOpen = status === 'opening' || status === 'opened'

  const isActive = status === 'idle' || status === 'opened'

  return (
    <div
      className="letter-screen"
      onClick={handleTap}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    >
      <div className={`envelope-wrap ${status}`}>
        <svg
          viewBox="0 0 320 280"
          className="env-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Watercolor rough-edge filter */}
            <filter id="wc-e" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.038" numOctaves="4" seed="6"/>
              <feDisplacementMap in="SourceGraphic" scale="3.8"
                xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <filter id="soft-s">
              <feDropShadow dx="0" dy="6" stdDeviation="10"
                floodColor="#7a1020" floodOpacity="0.22"/>
            </filter>
            <filter id="paper-s">
              <feDropShadow dx="1" dy="3" stdDeviation="5"
                floodColor="#7a4030" floodOpacity="0.18"/>
            </filter>

            {/* Clip: shows only the zone above the envelope top edge (y < 55) */}
            <clipPath id="above-env">
              <rect x="55" y="-400" width="210" height="455"/>
            </clipPath>

            {/* Envelope gradient */}
            <radialGradient id="g-env" cx="38%" cy="33%" r="72%">
              <stop offset="0%"   stopColor="#c03040"/>
              <stop offset="52%"  stopColor="#8b2030"/>
              <stop offset="100%" stopColor="#651422"/>
            </radialGradient>
            <radialGradient id="g-flap" cx="38%" cy="40%" r="66%">
              <stop offset="0%"   stopColor="#c83848"/>
              <stop offset="100%" stopColor="#781626"/>
            </radialGradient>
            <radialGradient id="g-seal" cx="34%" cy="30%" r="66%">
              <stop offset="0%"   stopColor="#c0a8e8"/>
              <stop offset="100%" stopColor="#7858b8"/>
            </radialGradient>
          </defs>

          {/* Soft shadow behind envelope */}
          <g filter="url(#soft-s)">
            <rect x="60" y="58" width="200" height="138" rx="2" fill="#8b2030" opacity="0.01"/>
          </g>

          {/* ── LETTER PAPER (slides up through clip) ── */}
          <g clipPath="url(#above-env)">
            <g className={`letter-group ${isOpen ? 'revealed' : ''}`}>
              {/* Paper base */}
              <rect x="68" y="14" width="184" height="168" rx="4"
                fill="#fdf5e4" filter="url(#paper-s)"/>
              <rect x="68" y="14" width="184" height="168" rx="4"
                fill="none" stroke="#dfc898" strokeWidth="0.7"/>

              {/* Watercolor rose on letter */}
              <g transform="translate(160, 72)" opacity="0.88">
                {[0,72,144,216,288].map(r => (
                  <ellipse key={r} cx="0" cy="-17" rx="11" ry="15"
                    fill="#d87890" transform={`rotate(${r})`} opacity="0.87"/>
                ))}
                {[36,108,180,252,324].map(r => (
                  <ellipse key={r} cx="0" cy="-10" rx="7.5" ry="10"
                    fill="#bf607a" transform={`rotate(${r})`}/>
                ))}
                {[18,90,162,234,306].map(r => (
                  <ellipse key={r} cx="0" cy="-6" rx="5" ry="7"
                    fill="#a84e68" transform={`rotate(${r})`}/>
                ))}
                <circle cx="0" cy="0" r="6" fill="#903050"/>
                {/* Leaves */}
                <ellipse cx="-26" cy="10" rx="5" ry="13" fill="#7a9860"
                  transform="rotate(-28 -26 10)" opacity="0.82"/>
                <ellipse cx="26" cy="10" rx="5" ry="13" fill="#7a9860"
                  transform="rotate(28 26 10)" opacity="0.82"/>
                <ellipse cx="-18" cy="18" rx="3.5" ry="8" fill="#8aaa68"
                  transform="rotate(-45 -18 18)" opacity="0.70"/>
                <ellipse cx="18" cy="18" rx="3.5" ry="8" fill="#8aaa68"
                  transform="rotate(45 18 18)" opacity="0.70"/>
                {/* Berry dots */}
                <circle cx="-32" cy="-2" r="3.5" fill="#c06080" opacity="0.75"/>
                <circle cx="32"  cy="-2" r="3.5" fill="#c06080" opacity="0.75"/>
                <circle cx="-28" cy="-14" r="2.5" fill="#b05070" opacity="0.65"/>
                <circle cx="28"  cy="-14" r="2.5" fill="#b05070" opacity="0.65"/>
              </g>

              {/* Letter text */}
              <text x="160" y="128" textAnchor="middle"
                fontFamily="Dancing Script, cursive" fontSize="11.5"
                fill="#8a4840" opacity="0.80" letterSpacing="0.4">
                Para ti, con todo mi amor...
              </text>
              <text x="160" y="148" textAnchor="middle"
                fontFamily="Dancing Script, cursive" fontSize="10"
                fill="#9a5850" opacity="0.65" letterSpacing="0.2">
                — Angela ♥
              </text>
            </g>
          </g>

          {/* ── ENVELOPE BODY ── */}
          {/* Full background rectangle */}
          <polygon points="55,55 265,55 265,195 55,195"
            fill="url(#g-env)" filter="url(#wc-e)"/>
          {/* Bottom fold triangle */}
          <polygon points="55,195 160,122 265,195"
            fill="#651220" opacity="0.65" filter="url(#wc-e)"/>
          {/* Left fold triangle */}
          <polygon points="55,55 55,195 160,122"
            fill="#701828" opacity="0.48" filter="url(#wc-e)"/>
          {/* Right fold triangle */}
          <polygon points="265,55 265,195 160,122"
            fill="#701828" opacity="0.48" filter="url(#wc-e)"/>

          {/* ── FLAP (rotates open) ── */}
          <g
            className={`env-flap ${isOpen ? 'open' : ''}`}
            style={{ transformOrigin: '160px 55px' }}
          >
            {/* Flap triangle */}
            <polygon points="55,55 265,55 160,108"
              fill="url(#g-flap)" filter="url(#wc-e)"/>

            {/* Botanical decoration on flap */}
            <g transform="translate(160, 72)" opacity="0.92">
              {/* Pink flower center */}
              <circle cx="0" cy="-9" r="6" fill="#dca8c0" opacity="0.95"/>
              <circle cx="0" cy="-9" r="3.5" fill="#c890a8"/>
              {/* Blue-gray side flowers */}
              <circle cx="-15" cy="-3" r="5" fill="#b0c4d8" opacity="0.90"/>
              <circle cx="-15" cy="-3" r="2.8" fill="#98b0c8"/>
              <circle cx="15"  cy="-3" r="5" fill="#b0c4d8" opacity="0.90"/>
              <circle cx="15"  cy="-3" r="2.8" fill="#98b0c8"/>
              {/* Small outer berries */}
              <circle cx="-26" cy="-1" r="3" fill="#d4a8c0" opacity="0.78"/>
              <circle cx="26"  cy="-1" r="3" fill="#d4a8c0" opacity="0.78"/>
              {/* Leaves */}
              <ellipse cx="-8" cy="7" rx="3.5" ry="8" fill="#80a068" opacity="0.85"
                transform="rotate(-20 -8 7)"/>
              <ellipse cx="8"  cy="7" rx="3.5" ry="8" fill="#80a068" opacity="0.85"
                transform="rotate(20 8 7)"/>
              <ellipse cx="-22" cy="5" rx="2.8" ry="6" fill="#8aaa70" opacity="0.74"
                transform="rotate(-40 -22 5)"/>
              <ellipse cx="22"  cy="5" rx="2.8" ry="6" fill="#8aaa70" opacity="0.74"
                transform="rotate(40 22 5)"/>
            </g>

            {/* Wax seal */}
            <circle cx="160" cy="109" r="16" fill="url(#g-seal)"/>
            <circle cx="160" cy="109" r="13" fill="#9070c8"/>
            <circle cx="160" cy="109" r="10" fill="#9878d0"/>
            <text x="160" y="113.5" textAnchor="middle"
              fontSize="11" fill="#ddd0f8">♥</text>
          </g>
        </svg>

        {status === 'idle'   && <p className="tap-hint">Tap to open</p>}
        {status === 'opened' && <p className="tap-hint continue">Toca para continuar →</p>}
      </div>
    </div>
  )
}
