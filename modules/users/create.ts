import { collection, doc, setDoc } from "firebase/firestore"
import { Kreator } from "../../core/users/types"
import { db } from "../../firebase"

export const createKreator = async (
	userId: string,
	name: string,
	email: string,
	image: string,
	phone: string,
	location: { longitude: number; latitude: number },
	category: { id: string; title: string }
): Promise<Kreator> => {
	let kreator: Kreator = {
		id: "",
		name: "",
		image: "",
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
		image,
		phone,
		location,
		category,
	})

	return kreator
}

export const createKreatorLocation = async (
	id: string,
	lat: number,
	lng: number
) => {
	const locationCollection = collection(db, "locations")

	const firestoreDoc = doc(locationCollection, id)

	await setDoc(firestoreDoc, { id, lat, lng })
}
