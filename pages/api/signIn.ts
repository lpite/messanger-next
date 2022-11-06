import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import shortUUID from "short-uuid";

import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") {
			throw new Error("wrong method!");
		}
		const body = JSON.parse(req.body) 

		const login = body.login;
		const password = body.password;
		if (!login.length || login.length > 50 
			|| password.length < 8) {

			throw new Error("smth wrong");
    
		}

		const user = await prisma.user.findUnique({
			where: {
				login: login,
			}
		})

		if (!user) {
			throw new Error("no user")
		}  

		if (!bcrypt.compareSync(password, user?.password || "")) {
			throw new Error("wrong password");
		}
		
		const response = {
			id: user?.id,
			displayName: user?.display_name,
			login: user?.login,
			photo: user?.photo
		}

		const sessionId = shortUUID.generate().toString();
		const time = Number(new Date()).toString();

		const createSession = await prisma.session.create({
			data: {
				owner_id: user?.id,
				session_id: sessionId,
				time: time,
			}
		})

		res.setHeader("set-cookie", `sessionId=${sessionId}; path=/; Max-Age=864000; SameSite=Strict; Secure; HttpOnly;`)

		res.send({ status: "success", data: response })


	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}