import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main-wrapper'>
        <div className='background-wrapper'>
          <div className='atm-machine-container'>
            <div className='atm-tittle-container'>
              <div className='atm-img'>
                <img src="/atm_sign.png" alt="title" />
              </div>
              <div className='graffiti-img'>
                <img src="/graffiti.png" alt="title" />
              </div>
            </div>
            <div className='card-type-banner'>
              <div className='logo-pic'>
                <img src="/creditcard_sprites.png" alt="" />
              </div>
            </div>
            <div className='atm-screen-container'>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
