import { ReactElement } from "react"
import NewKreator from "../../components/Forms/NewKreator"
import AdminLayout from "../../layouts/adminLayout"
import { NextPageWithLayout } from "../_app"

const Create: NextPageWithLayout = () => {
	return (
		<>
			<div className="relative flex flex-wrap mt-4 justify-center">
				<h1 className="text-white text-center">New Kreator</h1>
				<div className="w-full mb-12 px-4">
					<NewKreator />
				</div>
			</div>
		</>
	)
}

export default Create

Create.getLayout = function getLayout(page: ReactElement) {
	return <AdminLayout>{page}</AdminLayout>
}
