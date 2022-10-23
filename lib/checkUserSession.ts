import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from "next";

interface CheckUserSessionReturn {
	data: {
		id: number,
		owner_id: number,
		session_id: string,
		time: string
	} | null,
	error: null | string
}

export default async function checkUserSession(req: NextApiRequest | GetServerSidePropsContext["req"]): Promise<CheckUserSessionReturn> {
	const sessionId = req.cookies['sessionId'];

	if (!sessionId?.length) {
		return {
			data: null,
			error: "no session id"
		}
	}

	const query = `SELECT * from sessions WHERE session_id = $1`;
    
	const values = [sessionId];
	const result = await conn.query(query, values);

	if (!result.rowCount) {
		return {
			data: null,
			error: "no session with this id"
		}
	}
	return {
		data: result.rows[0],
		error: null
	}


}
