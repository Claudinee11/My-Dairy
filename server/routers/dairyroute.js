import express from 'express';
 import getcontroller from '../controller/dairiescontroller';
//  import  getDairyId from '../controller/dairiesidcontr';
//  import delDairy from '../controller/dairiesdelcontroller';
 
//  import postDairy from '../controller/dairiesposcontr';
//  import putDairy from '../controller/dairputcontr';
//  import express from 'express';

// const routes=express.Router();

const app = express.Router();


app.get('/api/v1/dairy',getcontroller.getDairy);
app.get('/api/v1/dairy/:id',getcontroller.dairyId);
app.delete('/api/v1/dairy/:id',getcontroller.delDairy);
app.post('/api/v1/dairy',getcontroller.postDairy);
app.put('/api/v1/dairy/:id', getcontroller.putDairy);

 export default app; 