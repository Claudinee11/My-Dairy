

// import dairies from '../models/dairies';

// //update my dairy

//  const putDairy=(req, res)=>{
//     const id = parseInt(req.params.id, 10);
//     let dairieFound;
//     let itemIndex;
//     dairies.map((dairie, index) => {
//       if (dairie.id === id) {
//         dairieFound = dairie;
//         itemIndex = index;
//       }
//     });
  
//     if (!dairieFound) {
//       return res.status(404).send({
//         success: 'false',
//         message: 'dairy not found',
//       });
//     }
  
//     if (!req.body.title) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'title is required',
//       });
//     } else if (!req.body.description) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'description is required',
//       });
//     }
  
//     const updateddairie = {
//       id: dairieFound.id,
//       title: req.body.title || dairieFound.title,
//       description: req.body.description || dairieFound.description,
//     };
  
//     dairies.splice(itemIndex, 1, updateddairie);
  
//     return res.status(201).send({
//       success: 'true',
//       message: 'dairy added successfully',
//       updateddairie,
//     });
//   };


// export default putDairy;