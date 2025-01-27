import React, { useState } from "react";
import ATMOptions from "./ATMOptions";

const ScreenATMBuild = ({ currentScreen, currentConfig, onInputChange, userData }) => {
  const { screen } = currentConfig;

  //   const handleInputChange = (e) => {
  //     const { value } = e.target;
  //     const maxLength = screen.input.maxLength || 4;
  //     const pattern = screen.input.pattern || /^\d*$/;

  //     if (pattern.test(value) && value.length <= maxLength) {
  //       setInputValue(value);
  //     }
  //   };

  return (
    <div className="screen-atm-build">
      <div className="screen-text">
         {/* CONDITIONAL MESAGGE TEXT */}
        {currentScreen === "dashboard" ? (
          <>
            {screen.text} {`${userData.name}!`}<br/>
            {screen.text2}
          </>
        ) : currentScreen === "success"
        ? (
          <>
            {screen.text}<br/>
            {screen.text2}{`$ ${userData.balance}`}
          </>
        ): currentScreen === "balance"
        ? (
          <>
            {screen.text}<br/>
            {screen.text2}{`$ ${userData.balance}`}
          </>
        ) 
        : (
          <>{screen.text}</>
        )}
        {/* INPUT IF EXIST */}
        {screen.input && (
          <input
            type={screen.input.type || "text"}
            placeholder={screen.input.placeholder || ""}
            name={screen.input.name || ""}
            onChange={onInputChange}
            min={screen.input.min || ""}
            max={screen.input.max || ""}
            // value={screen.input.value}
            className="screen-input"
            autoFocus
          />
        )}
      </div>
      <ATMOptions currentConfig={currentConfig} />
    </div>
  );
};

export default ScreenATMBuild;
