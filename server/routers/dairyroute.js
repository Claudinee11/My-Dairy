import express from 'express';
import validateEntry from '../midleware/validatED-entry';
import getDiary from '../controller/dairiescontroller';
import Authentication from '../midleware/auth';

const app = express.Router();


 app.get('/api/v2/entries', Authentication.verifyUsers, getDiary.getallEntry);
 app.get('/api/v2/entries/:id', Authentication.verifyUsers, getDiary.getspecificEntry);
app.delete('/api/v2/entries/:id', Authentication.verifyUsers, getDiary.deleteEntry);
app.post('/api/v2/entries', Authentication.verifyUsers, validateEntry, getDiary.addEntry);
app.put('/api/v2/entries/:id', Authentication.verifyUsers, validateEntry, getDiary.modifyEntry);

export default app; 