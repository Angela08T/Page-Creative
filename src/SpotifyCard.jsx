import { useState, useRef, useEffect } from 'react'
import cancionSrc from './assets/te-quiero.mp3'
import './SpotifyCard.css'

const SPOTIFY_URL = 'https://open.spotify.com/track/6tu2FHuKL9C8pwNrityweQ'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <polygon points="6,3 20,12 6,21"/>
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <rect x="5"  y="3" width="5" height="18" rx="1"/>
    <rect x="14" y="3" width="5" height="18" rx="1"/>
  </svg>
)

const SpotifyLogo = () => (
  <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer"
     className="sp-logo-link" aria-label="Abrir en Spotify">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  </a>
)

export default function SpotifyCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady,   setIsReady]   = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(cancionSrc)
    audio.volume = 1

    audio.addEventListener('canplaythrough', () => {
      audioRef.current = audio
      setIsReady(true)
    }, { once: true })

    audio.addEventListener('ended', () => setIsPlaying(false))

    audio.addEventListener('error', () => {
      // Si no existe el archivo, el botón aparece pero no suena
      setIsReady(true)
    }, { once: true })

    audio.load()

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (e) {
        console.error('Play error:', e)
      }
    }
  }

  return (
    <div className={`sp-card${isPlaying ? ' sp-card--on' : ''}`}>

      <div className="sp-art">
        <img
          src="/album-art.jpg"
          alt="Te quiero – Hombres G"
          width="64" height="64"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <svg viewBox="0 0 64 64" width="64" height="64" style={{position:'absolute',top:0,left:0}}>
          <defs>
            <radialGradient id="spArtGrad" cx="40%" cy="28%" r="72%">
              <stop offset="0%"   stopColor="#6a2490"/>
              <stop offset="100%" stopColor="#180828"/>
            </radialGradient>
          </defs>
          <rect width="64" height="64" rx="12" fill="url(#spArtGrad)"/>
          <text x="32" y="43" textAnchor="middle" fontSize="32">🎵</text>
        </svg>
      </div>

      <div className="sp-info">
        <div className="sp-now">
          <span className="sp-eq" aria-hidden="true">
            <span/><span/><span/>
          </span>
          Escuchando ahora
        </div>
        <div className="sp-title">Te quiero</div>
        <div className="sp-artist">Hombres G</div>
      </div>

      <div className="sp-controls">
        <button
          className={`sp-play-btn${isPlaying ? ' sp-play-btn--on' : ''}`}
          onClick={togglePlay}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isReady ? (isPlaying ? <PauseIcon /> : <PlayIcon />) : (
            <svg className="sp-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5"
                strokeDasharray="38" strokeDashoffset="10" strokeLinecap="round"/>
            </svg>
          )}
        </button>
        <SpotifyLogo />
      </div>

    </div>
  )
}
