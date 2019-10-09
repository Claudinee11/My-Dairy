import bodyParser from 'body-parser';

import route from './server/routers/dairyroute';


 const express = require('express');
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', route);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;