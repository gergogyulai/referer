import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [topText, setTopText] = useState('"the"')
  const [bottomText, setBottomText] = useState('TAYLOR SWIFT REFERENCE')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = '/bg.webp'
    img.onload = () => {
      setBgImage(img)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !bgImage) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = 800
    canvas.height = 600

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    
    // Draw top text with shadow for better readability
    ctx.font = 'bold 48px Inter, Arial, sans-serif'
    ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'
    ctx.shadowBlur = 6
    ctx.fillText(topText, canvas.width / 2.3, 200)

    // Draw bottom text
    ctx.font = 'bold 36px Inter, Arial, sans-serif'
    ctx.fillText(bottomText, canvas.width / 1.5, canvas.height - 180)
    
    // Reset shadow
    ctx.shadowBlur = 0
  }, [topText, bottomText, bgImage])

  const handleDownload = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="app-container">

      <div className="content-wrapper">
        <div className="controls">
          <h2>Customize</h2>
          <div className="input-group">
            <label htmlFor="top-text">Top Text:</label>
            <input
              id="top-text"
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="bottom-text">Bottom Text:</label>
            <input
              id="bottom-text"
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
          <button onClick={handleDownload}>Download</button>
        </div>
        
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            aria-label="Meme preview"
          />
          <p className="canvas-helper">Preview will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default App
