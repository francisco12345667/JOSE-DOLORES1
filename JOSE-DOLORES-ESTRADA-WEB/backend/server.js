const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('./middleware/rate-limit');

app.use(cors());
app.use(express.json());
app.use(rateLimit);

// Carga de rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ia', require('./routes/ia'));
app.use('/api/juego', require('./routes/juego'));

app.listen(3000, () => console.log('Cuartel General Online en puerto 3000'));