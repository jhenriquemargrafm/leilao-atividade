const app = require('express')();
const fs = require('fs').promises;

const http = require('http').createServer(app);

const cors = require('cors');

const array = require('./data')

const io = require('socket.io')(http, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET', 'POST'],
    allowedHeaders: ["Authorization"],
  }
});

app.use(cors());

const setWriteFile = () => {

  const data = JSON.stringify(array);

  fs.writeFile('./config.json', data, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });

  return (data);
};

const readFileLeilao = async (id)=> {
  const data = JSON.parse( await fs.readFile('./config.json'));
  const indexData = data.findIndex((e) => e.id === id);
  data[indexData].currentValue += 5;

  fs.writeFile('./config.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });
};

const getFileLeilao = async () => {
  const data = JSON.parse( await fs.readFile('./config.json'));
  return data;
}

io.on('connection', (socket)=> {
  socket.emit('inciar', () => ('oi'));
  socket.emit('products', () => getFileLeilao());
  socket.on('lance', (id) => readFileLeilao(id));
})

http.listen(5000, () => console.log('listening on port 5000'));