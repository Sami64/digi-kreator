import { PropsWithChildren } from "react"
import FooterAdmin from "../components/Footers/FooterAdmin"
import AdminNavbar from "../components/Navbars/AdminNavbar"
import KreatorSidebar from "../components/Sidebar/KreatorSidebar"

const KreatorLayout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<>
			<KreatorSidebar />
			<div className="relative md:ml-64 bg-slate-100">
				<AdminNavbar />
				{/* <HeaderStats /> */}
				<div className="relative bg-slate-800 md:pt-32 pb-32 pt-12"></div>
				<div className="px-4 md:px-10 mx-auto w-full -m-24 h-full bg-slate-200">
					{children}
					<FooterAdmin />
				</div>
			</div>
		</>
	)
}

export default KreatorLayout
