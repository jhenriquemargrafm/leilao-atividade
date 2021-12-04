import React, { useState, useEffect } from "react";

import socket from "../utils/socketClient";

function Product({ index, id, name, image, value, bidder }) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    socket.on("refreshValue", (product) => {
      if (product[0].id === id) setCurrentValue(product[0].currentValue);
    });
  }, [id]);

  const handleClick = () => {
    socket.emit("increaseValue", { id }, {bidder}, {name});
  };

  return (
    <div>
      <h1>{name}</h1>
      <h2>{currentValue}</h2>
      <button onClick={handleClick}>Dar um lance</button>
    </div>
  );
}

export default Product;
