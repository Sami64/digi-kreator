import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { Category } from "../../core/categories/types"
import { retrieveCategories } from "../../modules/categories/retrieve"
import { createJob } from "../../modules/job/create"
import { retrieveKreator } from "../../modules/users/retrieve"
import FileUpload, { UploadableFile } from "../Forms/FileUpload"
import FormInput from "../Forms/FormInput"

const NewJob: React.FC = () => {
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
		setCategories(dbCategories)
	}

	interface FormValues {
		title: string
		description: string
		category: string
		audios: UploadableFile[]
		images: UploadableFile[]
		videos: UploadableFile[]
	}

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			category: "",
			audios: [],
			images: [],
			videos: [],
		},
		onSubmit: async (values: FormValues) => {
			try {
				console.log("form", values)
				console.log(session)
				const catObj = categories.filter((cat) => cat.title == values.category)
				console.log("cat obj", catObj)
				const kreator = await retrieveKreator(session?.userId as string)
				console.log("kreator", kreator)

				await createJob(
					values.title,
					values.description,
					kreator,
					catObj[0],
					values.videos.map((video) => video.url as string),
					values.audios.map((audio) => audio.url as string),
					values.images.map((image) => image.url as string)
				)
				formik.resetForm()

				alert("Job created successfully")
			} catch (error) {
				alert(error)
			}
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.min(8, "Must be at least 8 characters")
				.max(20, "Must be less  than 20 characters")
				.required("Title is required"),
			description: Yup.string().required("Description is required"),
			category: Yup.string()
				.required("please pick a category")
				.oneOf(categories.map((category) => category.title)),
			audios: Yup.array(Yup.object({ url: Yup.string().required() })),
			images: Yup.array(Yup.object({ url: Yup.string().required() })),
			videos: Yup.array(Yup.object({ url: Yup.string().required() })),
		}),
	})

	return (
		<div className="bg-white p-16 rounded-2xl shadow-lg">
			<FormikProvider value={formik}>
				<Form>
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
						<label htmlFor="category">Category</label>
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
							{formik.isSubmitting && "creating..."}
							{!formik.isSubmitting && "create"}
						</button>
					</div>
				</Form>
			</FormikProvider>
		</div>
	)
}

export default NewJob
