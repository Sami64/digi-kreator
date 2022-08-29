import {
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore"
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

export const editJob = async (
	id: string,
	title: string,
	description: string,
	category: Category,
	videos: string[],
	audios: string[],
	images: string[]
) => {
	const firestoreDoc = doc(db, "jobs", id)

	await updateDoc(firestoreDoc, {
		title,
		description,
		category,
		videos: videos.length > 0 ? arrayUnion(...videos) : arrayUnion(...[]),
		audios: audios.length > 0 ? arrayUnion(...audios) : arrayUnion(...[]),
		images: images.length > 0 ? arrayUnion(...images) : arrayUnion(...[]),
	})
}

export const deleteJob = async (id: string) => {
	await deleteDoc(doc(db, "jobs", id))
}
