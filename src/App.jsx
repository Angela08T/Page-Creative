import { useState } from 'react'
import LockScreen from './LockScreen'

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return <LockScreen onUnlock={() => setUnlocked(true)} />
}

export default App
