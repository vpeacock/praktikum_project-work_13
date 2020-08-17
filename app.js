const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const config = require('./config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f3abd97ea15d311744336f4',
  };

  next();
});

app.use('/cards', routerCards);
app.use('/users', routerUsers);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
