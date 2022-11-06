import { NextApiRequest, NextApiResponse } from "next";


import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}

		const lastMessage = await prisma.message.findFirst({
			where: {
				chat_id: 1
			},
			orderBy:{
				id:"desc"
			},
			include: {
				author: true
			}			
			
		})

		res.send({
			status: "success", data: [
				{
					//це все має бути через джоін
					chatId: "1",
					chatName: "Test chat",
					chatType: "group",
					chatPhoto: "cat4.jpg",
					lastMessageOwnerName: lastMessage?.author?.display_name || "",
					lastMessageText: lastMessage?.text || "",
					lastMessageTime: lastMessage?.time || ""
				}
			]
		})
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}