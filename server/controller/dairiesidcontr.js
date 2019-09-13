  
 import dairies from '../models/dairies';
 const getDairyId =(req, res)=>{
    const id = parseInt(req.params.id, 10);
    dairies.map((dairie) => {
      if (dairie.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'dairy retrieved successfully',
          dairies,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'dairie does not exist',
    });
  }


   export default getDairyId;