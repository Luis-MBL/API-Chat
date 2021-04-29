import express, { request, response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Link Start', socket.id);
});

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  response.json({
    version: '1.0',
    owner: 'Luis-MBL',
  });
});

http.listen(5003, () => console.log('▶️ Server is running on port 5003'));
