import { useField } from "formik"
import { useCallback, useEffect, useState } from "react"
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import UploadError from "./Upload/UploadError"
import UploadFile from "./Upload/UploadFile"

let currentId = 0

function getNewId() {
	// we could use a fancier solution instead of a sequential ID :)
	return ++currentId
}

export interface UploadableFile {
	// id was added after the video being released to fix a bug
	// Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
	// Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
	id: number
	file: File
	errors: FileError[]
	url?: string
}

const FileUpload = ({ name, accept }: { name: string; accept: {} }) => {
	const [_, __, helpers] = useField(name)
	const [files, setFiles] = useState<UploadableFile[]>([])
	const maxSize = 20000 * 1000

	const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
		const mappedAcc = accFiles.map((file) => ({
			file,
			errors: [],
			id: getNewId(),
		}))
		const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }))
		setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
	}, [])

	useEffect(() => {
		helpers.setValue(files)
	}, [files])

	function onUpload(file: File, url: string) {
		setFiles((curr) =>
			curr.map((fw) => {
				if (fw.file === file) {
					return { ...fw, url }
				}
				return fw
			})
		)
	}

	function onDelete(file: File) {
		setFiles((curr) => curr.filter((fw) => fw.file !== file))
	}

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		onDrop,
		accept: accept,
		maxSize: maxSize, // 300KB
	})

	const fileLarge =
		fileRejections.length > 0 && fileRejections[0].file.size > maxSize

	return (
		<div>
			<div
				{...getRootProps({
					className:
						"flex border border-4 rounded bg-slate-300 border-dashed h-32 justify-center items-center",
				})}
			>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			{files.map((file) => (
				<div key={file.id}>
					{file.errors.length ? (
						<UploadError
							file={file.file}
							errors={file.errors}
							onDelete={onDelete}
							fileLarge={fileLarge}
						/>
					) : (
						<UploadFile
							onDelete={onDelete}
							onUpload={onUpload}
							file={file.file}
						/>
					)}
				</div>
			))}
		</div>
	)
}

export default FileUpload
