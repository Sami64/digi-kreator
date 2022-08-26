import { collection, doc, getDoc } from "firebase/firestore"
import { Kreator } from "../../core/users/types"
import { db } from "../../firebase"

export const retrieveKreator = async (id: string): Promise<Kreator> => {
	let kreator: Kreator = {
		id: "",
		name: "",
		email: "",
		phone: "",
		location: { longitude: 0, latitude: 0 },
		category: { id: "", title: "" },
	}

	const docRef = doc(collection(db, "kreators"), id)
	const snapshot = await getDoc(docRef)

	if (snapshot.exists()) {
		kreator = {
			id: snapshot.id,
			name: snapshot.data()["name"],
			email: snapshot.data()["email"],
			phone: snapshot.data()["phone"],
			location: snapshot.data()["location"],
			category: snapshot.data()["category"],
		}
		return kreator
	}

	return kreator
}

export const retrieveChatClient = async (id: string) => {
	let client = {
		id: "",
		name: "",
		email: "",
	}

	const docRef = doc(collection(db, "clients"), id)
	const snapshot = await getDoc(docRef)

	if (snapshot.exists()) {
		client = {
			id: snapshot.id,
			name: snapshot.data()["name"],
			email: snapshot.data()["email"],
		}
		return client
	}

	return client
}
