
 import getDairy from '../controller/dairiescontroller';
 import  getDairyId from '../controller/dairiesidcontr';
 import delDairy from '../controller/dairiesdelcontroller';
 
 import postDairy from '../controller/dairiesposcontr';
 import putDairy from '../controller/dairputcontr';
 import express from 'express';

// const routes=express.Router();

const app = express.Router();


app.get('/api/v1/dairy',getDairy);
app.get('/api/v1/dairy/:id',getDairyId);
app.delete('/api/v1/dairy/:id',delDairy);
app.post('/api/v1/dairy',postDairy);
app.put('/api/v1/dairy/:id', putDairy);

 export default app; 