
import dairies from '../models/dairies';
const delDairy=(req, res)=>{
    const id = parseInt(req.params.id, 10);
  
    dairies.map((dairie, index) => {
      if (dairie.id === id) {
        dairies.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'dairy deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        success: 'false',
        message: 'dairy not found',
      });
  
   
  };


export default delDairy;
  
  
   