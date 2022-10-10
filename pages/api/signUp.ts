import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const login = "";
    const displayName = "";
    const password = "";

    const query = `INSERT INTO users(name,email,login,password) VALUES($1,$2,$3,$4)`;
    const values = req.body.list;
    const result = await conn.query(query, values);
  } catch (error) {}
};
