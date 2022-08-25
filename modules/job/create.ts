import { collection, doc, setDoc } from "firebase/firestore"
import { Category } from "../../core/categories/types"
import { Kreator } from "../../core/users/types"
import { db } from "../../firebase"

export const createJob = async (
	title: string,
	description: string,
	kreator: Kreator,
	category: Category,
	videos: string[],
	audios: string[],
	images: string[]
) => {
	// let job: Job = {
	// 	id: "",
	// 	title: "",
	// 	description: "",
	// 	category: { id: "", title: "" },
	// 	videos: [],
	// 	audios: [],
	// 	images: [],
	// 	kreator: {
	// 		id: "",
	// 		name: "",
	// 		email: "",
	// 		phone: "",
	// 		location: { longitude: 0, latitude: 0 },
	// 		category: { id: "", title: "" },
	// 	},
	// }

	const jobsCollection = collection(db, "jobs")

	const firestoreDoc = doc(jobsCollection)

	await setDoc(firestoreDoc, {
		id: firestoreDoc.id,
		title,
		description,
		category,
		videos,
		audios,
		images,
		kreator,
	})
}
