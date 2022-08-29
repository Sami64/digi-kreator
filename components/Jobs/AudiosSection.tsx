import ReactPlayer from "react-player/lazy"

interface Props {
	jobId: string
	audios: string[] | undefined
}

const AudiosSection: React.FC<Props> = ({ jobId, audios }) => {
	console.log("audios", audios)
	return (
		<div className="grid gap-4 grid-cols-3 auto-rows-auto">
			{audios?.map((audio, index) => (
				<div
					className="flex flex-col border-2 items-center justify-center p-2 rounded-xl"
					key={index}
				>
					<ReactPlayer
						url={audio ?? ""}
						controls
						light
						width={400}
						height={50}
					/>
				</div>
			))}
		</div>
	)
}

export default AudiosSection
