const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Użycie routera z `routes/orders.js`
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
