import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if(req.method !== "POST"){
      throw new Error("wrong method!");
    }
    const body = JSON.parse(req.body) 

    const login = body.login;
    const displayName = body.displayName;
    const password = body.password;
    if (!login.length || login.length > 50 || 
      !displayName.length || displayName.length > 50 
      || password.length < 8) {

       throw new Error("smth wrong");
    
    }

    const passwordHash = bcrypt.hashSync(password,1);
   
    const createdUser = await prisma.user.create({
      data:{
        login:login,
        display_name:displayName,
        password:passwordHash
      }
    })

    res.send({ status: "success" });

  } catch (error) {
    console.error(error);
    res.send({ status: "error" ,msg:""})
  }
};
