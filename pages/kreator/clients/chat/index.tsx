import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import { ChatRoomDetails } from "../../../../core/chat/types"
import KreatorLayout from "../../../../layouts/kreatorLayout"
import { retrieveRooms } from "../../../../modules/chat/retrieve"
import { jobDetails } from "../../../../modules/job/details"
import { retrieveChatClient } from "../../../../modules/users/retrieve"

const Index = () => {
	const [rooms, setRooms] = useState<ChatRoomDetails[]>([])

	useEffect(() => {
		getRooms()
	}, [])

	const getRooms = async () => {
		const uSession = await getSession()
		let uRooms: ChatRoomDetails[] = []
		if (uSession?.user != null) {
			const dbRooms = await retrieveRooms(uSession?.userId as string)

			dbRooms.map(async (room) => {
				const client = await retrieveChatClient(room.userId)
				const job = await jobDetails(room.jobId)
				setRooms([
					...rooms,
					{ id: room.id, kreatorId: room.kreatorId, client, job },
				])
			})
		}
	}

	return (
		<>
			<div className="relative h-screen">
				<h1 className="text-center text-white text-5xl uppercase font-bold mb-4">
					your chats
				</h1>
				{/**Chat List */}
				<div className="bg-white rounded-lg p-16 shadow-lg">
					<ul className="space-y-6">
						{rooms.length > 0 ? (
							rooms.map((room) => (
								<li key={room.id} className="group cursor-pointer">
									<Link href={`/kreator/clients/chat/${room.id}`}>
										<a href="">
											<div className="flex flex-col group-hover:shadow-lg p-5">
												<h1 className="text-2xl text-slate-800 font-bold">
													<i className="fas fa-comment-dots pr-5"></i>
													{`Chat with ${room.client?.name} on job ${room.job?.title}`}
												</h1>
											</div>
										</a>
									</Link>
								</li>
							))
						) : (
							<li>No Chats</li>
						)}

						{/* Divider */}
						<hr className="my-4 md:min-w-full" />
					</ul>
				</div>
			</div>
		</>
	)
}

export default Index

export const getServerSideProps: GetServerSideProps = async () => {
	return { props: {} }
}

Index.getLayout = function getLayout(page: ReactElement) {
	return <KreatorLayout>{page}</KreatorLayout>
}
