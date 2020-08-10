const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
