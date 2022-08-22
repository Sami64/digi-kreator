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
				<div className="bg-slate-700 rounded-full w-full h-2"></div>
			</div>
			{errors.map((error) => (
				<div key={error.code}>{error.message}</div>
			))}
		</>
	)
}

export default UploadError
