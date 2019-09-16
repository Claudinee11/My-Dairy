
import dairies from '../models/dairies';

class getcontroller{

static getDairy(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'dairy retrieved successfully',
       dairies,
    });
  };

  static dairyId(req, res){
    const id = parseInt(req.params.id, 10);
    dairies.map((dairy) => {
      if (dairy.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'dairy retrieved successfully',
          dairy,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'dairie does not exist',
    });
  }



  static delDairy(req, res){
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

 


static postDairy(req, res){
    console.log(req.body)
    if(!req.body.title)
     {    
        return res.status(400).send({
      success: 'false',
        message: 'title is required'
      });
    }
     else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
     });
    }  
    const dairie = {    
      id: dairies.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  dairies.push(dairie);
  return res.status(201).send({
    success: 'true',
    message: 'dairy added successfully',
    dairies,
  })
  };

  
static putDairy(req, res){
  const id = parseInt(req.params.id, 10);
  let dairieFound;
  let itemIndex;
  dairies.map((dairie, index) => {
    if (dairie.id === id) {
      dairieFound = dairie;
      itemIndex = index;
    }
  });

  if (!dairieFound) {
    return res.status(404).send({
      success: 'false',
      message: 'dairy not found',
    });
  }

  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  const updateddairie = {
    id: dairieFound.id,
    title: req.body.title || dairieFound.title,
    description: req.body.description || dairieFound.description,
  };

  dairies.splice(itemIndex, 1, updateddairie);

  return res.status(201).send({
    success: 'true',
    message: 'dairy added successfully',
    updateddairie,
  });
};
}


  export default getcontroller;
  

  

 