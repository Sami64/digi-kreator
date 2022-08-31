import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ChatInput from "../../../../components/Chat/ChatInput"
import { ChatMessage } from "../../../../core/chat/types"
import {
	retrieveChatRoomMessages,
	retrieveRoomById,
} from "../../../../modules/chat/retrieve"
import { retrieveChatClient } from "../../../../modules/users/retrieve"

const ChatRoom: NextPage = () => {
	const router = useRouter()
	const [roomMessages, setRoomMessages] = useState<ChatMessage[]>([])
	const [roomDetails, setRoomDetails] = useState({})
	const { data: session, status } = useSession()

	const { room } = router.query

	const getRoomInfo = async () => {
		const roomInfo = await retrieveRoomById(room as string)
		console.log("room info", roomInfo)
		if (roomInfo != null) {
			const client = await retrieveChatClient(roomInfo.userId)
			setRoomDetails(client)
		}
	}

	useEffect(() => {
		if (room != null) {
			getRoomInfo()
		}
		retrieveChatRoomMessages(room as string, setRoomMessages)
		console.log("session", session)
	}, [])

	return (
		<div className="flex flex-col bg-slate-100 h-screen">
			<h1 className="text-center text-xl font-bold">ChatRoom</h1>
			<div className="mx-auto bg-white rounded-lg p-5 w-3/6">
				{/** Message area */}
				<div className="flex flex-col w-full">
					{roomMessages.map((message) => (
						<div key={message.id} className="relative text-lg w-full">
							<h1
								className={`${
									session?.userId === message.userId ? "text-right" : ""
								}`}
							>
								{message.message}
								<span className="text-sm text-slate-400">
									{new Date(message.timestamp.toDate()).toUTCString()}
								</span>
							</h1>
						</div>
					))}
				</div>
				<ChatInput roomId={room as string} userId={session?.userId as string} />
			</div>
		</div>
	)
}

export default ChatRoom
