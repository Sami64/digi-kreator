import { Spin } from "antd"
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import * as Yup from "yup"
import FormInput from "../../../components/Forms/FormInput"
import { useLocationContext } from "../../../contexts/LocationContextProvider"
import { Category } from "../../../core/categories/types"
import AuthLayout from "../../../layouts/authLayout"
import { retrieveCategories } from "../../../modules/categories/retrieve"
import { createKreator } from "../../../modules/users/create"
import { retrieveKreator } from "../../../modules/users/retrieve"
import { NextPageWithLayout } from "../../_app"

const PhoneNumber: NextPageWithLayout = () => {
	const { location } = useLocationContext()
	const router = useRouter()
	const [phoneNumber, setPhoneNumber] = useState("")
	const [session, setSession] = useState<Session>()
	const [showPhoneForm, setShowPhoneForm] = useState(false)
	const [categories, setCategories] = useState<Category[]>([])
	const [currentLocation, setCurrentLocation] = useState({})

	const categoriesOptions = categories.map((category, key) => (
		<option key={key} value={category.title} className="capitalize text-lg">
			{category.title}
		</option>
	))

	useEffect(() => {
		checkKreator()
	}, [])

	const checkKreator = async () => {
		const session = await getSession()
		if (session?.user != null) {
			setSession(session)
			const kreator = await retrieveKreator(session?.userId as string)

			if (kreator?.id == "") {
				setCategories(await retrieveCategories())
				setShowPhoneForm(true)
				return
			} else {
				router.replace("/kreator/")
			}
		} else {
			router.replace("/kreator/auth/login")
		}
	}

	const formik = useFormik({
		initialValues: { phone: "", category: "" },
		onSubmit: async (values) => {
			try {
				console.log("form", values)
				console.log("user location", location)
				const catObj = categories.filter((cat) => cat.title == values.category)

				await createKreator(
					session?.userId as string,
					session?.user?.name as string,
					session?.user?.email as string,
					values.phone,
					location,
					catObj[0]
				)

				router.replace("/kreator/")
			} catch (error) {
				alert(error)
			}
		},
		validationSchema: Yup.object({
			phone: Yup.string()
				.matches(/^0(\d{9})$/, "Phone number is not valid")
				.length(10)
				.required("Phone number is required"),
			category: Yup.string()
				.required("please pick a category")
				.oneOf(categories.map((category) => category.title)),
		}),
	})

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-4/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
							{showPhoneForm ? (
								<>
									<div className="rounded-t mb-0 px-6 py-6">
										<div className="text-center mb-3">
											<h6 className="text-slate-500 text-sm font-bold">
												Continue
											</h6>
										</div>
										<hr className="mt-6 border-b-1 border-slate-300" />
									</div>
									<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
										<div className="text-slate-400 text-center mb-3 font-bold capitalize">
											<small>enter your phone number to continue</small>
										</div>
										<FormikProvider value={formik}>
											<Form>
												{/** Phone */}
												<div className=" py-2">
													<FormInput
														label="Phone"
														type="text"
														id="phone"
														name="phone"
													/>
												</div>
												{/** Category */}
												<div className="flex flex-col my-5">
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
															<p className="text-xs text-red-600 capitalize">
																{message}
															</p>
														)}
													/>
												</div>
												{/** Submit btn */}
												<div className="text-center mt-6">
													<button
														disabled={formik.isSubmitting || !formik.isValid}
														className={`${
															formik.isSubmitting ||
															(!formik.isValid &&
																"cursor-not-allowed opacity-70")
														} bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
														type="submit"
													>
														{formik.isSubmitting && "submitting..."}
														{!formik.isSubmitting && "Continue"}
													</button>
												</div>
											</Form>
										</FormikProvider>
									</div>
								</>
							) : (
								<div className="flex justify-center p-24">
									<Spin size="large" />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PhoneNumber

PhoneNumber.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>
}

// export const getServerSideProps: GetServerSideProps = async () => {
// 	return { props: {} }
// }
