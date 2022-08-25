import { createContext, useContext, useEffect, useState } from "react"

const LocationContext = createContext({
	location: { longitude: 0, latitude: 0 },
	error: {},
})

export const LocationContextProvider = ({ children }: any) => {
	const [location, setLocation] = useState({ longitude: 0, latitude: 0 })
	const [error, setError] = useState({})

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					longitude: position.coords.longitude,
					latitude: position.coords.latitude,
				})
			},
			(error) => {
				setError(error)
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		)
	}, [])

	return (
		<LocationContext.Provider value={{ location, error }}>
			{children}
		</LocationContext.Provider>
	)
}

export const useLocationContext = () => useContext(LocationContext)
