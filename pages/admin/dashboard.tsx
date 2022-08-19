import { ReactElement } from "react"
import AdminLayout from "../../layouts/adminLayout"
import { NextPageWithLayout } from "../_app"

const Dashboard: NextPageWithLayout = () => {
	return <div>Dashboard</div>
}

export default Dashboard

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>
}
