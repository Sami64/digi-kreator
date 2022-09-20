import "@fortawesome/fontawesome-free/css/all.min.css"
import "antd/dist/antd.css"
import { NextPage } from "next"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { LocationContextProvider } from "../contexts/LocationContextProvider"
import "../styles/globals.css"
import "../styles/tailwind.css"

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page)
	return (
		<SessionProvider session={session}>
			<LocationContextProvider>
				{getLayout(<Component {...pageProps} />)}
			</LocationContextProvider>
		</SessionProvider>
	)
}

export default MyApp
