import { NextApiRequest, NextApiResponse } from "next";
import checkUserSession from "../../lib/checkUserSession";

import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") {
			throw new Error("wrong method!");
		}
		const body = JSON.parse(req.body);

		const chatId = parseInt(body.chatId);
		const text = body.text;
		const time = Number(new Date()).toString();


		const { data, error } = await checkUserSession(req);

		if (error || !data) {
			throw new Error("No session");
		}
		const newMessage = await prisma.message.create({
			data: {
				owner_id: data.owner_id,
				chat_id: chatId,
				text: text,
				time: time
			}
		})
		res.send({ status: "success" });
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}