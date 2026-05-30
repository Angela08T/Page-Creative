import { useEffect } from 'react'
import './FlowerScreen.css'

// [type, cx, cy, scale, rotDeg]
// type: 0=darkRed  1=pink  2=white  3=lily
const PLACEMENTS = [
  // Row 1 (top edge)
  [2,  50,  -5, 1.20,  12], [0, 160, -18, 1.35,  -8], [1, 280,   8, 1.10,  20],
  [3, 368, -12, 0.88,   5], [0, 455,  -8, 1.28, -14], [2, 575,   2, 1.15,   9],
  [1, 668, -18, 1.05,  -6], [0, 768,   5, 1.22,  16], [3, 862,  -8, 0.84,  -9],
  [2, 948, -14, 1.12,  22], [1,1060, -10, 1.18, -16], [0,1165, -18, 1.32,  11],

  // Row 2
  [1,   0, 108, 1.18, -20], [3,  90, 120, 0.86,  15], [0, 198,  98, 1.38,   6],
  [2, 326,  88, 1.14, -11], [1, 448, 114, 1.06,  19], [0, 572,  94, 1.26,  -6],
  [3, 668, 106, 0.90,  12], [2, 758,  88, 1.22, -19], [1, 886, 108, 1.12,   8],
  [0,1008,  93, 1.30, -13], [2,1128,  98, 1.16,  21],

  // Row 3 (center-upper)
  [0,  55, 228, 1.32,  10], [2, 175, 212, 1.16, -16], [1, 294, 233, 1.06,   6],
  [3, 388, 218, 0.88,  -9], [0, 474, 208, 1.38,  22], [1, 608, 228, 1.11, -11],
  [2, 720, 213, 1.22,   9], [3, 818, 223, 0.84,  -6], [0, 900, 208, 1.32,  16],
  [1,1030, 228, 1.06, -19], [2,1144, 212, 1.18,  13],

  // Row 4 (center-lower)
  [2,  14, 338, 1.16,  -9], [1, 128, 328, 1.12,  16], [0, 248, 343, 1.30,  -6],
  [3, 353, 336, 0.86,  21], [2, 443, 323, 1.22, -13], [0, 568, 338, 1.38,   9],
  [1, 698, 326, 1.06, -21], [3, 788, 340, 0.90,  11], [0, 873, 323, 1.28,   6],
  [2, 998, 338, 1.16, -16], [1,1113, 326, 1.12,  19],

  // Row 5
  [1,  65, 458, 1.06,  13], [0, 174, 443, 1.32,  -9], [3, 273, 456, 0.88,  19],
  [2, 358, 438, 1.22, -16], [1, 488, 460, 1.12,   6], [0, 608, 443, 1.30, -21],
  [2, 728, 458, 1.16,  11], [3, 823, 446, 0.84,  -6], [1, 908, 443, 1.06,  16],
  [0,1038, 458, 1.34, -11], [2,1154, 443, 1.20,   9],

  // Row 6 (bottom edge)
  [0,  28, 568, 1.28, -16], [2, 148, 553, 1.16,   9], [1, 268, 570, 1.08,  -6],
  [3, 366, 558, 0.90,  21], [0, 458, 553, 1.32,  13], [2, 578, 568, 1.14,  -9],
  [1, 698, 556, 1.06,  16], [0, 818, 568, 1.30, -19], [3, 916, 558, 0.86,   6],
  [2,1008, 553, 1.22, -13], [1,1128, 566, 1.12,  11],
]

