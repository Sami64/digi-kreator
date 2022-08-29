import React from "react"
import MultiImagePreview from "./MultiImagePreview"

interface Props {
	jobId: string
	images: string[] | undefined
}

const ImagesSection: React.FC<Props> = ({ jobId, images }) => {
	return (
		<div>
			<MultiImagePreview images={images} />
		</div>
	)
}

export default ImagesSection
