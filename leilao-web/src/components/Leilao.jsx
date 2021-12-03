import React from 'react';

import socket from "../server/api";

export const Leilao = () => {
  const [showProducts, setShowProducts] = React.useState(false);
  const [prodcutsLeilao, setProductsLeilao] = React.useState();
 
  React.useEffect(() => {


  });

  console.log(prodcutsLeilao)
  const initialLeilao = () => {
    socket.on('inciar', (product) => console.log(product));
    setShowProducts(true);
  }

  return (
    <div>
      {showProducts ?
        <div>leilao</div> :
        <div>
          <button onClick={initialLeilao} type="button">Inicar Leilão</button>
        </div>
      }
    </div>
  );
}
