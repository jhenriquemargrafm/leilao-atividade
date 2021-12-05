import React, { useState, useEffect } from "react";

import socket from "../utils/socketClient";

function Product({ index, id, name, image, value, bidder }) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [message, setNewMessage] = useState("");
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    socket.on("refreshValue", (product, bidder) => {
      if (product[0].currentValue === 100) {
        if (product[0].id === id) return setDisabledButton(true);
      } else {
        if (product[0].id === id) {
          setNewMessage(`${bidder} deu um lance de ${product[0].currentValue} no ${product[0].productName}`);
          setCurrentValue(product[0].currentValue);
        }
      }
    });
  }, [id]);

  const handleClick = () => {
    socket.emit("increaseValue", { id }, {bidder}, {name});
  };

  return (
    <div key={index}>
      <h1>{name}</h1>
      <h2>{currentValue}</h2>
      {disabledButton ? (
        <p>Produto arrematado</p>
      ) : (
        <button onClick={handleClick}>Dar um lance</button>
      )}
      <span>{message}</span>
    </div>
  );
}

export default Product;
