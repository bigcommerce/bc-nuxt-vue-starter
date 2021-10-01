import express from 'express';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.get('/ping', function (req, res) {
  res.json('PONG');
});

if (require.main === module) {
  const port = 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

export default app;
