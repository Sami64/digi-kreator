import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import constants from "../../core/utils/comet_constants"
import KreatorLayout from "../../layouts/kreatorLayout"
import { NextPageWithLayout } from "../_app"

const Home: NextPageWithLayout = () => {
	const router = useRouter()
	const { data: session, status } = useSession()

	const getCometUser = async () => {
		try {
			const { data, status } = await axios.get(
				`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/users/${session?.userId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "applcation/json",
						apiKey: constants.API_KEY,
					},
				}
			)

			if (status == 200) {
				console.log("Comet user in db", data)
				return data
			}
		} catch (error) {}
	}

	const createCometUser = async () => {
		const user = await getCometUser()

		if (user == null) {
			const { data, status } = await axios.post(
				`https://${constants.APP_ID}.api-${constants.REGION}.cometchat.io/v3/users`,
				{ uid: session?.userId, name: session?.user?.name },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "applcation/json",
						apiKey: constants.API_KEY,
					},
				}
			)

			if (status == 200) {
				console.log("Comet user", data)
			}
		}
	}

	if (status == "loading") {
		return <div>Loading</div>
	}

	if (session?.user == null) {
		router.replace("/kreator/auth/login")
	}

	if (session?.user != null) {
		console.log("Creating comet user", session)
		createCometUser()
	}

	return (
		<div className="relative h-screen">
			<div className="bg-white p-16 rounded-2xl shadow-lg">
				<h1 className="text-center text-7xl text-slate-800 font-bold">
					Kreator Home
				</h1>
				<h1 className="text-center text-7xl text-slate-800 font-bold">
					{session?.user?.email}
				</h1>
			</div>
		</div>
	)
}

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
