import { useState, useCallback } from 'react'
import './LockScreen.css'

const CORRECT_PIN = '010877'

function PadlockSVG() {
  return (
    <svg className="padlock-svg" viewBox="0 0 130 145" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Key - upper right, slightly rotated */}
      <g transform="translate(94, 14) rotate(28)">
        <circle cx="0" cy="-2" r="14" fill="none" stroke="#7d1f30" strokeWidth="5.5"/>
        <circle cx="0" cy="-2" r="7" fill="#7d1f30"/>
        <rect x="-3.5" y="10" width="7" height="36" rx="3.5" fill="#7d1f30"/>
        <rect x="3.5" y="28" width="11" height="5.5" rx="2.5" fill="#7d1f30"/>
        <rect x="3.5" y="38" width="9" height="5" rx="2.5" fill="#7d1f30"/>
      </g>

      {/* Lock shackle */}
      <path
        d="M36,50 L36,30 Q57,10 78,30 L78,50"
        fill="none"
        stroke="#7d1f30"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Heart-shaped lock body */}
      <path
        d="M57 128
           C 16 100 13 76 13 63
           C 13 49 24 42 38 42
           C 47 42 54 47 57 55
           C 60 47 67 42 76 42
           C 90 42 101 49 101 63
           C 101 76 98 100 57 128 Z"
        fill="#7d1f30"
      />

      {/* Keyhole circle */}
      <circle cx="57" cy="84" r="7" fill="#fdf5ec" opacity="0.72"/>
      {/* Keyhole slot */}
      <rect x="54" y="84" width="6" height="12" rx="3" fill="#fdf5ec" opacity="0.72"/>
    </svg>
  )
}

