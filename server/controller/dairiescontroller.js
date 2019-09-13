
import dairies from '../models/dairies';

const getDairy=(req, res)=> {
    res.status(200).send({
      success: 'true',
      message: 'dairy retrieved successfully',
       dairies,
    });
  };
  
  export default getDairy;
  

 