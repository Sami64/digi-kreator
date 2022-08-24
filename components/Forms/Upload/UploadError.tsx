import { FileError } from "react-dropzone"
import FileHeader from "./FileHeader"

export interface UploadErrorProps {
	file: File
	onDelete: (file: File) => void
	errors: FileError[]
}

const UploadError = ({ file, onDelete, errors }: UploadErrorProps) => {
	return (
		<>
			<FileHeader file={file} onDelete={onDelete} />
			<div className="animate-pulse">
				<div className="bg-red-700 rounded-full w-full h-2"></div>
			</div>
			{errors.map((error) => (
				<div className="text-red-700 font-bold" key={error.code}>
					{error.message}
				</div>
			))}
		</>
	)
}

export default UploadError
