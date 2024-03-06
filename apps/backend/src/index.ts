import express, { Request, Response } from 'express';
import cors from 'cors';

export async function startAppServer(params: {
  port: number,
  staticFolder: string | null
}) {
  const { port, staticFolder } = params;
  const app = express();

  staticFolder && app.use(express.static(staticFolder));
  app.use(express.json());

  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, I\'m Unit AI!');
  });

  app.listen(port, () => {
    console.log(`Nodejs app listening on port ${port}`)
  })

}