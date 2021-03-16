import express from 'express';
import bodyParser from 'body-parser';
import product from './product';
import address from './address';
import order from './order';
import cart from './cart';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(product);
app.use(address);
app.use(order);
app.use(cart);

if (require.main === module) {
  const port = 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

export default app;
