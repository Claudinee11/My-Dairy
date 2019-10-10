import bodyParser from 'body-parser';

import route from './server/routers/dairyroute';
import userRoute from './server/routers/users';


 const express = require('express');
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', userRoute);
app.use('/', route);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;