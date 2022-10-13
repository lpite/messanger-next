import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../lib/db";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") {
			throw new Error("wrong method!");
		}
		const body = JSON.parse(req.body);

		const ownerId = body.ownerId;
		const chatId = body.chatId;
		const text = body.text;
		const time = Number(new Date()).toString();

		const query = `INSERT INTO messages(owner_id,chat_id,text,time) VALUES($1,$2,$3,$4)`;
    
		const values = [ownerId, chatId, text,time];
		const result = await conn.query(query, values);

		res.send({ status: "success" });
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}