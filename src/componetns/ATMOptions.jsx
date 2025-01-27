import React from "react";
import config from './config.json'

const ATMOptions = ({currentConfig}) => {
  
  return (
  <>
      {Object.entries(currentConfig.buttons).map(([side, buttons]) => (
        buttons.map(button => (
          <div
          key={`o_${button.id}`}
          className={`${side}-option bottom-option o${button.id} ${
            button.caption ? "" : "no-pseudo"
          }`.trim()} // Agrega la clase no-pseudo si caption está vacío
        >
            {button.caption}
          </div>
        ))
      ))}
    </>
  );
};

export default ATMOptions;
