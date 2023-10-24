import express from 'express';
import * as path from 'path';
import cors from 'cors';
import getRates from './providers/ratesProvider';

const app = express();
app.use(cors());
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api/rates', async (req, res) => {
  try {
    res.status(200).json(await getRates());
  } catch (ex) {
    console.error('Error fetching rates');
    res.status(500).send();
  }
});

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});

server.on('error', console.error);

process.addListener('uncaughtExceptionMonitor', (ex) => {
  console.error('Uncaught error:', ex);
  process.exit(-1);
});
