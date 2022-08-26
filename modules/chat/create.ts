import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export const createChatRoom = async (userId: string, kreatorId: string) => {
	const roomCollection = collection(db, "rooms")

	const firestoreDoc = doc(roomCollection)
	await setDoc(firestoreDoc, {
		id: firestoreDoc.id,
		userId: userId,
		kreatorId: kreatorId,
	})

	return firestoreDoc.id
}

export const sendChatMessage = async (
	roomId: string,
	message: string,
	userId: string
) => {
	const roomCollection = collection(db, "rooms", roomId, "messages")

	const firestoreDoc = doc(roomCollection)
	await setDoc(firestoreDoc, {
		id: firestoreDoc.id,
		message,
		userId,
		timestamp: serverTimestamp(),
	})
}
