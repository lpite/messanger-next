import { NextApiRequest, NextApiResponse } from "next";
import checkUserSession from "../../lib/checkUserSession";
import conn from "../../lib/db";
/* 
create table messages(
	id serial PRIMARY key,
	owner_id int NOT null,
	chat_id int NOT null,
	text text,
	time varchar(13),
	CONSTRAINT fk_owner_id FOREIGN KEY (owner_id) REFERENCES users (id),
	CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES users (id)
);
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") {
			throw new Error("wrong method!");
		}
		const body = JSON.parse(req.body);

		const ownerSessionId = body.ownerId || req.cookies.sessionId;
		const chatId = body.chatId;
		const text = body.text;
		const time = Number(new Date()).toString();

		const { data, error } = await checkUserSession(req);

		if (error) {
			throw new Error("No session");
		}

		const messageQuery = `INSERT INTO messages(owner_id,chat_id,text,time) VALUES($1,$2,$3,$4)`;    
		const messageValues = [data?.owner_id, chatId, text, time];
		const result = await conn.query(messageQuery, messageValues);
		res.send({ status: "success" });
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}