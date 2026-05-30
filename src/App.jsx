import { useState } from 'react'
import LockScreen   from './LockScreen'
import FlowerScreen from './FlowerScreen'
import LetterScreen from './LetterScreen'
import ScratchPage  from './ScratchPage'

function App() {
  const [stage, setStage] = useState('lock')

  if (stage === 'lock')    return <LockScreen   onUnlock={()   => setStage('flowers')} />
  if (stage === 'flowers') return <FlowerScreen  onComplete={()  => setStage('letter')}  />
  if (stage === 'letter')  return <LetterScreen  onContinue={()  => setStage('scratch')} />
  return <ScratchPage />
}

export default App
