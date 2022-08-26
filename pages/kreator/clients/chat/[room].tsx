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
	}, [])

	return (
		<div>
			ChatRoom
			{roomMessages.map((message) => (
				<div key={message.id}>
					<h1>{message.message}</h1>
				</div>
			))}
			<ChatInput roomId={room as string} userId={session?.userId as string} />
		</div>
	)
}

export default ChatRoom
