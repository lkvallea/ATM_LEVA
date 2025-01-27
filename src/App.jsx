import React,{ useState,useEffect } from 'react'
import './reset.css'
import './App.css'
import ScreenATMBuild from './componetns/ScreenATMBuild'
import ATMButtons from './componetns/ATMButtons'
import CardTypeBanner from './componetns/CardTypeIndexMap'
import config from './componetns/config.json'
import { handleButton } from './componetns/ATMfunction'


function App() {
  const [currentScreen, setCurrentScreen] = useState("init")
  const [currentConfig, setCurrentConfig] = useState(config[currentScreen])
  const [token, setToken] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    setCurrentConfig(config[currentScreen]);
  }, [currentScreen]); // Update currentConfig when currentScreen changes

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="atm-machine-container">
          <div className="atm-tittle-container">
            <div className="atm-img">
              <img src="/atm_sign.png" alt="title" />
            </div>
            <div className="graffiti-img">
              <img src="/graffiti.png" alt="title" />
            </div>
          </div>
          <div className="card-type-banner">
            <CardTypeBanner 
            userData={userData} 
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            />
          </div>
          <div className="atm-screen-container">
             <ATMButtons 
             currentConfig={currentConfig}  
             handleButton={(action) =>
              handleButton(action, setCurrentScreen, inputValue, userData,
                            setUserData,setInputValue,token,setToken,setActiveIndex)
            }
             />
            <div className="atm-screen">
              <ScreenATMBuild 
              currentScreen={currentScreen}
              currentConfig={currentConfig} 
              onInputChange={handleInputChange} // Pasar el manejador del input
              userData={userData}
              />
              <img className="sticker" src="/sticker_graf.png" alt="sticker_graf"/>
              <img className="systems" src="/systems.png" alt="Systems Logo" />
            </div>
          </div>

          <div className="atm-screen-bottom">
            {/* <div className="atm-screen-buttom-body"></div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
