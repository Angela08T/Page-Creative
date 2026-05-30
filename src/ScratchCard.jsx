import { useRef, useEffect, useState, useCallback } from 'react'
import './ScratchCard.css'

const CANVAS_W = 244
const CANVAS_H = 250

export default function ScratchCard({ photo, video, caption, rotation = 0, zIndex = 1, style = {}, flow = false }) {
  const canvasRef = useRef(null)
  const scratching = useRef(false)
  const lastPos = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(initCanvas)
  }, [])

  function initCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H)
    grad.addColorStop(0,   '#b89a7c')
    grad.addColorStop(0.5, '#9a8268')
    grad.addColorStop(1,   '#7e6852')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    ctx.font = 'italic 26px "Dancing Script", cursive'
    ctx.fillStyle = 'rgba(255, 248, 232, 0.88)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Scratch me', CANVAS_W / 2, CANVAS_H / 2)
  }

  function coords(e) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const sx = CANVAS_W / rect.width
    const sy = CANVAS_H / rect.height
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * sx,
      y: (src.clientY - rect.top) * sy,
    }
  }

  function scratch(pos) {
    if (revealed) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 52

    if (lastPos.current) {
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2)
      ctx.fill()
    }
    lastPos.current = pos

    // Check % revealed every few moves
    checkReveal(ctx, canvas)
  }

  function checkReveal(ctx, canvas) {
    const data = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H).data
    let transparent = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++
    }
    if (transparent / (data.length / 4) > 0.58) {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
      setRevealed(true)
    }
  }

  const onStart = useCallback((e) => {
    e.preventDefault?.()
    scratching.current = true
    lastPos.current = null
    scratch(coords(e))
  }, [revealed])

  const onMove = useCallback((e) => {
    e.preventDefault?.()
    if (!scratching.current) return
    scratch(coords(e))
  }, [revealed])

  const onEnd = useCallback(() => {
    scratching.current = false
    lastPos.current = null
  }, [])

  return (
    <div
      className={`polaroid${flow ? ' polaroid--flow' : ''}`}
      style={{ '--rot': `${rotation}deg`, zIndex, ...style }}
    >
      <div className="photo-area">
        {video
          ? <video src={video} className="photo-img" autoPlay muted loop playsInline/>
          : photo
            ? <img src={photo} alt="" className="photo-img" draggable="false"/>
            : <div className="photo-placeholder"/>
        }

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            width={CANVAS_W}
            height={CANVAS_H}
            onMouseDown={onStart}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
          />
        )}
      </div>
      {caption && <p className="polaroid-caption">{caption}</p>}
    </div>
  )
}
