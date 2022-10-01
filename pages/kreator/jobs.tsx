import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { Job } from "../../core/job/types"
import KreatorLayout from "../../layouts/kreatorLayout"
import { retrieveJobs } from "../../modules/job/retrieve"
import { NextPageWithLayout } from "../_app"

const Jobs: NextPageWithLayout = ({
	jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { data: session, status } = useSession()
	const router = useRouter()

	return (
		<>
			<div className="relative h-screen">
				<div className="grid gap-4 grid-cols-3 grid-rows-3">
					{jobs.map((job: Job) => (
						<div
							key={job.id}
							className="flex flex-col bg-white p-5 rounded-2xl shadow-lg items-center justify-center"
						>
							<h1 className="text-lg capitalize font-extrabold">{job.title}</h1>
							<button
								onClick={() => router.push(`/kreator/job/${job.id}`)}
								className="hover:shadow-xl bg-slate-800 text-white px-5 py-2 rounded-lg uppercase font-bold text-lg mt-2"
							>
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

export const getServerSideProps: GetServerSideProps = async ({
	query,
	req,
}) => {
	const session = await getSession({ req })
	console.log("session", session)
	const jobs = await retrieveJobs(session?.userId as string)
	return {
		props: { jobs },
	}
}

Jobs.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
