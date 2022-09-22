import { collection, doc, getDoc } from "firebase/firestore"
import { Job } from "../../core/job/types"
import { db } from "../../firebase"

const jobsCollection = collection(db, "jobs")

export const jobDetails = async (id: string): Promise<Job> => {
	let job: Job = {
		id: "",
		title: "",
		description: "",
		category: { id: "", title: "" },
		videos: [],
		audios: [],
		images: [],
		jobImages: [],
		kreator: {
			id: "",
			name: "",
			email: "",
			image: "",
			phone: "",
			location: { longitude: 0, latitude: 0 },
			category: { id: "", title: "" },
		},
	}

	const docRef = doc(jobsCollection, id)
	const snapshot = await getDoc(docRef)

	if (snapshot.exists()) {
		job = {
			id: snapshot.id,
			title: snapshot.data()["title"],
			description: snapshot.data()["description"],
			kreator: snapshot.data()["kreator"],
			category: snapshot.data()["category"],
			videos: snapshot.data()["videos"],
			audios: snapshot.data()["audios"],
			images: snapshot.data()["images"],
			jobImages: snapshot.data()["jobImages"],
		}

		return job
	}
	return job
}
