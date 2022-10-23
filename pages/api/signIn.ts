import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import conn from "../../lib/db";

import shortUUID from "short-uuid";
import { create } from "domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") {
			throw new Error("wrong method!");
		}
		console.log(req.body)
		const body = JSON.parse(req.body) 

		const login = body.login;
		const password = body.password;
		if (!login.length || login.length > 50 
			|| password.length < 8) {

			throw new Error("smth wrong");
    
		}

		const query = `SELECT * FROM users WHERE login = $1`;
    
		const values = [login];
		const result = await conn.query(query, values);

		if (!bcrypt.compareSync(password, result.rows[0].password)) {
			throw new Error("wrong password");
		}
		
		const user = {
			id: result.rows[0].id,
			displayName: result.rows[0].name,
			login: result.rows[0].login,
			photo:result.rows[0].photo
		}

		const sessionId = shortUUID.generate();
		const time = Number(new Date()).toString();

		const createSessionQuery = `INSERT INTO sessions(owner_id,session_id,time) VALUES($1,$2,$3)`;
    
		const createSessionValues = [result.rows[0].id,sessionId,time];
		const createSessionResult = await conn.query(createSessionQuery, createSessionValues);

		res.setHeader("set-cookie", `sessionId=${sessionId}; path=/; Max-Age=864000; SameSite=Strict; Secure; HttpOnly;`)

		res.send({ status: "success", data: user })


	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}