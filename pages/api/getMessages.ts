/*
	create table messages(
		id serial PRIMARY key,
		owner_id int NOT null,
		chat_id int NOT null,
		CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES users (id),
		text TEXT,
		time varchar(13)
	)

*/

import { NextApiRequest, NextApiResponse } from "next";

import conn from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}
		const chatId = req.query.chatId;
		const messageId = req.query.messageId;

		const query = `SELECT 
			messages.text, 
			messages.time,
			owner_id, 
			users.login AS owner_login,
			users.name AS owner_name,
			users.photo AS owner_photo 
		FROM messages 
		LEFT JOIN users ON users.id = messages.owner_id 
		WHERE chat_id = $1 ${messageId?.length ? "AND messages.id = $2" : ""} ORDER BY time DESC LIMIT ${messageId?.length ? "1" : "50"}`;
    	
		const values = [chatId];
		if(messageId?.length){
			values.push(messageId)
		}
		const result = await conn.query(query, values);
		res.send({ status: "success", data: result.rows?.reverse() })

	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}