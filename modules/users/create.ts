import { collection, doc, setDoc } from "firebase/firestore"
import { Kreator } from "../../core/users/types"
import { db } from "../../firebase"

export const createKreator = async (
	userId: string,
	name: string,
	email: string,
	phone: string,
	location: { longitude: number; latitude: number },
	category: { id: string; title: string }
): Promise<Kreator> => {
	let kreator: Kreator = {
		id: "",
		name: "",
		email: "",
		phone: "",
		location: { longitude: 0, latitude: 0 },
		category: { id: "", title: "" },
	}

	const kreatorsCollection = collection(db, "kreators")

	const firestoreDoc = doc(kreatorsCollection, userId)

	await setDoc(firestoreDoc, {
		id: userId,
		name,
		email,
		phone,
		location,
		category,
	})

	return kreator
}
