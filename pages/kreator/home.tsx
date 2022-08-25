import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import KreatorLayout from "../../layouts/kreatorLayout"
import { NextPageWithLayout } from "../_app"

const Home: NextPageWithLayout = () => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status == "loading") {
		return <div>Loading</div>
	}

	if (session?.user == null) {
		router.replace("/kreator/auth/login")
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
