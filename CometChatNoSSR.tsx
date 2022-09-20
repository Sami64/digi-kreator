import { CometChat } from "@cometchat-pro/chat"
import { getSession } from "next-auth/react"
import { Component } from "react"
import { CometChatUI } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src/components/index"
import constants from "./core/utils/comet_constants"

// export default CometChatNoSSR
type MyProps = {}

type MyState = {
	user: any
}

export default class CometChatNoSSR extends Component<MyProps, MyState> {
	constructor(props: any) {
		super(props)
		this.state = { user: undefined }
	}

	componentDidMount(): void {
		let appSetting = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(constants.REGION)
			.build()
		CometChat.init(constants.APP_ID, appSetting).then(
			() => {
				getSession().then((session) => {
					console.log("user comet", session)
					CometChat.login(session?.userId, constants.AUTH_KEY).then(
						(user: CometChat.User) => {
							console.log("Comet login successfull", { user })
							this.setState({ user })
						},
						(error: CometChat.CometChatException) => {
							console.log("login failed with exception:", { error })
						}
					)
				})
			},
			(error) => {
				console.log("Initialization failed with error")
			}
		)
	}

	render() {
		if (this.state.user) {
			return (
				<div className=" w-screen h-screen">
					<CometChatUI />
				</div>
			)
		} else {
			return <div>Loading....</div>
		}
	}
}
