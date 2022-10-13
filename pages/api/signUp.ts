import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../lib/db";
import bcrypt from "bcryptjs";

/*
  db scheme
  ------------------------
  id serial PRIMARY key
  login varchar(50)
  dispayName varchar(50)
  password varchar(60)

*/


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

    const query = `INSERT INTO users(login,name,password) VALUES($1,$2,$3)`;
    
    const values = [login,displayName,passwordHash];
    const result = await conn.query(query, values);
    res.send({ status: "success" });

  } catch (error) {
    console.error(error);
    res.send({ status: "error" })
  }
};
