import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ReactElement } from "react"
import NewJob from "../../../../components/Forms/NewJob"
import KreatorLayout from "../../../../layouts/kreatorLayout"
import { retrieveJob } from "../../../../modules/job/retrieve"
import { NextPageWithLayout } from "../../../_app"

const EditJob: NextPageWithLayout = ({
	job,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<div className="relative">
				<h1 className="text-white text-center capitalize text-2xl">edit job</h1>
				<NewJob isEdit={true} job={job} />
			</div>
		</>
	)
}

export default EditJob

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const jobId = query.id
	const job = await retrieveJob(jobId as string)
	return { props: { job } }
}

EditJob.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
