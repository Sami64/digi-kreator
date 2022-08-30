import { signIn } from "next-auth/react"
import { ReactElement } from "react"
import AuthLayout from "../../../layouts/authLayout"

const Login = () => {
	const handleSignIn = async () => {
		try {
			await signIn("google", { callbackUrl: "/kreator/auth/phoneNumber" })
		} catch (error) {
			console.log("Auth error", error)
		}
	}

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-4/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-slate-500 text-sm font-bold">
										Sign in with
									</h6>
								</div>
								<div className="btn-wrapper text-center">
									<button
										className="bg-white active:bg-slate-50 text-slate-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
										type="button"
										onClick={handleSignIn}
									>
										<img alt="..." className="w-5 mr-1" src="/img/google.svg" />
										Google
									</button>
								</div>
								<hr className="mt-6 border-b-1 border-slate-300" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login

Login.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>
}
