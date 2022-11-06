import { NextApiRequest, NextApiResponse } from "next";
import checkUserSession from "../../lib/checkUserSession";


import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}

		const { error, data } = await checkUserSession(req);
		if (error) {
			throw new Error(error)
		}

		const user = await prisma.user.findUnique({
			where:{
				id:data?.owner_id
			},
			select:{
				id:true,
				display_name:true,
				login:true,
				photo:true
			}
		})
		res.send({ status: "success", data: user });
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}