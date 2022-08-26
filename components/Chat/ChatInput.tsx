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
		<div>
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message to kreator`}
				/>
				<button type="submit" onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	)
}

export default ChatInput
