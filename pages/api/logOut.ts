import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new Error("wrong method!");
    }
    const deleteSession = await prisma.session.deleteMany({
      where: {
        session_id: req.cookies["sessionId"]    
      }
    })

    res.setHeader("set-cookie", `sessionId=1; path=/; Max-Age=-1; SameSite=Strict; Secure; HttpOnly;`)
    
    res.send({ status: "success" })
  } catch (error) {
    console.error(error);
    res.send({ status: "error" })
  }
}