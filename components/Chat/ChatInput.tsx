import React, { useState } from "react"
import { sendChatMessage } from "../../modules/chat/create"

type Props = {
	roomId: string
	userId: string
}

const ChatInput: React.FC<Props> = ({ roomId, userId }) => {
	const [input, setInput] = useState("")

	const sendMessage = async (e: any) => {
		e.preventDefault()

		await sendChatMessage(roomId, input, userId)
		setInput("")
	}

	return (
		<div className="relative bottom-0 w-full">
			<form>
				<div className="flex flex-1 w-full">
					<input
						className="w-full text-lg"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={`Message to kreator`}
					/>
					<button type="submit" onClick={sendMessage}>
						<i className="fas fa-paper-plane text-slate-400 mr-2 text-xl hover:text-digi_primary"></i>
					</button>
				</div>
			</form>
		</div>
	)
}

export default ChatInput
