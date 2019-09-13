
import dairies from '../models/dairies';

  const postDairy=(req, res)=>{
    console.log(req.body)
    if(!req.body.title)
     {     return res.status(400).send({
      success: 'false',
        message: 'title is required'
      });
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
     });
    }  const dairie = {    id: dairies.length + 1,
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


export default postDairy ;
  