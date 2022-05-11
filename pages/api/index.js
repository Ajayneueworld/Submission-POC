// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../utils/mongodb"

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const {method} = req
  console.log("in api")
  console.log(req.body)
  switch(method){
    case 'POST' :
      try{
        let stat = await db.collection("form").insert(req.body)
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
