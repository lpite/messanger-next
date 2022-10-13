/*
	create table messages(
		id serial PRIMARY key,
		owner_id int NOT null,
		chat_id int NOT null,
		CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES users (id),
		text TEXT,
		time varchar(100)
	)

*/

import { NextApiRequest, NextApiResponse } from "next";

import conn from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}
		const chatId = req.query.id;

		const query = `SELECT messages.text, messages.time,users.login,users.name FROM messages LEFT JOIN users ON users.id = messages.owner_id WHERE chat_id = $1`;
    
		const values = [chatId];
		const result = await conn.query(query, values);
		res.send({ status: "success", data: result.rows })

	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}