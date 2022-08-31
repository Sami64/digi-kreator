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
	const [roomDetails, setRoomDetails] = useState<{
		id: string
		name: string
		email: string
	}>({ id: "", name: "", email: "" })
	const { data: session, status } = useSession()

	const { room } = router.query

	const getRoomInfo = async () => {
		const roomInfo = await retrieveRoomById(room as string)
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
		<div className="flex flex-col bg-slate-800 h-screen">
			<div
				className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
				style={{
					backgroundImage: "url('/img/register_bg_2.png')",
				}}
			></div>
			<div className="flex relative w-3/6 mx-auto">
				<h1 className="text-xl font-bold text-white mt-5">
					{roomDetails.name}
				</h1>
			</div>
			<div className="mx-auto relative flex flex-col justify-between bg-white rounded-lg p-5 w-3/6 my-5 h-5/6">
				{/** Message area */}
				<div className="relative flex flex-col w-full overflow-y-auto">
					{roomMessages?.map((message) => (
						<div
							key={message.id}
							className={`relative flex text-lg ${
								session?.userId === message.userId ? "justify-end" : ""
							} `}
						>
							<h1 className={`flex flex-col`}>
								<span
									className={`bg-slate-300 px-3 py-2 ${
										session?.userId === message.userId
											? "rounded-tl-lg rounded-tr-lg rounded-bl-lg"
											: "rounded-tl-lg rounded-tr-lg rounded-br-lg"
									}`}
								>
									{message.message}
								</span>
								<span className="text-xs text-slate-400">
									{new Date(message?.timestamp?.toDate()).toUTCString()}
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