function BackgroundDecorations() {
  return (
    <svg
      className="bg-decorations"
      viewBox="0 0 1200 650"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Watercolor edge filter */}
        <filter id="wc" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="2" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="disp"/>
          <feGaussianBlur in="disp" stdDeviation="1.8"/>
        </filter>
        <filter id="wc2" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.042" numOctaves="4" seed="7" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="disp"/>
          <feGaussianBlur in="disp" stdDeviation="2.2"/>
        </filter>
        {/* Soft blur for hearts */}
        <filter id="soft">
          <feGaussianBlur stdDeviation="1.4"/>
        </filter>
        {/* Big blob background wash */}
        <filter id="bigblob" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="11" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" result="disp"/>
          <feGaussianBlur in="disp" stdDeviation="30"/>
        </filter>
      </defs>

      {/* === BACKGROUND WASHES === */}
      <ellipse cx="920" cy="310" rx="400" ry="290" fill="rgba(125,31,48,0.11)" filter="url(#bigblob)"/>
      <ellipse cx="870" cy="280" rx="270" ry="210" fill="rgba(125,31,48,0.07)" filter="url(#bigblob)"/>
      <ellipse cx="160" cy="530" rx="240" ry="160" fill="rgba(125,31,48,0.08)" filter="url(#bigblob)"/>

      {/* === MOON (crescent) === */}
      <g transform="translate(422, 48)" filter="url(#wc)">
        <circle cx="0" cy="0" r="54" fill="#7d1f30"/>
        <circle cx="24" cy="-12" r="46" fill="#fdf5ec"/>
      </g>

      {/* === CLOUDS === */}

      {/* Cloud top-left small */}
      <g filter="url(#wc)" opacity="0.88">
        <ellipse cx="88" cy="215" rx="54" ry="34" fill="#7d1f30"/>
        <ellipse cx="58" cy="228" rx="36" ry="25" fill="#7d1f30"/>
        <ellipse cx="124" cy="225" rx="40" ry="24" fill="#7d1f30"/>
      </g>

      {/* Cloud mid-left */}
      <g filter="url(#wc2)" opacity="0.86">
        <ellipse cx="108" cy="360" rx="74" ry="47" fill="#8b2635"/>
        <ellipse cx="66" cy="376" rx="48" ry="34" fill="#8b2635"/>
        <ellipse cx="158" cy="372" rx="52" ry="31" fill="#8b2635"/>
      </g>

      {/* Cloud bottom-left large */}
      <g filter="url(#wc)" opacity="0.90">
        <ellipse cx="218" cy="498" rx="98" ry="63" fill="#7d1f30"/>
        <ellipse cx="142" cy="516" rx="65" ry="45" fill="#7d1f30"/>
        <ellipse cx="302" cy="510" rx="60" ry="42" fill="#7d1f30"/>
      </g>

      {/* Cloud small top-center-left */}
      <g filter="url(#wc)" opacity="0.70">
        <ellipse cx="305" cy="68" rx="52" ry="33" fill="#8b2635"/>
        <ellipse cx="272" cy="80" rx="34" ry="22" fill="#8b2635"/>
        <ellipse cx="342" cy="78" rx="38" ry="21" fill="#8b2635"/>
      </g>

      {/* Cloud right upper */}
      <g filter="url(#wc2)" opacity="0.80">
        <ellipse cx="958" cy="138" rx="66" ry="43" fill="#8b2635"/>
        <ellipse cx="920" cy="154" rx="43" ry="30" fill="#8b2635"/>
        <ellipse cx="1000" cy="148" rx="48" ry="29" fill="#8b2635"/>
      </g>

      {/* Cloud right lower */}
      <g filter="url(#wc)" opacity="0.88">
        <ellipse cx="1055" cy="398" rx="80" ry="53" fill="#7d1f30"/>
        <ellipse cx="1010" cy="416" rx="54" ry="37" fill="#7d1f30"/>
        <ellipse cx="1108" cy="408" rx="58" ry="34" fill="#7d1f30"/>
      </g>

      {/* Cloud bottom-right small */}
      <g filter="url(#wc2)" opacity="0.74">
        <ellipse cx="892" cy="508" rx="60" ry="39" fill="#8b2635"/>
        <ellipse cx="856" cy="522" rx="38" ry="27" fill="#8b2635"/>
        <ellipse cx="932" cy="518" rx="42" ry="25" fill="#8b2635"/>
      </g>

      {/* === HEARTS === */}

      {/* Large heart upper-right */}
      <g transform="translate(1092, 78)" filter="url(#soft)">
        <path d="M0,-26 C0,-50 -34,-57 -34,-32 C-34,-10 0,26 0,26 C0,26 34,-10 34,-32 C34,-57 0,-50 0,-26 Z"
          fill="#7d1f30" opacity="0.88"/>
      </g>

      {/* Heart mid-right */}
      <g transform="translate(1148, 312)" filter="url(#soft)">
        <path d="M0,-20 C0,-40 -26,-46 -26,-24 C-26,-7 0,20 0,20 C0,20 26,-7 26,-24 C26,-46 0,-40 0,-20 Z"
          fill="#8b2635" opacity="0.76"/>
      </g>

      {/* Small heart bottom-left */}
      <g transform="translate(52, 490)" filter="url(#soft)">
        <path d="M0,-13 C0,-25 -17,-29 -17,-16 C-17,-5 0,13 0,13 C0,13 17,-5 17,-16 C17,-29 0,-25 0,-13 Z"
          fill="#7d1f30" opacity="0.62"/>
      </g>

      {/* === FLOWERS === */}

      {/* Top-left flower cluster */}
      <g opacity="0.92">
        {/* Poppy 1 */}
        <g filter="url(#wc)">
          <circle cx="30" cy="20" r="21" fill="#8b2635"/>
          <circle cx="30" cy="20" r="13" fill="#7d1f30"/>
          <circle cx="30" cy="20" r="5" fill="#4e121e"/>
        </g>
        {/* Poppy 2 */}
        <g filter="url(#wc2)">
          <circle cx="64" cy="12" r="17" fill="#9b3545"/>
          <circle cx="64" cy="12" r="10" fill="#8b2635"/>
          <circle cx="64" cy="12" r="4" fill="#4e121e"/>
        </g>
        {/* Multi-petal flower */}
        <g filter="url(#wc)" transform="translate(20, 54)">
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(45 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(90 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(135 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(180 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(225 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(270 0 0)"/>
          <ellipse cx="0" cy="-14" rx="7" ry="12" fill="#8b2635" transform="rotate(315 0 0)"/>
          <circle cx="0" cy="0" r="7" fill="#7d1f30"/>
        </g>
        {/* Cream flower */}
        <g filter="url(#soft)" transform="translate(50, 46)">
          <circle cx="-9" cy="0" r="9" fill="#f0e0d8"/>
          <circle cx="9" cy="0" r="9" fill="#f0e0d8"/>
          <circle cx="0" cy="-9" r="9" fill="#f0e0d8"/>
          <circle cx="0" cy="9" r="9" fill="#f0e0d8"/>
          <circle cx="0" cy="0" r="7" fill="#e2c8d0"/>
        </g>
      </g>

      {/* Top-right flower cluster */}
      <g transform="translate(1095, 0)" opacity="0.90">
        <g filter="url(#wc)">
          <circle cx="62" cy="24" r="23" fill="#8b2635"/>
          <circle cx="62" cy="24" r="14" fill="#7d1f30"/>
          <circle cx="62" cy="24" r="6" fill="#4e121e"/>
        </g>
        <g filter="url(#wc2)">
          <circle cx="28" cy="17" r="18" fill="#9b3545"/>
          <circle cx="28" cy="17" r="11" fill="#8b2635"/>
          <circle cx="28" cy="17" r="4" fill="#4e121e"/>
        </g>
        <g filter="url(#wc)">
          <circle cx="48" cy="56" r="19" fill="#8b2635"/>
          <circle cx="48" cy="56" r="11" fill="#7d1f30"/>
        </g>
      </g>

      {/* Bottom-left flower cluster */}
      <g transform="translate(0, 568)" opacity="0.86">
        <g filter="url(#wc)">
          <circle cx="36" cy="22" r="25" fill="#c4687a"/>
          <circle cx="36" cy="22" r="16" fill="#b05565"/>
          <circle cx="36" cy="22" r="7" fill="#8b2635"/>
        </g>
        <g filter="url(#wc2)">
          <circle cx="74" cy="12" r="19" fill="#8b2635"/>
          <circle cx="74" cy="12" r="11" fill="#7d1f30"/>
        </g>
      </g>

      {/* Scattered decorative dots */}
      <circle cx="162" cy="370" r="4.5" fill="#7d1f30" opacity="0.54"/>
      <circle cx="178" cy="364" r="3.2" fill="#7d1f30" opacity="0.44"/>
      <circle cx="172" cy="354" r="2.6" fill="#7d1f30" opacity="0.38"/>
      <circle cx="188" cy="376" r="2" fill="#7d1f30" opacity="0.32"/>
    </svg>
  )
}

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'error' | 'success'

  const handleKey = useCallback((digit) => {
    if (status !== 'idle') return
    if (pin.length >= 6) return
    const next = pin + digit
    setPin(next)
    if (next.length === 6) {
      setTimeout(() => {
        if (next === CORRECT_PIN) {
          setStatus('success')
          setTimeout(() => onUnlock?.(), 900)
        } else {
          setStatus('error')
          setTimeout(() => {
            setStatus('idle')
            setPin('')
          }, 700)
        }
      }, 180)
    }
  }, [pin, status, onUnlock])

  const handleBackspace = useCallback(() => {
    if (status === 'idle') setPin(p => p.slice(0, -1))
  }, [status])

  return (
    <div className="lock-screen">
      <BackgroundDecorations />

      <div className={`lock-content${status === 'error' ? ' shake' : ''}${status === 'success' ? ' pulse' : ''}`}>

        <PadlockSVG />

        <div className="from-for">
          <span>From : Angela</span>
          <span>For : Diego</span>
          <span className="secret">a little secret...</span>
        </div>

        <div className="pin-dots">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={[
                'dot',
                i < pin.length ? 'filled' : '',
                status === 'error' ? 'error' : '',
                status === 'success' ? 'success' : '',
              ].join(' ').trim()}
            />
          ))}
        </div>

        <div className="keypad">
          {['1','2','3','4','5','6','7','8','9'].map(d => (
            <button key={d} className="key-btn" onClick={() => handleKey(d)}>
              {d}
            </button>
          ))}
          <button className="key-btn key-empty" disabled aria-hidden="true" />
          <button className="key-btn" onClick={() => handleKey('0')}>0</button>
          <button className="key-btn key-back" onClick={handleBackspace}>⌫</button>
        </div>
      </div>
    </div>
  )
}
