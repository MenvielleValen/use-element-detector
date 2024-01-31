import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useElementDetector } from './hooks';

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useElementDetector(ref, {threshold: 1}, {
    onTriggerEnter: () => {
      setCount(5000)
    },
    onTriggerExit: () => console.log("TRIGGER EXIT"),
    onChangeVisibility: (visibility) => console.log(`ON CHANGE ${visibility}`)
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{isVisible ? 'Element Visible' : 'Element not visible'}</h1>
      <div className="card" style={{backgroundColor: isVisible ? 'green' : '#fff'}}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          ELEMENT REF
        </p>
      </div>
      <div style={{height: 800, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <p>Scroll</p>
      </div>
      <p className="read-the-docs"  ref={ref}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
