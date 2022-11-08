import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}
		const chatId = parseInt(req.query.chatId?.toString() || "");
		const messageId = parseInt(req.query.messageId?.toString() || "");

		const filters: { [key: string]: string | number } = {
			chat_id: chatId
		}
		if (!isNaN(messageId)) {
			filters["id"] = messageId
		}

		const messages = await prisma.message.findMany({
			where: filters,
			include: {
				author: true
			},
			orderBy:{
				id:"desc"
			},
			take: !isNaN(messageId) ? 1 : 50

		})

		const formatedMessages = messages.reverse().map((message) => {
			return {
				text: message.text,
				time: message.time,
				owner_id: message.owner_id,
				owner_login: message.author.login,
				owner_name: message.author.display_name,
				owner_photo: message.author.photo,

			}
		})

		res.send({ status: "success", data: formatedMessages })

	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}