import dynamic from "next/dynamic"
import { useEffect } from "react"

declare global {
	interface Window {
		CometChat?: any
	}
}

const CometChatNoSSR = dynamic(() => import("../../../../CometChatNoSSR"), {
	ssr: false,
})

const Chat = () => {
	useEffect(() => {
		window.CometChat = require("@cometchat-pro/chat").CometChat
	})

	return (
		<div>
			<CometChatNoSSR />
		</div>
	)
}

export default Chat
