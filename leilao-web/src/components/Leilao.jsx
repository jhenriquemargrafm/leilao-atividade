import React from 'react';
import Product from "./Product";

export const Leilao = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showProducts, setShowProducts] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [bidder, setBidderName] = React.useState('Anônimo')
 
  React.useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((products) => {
        setIsLoading(false);
        setProducts(products);
      });
  }, []);
  
  const initialLeilao = () => {
    setShowProducts(true);
  }

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
      <div>
        {showProducts ?
        <div>
          <div>Leilão de Centavos</div>
          { products.map(({ id, productName, image, currentValue }, index) => (
            < Product
              key={index}
              index={index}
              id={id}
              name={productName}
              image={image}
              value={currentValue}
              bidder={bidder}
            />
          ))}
        </div> :
        <div>
          <input value={bidder} type="text" placeholder="Digite seu nome para entrar no leilão" onChange={e => setBidderName(e.target.value)}/>
          <button onClick={initialLeilao} type="button">Iniciar Leilão</button>
        </div>
      }
      </div>
      )}
    </div>
  );
}
