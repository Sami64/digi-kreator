import { Category } from "../../categories/types"

export interface UserLocation {
	longitude: number
	latitude: number
}

export interface User {
	id: string
	name: string
	email: string
	phone: string
	location: UserLocation
}

export interface Kreator {
	id: string
	name: string
	email: string
	image: string
	phone: string
	location: UserLocation
	category: Category
}
