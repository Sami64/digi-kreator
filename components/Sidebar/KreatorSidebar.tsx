import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import NotificationDropdown from "../Dropdowns/NotificationDropdown"
import UserDropdown from "../Dropdowns/UserDropdown"

const KreatorSidebar = () => {
	const [collapseShow, setCollapseShow] = React.useState("hidden")
	const router = useRouter()
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}
					<button
						className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
						type="button"
						onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
					>
						<i className="fas fa-bars"></i>
					</button>
					{/* Brand */}
					<Link href="/">
						<a
							href="#pablo"
							className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
						>
							DigiKoncept Admin
						</a>
					</Link>
					{/* User */}
					<ul className="md:hidden items-center flex flex-wrap list-none">
						<li className="inline-block relative">
							<NotificationDropdown />
						</li>
						<li className="inline-block relative">
							<UserDropdown />
						</li>
					</ul>
					{/* Collapse */}
					<div
						className={
							"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
							collapseShow
						}
					>
						{/* Collapse header */}
						<div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
							<div className="flex flex-wrap">
								<div className="w-6/12">
									<Link href="/">
										<a
											href="#pablo"
											className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
										>
											DigiKoncept Kreator
										</a>
									</Link>
								</div>
								<div className="w-6/12 flex justify-end">
									<button
										type="button"
										className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
										onClick={() => setCollapseShow("hidden")}
									>
										<i className="fas fa-times"></i>
									</button>
								</div>
							</div>
						</div>

						{/* Divider */}
						<hr className="my-4 md:min-w-full" />
						{/* Heading */}
						<h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
							Jobs
						</h6>
						{/* Navigation */}

						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							<li className="items-center">
								<Link href="/kreator">
									<a
										href="#pablo"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(router.pathname.indexOf("/kreator") !== -1
												? "text-sky-500 hover:text-sky-600"
												: "text-slate-700 hover:text-slate-500")
										}
									>
										<i
											className={
												"fas fa-tools mr-2 text-sm " +
												(router.pathname.indexOf("/kreator") !== -1
													? "opacity-75"
													: "text-slate-300")
											}
										></i>{" "}
										home
									</a>
								</Link>
							</li>
							<li className="items-center">
								<Link href="/kreator/create">
									<a
										href="#pablo"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(router.pathname.indexOf("/kreator/create") !== -1
												? "text-sky-500 hover:text-sky-600"
												: "text-slate-700 hover:text-slate-500")
										}
									>
										<i
											className={
												"fas fa-tools mr-2 text-sm " +
												(router.pathname.indexOf("/kreator/create") !== -1
													? "opacity-75"
													: "text-slate-300")
											}
										></i>{" "}
										Create
									</a>
								</Link>
							</li>

							<li className="items-center">
								<Link href="/kreator/list">
									<a
										href="#pablo"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(router.pathname.indexOf("/kreator/list") !== -1
												? "text-sky-500 hover:text-sky-600"
												: "text-slate-700 hover:text-slate-500")
										}
									>
										<i
											className={
												"fas fa-table mr-2 text-sm " +
												(router.pathname.indexOf("/kreator/list") !== -1
													? "opacity-75"
													: "text-slate-300")
											}
										></i>{" "}
										List
									</a>
								</Link>
							</li>
						</ul>

						{/* Divider */}
						<hr className="my-4 md:min-w-full" />
						{/* Heading */}
						<h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
							Clients
						</h6>
						{/* Navigation */}

						<ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
							<li className="items-center">
								<Link href="/kreator/clients">
									<a
										href="#pablo"
										className="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
									>
										<i className="fas fa-fingerprint text-slate-400 mr-2 text-sm"></i>{" "}
										List
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

export default KreatorSidebar
