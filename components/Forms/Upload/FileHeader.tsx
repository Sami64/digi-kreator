export interface FileHeaderProps {
	file: File
	onDelete: (file: File) => void
}

const FileHeader = ({ file, onDelete }: FileHeaderProps) => {
	return (
		<div className="flex justify-between">
			<h1>{file.name}</h1>
			<button onClick={() => onDelete(file)}>delete</button>
		</div>
	)
}

export default FileHeader
