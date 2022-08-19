import { PropsWithChildren } from "react"
import Sidebar from "../components/Sidebar/Sidebar"

const AdminLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<div>
			<Sidebar />
			<main>{children}</main>
		</div>
	)
}

export default AdminLayout
