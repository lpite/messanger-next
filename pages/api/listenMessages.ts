import { NextApiRequest, NextApiResponse, } from "next";
import { supabase } from "../../lib/supaBase";
import { Server } from "socket.io"
import { Socket } from "net";

interface CustomApiResponse extends NextApiResponse {
	socket: Socket & {
		server: any
	}
}


export default (req: NextApiRequest, res: CustomApiResponse) => {
	try {
		if (res.socket && res.socket.server.io) {
			console.log('Socket is already running')
		} else {
			console.log('Socket is initializing')
			const io = new Server(res.socket.server)
			res.socket.server.io = io

			io.on('connection', socket => {
				console.log("connected")
				supabase
					.channel('table-db-changes')
					.on(
						'postgres_changes',
						{ event: 'INSERT', schema: 'public', table: 'messages', filter: "chat_id=eq.1" },
						async (payload: any) => {
							const query = `SELECT messages.text, messages.time,owner_id, users.login AS owner_login ,users.name AS owner_name FROM messages LEFT JOIN users ON users.id = messages.owner_id WHERE messages.id = $1`;
    
							const values = [payload.new?.id];
							const result = await conn.query(query, values);
							console.log(result.rows[0])
							
							socket.emit("newMessage", result.rows[0]);
						}
					)
					.subscribe()
			})
		}
		res.end()
	} catch (error) {
		res.end()

	}

	
}