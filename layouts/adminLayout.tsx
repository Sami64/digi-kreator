import { PropsWithChildren } from "react"
import FooterAdmin from "../components/Footers/FooterAdmin"
import HeaderStats from "../components/Headers/HeaderStats"
import AdminNavbar from "../components/Navbars/AdminNavbar"
import Sidebar from "../components/Sidebar/Sidebar"

const AdminLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-slate-100">
				<AdminNavbar />
				<HeaderStats />
				<main className="px-4 md:px-10 mx-auto w-full -m-24">
					{children}
					<FooterAdmin />
				</main>
			</div>
		</>
	)
}

export default AdminLayout
