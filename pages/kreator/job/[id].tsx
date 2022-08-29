import { Tabs } from "antd"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import AudiosSection from "../../../components/Jobs/AudiosSection"
import ImagesSection from "../../../components/Jobs/ImagesSection"
import VideosSection from "../../../components/Jobs/VideosSection"
import { Job } from "../../../core/job/types"
import KreatorLayout from "../../../layouts/kreatorLayout"
import { deleteJob } from "../../../modules/job/create"
import { retrieveJob } from "../../../modules/job/retrieve"
import { NextPageWithLayout } from "../../_app"

const JobInfo: NextPageWithLayout = () => {
	const router = useRouter()
	const [job, setJob] = useState<Job>()

	const { id } = router.query

	const { TabPane } = Tabs

	useEffect(() => {
		getJob()
	}, [])

	const getJob = async () => {
		const result = await retrieveJob(id as string)
		setJob(result)
	}

	const handleDelete = async () => {
		await deleteJob(id as string)
		router.replace("/kreator/jobs")
	}

	return (
		<>
			<div className="relative">
				<h1 className="text-center text-4xl text-white font-bold capitalize pb-5">
					job details
				</h1>
				<div className="flex flex-col bg-white rounded-lg p-10">
					<h1 className="text-2xl uppercase font-extrabold text-slate-700">
						general info
					</h1>
					{/* Divider */}
					<hr className="my-4 md:min-w-full" />
					{/* Job title */}
					<div className="my-2">
						<h5 className="text-lg uppercase mb-3">title</h5>
						<h2 className="text-xl font-bold text-slate-600 border-2 hover:border-slate-700 p-4 rounded-xl">
							{job?.title}
						</h2>
					</div>
					{/* Job description */}
					<div className="my-2">
						<h5 className="text-lg uppercase mb-3">description</h5>
						<h2 className="text-xl font-bold text-slate-600 border-2 hover:border-slate-700 p-4 rounded-xl">
							{job?.description}
						</h2>
					</div>
					{/* Job category */}
					<div className="my-2">
						<h5 className="text-lg uppercase mb-3">category</h5>
						<h2 className="text-xl font-bold text-slate-600 border-2 hover:border-slate-700 p-4 rounded-xl">
							{job?.category.title}
						</h2>
					</div>
					{/** Media Uploads */}
					<h1 className="text-2xl uppercase font-extrabold mt-2 text-slate-700">
						media info
					</h1>
					{/* Divider */}
					<hr className="my-4 md:min-w-full" />
					{/** Display Pane */}
					<div className="my-2">
						<Tabs defaultActiveKey="0">
							<TabPane key={0} tab={<span>Videos</span>}>
								{job != null && (
									<VideosSection jobId={job.id as string} videos={job.videos} />
								)}
							</TabPane>
							<TabPane key={1} tab={<span>Images</span>}>
								{job != null && (
									<ImagesSection
										jobId={job.id as string}
										images={job?.images}
									/>
								)}
							</TabPane>
							<TabPane key={2} tab={<span>Audio</span>}>
								{job != null && (
									<AudiosSection
										jobId={job.id as string}
										audios={job?.audios}
									/>
								)}
							</TabPane>
						</Tabs>
					</div>
					<div className="flex justify-end space-x-5">
						<button
							onClick={() => router.push(`/kreator/job/edit/${job?.id}`)}
							className="text-white bg-slate-600 p-4 font-extrabold uppercase rounded-xl"
						>
							edit
						</button>
						<button
							onClick={handleDelete}
							className="text-white bg-red-600 p-4 font-extrabold uppercase rounded-xl"
						>
							delete
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default JobInfo

JobInfo.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
