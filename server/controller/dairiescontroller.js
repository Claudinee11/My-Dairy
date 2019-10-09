import moment from 'moment';
import validateEntry from '../validation/validation-entry';

import dairies from '../models/dairies';

class getDiary{

static getallEntry(req, res) {
    res.status(200).send({
      status:200,
      message: 'diary retrieved successfully',
       dairies,
    });
  };

  static getspefiedEntry(req, res){
    const id = parseInt(req.params.id);
    const requestedDiary = dairies.find((diary) => diary.id === id);
    if(requestedDiary) {
        return res.status(200).send({
        status:200,
        message: 'dairy retrieved successfully',
        dairy: requestedDiary,
    });
  }

   return res.status(404).send({
     status:404,
     message: 'diarie does not exist',
    });
  }


  static deleteEntry(req, res){
    const id = parseInt(req.params.id);
 
    const dairyToDelete = dairies.find((dairy) => dairy.id === id);
    if (dairyToDelete) {
      const index = dairies.indexOf(dairyToDelete)
        dairies.splice(index, 1);
         return res.status(200).send({
           status:200,
           message: 'diary deleted successfuly',
         });
    }
  
      return res.status(404).send({
      status:404,
        message: 'diary not found',
      });

  };

 


static addEntry(req, res){
  const { error } = validateEntry.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }
    const dairie = {    
      id: dairies.length + 1,
    title: req.body.title,
    date:moment().format('LL'),
    description: req.body.description
  };
  dairies.push(dairie);
  return res.status(201).send({
    status:201,
    message: 'diary added successfully',
    dairies,
  });
  };

static modifyEntry(req, res){
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
      status:404,
      message: 'diary not found',
    });
  }


  const updateddairie = { 
    id: dairieFound.id,
    title: req.body.title || dairieFound.title,
    date:moment().format('LL') || dairieFound.date,
    description: req.body.description || dairieFound.description,
  };

  dairies.splice(itemIndex, 1, updateddairie);

  return res.status(200).send({
    status:200,
    message: 'dairy added successfully',
    updateddairie,
  });
};
}
export default getDiary;
  

  

 