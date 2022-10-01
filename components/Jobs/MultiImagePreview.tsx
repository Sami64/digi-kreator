import { Image } from "antd"
import React from "react"

interface Props {
	images: string[] | undefined
}

const MultiImagePreview: React.FC<Props> = ({ images }) => {
	return (
		<div className="grid gap-6 gird-cols-2  md:gap-4 md:grid-cols-3 auto-rows-auto">
			<Image.PreviewGroup>
				{images?.map((image, index) => (
					<Image key={index} width={200} src={image} />
				))}
			</Image.PreviewGroup>
		</div>
	)
}

export default MultiImagePreview
