import { useSession } from "next-auth/react"
import { ReactElement, useEffect, useState } from "react"
import { Job } from "../../core/job/types"
import KreatorLayout from "../../layouts/kreatorLayout"
import { retrieveJobs } from "../../modules/job/retrieve"
import { NextPageWithLayout } from "../_app"

const Jobs: NextPageWithLayout = () => {
	const { data: session, status } = useSession()
	const [jobs, setJobs] = useState<Job[]>([])

	useEffect(() => {
		getJobs()
	}, [])

	const getJobs = async () => {
		const dbJobs = await retrieveJobs(session?.userId as string)
		setJobs(dbJobs)
	}
	return (
		<>
			<div className="relative">
				<div className="grid gap-4 grid-cols-3 grid-rows-3">
					{jobs.map((job) => (
						<div className="flex flex-col bg-white p-5 rounded-2xl shadow-lg items-center justify-center">
							<h1 className="text-lg capitalize font-extrabold">{job.title}</h1>
							<button className="hover:shadow-xl bg-slate-800 text-white px-5 py-2 rounded-lg uppercase font-bold text-lg mt-2">
								view job
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Jobs

Jobs.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
