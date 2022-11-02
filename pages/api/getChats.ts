import { NextApiRequest, NextApiResponse } from "next";

import conn from "../../lib/db";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}

		const query = `SELECT text, time, users.name FROM messages LEFT JOIN users ON users.id = messages.owner_id WHERE chat_id = $1 ORDER BY time DESC LIMIT 1 `;
    
		const values = ["1"];
		const result = await conn.query(query, values);
		res.send({
			status: "success", data: [
				{
					//це все має бути через джоін
					chatId: "1",
					chatName: "Test chat",
					chatType: "group",
					chatPhoto:"cat4.jpg",
					lastMessageOwnerName: result.rows[0]?.name,
					lastMessageText: result.rows[0]?.text,
					lastMessageTime: result.rows[0]?.time
				}
			]
		})
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}