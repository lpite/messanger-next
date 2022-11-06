import { Session } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from "next";

interface CheckUserSessionReturn {
	data: Session | null,
	error: null | string
}

import prisma from "./prisma";


export default async function checkUserSession(req: NextApiRequest | GetServerSidePropsContext["req"]): Promise<CheckUserSessionReturn> {
	const sessionId = req.cookies['sessionId'];

	if (!sessionId?.length) {
		return {
			data: null,
			error: "no session id"
		}
	}

	const session = await prisma.session.findMany({
		where: {
			session_id: sessionId
		}
	})


	if (!session.length) {
		return {
			data: null,
			error: "no session with this id"
		}
	}
	return {
		data: session[0],
		error: null
	}


}
