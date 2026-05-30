import ScratchCard  from './ScratchCard'
import SpotifyCard  from './SpotifyCard'
import foto1  from './assets/foto1.jpeg'
import foto2  from './assets/foto2.jpg'
import foto3  from './assets/foto3.jpg'
import video1 from './assets/video1.mp4'
import video2 from './assets/video2.mp4'
import video3 from './assets/video3.mp4'
import './ScratchPage.css'

function LeopardStar() {
  return (
    <svg
      viewBox="-155 -155 310 310"
      width="300"
      height="300"
      style={{ overflow: 'visible' }}
      className="leopard-star"
    >
      <defs>
        <pattern id="lp" x="0" y="0" width="88" height="78" patternUnits="userSpaceOnUse">
          <rect width="88" height="78" fill="#c8a85c"/>
          <ellipse cx="18" cy="14" rx="10" ry="8"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="18" cy="14" rx="6.5" ry="5" fill="#d4b060"/>
          <ellipse cx="62" cy="9"  rx="9"  ry="11" fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="62" cy="9"  rx="5.5" ry="7" fill="#d4b060"/>
          <ellipse cx="11" cy="46" rx="7"  ry="9"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="11" cy="46" rx="4.5" ry="6" fill="#c8a050"/>
          <ellipse cx="44" cy="40" rx="11" ry="8"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="44" cy="40" rx="7"  ry="5"  fill="#d4b060"/>
          <ellipse cx="78" cy="50" rx="8"  ry="7"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="78" cy="50" rx="5"  ry="4.5" fill="#c8a050"/>
          <ellipse cx="26" cy="68" rx="9"  ry="7"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="26" cy="68" rx="6"  ry="4.5" fill="#d4b060"/>
          <ellipse cx="68" cy="68" rx="8"  ry="9"  fill="#1a0c06" opacity="0.87"/>
          <ellipse cx="68" cy="68" rx="5"  ry="6"  fill="#d4b060"/>
          <ellipse cx="50" cy="22" rx="4.5" ry="5" fill="#1a0c06" opacity="0.75"/>
          <ellipse cx="50" cy="22" rx="2.8" ry="3.2" fill="#c8a450"/>
          <ellipse cx="36" cy="60" rx="5"   ry="4" fill="#1a0c06" opacity="0.78"/>
          <ellipse cx="36" cy="60" rx="3"   ry="2.5" fill="#c8a450"/>
          <ellipse cx="82" cy="28" rx="3.5" ry="4" fill="#1a0c06" opacity="0.72"/>
          <ellipse cx="82" cy="28" rx="2"   ry="2.5" fill="#d4b060"/>
          <ellipse cx="6"  cy="26" rx="3"   ry="4" fill="#1a0c06" opacity="0.68"/>
          <ellipse cx="6"  cy="26" rx="1.8" ry="2.5" fill="#d4b060"/>
        </pattern>
      </defs>
      <path d="M 0,-130 L 29,-40 L 124,-40 L 48,15 L 76,105 L 0,50 L -76,105 L -48,15 L -124,-40 L -29,-40 Z" fill="#f8f0e0"/>
      <path d="M 0,-120 L 27,-37 L 114,-37 L 44,14 L 71,97 L 0,46 L -71,97 L -44,14 L -114,-37 L -27,-37 Z" fill="url(#lp)"/>
    </svg>
  )
}

function LoveLetter() {
  return (
    <div className="love-letter">
      {/* Wax seal */}
      <div className="letter-seal">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <defs>
            <radialGradient id="seal-g" cx="38%" cy="30%" r="68%">
              <stop offset="0%"   stopColor="#d04060"/>
              <stop offset="55%"  stopColor="#8c1830"/>
              <stop offset="100%" stopColor="#520a1a"/>
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="31" fill="url(#seal-g)"/>
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,200,180,0.22)" strokeWidth="1.2"/>
          <text x="32" y="39" textAnchor="middle" fontSize="24"
            fontFamily="Dancing Script, cursive" fill="rgba(255,235,225,0.92)">A</text>
        </svg>
      </div>

      <p className="letter-from">De : Angela</p>
      <p className="letter-to">Para : Diego</p>

      <p className="letter-body">
        A veces me pillo sonriendo sola mirando el teléfono y es todo por ti.
        <br/><br/>
        Gracias por ser mi lugar favorito, mi cómplice y la razón de que cada día
        valga la pena. No sé cómo explicarlo con palabras, solo sé que contigo
        todo tiene más color, más sentido y más magia.
        <br/><br/>
        Te amo muchísimo, Diego.
      </p>
    </div>
  )
}

// top values in vh so they stay correct when the page extends vertically
const CARDS = [
  { photo: foto1, video: null,   rot: -11, left: '14%', top: '40vh', z: 2, caption: 'Contigo hasta la madrugada 🌙'      },
  { photo: null,  video: video1, rot:  -4, left: '31%', top: '16vh', z: 3, caption: 'Los mejores momentos son contigo 🎬' },
  { photo: foto2, video: null,   rot:   5, left: '50%', top: '22vh', z: 4, caption: 'Nosotros en modo coleccionable 🖤'   },
  { photo: foto3, video: null,   rot:   9, left: '66%', top: '28vh', z: 3, caption: 'Tus manos, mi hogar 🤍'              },
  // Second row — revealed after scrolling
  { photo: null,  video: video2, rot:   7, left: '50%', top: '68vh', z: 2, caption: null },
  { photo: null,  video: video3, rot:  -6, left: '68%', top: '74vh', z: 3, caption: null },
]

export default function ScratchPage() {
  return (
    <div className="scratch-page">
      {/* Fixed fabric texture */}
      <svg className="bg-texture" aria-hidden="true">
        <filter id="fabric-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#fabric-noise)" opacity="0.14" fill="#fff"/>
      </svg>

      {/* Spotify card */}
      <div className="sp-wrap">
        <SpotifyCard />
      </div>

      {/* Leopard star */}
      <div className="star-wrap">
        <LeopardStar/>
      </div>

      {/* All 6 scratch cards */}
      {CARDS.map(({ photo, video, rot, left, top, z, caption }, i) => (
        <ScratchCard
          key={i}
          photo={photo}
          video={video}
          caption={caption}
          rotation={rot}
          zIndex={z}
          style={{ left, top }}
        />
      ))}

      {/* Love letter — bottom left */}
      <LoveLetter />
    </div>
  )
}
