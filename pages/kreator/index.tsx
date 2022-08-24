import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const Index = () => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status == "loading") {
		return <div>Loading</div>
	}

	if (session?.user == null) {
		router.replace("/kreator/auth/login")
	}

	return (
		<div>
			<h1>Kreator Home</h1>
			<h1>{session?.user?.email}</h1>
		</div>
	)
}

export default Index
