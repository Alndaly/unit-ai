import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express();
const server = createServer(app)
const io = new Server(server);

export async function startAppServer(params: {
  port: number,
  staticFolder?: string
}) {
  const { port, staticFolder } = params;
  staticFolder && app.use(express.static(staticFolder));
  app.use(express.json());

  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  app.get('/api', (request: Request, response: Response) => {
    response.send('Hello, I\'m Unit AI!');
  });

  app.get('/test', async (request: Request, response: Response) => {
    response.send('Hello, I\'m Unit AI!');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`后端服务启动成功，监听端口：${port}`);
  });

}

startAppServer({ port: 8001 }) // uncomment when you want to debug the backend alone