import { createPopper } from "@popperjs/core"
import React, { RefObject } from "react"

const UserDropdown = () => {
	// dropdown props
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
	const btnDropdownRef: RefObject<HTMLAnchorElement> = React.createRef()
	const popoverDropdownRef: RefObject<HTMLDivElement> = React.createRef()
	const openDropdownPopover = () => {
		createPopper(
			btnDropdownRef.current as Element,
			popoverDropdownRef.current as HTMLElement,
			{
				placement: "bottom-start",
			}
		)
		setDropdownPopoverShow(true)
	}
	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false)
	}
	return (
		<>
			<a
				className="text-slate-500 block"
				href="#pablo"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault()
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
				}}
			>
				<div className="items-center flex">
					<span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
						<img
							alt="..."
							className="w-full rounded-full align-middle border-none shadow-lg"
							src="/img/sam.jpg"
						/>
					</span>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
				}
			>
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
					}
					onClick={(e) => e.preventDefault()}
				>
					Action
				</a>
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
					}
					onClick={(e) => e.preventDefault()}
				>
					Another action
				</a>
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
					}
					onClick={(e) => e.preventDefault()}
				>
					Something else here
				</a>
				<div className="h-0 my-2 border border-solid border-slate-100" />
				<a
					href="#pablo"
					className={
						"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
					}
					onClick={(e) => e.preventDefault()}
				>
					Seprated link
				</a>
			</div>
		</>
	)
}

export default UserDropdown
