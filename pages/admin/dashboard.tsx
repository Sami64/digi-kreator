import { ReactElement } from "react"
import AdminLayout from "../../layouts/adminLayout"
import { NextPageWithLayout } from "../_app"

const Dashboard: NextPageWithLayout = () => {
	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">l</div>
			</div>
		</>
	)
}

export default Dashboard

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>
}
