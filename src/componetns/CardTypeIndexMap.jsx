import React, { useState, useEffect } from "react";

const CardTypeBanner = ({ userData,activeIndex, setActiveIndex}) => {
  

  // Mapeo de cardType a índice
  const cardTypeIndexMap = {
    Star: 0,
    Pulsa: 1,
    Maestro: 2,
    MasterCard: 3,
    Plus: 4,
    Visa: 5,
  };

  // Actualiza el estado activo basado en el cardType de userData
  useEffect(() => {
    if (userData?.cardType) {
      setActiveIndex(cardTypeIndexMap[userData.cardType] ?? null);
    }
  }, [userData, cardTypeIndexMap]);

  return (
      <div className="logo-pic">
        <ul className="list-logo-container">
          {[...Array(6)].map((_, index) => (
            <li
              key={index}
              className={`list-logo ${index === activeIndex ? "active" : ""}`}
            ></li>
          ))}
        </ul>
      </div>
  );
};

export default CardTypeBanner;