function DarkRose() {
  return (
    <>
      {[0,72,144,216,288].map(r => (
        <ellipse key={`op${r}`} cx="0" cy="-44" rx="27" ry="37"
          fill="url(#g-dr-out)" transform={`rotate(${r})`} opacity="0.96"/>
      ))}
      {[36,108,180,252,324].map(r => (
        <ellipse key={`mp${r}`} cx="0" cy="-30" rx="19" ry="27"
          fill="url(#g-dr-mid)" transform={`rotate(${r})`}/>
      ))}
      {[18,90,162,234,306].map(r => (
        <ellipse key={`ip${r}`} cx="0" cy="-18" rx="13" ry="19"
          fill="url(#g-dr-inn)" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="10" fill="#38070e"/>
    </>
  )
}

function PinkRose() {
  return (
    <>
      {[0,72,144,216,288].map(r => (
        <ellipse key={`op${r}`} cx="0" cy="-42" rx="26" ry="35"
          fill="url(#g-pk-out)" transform={`rotate(${r})`} opacity="0.96"/>
      ))}
      {[36,108,180,252,324].map(r => (
        <ellipse key={`mp${r}`} cx="0" cy="-29" rx="18" ry="25"
          fill="url(#g-pk-mid)" transform={`rotate(${r})`}/>
      ))}
      {[18,90,162,234,306].map(r => (
        <ellipse key={`ip${r}`} cx="0" cy="-17" rx="12" ry="18"
          fill="url(#g-pk-inn)" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="9" fill="#6e2040"/>
    </>
  )
}

function WhiteRose() {
  return (
    <>
      {[0,72,144,216,288].map(r => (
        <ellipse key={`op${r}`} cx="0" cy="-43" rx="27" ry="36"
          fill="url(#g-wh-out)" transform={`rotate(${r})`} opacity="0.97"/>
      ))}
      {[36,108,180,252,324].map(r => (
        <ellipse key={`mp${r}`} cx="0" cy="-29" rx="19" ry="26"
          fill="url(#g-wh-mid)" transform={`rotate(${r})`}/>
      ))}
      {[18,90,162,234,306].map(r => (
        <ellipse key={`ip${r}`} cx="0" cy="-17" rx="13" ry="19"
          fill="url(#g-wh-inn)" transform={`rotate(${r})`}/>
      ))}
      <circle cx="0" cy="0" r="10" fill="#d4a050"/>
      <circle cx="0" cy="0" r="5" fill="#e8c060"/>
    </>
  )
}

function Lily() {
  return (
    <>
      {[0,72,144,216,288].map(r => (
        <ellipse key={`p${r}`} cx="0" cy="-30" rx="11" ry="28"
          fill="url(#g-ly)" transform={`rotate(${r})`} opacity="0.93"/>
      ))}
      {[0,60,120,180,240,300].map(r => {
        const rad = (r * Math.PI) / 180
        const ex = Math.sin(rad) * 20
        const ey = -Math.cos(rad) * 20
        return (
          <g key={r}>
            <line x1="0" y1="0" x2={ex} y2={ey}
              stroke="#d4a020" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx={ex} cy={ey} r="2.2" fill="#f0d040"/>
          </g>
        )
      })}
      <circle cx="0" cy="0" r="5" fill="#c89020"/>
    </>
  )
}

const COMPONENTS = [DarkRose, PinkRose, WhiteRose, Lily]

// SVG viewBox center and max distance to corner
const SVG_CX = 600
const SVG_CY = 325
const MAX_DIST = Math.sqrt(SVG_CX ** 2 + SVG_CY ** 2) // ≈ 683

export default function FlowerScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), 6000)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="flower-screen">
      <svg
        className="flower-bg"
        viewBox="0 0 1200 650"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dark red */}
          <radialGradient id="g-dr-out" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#c83040"/>
            <stop offset="50%"  stopColor="#8b1c28"/>
            <stop offset="100%" stopColor="#56101a"/>
          </radialGradient>
          <radialGradient id="g-dr-mid" cx="38%" cy="28%" r="62%">
            <stop offset="0%"   stopColor="#a82030"/>
            <stop offset="100%" stopColor="#4e0e18"/>
          </radialGradient>
          <radialGradient id="g-dr-inn" cx="42%" cy="34%" r="56%">
            <stop offset="0%"   stopColor="#8c1c28"/>
            <stop offset="100%" stopColor="#3c0810"/>
          </radialGradient>

          {/* Pink */}
          <radialGradient id="g-pk-out" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#f4c0d0"/>
            <stop offset="48%"  stopColor="#d87898"/>
            <stop offset="100%" stopColor="#ae5070"/>
          </radialGradient>
          <radialGradient id="g-pk-mid" cx="38%" cy="28%" r="62%">
            <stop offset="0%"   stopColor="#e8a8c0"/>
            <stop offset="100%" stopColor="#9c4062"/>
          </radialGradient>
          <radialGradient id="g-pk-inn" cx="42%" cy="34%" r="56%">
            <stop offset="0%"   stopColor="#d888a8"/>
            <stop offset="100%" stopColor="#8c2e58"/>
          </radialGradient>

          {/* White */}
          <radialGradient id="g-wh-out" cx="38%" cy="32%" r="68%">
            <stop offset="0%"   stopColor="#ffffff"/>
            <stop offset="52%"  stopColor="#f4ecea"/>
            <stop offset="100%" stopColor="#e4d4d8"/>
          </radialGradient>
          <radialGradient id="g-wh-mid" cx="38%" cy="28%" r="62%">
            <stop offset="0%"   stopColor="#faf2f0"/>
            <stop offset="100%" stopColor="#dcccd0"/>
          </radialGradient>
          <radialGradient id="g-wh-inn" cx="42%" cy="34%" r="56%">
            <stop offset="0%"   stopColor="#f6ecea"/>
            <stop offset="100%" stopColor="#d4c4c8"/>
          </radialGradient>

          {/* Lily */}
          <radialGradient id="g-ly" cx="50%" cy="18%" r="72%">
            <stop offset="0%"   stopColor="#ff5060"/>
            <stop offset="55%"  stopColor="#d81828"/>
            <stop offset="100%" stopColor="#9e0818"/>
          </radialGradient>
        </defs>

        {/* Dark base so no cream shows through */}
        <rect width="1200" height="650" fill="#7a1828"/>

        {PLACEMENTS.map(([type, cx, cy, scale, rot], i) => {
          const Flower = COMPONENTS[type]
          // Distance from SVG center → determines bloom order
          const dist = Math.sqrt((cx - SVG_CX) ** 2 + (cy - SVG_CY) ** 2)
          const nd   = Math.min(dist / MAX_DIST, 1)   // 0 = center, 1 = corner
          const delayIn  = (nd * 2.1).toFixed(3)       // center first → edges last
          const delayOut = ((1 - nd) * 1.5 + 3.4).toFixed(3) // edges first → center last
          return (
            <g
              key={i}
              className="flower-bloom"
              style={{
                '--tx': `${cx}px`,
                '--ty': `${cy}px`,
                '--sc': scale,
                '--rot': `${rot}deg`,
                '--delay-in':  `${delayIn}s`,
                '--delay-out': `${delayOut}s`,
              }}
            >
              <Flower/>
            </g>
          )
        })}
      </svg>

    </div>
  )
}
