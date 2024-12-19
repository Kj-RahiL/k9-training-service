import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import path from 'path';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api/v1', router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'payment.success.html'));
});

app.get('/cancel', (req, res) => {
  res.redirect('/');
});

app.get('/', (req: Request, res: Response) => {
  res.send(`
      <html>
        <head>
          <title>K9 Training Service Server App</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .content {
              text-align: justify;
              font-size: 36px;
              width: 80%; 
            }
          </style>
        </head>
        <body>
          <div class="content">
           K9 Training Service Server App is running on the port...
          </div>
        </body>
      </html>
    `);
});

// Error handling
app.use(globalErrorHandler);

// not found route error
app.use(notFound);

export default app;
