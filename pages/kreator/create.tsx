import { ReactElement } from "react"
import NewJob from "../../components/Forms/NewJob"
import KreatorLayout from "../../layouts/kreatorLayout"
import { NextPageWithLayout } from "../_app"

const Create: NextPageWithLayout = () => {
	return (
		<div className="relative ">
			<h1 className="text-white text-center capitalize text-2xl font-bold mb-5">
				create new job
			</h1>
			<NewJob />
		</div>
	)
}

export default Create

Create.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
