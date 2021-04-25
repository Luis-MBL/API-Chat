import express from 'express';

import './database';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  response.json({
    version: '1.0',
    owner: 'Luis-MBL',
  });
});

app.listen(5003, () => console.log('▶️ Server is running on port 5003'));
