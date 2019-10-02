import validateEntry from '../validation/validation-entry';
import dairies from '../models/dairies';

class getcontroller{

static getDairy(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'dairy retrieved successfully',
       dairies,
    });
  };

  static getdairyId(req, res){
    const id = parseInt(req.params.id);

    const requestedDiary = dairies.find((diary) => diary.id === id);
    if(requestedDiary) {
        return res.status(200).send({
        success: 'true',
        message: 'dairy retrieved successfully',
        dairy: requestedDiary,
    });
  }

   return res.status(404).send({
     success: 'false',
     message: 'dairie does not exist',
    });
  }




  static deleteDairy(req, res){
    const id = parseInt(req.params.id);
 
    const dairyToDelete = dairies.find((dairy) => dairy.id === id);
    if (dairyToDelete) {
      const index = dairies.indexOf(dairyToDelete)
        dairies.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'dairy deleted successfuly',
         });
    }
  
      return res.status(404).send({
        success: 'false',
        message: 'dairy not found',
      });

  };

 


static postDairy(req, res){
  const { error } = validateEntry.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }
    const dairie = {    
      id: dairies.length + 1,
    title: req.body.title,
    date:req.body.date,
    description: req.body.description
  };
  dairies.push(dairie);
  return res.status(201).send({
    success: 'true',
    message: 'dairy added successfully',
    dairies,
  });
  };

static putDairy(req, res){
 const { error } = validateEntry.validate(req.body);
 if (error) {
   return res.status(400).json({ status: 400, error: error.details[0].message });
 }
  const id = parseInt(req.params.id);
  let dairieFound;
  let itemIndex;
  dairies.find((dairie, index) => {
    if (dairie.id === id) {
      dairieFound = dairie;
      itemIndex = index;
    }
  });
  if (!dairieFound) {
    return res.status(404).send({
      success: 'false',
      message: 'diary not found',
    });
  }


  const updateddairie = {
    id: dairieFound.id,
    title: req.body.title || dairieFound.title,
    date:req.body.date || dairieFound.date,
    description: req.body.description || dairieFound.description,
  };

  dairies.splice(itemIndex, 1, updateddairie);

  return res.status(200).send({
    success: 'true',
    message: 'dairy added successfully',
    updateddairie,
  });
};
}
export default getcontroller;
  

  

 