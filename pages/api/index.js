// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../utils/mongodb'
import Form from "../../models/form"

dbConnect()
export default async function handler(req, res) {

  const {method} = req
  switch(method){
    case 'POST' :
      try{
        let stat = await Form.create(req.body)
        if(!stat){
          return res.status(400).json({success : false})
      }

      res.status(201).json({success : true,data : stat})

      }
      catch(err){
        res.status(400).json({success : false})
      }
      break;
  }
  
}
