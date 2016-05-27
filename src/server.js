import express from 'express';
import bodyParser from 'body-parser';
import { version } from '../package.json';

const app = express();
const port = process.env.PORT;
const token = process.env.TOKEN;

app.use(bodyParser.json());
app.listen(port);

app.get('/', (req, res) => {
  res.json({ version });
});

const server = ({ processUpdate }) => {
  app.post(`/bot${token}`, ({ body }, res) => {
    processUpdate(body);
    res.status(200).end();
  });
};

export default server;
