const app = require('express')();
const fs = require('fs').promises;

const http = require('http').createServer(app);


const cors = require('cors');
const bodyParser = require("body-parser");

const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    method: ['GET', 'POST'],
  }
});

app.use(cors());
app.use(bodyParser.json());

const getProduct = async (id) => {
  const data = JSON.parse( await fs.readFile('./config.json'));
  const product = data.filter((product) => product.id === id);
  return product;
};

const writeFile = async (id) => {
  const data = JSON.parse( await fs.readFile('./config.json'));
  
  const indexData = data.findIndex((e) => e.id === id);

  if (data[indexData].currentValue === 100) return "Lance máximo atingido";
  
  data[indexData].currentValue += 5;

  fs.writeFile('./config.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Novo valor do leilão para o produto.')
  });
};

const readProducts = async (id)=> {
  const data = JSON.parse( await fs.readFile('./config.json'));
  return data
};

app.get("/", async (req, res) => {
  const products = await readProducts();
  res.status(200).json(products);
});

io.on('connection', (socket)=> {
  socket.on("increaseValue", async ({ id }, {bidder}, {name}) => {
    console.log(`${bidder} aumentou o lance no produto ${name}`);
    await writeFile(id);
    const data = await getProduct(id);
    io.emit("refreshValue", data, bidder);
  });
})

app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
});

http.listen(3001, () => console.log('listening on port 3001'));
