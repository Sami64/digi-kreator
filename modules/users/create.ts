import { collection, doc, setDoc } from "firebase/firestore"
import { Kreator } from "../../core/users/types"
import { db } from "../../firebase"

export const createKreator = async (
	userId: string,
	name: string,
	email: string
): Promise<Kreator> => {
	let kreator: Kreator = {
		id: "",
		name: "",
		email: "",
		phone: "",
		location: { longitude: 0, latitude: 0 },
		category: { id: "", title: "" },
	}

	const kreatorsCollection = collection(db, "kreators", userId)

	const firestoreDoc = doc(kreatorsCollection)

	await setDoc(firestoreDoc, {
		id: userId,
		name: name,
		email: email,
	})

	return kreator
}
