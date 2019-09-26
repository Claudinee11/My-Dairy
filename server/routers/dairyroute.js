import express from 'express';

 import getcontroller from '../controller/dairiescontroller';

const app = express.Router();


app.get('/api/v1/entries', getcontroller.getDairy);
app.get('/api/v1/entries/:id', getcontroller.getdairyId);
app.delete('/api/v1/entries/:id', getcontroller.deleteDairy);
app.post('/api/v1/entries', getcontroller.postDairy);
app.put('/api/v1/entries/:id', getcontroller.putDairy);

 export default app; 