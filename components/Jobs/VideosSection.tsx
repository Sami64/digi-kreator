import { useEffect } from "react"
import ReactPlayer from "react-player/lazy"

type Props = {
	jobId: string
	videos: string[] | undefined
}

const VideosSection: React.FC<Props> = ({ jobId, videos }) => {
	useEffect(() => {
		console.log("Vids", videos)
	}, [])

	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			{videos?.map((video) => (
				<ReactPlayer
					url={videos ? videos[0] : ""}
					controls
					light
					width={400}
					height={200}
				/>
			))}
		</div>
	)
}

export default VideosSection
