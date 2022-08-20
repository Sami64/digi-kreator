import "@fortawesome/fontawesome-free/css/all.min.css"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { Router } from "next/router"
import { ReactElement, ReactNode } from "react"
import ReactDOM from "react-dom"
import PageChange from "../components/PageChange/PageChange"
import "../styles/globals.css"

Router.events.on("routeChangeStart", (url) => {
	console.log(`Loading: ${url}`)
	document.body.classList.add("body-page-transition")
	ReactDOM.render(
		<PageChange path={url} />,
		document.getElementById("page-transition")
	)
})
Router.events.on("routeChangeComplete", () => {
	ReactDOM.unmountComponentAtNode(
		document.getElementById("page-transition") as Element
	)
	document.body.classList.remove("body-page-transition")
})
Router.events.on("routeChangeError", () => {
	ReactDOM.unmountComponentAtNode(
		document.getElementById("page-transition") as Element
	)
	document.body.classList.remove("body-page-transition")
})

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page)
	return getLayout(<Component {...pageProps} />)
}

export default MyApp
