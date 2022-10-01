import { createPopper } from "@popperjs/core"
import { useSession } from "next-auth/react"
import React, { RefObject } from "react"

const UserDropdown = () => {
	const { data: session, status } = useSession()
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
			<a className="text-slate-500 block" href="#pablo" ref={btnDropdownRef}>
				<div className="items-center flex">
					<span className="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
						<img
							alt="..."
							referrerPolicy="no-referrer"
							className="w-full rounded-full align-middle border-none shadow-lg"
							src={session?.user?.image as string}
						/>
					</span>
				</div>
			</a>
		</>
	)
}

export default UserDropdown
