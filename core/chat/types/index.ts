import { Timestamp } from "firebase/firestore"
import { Job } from "../../job/types"

export interface ChatMessage {
	id: string
	message: string
	userId: string
	timestamp: Timestamp
}

export interface ChatRoom {
	id: string
	userId: string
	kreatorId: string
	jobId: string
}

export interface ChatRoomDetails {
	id: string
	client: ChatClient
	kreatorId: string
	job: Job
}

export interface ChatClient {
	id: string
	name: string
	email: string
}
