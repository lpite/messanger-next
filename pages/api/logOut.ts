import { NextApiRequest, NextApiResponse } from "next";

/*
  db scheme
  ------------------------
  id serial PRIMARY key,
  owner_id int NOT null,
  session_id varchar(30),
  time varchar(13),
  CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES users (id)

*/


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new Error("wrong method!");
    }

    const query = `DELETE FROM sessions WHERE session_id = $1`;
    
    const values = [req.cookies["sessionId"]];
    const result = await conn.query(query, values);

    res.setHeader("set-cookie", `sessionId=1; path=/; Max-Age=-1; SameSite=Strict; Secure; HttpOnly;`)
    
    res.send({ status: "success" })
  } catch (error) {
    console.error(error);
    res.send({ status: "error" })
  }
}