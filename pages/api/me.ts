import { NextApiRequest, NextApiResponse } from "next";
import checkUserSession from "../../lib/checkUserSession";

import conn from "../../lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}

		const { error, data } = await checkUserSession(req);
		if (error) {
			throw new Error(error)
		}
		const query = `SELECT users.id, users.login, users.name, users.photo FROM users WHERE id = $1`;
    
		const values = [data?.owner_id];
		const result = await conn.query(query, values);
		res.send({ status: "success", data: { ...result.rows[0], displayName: result.rows[0].name } });
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}