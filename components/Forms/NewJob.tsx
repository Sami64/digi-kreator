import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { Category } from "../../core/categories/types"
import { Job } from "../../core/job/types"
import { retrieveCategories } from "../../modules/categories/retrieve"
import { createJob, editJob } from "../../modules/job/create"
import { retrieveKreator } from "../../modules/users/retrieve"
import FileUpload, { UploadableFile } from "../Forms/FileUpload"
import FormInput from "../Forms/FormInput"

interface Props {
	isEdit?: boolean
	job?: Job
}

const NewJob: React.FC<Props> = ({ isEdit = false, job }) => {
	const router = useRouter()
	const [categories, setCategories] = useState<Category[]>([])
	const { data: session, status } = useSession()

	const categoriesOptions = categories.map((category, key) => (
		<option key={key} value={category.title} className="capitalize text-lg">
			{category.title}
		</option>
	))

	useEffect(() => {
		getCategories()
	}, [])

	const getCategories = async () => {
		const dbCategories = await retrieveCategories()
		if (isEdit) await formik.validateForm()
		setCategories(dbCategories)
	}

	interface FormValues {
		title: string
		description: string
		category: string
		audios: UploadableFile[]
		images: UploadableFile[]
		videos: UploadableFile[]
		jobImages: UploadableFile[]
	}

	const formik = useFormik({
		initialValues: isEdit
			? {
					title: job?.title as string,
					description: job?.description as string,
					category: job?.category.title as string,
					audios: job?.audios as any,
					images: job?.images as any,
					videos: job?.videos as any,
					jobImages: job?.jobImages as any,
			  }
			: {
					title: "",
					description: "",
					category: "",
					audios: [],
					images: [],
					videos: [],
					jobImages: [],
			  },
		onSubmit: async (values: FormValues) => {
			try {
				const catObj = categories.filter((cat) => cat.title == values.category)

				if (!isEdit) {
					const kreator = await retrieveKreator(session?.userId as string)

					await createJob(
						values.title,
						values.description,
						kreator,
						catObj[0],
						values.videos.map((video) => video.url as string),
						values.audios.map((audio) => audio.url as string),
						values.images.map((image) => image.url as string),
						values.jobImages.map((jobImage) => jobImage.url as string)
					)
					router.replace("/kreator/jobs")
				} else {
					await editJob(
						job?.id as string,
						values.title,
						values.description,
						catObj[0],
						values.videos.map((video) => video.url as string),
						values.audios.map((audio) => audio.url as string),
						values.images.map((image) => image.url as string),
						values.jobImages.map((jobImage) => jobImage.url as string)
					)
					router.replace(`/kreator/job/${job?.id}`)
				}
			} catch (error) {
				alert(error)
			}
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.min(8, "Must be at least 8 characters")
				.max(100, "Must be less  than 100 characters")
				.required("Title is required"),
			description: Yup.string().required("Description is required"),
			category: Yup.string()
				.required("please pick a category")
				.oneOf(categories.map((category) => category.title)),
			audios: Yup.array(Yup.object({ url: Yup.string().required() })),
			images: Yup.array(Yup.object({ url: Yup.string().required() })),
			videos: Yup.array(Yup.object({ url: Yup.string().required() })),
			jobImages: Yup.array(Yup.object({ url: Yup.string().required() }))
				.min(1)
				.required("Upload at least one job image"),
		}),
	})

	const validForm = async () => {
		await formik.validateForm()
	}

	useEffect(() => {
		validForm()
	}, [])

	return (
		<div className="bg-white p-16 rounded-2xl shadow-lg">
			<FormikProvider value={formik}>
				{/**General info */}
				<h1 className="text-2xl uppercase font-extrabold my-2 text-slate-700">
					general info
				</h1>
				<Form>
					<div className="border rounded-lg py-8 px-10 my-5 border-slate-700">
						{/** Title */}
						<FormInput
							label="Title"
							id="title"
							name="title"
							helpText="Must be 8-20 characters and cannot contain special characters."
							type="text"
						/>

						{/** Description */}
						<FormInput
							label="Description"
							isMulti={true}
							id="description"
							name="description"
							helpText="Must be 8-20 characters and cannot contain special characters."
							type="text"
						/>

						{/** Category */}
						<div className="flex flex-col">
							<label htmlFor="category" className="uppercase my-3 text-lg">
								Category
							</label>
							<Field
								as="select"
								id="category"
								name="category"
								className=" rounded text-base relative text-slate-600 placeholder-slate-300"
							>
								<option value={""}>Pick a category</option>
								{categoriesOptions}
							</Field>
							<ErrorMessage
								name="category"
								render={(message) => (
									<p className="text-xs text-red-600 capitalize">{message}</p>
								)}
							/>
						</div>
					</div>

					<h1 className="text-2xl uppercase font-extrabold my-2 text-slate-700">
						media info
					</h1>
					<div className="border rounded-lg py-8 px-10 my-5 border-slate-700">
						<div className="flex flex-col my-5">
							<label
								htmlFor="jobImages"
								className="capitalize text-slate-800 text-lg font-bold "
							>
								Job Images
							</label>
							<label
								htmlFor="jobImages"
								className="capitalize text-lg text-slate-600 font-bold mb-5"
							>
								please upload images that best describe your job
							</label>
							<FileUpload
								name="jobImages"
								accept={{
									"image/*": [".png", ".jpg", ".jpeg"],
								}}
							/>
							{formik.errors.jobImages && (
								<div className="text-red-700 font-extrabold capitalize text-lg">
									at least one job image is required
								</div>
							)}
						</div>
					</div>

					<h1 className="text-2xl uppercase font-extrabold mt-2 text-slate-700">
						portfolio uploads
					</h1>
					<h5 className="capitalize text-lg text-slate-500 font-bold">
						upload all content in your portfolio related to your job here
					</h5>
					<div className="border rounded-lg py-8 px-10 my-5 border-slate-700">
						{/**Audios Upload */}
						<div className="flex flex-col my-5">
							<label
								htmlFor="audios"
								className="capitalize text-slate-800 text-lg font-bold mb-5"
							>
								audio files
							</label>
							<FileUpload
								name="audios"
								accept={{
									"audio/*": [".mp3"],
								}}
							/>
						</div>
						{/**Videos Upload */}
						<div className="flex flex-col my-5">
							<label
								htmlFor="videos"
								className="capitalize text-slate-800 text-lg font-bold mb-5"
							>
								videos files
							</label>
							<FileUpload
								name="videos"
								accept={{
									"video/mp4": [],
								}}
							/>
						</div>
						{/** Images Upload */}
						<div className="flex flex-col my-5">
							<label
								htmlFor="images"
								className="capitalize text-slate-800 text-lg font-bold mb-5"
							>
								image files
							</label>
							<FileUpload
								name="images"
								accept={{
									"image/*": [".png", ".jpg", ".jpeg"],
								}}
							/>
						</div>
					</div>

					<div className="flex justify-center mt-10">
						<button
							type="submit"
							disabled={!formik.isValid || formik.isSubmitting}
							className={`${
								formik.isValid
									? " bg-slate-800 hover:bg-slate-500"
									: "bg-slate-400 hover:cursor-not-allowed"
							} justify-center font-bold shadow-lg w-96 items-center rounded-xl   text-center p-4 text-lg uppercase text-white`}
						>
							{formik.isSubmitting
								? isEdit
									? "processing"
									: "creating..."
								: ""}
							{!formik.isSubmitting ? (isEdit ? "edit" : "create") : ""}
						</button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	)
}

export default NewJob
