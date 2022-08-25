import { Timestamp } from "firebase/firestore";

export interface ChatMessage {
	id: string;
	message: string;
	userId: string;
	timestamp: Timestamp;
}

export interface ChatRoom {
	id: string;
	userId: string;
	kreatorId: string;
	messages: ChatMessage[];
}
