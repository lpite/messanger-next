import { NextApiRequest, NextApiResponse } from "next";




export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			throw new Error("wrong method!!");
		}
		res.send({
			status: "success", data: [
				{
					//це все має бути через джоін
					chatId: "1",
					chatName: "Test chat",
					lastMessageText: "test msg",
					lastMessageTime: "18:21"
				}
			]
		})
	} catch (error) {
		console.error(error);
		res.send({ status: "error" })
	}
}