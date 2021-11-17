import express from 'express';
import bodyParser from 'body-parser';
import { 
  testStorage,
	insertDeviceRecord,
	getRecordsForDevice,
} from './storage.js';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', async (req, res) => {
  console.log(req);
  try {
    insertDeviceRecord(req.body);
    res.send({
      status: "OK"
    });
  }
  catch (error) {
    res.send({
      status: "ERROR",
      error: "Data can't be stored",
    });
  }
});

app.post('/healthcheck', (_, res) => {
  res.send('OK');
});

app.get('/records/:device', async (req, res) => {
  const device = req.params.device;

  try {
    const data = await getRecordsForDevice(device);

    if (data.result) {
      const records = data.result ? data.result.records : [];

      res.send({
        status: "OK",
        device,
        records,
      });
    } else {
      res.send({
        status: 'ERROR',
        error: 'NO DEVICE',
        device,
      });
    }
  } catch (e) {
    console.log('ERROR: ' + e.message);
    res.send({ 
      status: "ERROR",
      error: "Can't fetch data.",
      device,
    });
  }
});

/// catch 404 and forwarding to error handler
app.use((_, __, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    next(err);
});

try {
  await testStorage();
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
} catch (error) {
  console.log(error);
  console.log('Error initialising storage.');
}
