import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import conn from "../../lib/db";


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
		//just imitation
		res.setHeader("set-cookie", `sessionId=${result.rows[0].id}; path=/; samesite=lax; httponly;`)
		//
		res.send({ status: "success", data: user })


	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}