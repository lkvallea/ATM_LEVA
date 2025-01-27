import React from "react";


const ATMButtons = ({currentConfig,handleButton}) => {

  return (
  <>
       {Object.entries(currentConfig.buttons).map(([side, buttons]) => (
        <div key={side} className={`atm-buttons ${side}-buttons`}>
          {buttons.map(button => (
            <div
              key={`b_${button.id}`}
              className="atm-btn"
              onClick={button.action ? () => handleButton(button.action) : undefined}
            >
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default ATMButtons;
