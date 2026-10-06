const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('API na porta 3000 -> http://localhost:3000');
});