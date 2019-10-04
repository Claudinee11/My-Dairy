import express from 'express';

import getDiary from '../controller/dairiescontroller';

const app = express.Router();


app.get('/api/v1/entries', getDiary.getallEntry);
app.get('/api/v1/entries/:id', getDiary.getspefiedEntry);
app.delete('/api/v1/entries/:id', getDiary.deleteEntry);
app.post('/api/v1/entries', getDiary.addEntry);
app.put('/api/v1/entries/:id', getDiary.modifyEntry);

export default app; 