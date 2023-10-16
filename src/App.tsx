import './App.css'
import { useBearStore } from './zustand/zustand'

function App() {
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increasePopulation)

  return (
    <>
      <div className='min-h-screen flex justify-center items-center cursor-pointer' onClick={increase}>
      <h1 className="text-3xl font-bold text-blue-600">
        GENAI {bears}
      </h1>
      </div>
    </>
  )
}

export default App
