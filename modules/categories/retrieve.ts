import { collection, getDocs } from "firebase/firestore"
import { Category } from "../../core/categories/types"
import { db } from "../../firebase"

export const retrieveCategories = async (): Promise<Category[]> => {
	let categories: Category[] = []

	const snapshot = await getDocs(collection(db, "categories"))

	snapshot.forEach((doc) => {
		categories.push({
			id: doc.id,
			title: doc.data()["title"],
		})
	})

	return categories
}
