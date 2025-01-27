import React, { useState } from "react";
import ATMOptions from "./ATMOptions";

const ScreenATMBuild = ({ currentScreen, currentConfig, onInputChange, userData }) => {
  const { screen } = currentConfig;

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
